import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.apiUrl || process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export interface ChatRequest {
  sessionId: string;
  message: string;
  userId?: string;
}

export interface ChatResponse {
  answer: string;
  citations: Array<{ chapter: number; verse: number }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export const sendChatMessage = async (request: ChatRequest): Promise<ChatResponse> => {
  try {
    const response = await fetch(`${API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send message');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Chat API Error:', error);
    throw error;
  }
};

export const searchVerses = async (query: string): Promise<any[]> => {
  try {
    const response = await fetch(`${API_URL}/api/search?q=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to search verses');
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Search API Error:', error);
    throw error;
  }
};

