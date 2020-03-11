import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

const CircleButton = props => {
    return (
        <TouchableOpacity 
            style={{ ...styles.container, ...props.styles}}
            onPress={props.onPressButton}>
        <Ionicons name={props.icon} size={36} color="white" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        bottom: 8,
        right: 8,
        height: 64,
        width: 64,
        borderRadius: 32,
        backgroundColor: Colors.primary
    }
})

export default CircleButton;