import React from "react";
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import HydrantExifUploadStats from '../models/HydrantExifUploadStats';
import Colors from '../constants/Colors';

const ExifMiniature = props => {
    let StatusMark = null;
    let StatusText = null;
    switch (props?.status) {
        case HydrantExifUploadStats.ADDED:
            StatusMark = <View style={{ ...styles.status, ...styles.statusAdded }}>
                <Ionicons name="md-checkmark" size={18} color='white' />
            </View>
            StatusText = <View style={{ ...styles.statusTextContainer, ...styles.statusAdded}}>
                <Text style={styles.statusText}>Added</Text>
            </View>
            break;
        case HydrantExifUploadStats.ALREADY_EXIST_WITH_IMAGE:
            StatusMark = <View style={{ ...styles.status, ...styles.statusAlreadyExists }}>
                <Ionicons name="md-close" size={18} color='white' />
            </View>
            StatusText = <View style={{ ...styles.statusTextContainer, ...styles.statusAlreadyExists}}>
                <Text style={styles.statusText}>Already exists</Text>
            </View>
            break;
        case HydrantExifUploadStats.NO_EXIF_DATA:
            StatusMark = <View style={{ ...styles.status, ...styles.statusNoExifData }}>
                <Ionicons name="md-alert" size={18} color='white' />
            </View>
            StatusText = <View style={{ ...styles.statusTextContainer, ...styles.statusNoExifData}}>
                <Text style={styles.statusText}>No exif data</Text>
            </View>
            break;
        case HydrantExifUploadStats.DUPLICATE:
            StatusMark = <View style={{ ...styles.status, ...styles.statusDuplicate }}>
                <Ionicons name="md-copy" size={18} color='white' />
            </View>
            StatusText = <View style={{ ...styles.statusTextContainer, ...styles.statusDuplicate}}>
                <Text style={styles.statusText}>Duplicate</Text>
            </View>
            break;
        case HydrantExifUploadStats.UPDATED_IMAGE:
            StatusMark = <View style={{ ...styles.status, ...styles.statusUpdatedImage }}>
                <Ionicons name="md-image" size={18} color='white' />
            </View>
            StatusText = <View style={{ ...styles.statusTextContainer, ...styles.statusUpdatedImage}}>
                <Text style={styles.statusText}>Updated Image</Text>
            </View>
            break;
        default:
            StatusMark = null;
            StatusText = null;

    }
    return (
        <View style={styles.imageContainer}>
            <Image
                source={{ uri: props.uri }}
                style={styles.image}
            />
            {StatusMark}
            {StatusText}
        </View>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        paddingTop: 10,
        paddingLeft: 5,
        paddingRight: 5,
        alignItems: 'center',
        height: Dimensions.get('window').width / 2
    },
    image: {
        resizeMode: "cover",
        justifyContent: "center",
        height: '100%',
        width: '100%'
    },
    status: {
        height: 24,
        width: 24,
        position: 'absolute',
        right: 7,
        top: 12,
        zIndex: 100,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: 'center'
    },
    statusAdded: {
        backgroundColor: Colors.iosGreen,
    },
    statusAlreadyExists: {
        backgroundColor: Colors.iosRed,
    },
    statusNoExifData: {
        backgroundColor: Colors.iosRed,
    },
    statusDuplicate: {
        backgroundColor: Colors.iosRed,
    },
    statusUpdatedImage: {
        backgroundColor: Colors.iosYellow,
    },
    statusTextContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        paddingVertical: 4,
        alignItems: 'center'
    },
    statusText: {
        color: 'white',
    }
})

export default ExifMiniature;