import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import Main from './src/main';

const App = () => {
  const [showMain, setShowMain] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowMain(true);
    }, 3000);
  }, []);
  return (
    <>
      {showMain ? (
        <Main />
      ) : (
        <SafeAreaView
          style={{
            justifyContent: 'center',
            flex: 1,
            alignItems: 'center',
            backgroundColor: 'green',
          }}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              color: 'yellow',
            }}>
            Leap club task
          </Text>
        </SafeAreaView>
      )}
    </>
  );
};

export default App;
