import React from 'react';
import Home from './src/screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StoreLocation from './src/screens/StoreLocation';
import HeaderComponent from './src/components/HeaderComponent';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <HeaderComponent />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="StoreLocation"
          component={StoreLocation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
