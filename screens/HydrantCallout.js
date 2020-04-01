import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, Button, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import HydrantsSatellitePreview from '../components/HydrantsSatellitePreview';
import ImagePicker from '../components/ImagePicker';

const HydrantCallout = props => {
    const [hydrantImageName, setHydrantImageName] = useState();
    const [hydrant, setHydrant] = useState();

    useEffect(() => {
        console.log("Hydrant Callout Modal");
        const hydrant = props.navigation.getParam('hydrant');
        if (hydrant.imagePath) {
            const imageName = hydrant.imagePath.split("/")[1];
            console.log(imageName)
            setHydrantImageName(imageName)
        }
        console.log(hydrant)
        setHydrant(hydrant);
    }, [])
    if (!hydrant) return null;
    return (
        <View style={styles.container}>
            <HydrantsSatellitePreview 
                latitude={hydrant.latitude}
                longitude={hydrant.longitude}
            />
            <View style={styles.header}>
                <View style={styles.address}>
                    <Text style={styles.headerText}>
                        {hydrant.address.District}
                        {' '}
                        {hydrant.address.Street}
                        {' '}
                        {hydrant.address.HouseNumber}
                    </Text>
                </View>
            </View>
                <View style={styles.imageContainer}>
                {hydrant.imagePath ?
                    <Image
                        source={{ uri: `http://192.168.74.254:8081/images/${hydrantImageName}` }}
                        style={{ width: '100%', height: "100%" }}
                        resizeMode="cover"
                    /> : null}
                </View> 
            <View style={styles.actions}>
                <Button title="opcja1" onPress={() => { }} />
                { !hydrant.imagePath ? <Button title="Dodaj zdjęcie" onPress={() => { }} /> : null }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: Colors.primary,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        justifyContent: 'center',
        textAlign: 'center'
    },
    headerText: {
        color: 'white',
        textAlign: 'center',
    },
    imageContainer: {
        flex: 2,
        alignItems: 'center'
    }
});

HydrantCallout.navigationOptions = {
    headerTitle: "Szczegóły"
}

export default HydrantCallout;