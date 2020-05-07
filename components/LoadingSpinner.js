import React from "react";
import { View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

import Colors from '../constants/Colors';

const LoadingSpinner = props => {
    const isLoading = useSelector(state => state.ui.isLoading);
    if (isLoading) return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={Colors.primary} />
        </View>
    );
    return null

}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        backgroundColor: 'rgba(255,255,255, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99
    }
});

export default LoadingSpinner;