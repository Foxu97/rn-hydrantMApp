import React, { useState, useMemo, Suspense, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import CircleButton from '../components/CircleButton'; 
import Map from '../components/Map';
import { addMethod } from '../models/AddMethod';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import * as hydrantsActions from '../store/actions/hydrants';
import * as userActions from '../store/actions/user';
import * as messageActions from '../store/actions/message';

const MapScreen = props => {
    console.log("Map screen render");
    const hydrants = useSelector(state => state.hydrants.hydrants);
    const userPosition = useSelector(state => state.user.userPosition);
    const [modalVisible, setModalVisible] = useState(false);
    const Dialog = React.lazy(() => import('../components/AddingHydrantMethodDialog'));
    const dispatch = useDispatch();



    const _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            ToastAndroid.show("Permission to access location was denied", ToastAndroid.LONG)
        }

        const location = await Location.getCurrentPositionAsync({
            accuracy: 5
        });

        await loadHydrants(location.coords.latitude, location.coords.longitude)
        dispatch(userActions.setUserPosition({latitude: location.coords.latitude, longitude: location.coords.longitude}));
    };

    const addHydrantPositionHandler = useCallback(async () => {
        if (!userPosition) {
            dispatch(messageActions.setMessage("Location not setted"));
        }
        try {
            await dispatch(hydrantsActions.addHydrantWithPhoto(userPosition));
            await loadHydrants(userPosition.latitude, userPosition.longitude, false)
        } catch (err) {
             throw err 
        }
    }, [dispatch, userPosition]);

    const addMethodHandler = (method) => {
        switch(method) {
            case addMethod.LOCATION_ONLY:
                //toggleModal()
                addHydrantPositionHandler();
                break;
            case addMethod.WITH_IMAGE: 
                
                props.navigation.navigate("WithImageScreen");
                break;
        }
        toggleModal()
    }
    const loadHydrants = useCallback(async (lat, lng, showMessage = true) => {
        try {
            await dispatch(hydrantsActions.fetchHydrants(lat, lng, showMessage))
        }
        catch (err) {
            throw err
        }
    }, [dispatch]);

    const toggleModal = () => {
        const visibility = !modalVisible;
        setModalVisible(visibility);
    }

    useEffect(() => {
        _getLocationAsync();
    }, [dispatch, loadHydrants]);

    return (
        <View style={styles.container}>
            {useMemo(()=> (
                <Map 
                    _getLocationAsync={_getLocationAsync}
                />
            ), [hydrants])}
            {modalVisible ? <Suspense fallback={null}>
                <Dialog 
                    navigate={addMethodHandler}
                />
            </Suspense> : null}
            <CircleButton
                styles={{
                    bottom: 176
                }}
                icon={modalVisible ? "md-return-left" : "md-add"}
                iconSize={34}
                onPressButton={() => {
                    toggleModal()
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

MapScreen.navigationOptions = {
    headerTitle: "Hydranty w pobliżu"
}

export default MapScreen;