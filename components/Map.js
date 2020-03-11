import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ToastAndroid, Button, Modal, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import MapView from 'react-native-maps';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


import Colors from '../constants/Colors';

import AddingHydrantMethodDialog from './AddingHydrantMethodDialog';
import CircleButton from '../components/CircleButton';
import * as hydrantsActions from '../store/actions/hydrants';




const Map = props => {
    console.log("Map component render")
    const [hydrants, setHydrants] = useState([]);
    const [region, setRegion] = useState();
    const [userPosition, setUserPosition] = useState();
    const [modalVisible, setModalVisible] = useState(false);

    const dispatch = useDispatch();

    const onRegionChange = (region) => {
        setRegion(region);
    }
    const addNewHydrant = () => {

    }
    const fetchHydrants = async (lat, lng) => {
        console.log("Fetching hydrants")
        try {
            console.log("Fetching hydrants")
            const res = await fetch(`http://192.168.74.254:8081/hydrant/?latitude=${lat}&longitude=${lng}.json`);
            const json = await res.json();
            if (json.data) {
                console.log(json.message);
                dispatch(hydrantsActions.setHydrants(json.data));
                setHydrants(json.data);
            }
            ToastAndroid.show(json.message.toString(), ToastAndroid.LONG)

        }
        catch (err) {
            console.log(err)
        }
        

    }
    const _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            ToastAndroid.show("Permission to access location was denied", ToastAndroid.LONG)
        }

        const location = await Location.getCurrentPositionAsync({
            accuracy: 5
        });
        await fetchHydrants(location.coords.latitude, location.coords.longitude);
        
        setUserPosition({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        });
        // onRegionChange({
        //     longitude: location.coords.longitude,
        //     latitude: location.coords.latitude,
        //     latitudeDelta: 0.0022,
        //     longitudeDelta: 0.0021,
        // });

    };
    useEffect(() => {
        console.log("useEffect getLocation")
        _getLocationAsync();
    }, []);

    useEffect(() => {
        //console.log("useEffect get hydrants")
        fetchHydrants();
    }, []);

    useEffect(() => {
        if (userPosition) {
        onRegionChange({
            longitude: (userPosition ? userPosition.longitude : 55.55),
            latitude: (userPosition ? userPosition.latitude : 10.10),
            latitudeDelta: 0.0022,
            longitudeDelta: 0.0021,
        });
        }
        console.log("useEffect region change", userPosition)
        // onRegionChange({
        //     longitude: (userPosition ? userPosition.longitude : 55.55),
        //     latitude: (userPosition ? userPosition.latitude : 10.10),
        //     latitudeDelta: 0.0022,
        //     longitudeDelta: 0.0021,
        // });
    }, [modalVisible])

    // onRegionChange({
    //     longitude: userPosition.longitude,
    //     latitude: userPosition.latitude,
    //     latitudeDelta: 0.0022,
    //     longitudeDelta: 0.0021,
    // });
    return (
        <View style={styles.container}>
            <MapView
                style={styles.mapStyle}
                region={region}
            >
                {hydrants.map(hydrant => {
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

                {userPosition ? <MapView.Marker
                    coordinate={userPosition}
                    image={require('../assets/markers/blue-dot.png')}
                /> : null}
            </MapView>
            <AddingHydrantMethodDialog
                visible={modalVisible} />
            <CircleButton
                styles={{
                    bottom: 176
                }}
                icon="md-add"
                onPressButton={() => {
                    const visibility = !modalVisible;
                    setModalVisible(visibility);
                }}
            />
            <CircleButton
                styles={{
                    top: 8,
                    backgroundColor: Colors.iosBlue
                }}
                icon="md-locate"
                onPressButton={_getLocationAsync}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center"
    },
    mapStyle: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
});

export default Map;