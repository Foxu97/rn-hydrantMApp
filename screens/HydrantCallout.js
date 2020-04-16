import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../constants/Colors';
import HydrantsSatellitePreview from '../components/HydrantsSatellitePreview';
import ImagePicker from '../components/ImagePicker';
import Button from '../components/Button';
import * as hydrantActions from '../store/actions/hydrants';

import { getLocationAsync } from '../utils/getUserLocation';

const HydrantCallout = props => {
    const userPosition = useSelector(state => state.user.userPosition);
    const [hydrant, setHydrant] = useState();
    const imageToUpdate = useSelector(state => state.hydrants.imageToUpdate);
    const dispatch = useDispatch();

    useEffect(() => {
        const hydrant = props.navigation.getParam('hydrant');
        setHydrant(hydrant);
    }, []);

    const updateHydrantsImageHandler = useCallback(async () => {
        try { 
            const hydrantToAddLocation = await getLocationAsync();
            await dispatch(hydrantActions.uploadHydrantImage(hydrantToAddLocation, imageToUpdate, hydrant._id));
            await dispatch(hydrantActions.fetchHydrants(hydrantToAddLocation.latitude, hydrantToAddLocation.longitude, false));
            props.navigation.navigate("Map");
        } catch (err) {
            console.log(err)
        }
    }, [dispatch, userPosition, imageToUpdate, hydrant]);


    if (!hydrant) return null;
    return (
        <View style={styles.container}>
            <HydrantsSatellitePreview
                latitude={hydrant.latitude}
                longitude={hydrant.longitude}
            />
            <View style={styles.header}>
                <View style={styles.address}>
                    <Text style={styles.addressText}>
                        {hydrant.address.District},
                        {' '}
                        {hydrant.address.Street}
                        {' '}
                        {hydrant.address.HouseNumber}
                    </Text>
                </View>
            </View>
            <View style={styles.imageContainer}>
                {hydrant.imageName ?
                    <Image
                        source={{ uri: `http://192.168.74.254:8081/images/${hydrant.imageName}` }}
                        style={{ width: '100%', height: "100%" }}
                        resizeMode="contain"
                    /> : <ImagePicker
                        updateHydrant={true}
                    />}
            </View>
            <View style={styles.actions}>
                {(!hydrant.imagePath && imageToUpdate) ? <View style={styles.addHydrantButtonContainer}>
                    <Button
                        iconName="md-add"
                        iconStyle={{ color: "white", marginRight: 18 }}
                        buttonStyle={styles.addHydrantButton}
                        textStyle={styles.addHydrantText}
                        title={"Aktualizuj zdjęcie"}
                        onButtonPress={updateHydrantsImageHandler}
                    />
                </View> : null}
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
    addressText: {
        fontSize: 14,
        fontWeight: "700",
        color: 'white',
        textAlign: 'center',
    },
    imageContainer: {
        flex: 2,
    },
    addHydrantButtonContainer: {
        height: 48,
    },
    addHydrantButton: {
        justifyContent: "center",
        backgroundColor: Colors.primary,
    },
    addHydrantText: {
        color: "white"
    },
});

HydrantCallout.navigationOptions = {
    headerTitle: "Szczegóły"
}

export default HydrantCallout;