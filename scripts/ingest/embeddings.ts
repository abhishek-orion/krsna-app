/**
 * Script to generate embeddings for Gita verses and upload to Supabase
 * 
 * Usage: 
 * 1. Set environment variables (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, OPENAI_API_KEY)
 * 2. Run: npx ts-node scripts/ingest/embeddings.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

interface GitaVerse {
  chapter: number;
  verse: number;
  sloka_sanskrit?: string;
  translation_en: string;
  transliteration?: string;
  translator?: string;
  source_url?: string;
}

interface GitaData {
  metadata: any;
  chapters: any[];
  verses: GitaVerse[];
}

// Create embedding using OpenAI API
async function createEmbedding(text: string): Promise<number[]> {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      input: text,
      model: 'text-embedding-3-small',
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create embedding: ${error}`);
  }

  const data = await response.json();
  return data.data[0].embedding;
}

// Delay helper for rate limiting
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function ingestVerses() {
  console.log('Starting verse ingestion...\n');

  // Load Gita data
  const dataPath = path.join(__dirname, '../../assets/gita/en.json');
  const gitaData: GitaData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  console.log(`Loaded ${gitaData.verses.length} verses\n`);

  // Step 1: Upload verses to Supabase
  console.log('Step 1: Uploading verses to Supabase...');
  
  for (const verse of gitaData.verses) {
    const { error } = await supabase.from('gita_verses').upsert({
      chapter: verse.chapter,
      verse: verse.verse,
      sloka_sanskrit: verse.sloka_sanskrit,
      translation_en: verse.translation_en,
      transliteration: verse.transliteration,
      translator: gitaData.metadata.translator,
      source_url: gitaData.metadata.source_url,
    }, {
      onConflict: 'chapter,verse',
    });

    if (error) {
      console.error(`Error upserting verse ${verse.chapter}:${verse.verse}:`, error);
    } else {
      process.stdout.write(`✓ ${verse.chapter}:${verse.verse} `);
    }
  }
  
  console.log('\n\nVerses uploaded successfully!\n');

  // Step 2: Generate and upload embeddings
  console.log('Step 2: Generating embeddings...');
  
  // Get all verses from DB to get their IDs
  const { data: dbVerses, error: fetchError } = await supabase
    .from('gita_verses')
    .select('id, chapter, verse, translation_en, sloka_sanskrit');

  if (fetchError) {
    throw new Error(`Failed to fetch verses: ${fetchError.message}`);
  }

  console.log(`Processing ${dbVerses.length} verses...\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const verse of dbVerses) {
    try {
      // Create text chunk for embedding (include both Sanskrit and translation)
      const chunk = [
        verse.sloka_sanskrit || '',
        verse.translation_en,
      ]
        .filter(Boolean)
        .join(' ');

      // Generate embedding
      const embedding = await createEmbedding(chunk);

      // Upload to Supabase
      const { error } = await supabase.from('gita_embeddings').upsert({
        verse_id: verse.id,
        embedding,
        chunk,
      }, {
        onConflict: 'verse_id',
      });

      if (error) {
        console.error(`✗ Error for verse ${verse.chapter}:${verse.verse}:`, error.message);
        errorCount++;
      } else {
        process.stdout.write(`✓ ${verse.chapter}:${verse.verse} `);
        successCount++;
      }

      // Rate limiting: wait 100ms between requests
      await delay(100);

    } catch (error: any) {
      console.error(`\n✗ Error processing verse ${verse.chapter}:${verse.verse}:`, error.message);
      errorCount++;
      
      // If rate limited, wait longer
      if (error.message.includes('rate limit')) {
        console.log('Rate limited. Waiting 60 seconds...');
        await delay(60000);
      }
    }
  }

  console.log(`\n\nIngestion complete!`);
  console.log(`Success: ${successCount}`);
  console.log(`Errors: ${errorCount}`);
  console.log(`Total: ${dbVerses.length}`);
}

// Run the script
ingestVerses().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});

