import React from "react";
import { View, Button, TouchableHighlight, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import Colors from "../constants/Colors";
const AddingHydrantMethodDialog = props => {

    return (
        props.visible ?
            <View style={styles.dim}>
                <View style={styles.container}>
                    <Text style={styles.header}>Jak chcesz dodać hydrant?</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => { }}>
                        <Text
                            style={{
                                ...styles.buttonText,
                                color: Colors.iosBlue
                            }}
                        >Tylko lokalizacja</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => { }}>
                        <Text
                            style={{
                                ...styles.buttonText,
                                color: Colors.iosBlue
                            }}
                        >Zrób zdjecie</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={ styles.button}
                        onPress={() => { }}>
                        <Text
                            style={{
                                ...styles.buttonText,
                                color: Colors.iosBlue
                            }}
                        >Zdjęcie GPS</Text>
                    </TouchableOpacity>
                </View></View> : null
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
        backgroundColor: "rgba(255, 255, 255, 0.85)"

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
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        fontSize: 18,
        color: "#ffffff"
    }
})
export default AddingHydrantMethodDialog;