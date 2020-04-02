import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from "../constants/Colors";
import { addMethod } from "../models/AddMethod";

const AddingHydrantMethodDialog = props => {
    return (
        <View style={styles.dim}>
            <View style={styles.container}>
                <Text style={styles.header}>Jak chcesz dodać hydrant?</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        props.navigate(addMethod.LOCATION_ONLY)
                    }}>
                    <Ionicons name="md-locate" style={styles.iconStyle} size={24} color={Colors.iosBlue} />
                    <Text
                        style={{
                            ...styles.buttonText,
                            color: Colors.iosBlue
                        }}
                    >Tylko lokalizacja</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { props.navigate(addMethod.WITH_IMAGE) }}>
                    <Ionicons name="md-camera" style={styles.iconStyle} size={24} color={Colors.iosBlue} />
                    <Text
                        style={{
                            ...styles.buttonText,
                            color: Colors.iosBlue
                        }}
                    >Ze zdjęciem</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { }}>
                    <Ionicons name="md-images" style={styles.iconStyle} size={24} color={Colors.iosBlue} />
                    <Text
                        style={{
                            ...styles.buttonText,
                            color: Colors.iosBlue
                        }}
                    >Zdjęcie EXIF</Text>
                </TouchableOpacity>
            </View></View>
    );

}

const styles = StyleSheet.create({
    dim: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        display: "flex",
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "rgba(0,0,0, 0.75)"
    },
    container: {

        display: 'flex',
        justifyContent: "space-around",
        alignItems: "center",
        height: 200,
        width: 300,
        bottom: 100,
        borderRadius: 12,
        padding: 8,
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        elevation: 6
    },
    header: {
        fontSize: 20,
        fontWeight: "700",
        color: "rgba(0,0,0,1)",
        paddingBottom: 8,
        borderBottomColor: "#BABABA",
        borderBottomWidth: 1
    },
    button: {
        width: '100%',
        height: 36,
        backgroundColor: "transparent",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        fontSize: 18,
        color: "#ffffff"
    },
    iconStyle: {
        marginRight: 8
    }
})
export default AddingHydrantMethodDialog;