import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl || process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

// Custom storage implementation using SecureStore
const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    return SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    return SecureStore.deleteItemAsync(key);
  },
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Auth helper functions
export const signInAnonymously = async () => {
  const { data, error } = await supabase.auth.signInAnonymously();
  return { data, error };
};

export const signInWithEmail = async (email: string) => {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
    },
  });
  return { data, error };
};

export const verifyOtp = async (email: string, token: string) => {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'email',
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

// Database helper functions
export const fetchVerses = async (chapter?: number) => {
  let query = supabase
    .from('gita_verses')
    .select('*')
    .order('chapter', { ascending: true })
    .order('verse', { ascending: true });

  if (chapter) {
    query = query.eq('chapter', chapter);
  }

  const { data, error } = await query;
  return { data, error };
};

export const fetchVerse = async (chapter: number, verse: number) => {
  const { data, error } = await supabase
    .from('gita_verses')
    .select('*')
    .eq('chapter', chapter)
    .eq('verse', verse)
    .single();

  return { data, error };
};

export const fetchBookmarks = async (userId: string) => {
  const { data, error } = await supabase
    .from('bookmarks')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  return { data, error };
};

export const addBookmark = async (userId: string, chapter: number, verse: number, note?: string) => {
  const { data, error } = await supabase
    .from('bookmarks')
    .insert([
      { user_id: userId, chapter, verse, note }
    ])
    .select()
    .single();

  return { data, error };
};

export const removeBookmark = async (bookmarkId: string) => {
  const { error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('id', bookmarkId);

  return { error };
};

export const saveChatSession = async (userId: string, sessionData: any) => {
  const { data, error } = await supabase
    .from('chat_sessions')
    .upsert(sessionData)
    .select()
    .single();

  return { data, error };
};

export const fetchChatSessions = async (userId: string) => {
  const { data, error } = await supabase
    .from('chat_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });

  return { data, error };
};
