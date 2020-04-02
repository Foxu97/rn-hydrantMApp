import React, { useEffect } from 'react';
import { View, StyleSheet, Image, ImageBackground } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import * as ImgPicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Button from './Button';
import Colors from '../constants/Colors';
import * as hydrantActions from '../store/actions/hydrants';

const ImagePicker = props => {
    const pickedImage = useSelector(state => state.hydrants.image);
    const imageToUpdate = useSelector(state => state.hydrants.imageToUpdate);
    const dispatch = useDispatch();

    const verifyPermissions = async () => {
        try {
            const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
            if (result.status !== 'granted') {
                Alert.alert('Insufficient permissions!', [{ text: 'OK!' }]);
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
        if (!hasPermission) {
            return;
        }
        const image = await ImgPicker.launchCameraAsync({
            allowsEditing: false,
            aspect: [16, 9],
            quality: 1
        });
        if (props.newHydrant) {
            dispatch(hydrantActions.savePickedImage(image));
        }
        if (props.updateHydrant) {
            dispatch(hydrantActions.saveImageToUpdate(image));
        }
    }

    const chooseImageFromGallery = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const image = await ImgPicker.launchImageLibraryAsync({
            mediaTypes: ImgPicker.MediaTypeOptions.Images
        });
        if(!image.cancelled){
            if (props.newHydrant) {
                dispatch(hydrantActions.savePickedImage(image));
            }
            if (props.updateHydrant) {
                dispatch(hydrantActions.saveImageToUpdate(image));
            }
        }
    }
    useEffect(() => {

        return () => {
            dispatch(hydrantActions.saveImageToUpdate(null));
        }
    }, [])
    if (props.newHydrant) {
        return (
            <View style={styles.container}>

                <ImageBackground source={require('../assets/hydrant-background.png')} style={styles.imagePreview}>
                    {pickedImage ? <Image source={{ uri: pickedImage.uri }} style={styles.pickedImage} resizeMode="contain" /> :
                        <Image source={require('../assets/hydrant-placeholder.png')} resizeMode="contain" />
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
                </View>
            </View>
        );
    }
    if (props.updateHydrant) {
        return (
            <View style={styles.container}>

                <ImageBackground source={require('../assets/hydrant-background.png')} style={styles.imagePreview}>
                    {imageToUpdate ? <Image source={{ uri: imageToUpdate.uri }} style={styles.pickedImage} resizeMode="contain" /> :
                        <Image source={require('../assets/hydrant-placeholder.png')} resizeMode="contain" />
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
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imagePreview: {
        backgroundColor: "rgba(255,255,255,0.5)",
        alignItems: "center",
        justifyContent: "center",
        flex: 2,
        width: '100%'
    },
    buttonsContainer: {
        display: "flex",
        backgroundColor: '#BABABA',

    },
    imageButtonsContainer: {
        flexDirection: 'row',
        height: 48
    },
    pickedImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
})

export default ImagePicker;