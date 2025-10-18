import { createClient } from '@supabase/supabase-js';

// Initialize clients
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// OpenAI for embeddings
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
    throw new Error('Failed to create embedding');
  }

  const data = await response.json();
  return data.data[0].embedding;
}

// Groq for LLM
async function queryGroq(messages: any[]): Promise<string> {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.1-70b-versatile',
      messages,
      temperature: 0.7,
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to query Groq');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// System prompt for Krishna AI
const SYSTEM_PROMPT = `You are Krishna AI, a compassionate spiritual guide trained on the Bhagavad Gita and the teachings of Lord Krishna. Your role is to:

1. Provide guidance rooted in the Bhagavad Gita's wisdom
2. Offer practical, compassionate advice for modern life challenges
3. Always cite specific verses when making references (format: Chapter:Verse)
4. Maintain a warm, supportive, and encouraging tone
5. If unsure, ask clarifying questions rather than speculating
6. Keep answers concise but meaningful (2-4 paragraphs typically)
7. Focus on empowering the seeker to make their own wise decisions

When answering, ground your response in the provided context from the Gita verses. If the context doesn't contain relevant information, acknowledge this and provide general wisdom aligned with Krishna's teachings.`;

export default async function handler(req: Request) {
  // Only allow POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { sessionId, message } = await req.json();

    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ error: 'Invalid message' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 1. Create embedding for the user's query
    const queryEmbedding = await createEmbedding(message);

    // 2. Search for similar verses
    const { data: similarVerses, error: searchError } = await supabase.rpc(
      'search_verses',
      {
        query_embedding: queryEmbedding,
        match_limit: 5,
      }
    );

    if (searchError) {
      console.error('Search error:', searchError);
      throw new Error('Failed to search verses');
    }

    // 3. Build context from similar verses
    const context = similarVerses
      .map(
        (v: any) =>
          `[${v.chapter}:${v.verse}] ${v.translation_en}${
            v.sloka_sanskrit ? `\nSanskrit: ${v.sloka_sanskrit}` : ''
          }`
      )
      .join('\n\n');

    // 4. Prepare messages for LLM
    const llmMessages = [
      {
        role: 'system',
        content: SYSTEM_PROMPT,
      },
      {
        role: 'system',
        content: `Relevant verses from the Bhagavad Gita:\n\n${context}`,
      },
      {
        role: 'user',
        content: message,
      },
    ];

    // 5. Query Groq LLM
    const answer = await queryGroq(llmMessages);

    // 6. Extract citations from similar verses
    const citations = similarVerses.map((v: any) => ({
      chapter: v.chapter,
      verse: v.verse,
    }));

    // 7. Return response
    return new Response(
      JSON.stringify({
        answer,
        citations,
        usage: {
          verses_searched: similarVerses.length,
        },
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('API error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

// Vercel Edge Runtime config
export const config = {
  runtime: 'edge',
};

