import React, {useEffect} from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import UserNav from '@navigations/index';
import {store} from '@store/index';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#222' : '#F3F3F3',
    flex: 1,
  };
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={backgroundStyle}>
          <UserNav />
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}
export default App;
