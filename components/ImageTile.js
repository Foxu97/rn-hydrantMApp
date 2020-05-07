import React, { useState, useEffect } from 'react';
import { TouchableOpacity, ImageBackground, StyleSheet, Text, Image, Dimensions, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../constants/Colors';
import * as hydrantsActions from '../store/actions/hydrants';
import * as messageActions from '../store/actions/message';

const ImageTile = props => {
    const [selected, setSelected] = useState(false);
    const dispatch = useDispatch();
    const toggleSelectImage = () => {
        const index = props.selectedExif.findIndex(alreadyAddedImage => {
            return alreadyAddedImage.uri === props.photo.item.uri;
        });
        if ((index === -1) && (props.selectedExif.length >= 12)) {
            dispatch(messageActions.setMessage("Maximum number of images to upload is 12"));
            return;
        }
        const selectedStatus = selected;
        setSelected(!selectedStatus);

        dispatch(hydrantsActions.toggleExifImage(props.photo.item));
    }
    useEffect(() => {
        const isSelected = props.selectedExif.find(image => {
            return image.uri === props.photo.item.uri
        });
        if (isSelected) {
            setSelected(true)
        }
    }, [])

    return (
        <TouchableOpacity style={styles.container} onPress={toggleSelectImage}>
            <Image source={{ uri: props.photo.item.uri }} style={styles.image} />
            {selected ?
                <View style={styles.imageSelected}>
                    <Ionicons name="md-checkmark-circle" size={24} color={Colors.iosGreen} style={styles.selectedIcon} />
                </View>
                : null
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width / 3,
        height: Dimensions.get('window').width / 3
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    imageSelected: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.5)'
    },
    selectedIcon: {
        position: 'absolute',
        right: 4,
        bottom: 4
    }
});

export default ImageTile;