# KRSNA App

A mobile application for reading and studying the Bhagavad Gita with AI-powered spiritual guidance.

## Features

- 📖 **Read the Bhagavad Gita** - All 18 chapters with English translations
- 🔊 **Text-to-Speech** - Listen to verses with adjustable voice settings
- 💬 **AI Chat** - Get spiritual guidance grounded in Gita wisdom using RAG
- 🔖 **Bookmarks & Notes** - Save your favorite verses and add personal notes
- 🔍 **Search** - Find verses by keywords or phrases
- 📱 **Offline-First** - Core content available without internet

## Tech Stack

### Mobile App (Expo/React Native)
- **Expo** - React Native framework
- **Expo Router** - File-based navigation
- **TypeScript** - Type safety
- **Zustand** - State management
- **TanStack Query** - Data fetching and caching
- **expo-speech** - Device text-to-speech
- **expo-av** - Audio management

### Backend
- **Supabase** - Database, authentication, and storage
  - PostgreSQL with pgvector for embeddings
  - Row Level Security (RLS)
- **Vercel** - Serverless API hosting
- **Groq** - LLM inference (Llama 3.1)
- **OpenAI** - Text embeddings (text-embedding-3-small)

## Project Structure

```
krsna-app/
├── app/                          # Expo Router screens
│   ├── (tabs)/                   # Tab navigation
│   │   ├── read.tsx              # Chapters list
│   │   ├── chat.tsx              # AI chat interface
│   │   ├── library.tsx           # Bookmarks & history
│   │   └── settings.tsx          # App settings
│   ├── chapter/[id].tsx          # Chapter detail (verses list)
│   └── verse/[chapter]/[verse].tsx # Verse detail with TTS
├── src/
│   ├── components/               # Reusable UI components
│   ├── lib/                      # Utilities and services
│   │   ├── supabase.ts           # Supabase client
│   │   ├── tts.ts                # Text-to-speech service
│   │   └── gitaData.ts           # Local data loader
│   ├── state/                    # Zustand stores
│   │   ├── authStore.ts          # Authentication state
│   │   └── settingsStore.ts     # App settings
│   └── types/                    # TypeScript types
├── assets/gita/                  # Gita content
│   └── en.json                   # English translation
├── api/                          # Vercel serverless functions
│   └── chat/route.ts             # RAG chat endpoint
├── scripts/                      # Utility scripts
│   └── ingest/embeddings.ts      # Generate and upload embeddings
├── supabase/                     # Database schema
│   └── schema.sql                # Database tables and functions
└── constants/                    # App constants
    └── Theme.ts                  # Design tokens
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (macOS) or Android Studio
- Supabase account
- OpenAI API key (for embeddings)
- Groq API key (for LLM)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd krsna-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file (copy from `env.example.txt`):
   ```bash
   EXPO_PUBLIC_SUPABASE_URL=your-supabase-url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   EXPO_PUBLIC_API_URL=your-vercel-api-url
   ```

4. **Set up Supabase**
   
   - Create a new Supabase project
   - Run the SQL in `supabase/schema.sql` in the SQL Editor
   - Enable anonymous auth in Authentication settings

5. **Ingest Gita data and embeddings**
   
   Set environment variables for the script:
   ```bash
   export SUPABASE_URL=your-supabase-url
   export SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   export OPENAI_API_KEY=your-openai-api-key
   ```
   
   Run the ingestion script:
   ```bash
   npx ts-node scripts/ingest/embeddings.ts
   ```

6. **Deploy Vercel API**
   
   - Install Vercel CLI: `npm i -g vercel`
   - Deploy: `vercel --prod`
   - Set environment variables in Vercel dashboard:
     - `SUPABASE_URL`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `GROQ_API_KEY`
     - `OPENAI_API_KEY`

7. **Start the app**
   ```bash
   npm start
   ```

## Development

- **iOS**: Press `i` in the terminal or run `npm run ios`
- **Android**: Press `a` in the terminal or run `npm run android`
- **Web**: Press `w` in the terminal or run `npm run web`

## Content Attribution

The Bhagavad Gita translation used in this app is:

- **Translator**: Sir Edwin Arnold
- **Title**: The Song Celestial
- **Year**: 1885
- **Source**: Project Gutenberg (https://www.gutenberg.org/ebooks/2388)
- **License**: Public Domain

## Contributing

Contributions are welcome! Please read the contributing guidelines before submitting PRs.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Sir Edwin Arnold for the beautiful poetic translation
- Project Gutenberg for preserving public domain literature
- The open-source community for the amazing tools and libraries

