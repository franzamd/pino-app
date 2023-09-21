/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Index from './src/layout/Index.jsx';

import AuthState from './src/context/auth/AuthState';
import ProfileState from './src/context/profile/ProfileState';
import BookingState from './src/context/bookigs/BookingState';

function App() {
  useEffect(() => {
    LogBox.ignoreLogs([
      'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
    ]);
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NativeBaseProvider>
        <BookingState>
          <ProfileState>
            <AuthState>
              <Index />
            </AuthState>
          </ProfileState>
        </BookingState>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}

export default App;
