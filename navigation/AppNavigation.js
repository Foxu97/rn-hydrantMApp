import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MapScreen from '../screens/MapScreen';
import Colors from '../constants/Colors';

import AskForHydrantImage from '../components/AskForHydrantImageModal'

const defaultNavigationOptions = {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
}

const AppNavigator = createStackNavigator({
    Map: MapScreen,
    Ask: AskForHydrantImage
}, defaultNavigationOptions);

export default createAppContainer(AppNavigator);