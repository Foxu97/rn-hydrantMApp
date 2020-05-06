import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';


import MapScreen from '../screens/MapScreen';
import WithImageScreen from '../screens/WithImageScreen';
import HydrantCallout from '../screens/HydrantCallout';
import ExifUploaderScreen from '../screens/ExifUploaderScreen';
import AppSettings from '../screens/AppSettings';
import ImageBrowser from '../screens/ImageBrowser';
import Colors from '../constants/Colors';

const defaultNavigationOptions = {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
}



const settingsNav = createStackNavigator({
    Settings: AppSettings
}, defaultNavigationOptions)

const AppNavigator = createStackNavigator({
    Map: MapScreen,
    WithImageScreen: WithImageScreen,
    HydrantHighlightsModal: HydrantCallout,
    ExifUploader: ExifUploaderScreen,
    ImageBrowser: ImageBrowser

}, defaultNavigationOptions);

const drawerNav = createDrawerNavigator({
    Main: AppNavigator,
    Settings: settingsNav
})


export default createAppContainer(drawerNav);