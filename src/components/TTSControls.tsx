import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ttsManager } from '../lib/tts';

interface TTSControlsProps {
  text: string;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

export const TTSControls: React.FC<TTSControlsProps> = ({ text, onPlayStateChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      const status = ttsManager.getSpeakingStatus();
      setIsPlaying(status.isSpeaking);
      setIsPaused(status.isPaused);
    };

    const interval = setInterval(checkStatus, 500);
    return () => clearInterval(interval);
  }, []);

  const handlePlay = async () => {
    await ttsManager.speak(text);
    setIsPlaying(true);
    setIsPaused(false);
    onPlayStateChange?.(true);
  };

  const handlePause = () => {
    if (isPaused) {
      ttsManager.resume();
      setIsPaused(false);
    } else {
      ttsManager.pause();
      setIsPaused(true);
    }
  };

  const handleStop = () => {
    ttsManager.stop();
    setIsPlaying(false);
    setIsPaused(false);
    onPlayStateChange?.(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.playButton]}
        onPress={isPlaying ? handlePause : handlePlay}
      >
        <Text style={styles.buttonText}>
          {isPlaying ? (isPaused ? '▶️ Resume' : '⏸️ Pause') : '▶️ Play'}
        </Text>
      </TouchableOpacity>
      {isPlaying && (
        <TouchableOpacity style={[styles.button, styles.stopButton]} onPress={handleStop}>
          <Text style={styles.buttonText}>⏹️ Stop</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginVertical: 8,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  playButton: {
    backgroundColor: '#FF6B35',
  },
  stopButton: {
    backgroundColor: '#DC3545',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

