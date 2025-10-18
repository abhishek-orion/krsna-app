import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { GitaVerse } from '../types';
import { useRouter } from 'expo-router';

interface VerseCardProps {
  verse: GitaVerse;
  onPress?: () => void;
}

export const VerseCard: React.FC<VerseCardProps> = ({ verse, onPress }) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/verse/${verse.chapter}/${verse.verse}`);
    }
  };

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <View style={styles.header}>
        <Text style={styles.reference}>
          {verse.chapter}.{verse.verse}
        </Text>
      </View>
      {verse.sloka_sanskrit && (
        <Text style={styles.sanskrit} numberOfLines={2}>
          {verse.sloka_sanskrit}
        </Text>
      )}
      <Text style={styles.translation} numberOfLines={3}>
        {verse.translation_en}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reference: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF6B35',
  },
  sanskrit: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  translation: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
});

