import React, { useCallback } from "react"; 
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
//import { useNavigation } from '@react-navigation/native';


import Colors from "../constants/Colors";
import * as hydrantActions from '../store/actions/hydrants';
import * as messageActions from '../store/actions/message';
import { addMethod } from "../models/AddMethod";

const AddingHydrantMethodDialog = props => {
    const dispatch = useDispatch();
    const userPosition = useSelector(state => state.user.userPosition);
    //const navigation = useNavigation();

    const addHydrantPositionHandler = useCallback(async () => {
        if (!userPosition) {
            dispatch(messageActions.setMessage("Location not setted"));
        }
        try {
            await dispatch(hydrantActions.addHydrantPosition(userPosition));
        } catch (err) {
             throw err 
        }
    }, [dispatch, userPosition]);

    return (
            <View style={styles.dim}>
                <View style={styles.container}>
                    <Text style={styles.header}>Jak chcesz dodać hydrant?</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            addHydrantPositionHandler() //this logic should not be there
                            props.navigate(addMethod.LOCATION_ONLY) 
                            }}>
                        {/* onPress={() => {props.navigate(addMethod.WITH_IMAGE)}}> */}
                            <Ionicons name="md-locate" style={styles.iconStyle} size={24} color={Colors.iosBlue}/>
                        <Text
                            style={{
                                ...styles.buttonText,
                                color: Colors.iosBlue
                            }}
                        >Tylko lokalizacja</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {props.navigate(addMethod.WITH_IMAGE)} }>
                        <Ionicons name="md-camera" style={styles.iconStyle} size={24} color={Colors.iosBlue}/>
                        <Text
                            style={{
                                ...styles.buttonText,
                                color: Colors.iosBlue
                            }}
                        >Ze zdjęciem</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={ styles.button }
                        onPress={() => { }}>
                        <Ionicons name="md-images" style={styles.iconStyle} size={24} color={Colors.iosBlue}/>
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