import React, { useState, useMemo, Suspense, useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import Map from '../components/Map';
import NearestHydrantsContainer from '../components/NearestHydrantsContainer';
import { addMethod } from '../models/AddMethod';

import * as hydrantsActions from '../store/actions/hydrants';
import * as userActions from '../store/actions/user';
import * as messageActions from '../store/actions/message';
import * as appActions from '../store/actions/app';


import { getLocationAsync } from '../utils/getUserLocation';

const MapScreen = props => {
    const hydrants = useSelector(state => state.hydrants.hydrants);
    const userPosition = useSelector(state => state.user.userPosition);
    const range = useSelector(state => state.hydrants.range);
    const amount = useSelector(state => state.hydrants.amount);
    const [modalVisible, setModalVisible] = useState(false);
    const Dialog = React.lazy(() => import('../components/AddingHydrantMethodDialog'));
    const dispatch = useDispatch();

    const _getLocationAsync = async () => {
        const location = await getLocationAsync();
        dispatch(userActions.setUserPosition({latitude: location.latitude, longitude: location.longitude}));
        dispatch(appActions.setMapRegion({
            longitude: location.longitude,
            latitude: location.latitude,
            latitudeDelta: 0.0022,
            longitudeDelta: 0.0021,
        }));
        await loadHydrants(location.latitude, location.longitude, range, amount);
    };

    const addHydrantPositionHandler = useCallback(async () => {
        const newHydrantPosition = await getLocationAsync();
        if (!userPosition) {
            dispatch(messageActions.setMessage("Location not setted"));
        }
        try {
            await dispatch(hydrantsActions.addHydrantWithPhoto(newHydrantPosition));
            await loadHydrants(newHydrantPosition.latitude, newHydrantPosition.longitude, range, amount, false)
        } catch (err) {
             throw err 
        }
    }, [dispatch, userPosition, range, amount]);

    const addMethodHandler = (method) => {
        switch(method) {
            case addMethod.LOCATION_ONLY:
                addHydrantPositionHandler();
                break;
            case addMethod.WITH_IMAGE: 
                props.navigation.navigate("WithImageScreen");
                break;
            case addMethod.EXIF:
                props.navigation.navigate("ExifUploader");
        }
        toggleModal()
    }
    const loadHydrants = useCallback(async (lat, lng, range, amount, showMessage = true) => {
        try {
            await dispatch(hydrantsActions.fetchHydrants(lat, lng, range, amount, showMessage))
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
        props.navigation.setParams({toggleModal: toggleModal})
        props.navigation.setParams({modalVisible})
    }, [modalVisible]);

    useEffect(() => {
        _getLocationAsync();
    }, [dispatch, loadHydrants]);

    return (
        <View style={styles.container}>
            {useMemo(()=> (
                <Map 
                    _getLocationAsync={_getLocationAsync}
                    navigation={props.navigation}
                />
            ), [hydrants])}
            {modalVisible ? <Suspense fallback={null}>
                <Dialog 
                    navigate={addMethodHandler}
                />
            </Suspense> : null}
            <NearestHydrantsContainer />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

MapScreen.navigationOptions = navData => {
    const toggleModal = navData.navigation.getParam("toggleModal");
    const modalVisible = navData.navigation.getParam("modalVisible");
    return {
        headerTitle: "Hydranty w pobliżu",
        headerRight: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
         <Item 
         title="Add new" 
         iconName={modalVisible ? "md-return-left" : "md-add"}
         onPress={() => {
            toggleModal();
         }}/>
        </HeaderButtons>),
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
         <Item 
         title="Add new" 
         iconName="ios-menu"
         onPress={() => {
            navData.navigation.toggleDrawer();
         }}/>
        </HeaderButtons>
        )
    }
}

export default MapScreen;