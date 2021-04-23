import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PasswordMgnProject from "./PasswordMgnProject";
import PasswordList from "./PasswordList";
import PasswordMgnForm from "./PasswordMgnForm";
import PasswordReadForm from "./PasswordReadForm";
import AppWebView from "./AppWebView";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}} >
        <Stack.Screen name="Home" component={PasswordMgnProject} />
        <Stack.Screen name="PasswordListMenu" component={PasswordList} />
        <Stack.Screen name="PasswordMgnForm" component={PasswordMgnForm} />
        <Stack.Screen name="PasswordReadForm" component={PasswordReadForm} />
        <Stack.Screen name="AppWebView" component={AppWebView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;