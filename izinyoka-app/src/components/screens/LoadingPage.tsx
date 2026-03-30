import React, { useEffect, useRef } from 'react';
import { Text, Animated, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import ThemedView from '../themes/ThemedView';
import { cssInterop } from 'nativewind';

cssInterop(Image, { className: 'style' });

const LoadingPage = () => {
  const pulseAnim = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1, 
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.6,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    );
    pulseLoop.start();
    return () => {
      pulseLoop.stop();
    };
  }, [pulseAnim]);

  return (
    <ThemedView style={styles.container}>
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
          className='rounded-2xl'
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
  },
  logo: {
    width: 150,
    height: 150,
  },
});

export default LoadingPage;