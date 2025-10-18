-- KRSNA App - Supabase Database Schema

-- Enable pgvector extension for embeddings
create extension if not exists vector;

-- Gita Verses Table
create table if not exists public.gita_verses (
  id bigserial primary key,
  chapter int not null,
  verse int not null,
  sloka_sanskrit text,
  translation_en text not null,
  transliteration text,
  translator text,
  source_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(chapter, verse)
);

-- Add indexes for performance
create index if not exists idx_gita_verses_chapter on public.gita_verses(chapter);
create index if not exists idx_gita_verses_chapter_verse on public.gita_verses(chapter, verse);

-- Gita Embeddings Table (for RAG)
create table if not exists public.gita_embeddings (
  id bigserial primary key,
  verse_id bigint references public.gita_verses(id) on delete cascade,
  embedding vector(1536) not null,
  chunk text not null,
  created_at timestamptz default now()
);

-- Create IVFFlat index for fast similarity search
create index if not exists idx_gita_embeddings_embedding 
  on public.gita_embeddings 
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- User Profiles Table
create table if not exists public.user_profiles (
  id uuid references auth.users(id) primary key,
  display_name text,
  photo_url text,
  premium boolean default false,
  role text default 'user' check (role in ('user', 'admin')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Bookmarks Table
create table if not exists public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  chapter int not null,
  verse int not null,
  note text,
  created_at timestamptz default now(),
  unique(user_id, chapter, verse)
);

create index if not exists idx_bookmarks_user_id on public.bookmarks(user_id);

-- Chat Sessions Table
create table if not exists public.chat_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_chat_sessions_user_id on public.chat_sessions(user_id);

-- Chat Messages Table
create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references public.chat_sessions(id) on delete cascade not null,
  text text not null,
  sender text not null check (sender in ('user', 'ai')),
  citations jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);

create index if not exists idx_chat_messages_session_id on public.chat_messages(session_id);

-- Reading History Table
create table if not exists public.reading_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  chapter int not null,
  verse int not null,
  read_at timestamptz default now()
);

create index if not exists idx_reading_history_user_id on public.reading_history(user_id);
create index if not exists idx_reading_history_read_at on public.reading_history(read_at desc);

-- Row Level Security (RLS) Policies

-- Enable RLS
alter table public.user_profiles enable row level security;
alter table public.bookmarks enable row level security;
alter table public.chat_sessions enable row level security;
alter table public.chat_messages enable row level security;
alter table public.reading_history enable row level security;

-- User Profiles: Users can read all profiles but only update their own
create policy "Users can view all profiles"
  on public.user_profiles for select
  using (true);

create policy "Users can update own profile"
  on public.user_profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.user_profiles for insert
  with check (auth.uid() = id);

-- Bookmarks: Users can only access their own bookmarks
create policy "Users can view own bookmarks"
  on public.bookmarks for select
  using (auth.uid() = user_id);

create policy "Users can create own bookmarks"
  on public.bookmarks for insert
  with check (auth.uid() = user_id);

create policy "Users can update own bookmarks"
  on public.bookmarks for update
  using (auth.uid() = user_id);

create policy "Users can delete own bookmarks"
  on public.bookmarks for delete
  using (auth.uid() = user_id);

-- Chat Sessions: Users can only access their own sessions
create policy "Users can view own chat sessions"
  on public.chat_sessions for select
  using (auth.uid() = user_id);

create policy "Users can create own chat sessions"
  on public.chat_sessions for insert
  with check (auth.uid() = user_id);

create policy "Users can update own chat sessions"
  on public.chat_sessions for update
  using (auth.uid() = user_id);

create policy "Users can delete own chat sessions"
  on public.chat_sessions for delete
  using (auth.uid() = user_id);

-- Chat Messages: Users can only access messages from their sessions
create policy "Users can view own chat messages"
  on public.chat_messages for select
  using (
    exists (
      select 1 from public.chat_sessions
      where chat_sessions.id = chat_messages.session_id
      and chat_sessions.user_id = auth.uid()
    )
  );

create policy "Users can create messages in own sessions"
  on public.chat_messages for insert
  with check (
    exists (
      select 1 from public.chat_sessions
      where chat_sessions.id = chat_messages.session_id
      and chat_sessions.user_id = auth.uid()
    )
  );

-- Reading History: Users can only access their own history
create policy "Users can view own reading history"
  on public.reading_history for select
  using (auth.uid() = user_id);

create policy "Users can create own reading history"
  on public.reading_history for insert
  with check (auth.uid() = user_id);

-- Function for vector similarity search
create or replace function search_verses(
  query_embedding vector(1536),
  match_limit int default 5
)
returns table (
  verse_id bigint,
  chapter int,
  verse int,
  sloka_sanskrit text,
  translation_en text,
  transliteration text,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    gv.id as verse_id,
    gv.chapter,
    gv.verse,
    gv.sloka_sanskrit,
    gv.translation_en,
    gv.transliteration,
    1 - (ge.embedding <=> query_embedding) as similarity
  from gita_embeddings ge
  inner join gita_verses gv on gv.id = ge.verse_id
  order by ge.embedding <=> query_embedding
  limit match_limit;
end;
$$;

-- Function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Triggers for updated_at
create trigger update_gita_verses_updated_at
  before update on public.gita_verses
  for each row
  execute function update_updated_at_column();

create trigger update_user_profiles_updated_at
  before update on public.user_profiles
  for each row
  execute function update_updated_at_column();

create trigger update_chat_sessions_updated_at
  before update on public.chat_sessions
  for each row
  execute function update_updated_at_column();

-- Grant public read access to verses (no auth required)
grant select on public.gita_verses to anon, authenticated;
grant select on public.gita_embeddings to anon, authenticated;

