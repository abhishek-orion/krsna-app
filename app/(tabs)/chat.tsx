import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Text, View } from 'react-native';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { GradientBackground } from '../../src/components/GradientBackground';
import { Theme } from '../../constants/Theme';
import { ChatMessage, VerseRef } from '../../src/types';
import { useAuthStore } from '../../src/state/authStore';

interface MessageBubbleProps {
  message: ChatMessage;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.aiBubble]}>
      <Text style={[styles.messageText, isUser && styles.userMessageText]}>
        {message.text}
      </Text>
      {message.citations && message.citations.length > 0 && (
        <View style={styles.citationsContainer}>
          <Text style={styles.citationsLabel}>Referenced verses:</Text>
          <View style={styles.citationChips}>
            {message.citations.map((citation: VerseRef, index: number) => (
              <Link 
                key={index}
                href={`/verse/${citation.chapter}/${citation.verse}`}
                asChild
              >
                <TouchableOpacity style={styles.citationChip}>
                  <FontAwesome name="book" size={12} color={Theme.colors.purple[800]} />
                  <Text style={styles.citationText}>
                    {citation.chapter}:{citation.verse}
                  </Text>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default function ChatScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const { isAuthenticated } = useAuthStore();
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Namaste! I am here to guide you with the wisdom of the Bhagavad Gita and the teachings of Lord Krishna. How may I assist you today?',
      sender: 'ai',
      timestamp: Date.now(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // TODO: Call RAG API
      // For now, just send a placeholder response
      setTimeout(() => {
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: 'This is a placeholder response. The RAG API will be implemented to provide wisdom from the Bhagavad Gita.',
          sender: 'ai',
          timestamp: Date.now(),
          citations: [{ chapter: 2, verse: 47 }],
        };
        setMessages((prev) => [...prev, aiMessage]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Chat error:', error);
      setIsLoading(false);
    }
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.avatarContainer}>
              <FontAwesome name="user-circle" size={40} color={Theme.colors.saffron[500]} />
            </View>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>Krishna AI</Text>
              <Text style={styles.headerSubtitle}>Guiding with Divine Wisdom</Text>
            </View>
          </View>

          {/* Messages */}
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
          >
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isLoading && (
              <View style={styles.loadingContainer}>
                <View style={styles.loadingDot} />
                <View style={styles.loadingDot} />
                <View style={styles.loadingDot} />
              </View>
            )}
          </ScrollView>

          {/* Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Ask Krishna..."
              placeholderTextColor={Theme.colors.purple[300]}
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
              onPress={handleSend}
              disabled={!inputText.trim() || isLoading}
              activeOpacity={0.7}
            >
              <FontAwesome 
                name="send" 
                size={20} 
                color={inputText.trim() ? Theme.colors.white : Theme.colors.purple[400]} 
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  avatarContainer: {
    marginRight: Theme.spacing.md,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: Theme.typography.sizes.xl,
    fontWeight: Theme.typography.weights.bold,
    color: Theme.colors.white,
  },
  headerSubtitle: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.gold[300],
    marginTop: Theme.spacing.xs / 2,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.lg,
    paddingBottom: 85, // Extra padding for sticky tab bar
  },
  messageBubble: {
    maxWidth: '80%',
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.xl,
    marginBottom: Theme.spacing.md,
    ...Theme.shadows.sm,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: Theme.colors.gold[500],
    borderBottomRightRadius: Theme.borderRadius.xs,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: Theme.colors.purple[800],
    borderWidth: 1,
    borderColor: Theme.colors.purple[700],
    borderBottomLeftRadius: Theme.borderRadius.xs,
  },
  messageText: {
    fontSize: Theme.typography.sizes.base,
    lineHeight: Theme.typography.lineHeights.base,
    color: Theme.colors.white,
  },
  userMessageText: {
    color: Theme.colors.white,
  },
  citationsContainer: {
    marginTop: Theme.spacing.sm,
    paddingTop: Theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  citationsLabel: {
    fontSize: Theme.typography.sizes.xs,
    color: Theme.colors.purple[200],
    marginBottom: Theme.spacing.xs,
    fontWeight: Theme.typography.weights.semibold,
  },
  citationChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  citationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.gold[400],
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs / 2,
    borderRadius: Theme.borderRadius.full,
    marginRight: Theme.spacing.xs,
    marginBottom: Theme.spacing.xs,
  },
  citationText: {
    fontSize: Theme.typography.sizes.xs,
    color: Theme.colors.purple[800],
    fontWeight: Theme.typography.weights.semibold,
    marginLeft: Theme.spacing.xs / 2,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: Theme.colors.purple[800],
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.xl,
    marginBottom: Theme.spacing.md,
    borderWidth: 1,
    borderColor: Theme.colors.purple[700],
  },
  loadingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Theme.colors.gold[400],
    marginHorizontal: Theme.spacing.xs / 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  input: {
    flex: 1,
    backgroundColor: Theme.colors.purple[800],
    borderRadius: Theme.borderRadius.xl,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    color: Theme.colors.white,
    fontSize: Theme.typography.sizes.base,
    maxHeight: 100,
    marginRight: Theme.spacing.sm,
    borderWidth: 1,
    borderColor: Theme.colors.purple[700],
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.gold[500],
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadows.md,
  },
  sendButtonDisabled: {
    backgroundColor: Theme.colors.purple[700],
    opacity: 0.5,
  },
});
