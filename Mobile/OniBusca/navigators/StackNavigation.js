import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Linhas from '../screens/Linhas';
import Home from '../screens/Home';
import Cadastro from '../screens/Cadastro';
import User from '../screens/User';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
      <Stack.Screen name="Linhas" component={Linhas} options={{ headerShown: false }} />
      <Stack.Screen name="User" component={User} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default StackNavigation;