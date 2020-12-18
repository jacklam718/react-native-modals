import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ModalPortal } from 'react-native-modals';
import DemoScreen from './DemoScreen';
import EmptyScreen from './EmptyScreen';

const Stack = createStackNavigator();
const Navigator = () => (
  <React.Fragment>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Demo" component={DemoScreen} />
        <Stack.Screen name="Empty" component={EmptyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    <ModalPortal />
  </React.Fragment>
);

export default Navigator;
