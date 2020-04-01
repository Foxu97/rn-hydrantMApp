import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MapScreen from '../screens/MapScreen';
import WithImageScreen from '../screens/WithImageScreen';
import HydrantCallout from '../screens/HydrantCallout';
import Colors from '../constants/Colors';

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
    WithImageScreen: WithImageScreen,
    HydrantHighlightsModal: HydrantCallout

}, defaultNavigationOptions);


export default createAppContainer(AppNavigator);