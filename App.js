import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import UserInfoComponent from './user-info-component/UserInfoComponent';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync(); // Prevent the splash screen from auto-hiding

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadResources = async () => {
      try {
        // Simulate a delay to mimic resource loading
        await new Promise(resolve => setTimeout(resolve, 4000)); 
      } catch (e) {
        console.warn(e);
      } finally {
        setIsLoading(false);
        SplashScreen.hideAsync(); // Hide the splash screen once loading is complete
      }
    };

    loadResources();
  }, []);

  return (
    <View style={styles.container}>
      {!isLoading && <UserInfoComponent />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
