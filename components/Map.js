import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions, ToastAndroid, Button, Modal, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MapView from 'react-native-maps';


import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


import Colors from '../constants/Colors';
import CircleButton from '../components/CircleButton';

import * as hydrantsActions from '../store/actions/hydrants';
import * as userActions from '../store/actions/user';




const Map = props => {
    console.log("Map component render");
    const [region, setRegion] = useState();
    const hydrants = useSelector(state => state.hydrants.hydrants)
    const userPosition = useSelector(state => state.user.userPosition)
    //const dispatch = useDispatch();


    const onRegionChange = (region) => {
        setRegion(region);
    }

    // const loadHydrants = useCallback(async (lat, lng) => {
    //     try {
    //         await dispatch(hydrantsActions.fetchHydrants(lat, lng))
    //     }
    //     catch (err) {
    //         throw err
    //     }
    // }, [dispatch])

    // const _getLocationAsync = async () => {
    //     let { status } = await Permissions.askAsync(Permissions.LOCATION);
    //     if (status !== 'granted') {
    //         ToastAndroid.show("Permission to access location was denied", ToastAndroid.LONG)
    //     }

    //     const location = await Location.getCurrentPositionAsync({
    //         accuracy: 5
    //     });

    //     await loadHydrants(location.coords.latitude, location.coords.longitude)
    //     dispatch(userActions.setUserPosition({latitude: location.coords.latitude, longitude: location.coords.longitude}));
        
    //     onRegionChange({
    //         longitude: location.coords.longitude,
    //         latitude: location.coords.latitude,
    //         latitudeDelta: 0.0022,
    //         longitudeDelta: 0.0021,
    //     });

    // };
    // useEffect(() => {
    //     _getLocationAsync();
    // }, [dispatch, loadHydrants]);

    useEffect(() => {
        onRegionChange({
            longitude: userPosition?.longitude || 37.78825,
            latitude: userPosition?.latitude || -122.4324,
            latitudeDelta: 0.0022,
            longitudeDelta: 0.0021,
        });
    }, [userPosition])

    return (
        <View style={styles.container}>
            <MapView
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                style={styles.mapStyle}
                showsUserLocation
                showsCompass
                region={region}
            >
                {hydrants?.map(hydrant => {
                    return <MapView.Marker
                        key={hydrant._id}
                        coordinate={{
                            latitude: hydrant.latitude,
                            longitude: hydrant.longitude
                        }}
                        title={hydrant.address.Label}
                        image={require('../assets/markers/hydrant.png')}
                    />
                })}

            </MapView>
            <CircleButton
                styles={{
                    top: 8,
                    backgroundColor: Colors.iosBlue,
                    height: 48,
                    width: 48
                }}
                icon="md-locate"
                iconSize={28}
                onPressButton={props._getLocationAsync}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    mapStyle: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
});

export default Map;