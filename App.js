import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PasswordMgnProject from "./PasswordMgnProject";
import PasswordList from "./PasswordList";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={PasswordMgnProject} />
        <Stack.Screen name="PasswordListMenu" component={PasswordList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;