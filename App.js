import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PasswordMgnProject from "./PasswordMgnProject";
import PasswordList from "./PasswordList";
import PasswordMgnForm from "./PasswordMgnForm";
import { Button } from 'native-base';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}} >
        <Stack.Screen name="Home" component={PasswordMgnProject} />
        <Stack.Screen name="PasswordListMenu" component={PasswordList} />
        <Stack.Screen name="PasswordMgnForm" component={PasswordMgnForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;