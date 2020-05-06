import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import { useSelector } from 'react-redux';

import ImageTile from '../components/ImageTile';


const ImageBrowser = props => {
    const [allPhotos, setAllPhotos] = useState([]);
    const exifHydrants = useSelector(state => state.hydrants.exifHydrantsImages);

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
    const getImages = async () => {
        const permission = await verifyPermissions();
        if (!permission) {
            return
        }
        const album = await MediaLibrary.getAlbumAsync('Camera')
        const photosTemp = await MediaLibrary.getAssetsAsync({ album: album })
        setAllPhotos(photosTemp.assets);
    }

    useEffect(() => {
        getImages();
    }, [])
    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.headerText}>Wybrano: {exifHydrants.length} z {allPhotos.length}</Text>
            </View>

            {allPhotos && (allPhotos.length > 0) ?
                <FlatList
                    style={{ marginBottom: 48 }} //header height fix
                    data={allPhotos}
                    numColumns={3}
                    renderItem={(photo) => (
                        <ImageTile
                            selectedExif={exifHydrants}
                            photo={photo}
                        />
                    )}
                /> : <Text>No images in gallery!</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 48,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: 'white',
        fontSize: 18
    },
    list: {
        flex: 1
    }
})

export default ImageBrowser;