import React, { useCallback, useEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { useSelector, useDispatch } from 'react-redux';

import Button from './Button';
import Colors from '../constants/Colors';

import * as userActions from '../store/actions/user';

const ImagePicker = props => {
    const address = useSelector(state => state.user.address);
    const userPosition = useSelector(state => state.user.userPosition);
    const dispatch = useDispatch();

    const loadAddress = useCallback(async (userPosition) => {
        try {
            await dispatch(userActions.fetchAddress(userPosition));
        } catch (err) {
            throw err;
        }
    }, [dispatch]);

    useEffect(() => {
        if (userPosition) {
            loadAddress(userPosition)
        }
    }, [userPosition])

   return(
       <View style={styles.container}>
           <View style={styles.addressContainer}><Text style={styles.addressText}>{address}</Text></View>
           <View style={styles.imagePreview}></View>
           <View style={styles.buttonsContainer}>
                <Button 
                    title={"Wybierz plik"} 
                />
                <Button 
                    title={"Zrób zdjęcie"}
                />

           </View>
       </View>
   );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    addressContainer: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    addressText: {
        fontSize: 18,
        fontWeight: "700",
        color: Colors.primary
    },
    imagePreview: {

    },
    buttonsContainer: {
        display: "flex",
        flexDirection: 'row',
        backgroundColor: '#BABABA',
        height: 48,
        alignItems: "center",
        justifyContent: 'space-around'
    }
})

export default ImagePicker;