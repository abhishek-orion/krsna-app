# KRSNA App - Quick Start Guide

## ✅ What's Implemented

The core MVP structure is now complete and ready for development:

### ✅ Core Infrastructure
- Expo project with TypeScript
- Expo Router for file-based navigation
- All required dependencies installed
- Proper project structure

### ✅ Type System
- Complete TypeScript interfaces (GitaVerse, GitaChapter, ChatMessage, etc.)
- Type-safe state management
- No TypeScript compilation errors

### ✅ UI Components
- GradientBackground component with saffron/purple theme
- All 4 main tab screens (Read, Chat, Library, Settings)
- Chapter detail screen  
- Verse detail screen with TTS controls
- Responsive layouts with Theme constants

### ✅ Core Services
- Supabase client configuration
- TTS service with expo-speech
- State management with Zustand (settings, auth)
- Data loader for Gita content

### ✅ Data Structure
- JSON structure for Gita content
- All 18 chapter metadata
- Sample verses (need full population)

### ✅ Backend Ready
- Supabase schema (schema.sql)
- Vercel API route for RAG chat
- Embeddings ingestion script

## 🚀 Next Steps

###  1. Run the App

```bash
cd /Users/abhishek/Code/KRSNA/krsna-app
npm start
```

Then press:
- `i` for iOS simulator
- `a` for Android emulator
- `w` for web

### 2. Populate Full Gita Content

The `gita-translation-eng.txt` file in the parent directory contains the full text. You need to:

1. Parse the file to extract all 700 verses
2. Update `assets/gita/en.json` with complete data
3. Add Sanskrit shlokas and transliterations

### 3. Set Up Backend

#### Supabase Setup:
1. Create project at supabase.com
2. Run `supabase/schema.sql` in SQL Editor
3. Enable anonymous authentication
4. Copy project URL and anon key

#### Environment Variables:
Create `.env` file:
```
EXPO_PUBLIC_SUPABASE_URL=your-url-here
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-key-here
EXPO_PUBLIC_API_URL=your-vercel-url-here
```

### 4. Deploy API & Ingest Data

```bash
# Deploy to Vercel
vercel --prod

# Set environment variables in Vercel:
# - SUPABASE_URL
# - SUPABASE_SERVICE_ROLE_KEY
# - GROQ_API_KEY
# - OPENAI_API_KEY

# Run embeddings script
export SUPABASE_URL=...
export SUPABASE_SERVICE_ROLE_KEY=...
export OPENAI_API_KEY=...
npx ts-node scripts/ingest/embeddings.ts
```

### 5. Implement Features

Priority features to implement:
- [ ] Bookmarking functionality
- [ ] Chat integration with API
- [ ] Search improvements
- [ ] Reading history
- [ ] Offline caching

## 📁 Key Files

- `app/` - All screens and navigation
- `src/lib/` - Core services (Supabase, TTS, data)
- `src/state/` - Zustand stores
- `src/types/` - TypeScript interfaces
- `constants/Theme.ts` - Design system
- `assets/gita/en.json` - Gita content
- `supabase/schema.sql` - Database schema
- `api/chat/route.ts` - RAG endpoint

## 🎨 Design System

The app uses a Hindu-themed color palette:

- **Primary**: Saffron/Orange (`#FFC107`)
- **Secondary**: Deep Purple (`#4A148C`)
- **Accent**: Gold (`#FFD700`)
- **Background**: Gradient (dark blue to purple)

All colors, typography, spacing defined in `constants/Theme.ts`

## 🧪 Testing

```bash
# Type check
npx tsc --noEmit

# Run on device
npm run ios     # iOS
npm run android # Android
npm run web     # Web
```

## 📚 Tech Stack

- **Frontend**: Expo (React Native)
- **Navigation**: Expo Router
- **State**: Zustand + TanStack Query  
- **Backend**: Supabase (Postgres + pgvector)
- **API**: Vercel Edge Functions
- **LLM**: Groq (Llama 3.1)
- **Embeddings**: OpenAI text-embedding-3-small
- **TTS**: expo-speech (device TTS)

## 🔗 Resources

- **Plan**: `/Users/abhishek/Code/KRSNA/k.plan.md`
- **Status**: `IMPLEMENTATION_STATUS.md`
- **README**: `README.md`
- **Gita Text**: `/Users/abhishek/Code/KRSNA/gita-translation-eng.txt`

## ⚠️ Important Notes

1. The app currently has only 2 sample verses - you need to populate all 700
2. Environment variables are not set - create `.env` file
3. Supabase is not connected - set up project first
4. API is not deployed - deploy to Vercel
5. Chat will return placeholder responses until API is connected

## 💡 Tips

- Use `expo start --clear` to clear cache if you encounter issues
- The app is offline-first - all verses load from local JSON
- TTS requires physical device or simulator with audio support
- Search works on the local data
- Authentication is optional for MVP (anonymous mode works)

## 🐛 Troubleshooting

If you encounter issues:

1. Clear cache: `npx expo start --clear`
2. Reinstall deps: `rm -rf node_modules && npm install`
3. Reset iOS simulator: `xcrun simctl erase all`
4. Check TypeScript: `npx tsc --noEmit`

## ✨ What's Working Now

You can immediately:
- ✅ Browse 18 chapters
- ✅ View 2 sample verses (1.1 and 2.47)
- ✅ Use TTS to listen to verses
- ✅ Adjust TTS speed and pitch
- ✅ Navigate between screens
- ✅ Search verses (on available data)
- ✅ View beautiful UI with theme

**The app is ready to run!** Just execute `npm start` and start testing.

