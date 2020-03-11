import React from "react";
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import Colors from "../constants/Colors";

const Button = props => {
    return (
        <TouchableOpacity style={{...styles.container, ...props.buttonStyle}}><Text style={{...styles.text, ...props.textStyle}}>{props.title}</Text></TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "50%",
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: 'rgba(255,255,255,0.85)'
    },
    text: {
        color: Colors.iosBlue,
        fontSize: 18
    }
});

export default Button;