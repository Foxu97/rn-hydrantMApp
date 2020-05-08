import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import Colors from "../constants/Colors";
import { Ionicons } from '@expo/vector-icons';

const Button = props => {
    return (
        <TouchableOpacity
            style={{ ...styles.container, ...props.buttonStyle }}
            onPress={props.onButtonPress}
        >
            {props.iconName ?
                <Ionicons
                    name={props.iconName}
                    style={{ ...styles.iconStyle, ...props.iconStyle }}
                    size={props.iconSize || 24}
                    color={Colors.iosBlue} /> : null}
            <Text
                style={{ ...styles.text, ...props.textStyle }}>
                {props.title}
            </Text>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(255,255,255,0.85)',
        borderTopColor: "#BABABA",
        borderTopWidth: 1
    },
    iconStyle: {
        marginRight: 8
    },
    text: {
        color: Colors.iosBlue,
        fontSize: 18
    }
});

export default Button;