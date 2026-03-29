import React, { useEffect, useRef } from 'react';
import { Text, Animated, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import ThemedView from '../themes/ThemedView';

const LoadingPage = () => {
  // 1. Create the animation value
  const pulseAnim = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    // 2. Set up a looping animation (Pulse effect)
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1, // Scale up and full opacity
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.6, // Scale down and fade
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  return (
    <ThemedView style={styles.container}>
      {/* 3. Wrap the Image in an Animated View to apply effects */}
      <Animated.View 
        style={{
          opacity: pulseAnim,
          transform: [{ scale: pulseAnim }],
        }}
      >
        <Image 
          source={require('@/assets/icons/elec-icon.png')}
          style={styles.logo}
          contentFit='contain'
        />
      </Animated.View>

      <Text className='text-orange-400 mt-5 font-medium tracking-widest uppercase text-xs'>
        Loading please wait
      </Text>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#ffffff',
  },
  logo: {
    width: 150,
    height: 150,
  },
});

export default LoadingPage;