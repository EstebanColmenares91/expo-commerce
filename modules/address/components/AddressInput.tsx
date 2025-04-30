import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text,
  Keyboard,
} from 'react-native';
import { Search, X } from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';

interface AddressInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSelectAddress?: (address: string) => void;
  placeholder?: string;
}

const AddressInput: React.FC<AddressInputProps> = ({
  value,
  onChangeText,
  onSelectAddress,
  placeholder = 'Enter delivery address...',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const scale = useSharedValue(1);

  const mockSuggestions = [
    '123 Main St, San Francisco, CA',
    '456 Market St, San Francisco, CA',
    '789 Mission St, San Francisco, CA',
  ];

  const handleFocus = () => {
    setIsFocused(true);
    scale.value = withSequence(
      withTiming(1.02, { duration: 150, easing: Easing.ease }),
      withTiming(1, { duration: 150, easing: Easing.ease })
    );
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleTextChange = (text: string) => {
    onChangeText(text);

    if (text.length > 2) {
      const filtered = mockSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(text.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleClear = () => {
    onChangeText('');
    setSuggestions([]);
    Keyboard.dismiss();
  };

  const handleSelectSuggestion = (suggestion: string) => {
    onChangeText(suggestion);
    if (onSelectAddress) {
      onSelectAddress(suggestion);
    }
    setSuggestions([]);
    Keyboard.dismiss();
  };

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={[styles.container, isFocused && styles.focusedContainer, animatedContainerStyle]}>
        <View style={styles.iconContainer}>
          <Search size={20} color={isFocused ? '#0A84FF' : '#8E8E93'} strokeWidth={2} />
        </View>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={handleTextChange}
          placeholder={placeholder}
          placeholderTextColor="#8E8E93"
          onFocus={handleFocus}
          onBlur={handleBlur}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {value.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={handleClear} activeOpacity={0.7}>
            <X size={16} color="#8E8E93" />
          </TouchableOpacity>
        )}
      </Animated.View>

      {suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          {suggestions.map((suggestion, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.suggestionItem,
                index === suggestions.length - 1 && styles.lastSuggestion,
              ]}
              onPress={() => handleSelectSuggestion(suggestion)}>
              <Search size={16} color="#8E8E93" style={styles.suggestionIcon} />
              <Text style={styles.suggestionText}>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    zIndex: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  focusedContainer: {
    borderColor: '#0A84FF',
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  iconContainer: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    padding: 0,
  },
  clearButton: {
    padding: 4,
  },
  suggestionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
    marginBottom: 8,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  lastSuggestion: {
    borderBottomWidth: 0,
  },
  suggestionIcon: {
    marginRight: 12,
  },
  suggestionText: {
    fontSize: 15,
    color: '#000000',
  },
});

export default AddressInput;
