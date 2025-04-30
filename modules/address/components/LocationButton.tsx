import React from 'react';
import { StyleSheet, TouchableOpacity, Platform, View } from 'react-native';
import { Navigation } from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';

interface LocationButtonProps {
  onPress: () => void;
  isLoading?: boolean;
}

const LocationButton: React.FC<LocationButtonProps> = ({ onPress, isLoading = false }) => {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const handlePress = () => {
    scale.value = withSequence(
      withTiming(0.9, { duration: 100, easing: Easing.ease }),
      withTiming(1, { duration: 100, easing: Easing.ease })
    );

    onPress();
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handlePress}
      style={styles.buttonContainer}
      disabled={isLoading}>
      <View style={styles.buttonBackground}>
        <Animated.View style={[styles.iconContainer, animatedStyle]}>
          <Navigation size={22} color="#FFFFFF" />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    zIndex: 10,
  },
  buttonBackground: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0A84FF',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  iconContainer: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LocationButton;
