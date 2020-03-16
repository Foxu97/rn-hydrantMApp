import React, { useCallback, useEffect } from 'react';
import {View, Text, StyleSheet, Image, ImageBackground} from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import * as ImgPicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Button from './Button';
import Colors from '../constants/Colors';
import * as userActions from '../store/actions/user';
import * as hydrantActions from '../store/actions/hydrants';

const ImagePicker = props => {
    const pickedImage = useSelector(state => state.hydrants.imageURI)
    const savedImage = useSelector(state => state.hydrants.image);
    const address = useSelector(state => state.user.address);
    const userPosition = useSelector(state => state.user.userPosition);
    const dispatch = useDispatch();

    const verifyPermissions = async () => {
        try {
            const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
            if (result.status !== 'granted'){
                Alert.alert('Insufficient permissions!', [{text: 'OK!'}]);
                return false;
            };
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }

    } 
    const takeImageHanlder = async () => {
        const hasPermission = await verifyPermissions();
        if(!hasPermission){
            return;
        }
        const image = await ImgPicker.launchCameraAsync({
            allowsEditing: false,
            aspect: [16, 9],
            quality: 1
        });
        dispatch(hydrantActions.savePickedImageUri(image.uri)); 
        dispatch(hydrantActions.savePickedImage(image));
    }

    const chooseImageFromGallery = async () => {
        const hasPermission = await verifyPermissions();
        if(!hasPermission){
            return;
        }
        const image = await ImgPicker.launchImageLibraryAsync({
            mediaTypes: ImgPicker.MediaTypeOptions.Images
        });
        dispatch(hydrantActions.savePickedImageUri(image.uri));
        dispatch(hydrantActions.savePickedImage(image));
    }

    const uploadHydrantHandler = useCallback(async () => {
        try {
            await dispatch(hydrantActions.addHydrantWithPhoto(userPosition, savedImage));
            await dispatch(hydrantActions.fetchHydrants(userPosition.latitude, userPosition.longitude, false));
            //delete saved image
            dispatch(hydrantActions.savePickedImage(null));
            dispatch(hydrantActions.savePickedImageUri(null));
            props.goBack();
        } catch (err) {
            console.log(err)
        }
    }, [dispatch, userPosition, savedImage]);

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
           <ImageBackground source={require('../assets/hydrant-background.png')} style={styles.imagePreview}>
               {pickedImage ? <Image source={{uri: pickedImage}} style={styles.pickedImage} resizeMode="contain"/> :
                              <Image source={require('../assets/hydrant-placeholder.png')}  resizeMode="contain"/>            
            }
        </ImageBackground>
           <View style={styles.buttonsContainer}>
               <View style={styles.imageButtonsContainer}>
               <Button 
                    iconName="md-image"
                    title={"Wybierz plik"}
                    onButtonPress={chooseImageFromGallery}
                />
                <Button
                    iconName="md-camera"
                    title={"Zrób zdjęcie"}
                    onButtonPress={takeImageHanlder}
                />
               </View>
                <Button 
                    iconName="md-add"
                    iconStyle={{color: "white", marginRight: 18}}
                    buttonStyle={styles.addHydrantButton}
                    textStyle={styles.addHydrantText}
                    title={"Dodaj hydrant"}
                    onButtonPress={uploadHydrantHandler}
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
        alignItems: 'center',
        backgroundColor: Colors.primary,
        borderBottomColor: "#BABABA",
        borderBottomWidth: 1
    }, 
    addressText: {
        fontSize: 14,
        fontWeight: "700",
        color: "white"
    },
    imagePreview: {
        backgroundColor: "rgba(255,255,255,0.5)",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        width: '100%'
    },
    buttonsContainer: {
        display: "flex",
        backgroundColor: '#BABABA',
        height: 96
    },
    imageButtonsContainer: {
        flexDirection: 'row',
        height: 48
    },
    addHydrantButton: {
        justifyContent: "center",
        backgroundColor: Colors.primary,
    },
    addHydrantText: {
        color: "white"
    },
    pickedImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
})

export default ImagePicker;