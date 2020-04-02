import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';


import ImagePicker from '../components/ImagePicker';
import Button from '../components/Button';
import HydrantsSatellitePreview from '../components/HydrantsSatellitePreview';
import * as userActions from '../store/actions/user';
import * as hydrantActions from '../store/actions/hydrants';
import { getLocationAsync } from '../utils/getUserLocation';

const WithImageScreen = props => {
    const newHydrantLocation = useSelector(state => state.user.userPosition);
    const savedImage = useSelector(state => state.hydrants.image);
    const address = useSelector(state => state.user.address);
    const dispatch = useDispatch();

    const uploadHydrantHandler = useCallback(async () => {
        try {
            const hydrantToAddLocation = await getLocationAsync();
            await dispatch(hydrantActions.addHydrantWithPhoto(hydrantToAddLocation, savedImage));
            await dispatch(hydrantActions.fetchHydrants(newHydrantLocation.latitude, newHydrantLocation.longitude, false));
            dispatch(hydrantActions.savePickedImage(null));
            props.navigation.navigate("Map");
        } catch (err) {
            console.log(err)
        }
    }, [dispatch, newHydrantLocation, savedImage]); 
    const loadAddress = useCallback(async (newHydrantLocation) => {
        try {
            await dispatch(userActions.fetchAddress(newHydrantLocation));
        } catch (err) {
            throw err;
        }
    }, [dispatch]);

    useEffect(() => {
        if (newHydrantLocation) {
            loadAddress(newHydrantLocation)
        }
    }, [newHydrantLocation]);

    
    return (
        <View style={styles.container}>
            <HydrantsSatellitePreview
                latitude={newHydrantLocation.latitude}
                longitude={newHydrantLocation.longitude}
                newHydrant={true}
            />
            <View style={styles.addressContainer}>
                <Text style={styles.addressText}>
                    {address}
                    </Text>
                    </View>
            <View  style={styles.imagePicker}>
            <ImagePicker
                newHydrant={true}
            />

            </View>
            <View style={styles.addHydrantButtonContainer}>
            <Button
                iconName="md-add"
                iconStyle={{ color: "white", marginRight: 18 }}
                buttonStyle={styles.addHydrantButton}
                textStyle={styles.addHydrantText}
                title={"Dodaj hydrant"}
                onButtonPress={uploadHydrantHandler}
            />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    addressContainer: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        borderBottomColor: "#BABABA",
        borderBottomWidth: 1
    },
    imagePicker: {
        flex: 8
    },
    addressText: {
        fontSize: 14,
        fontWeight: "700",
        color: "white"
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
})

WithImageScreen.navigationOptions = {
    headerTitle: "Dodaj hydrant"
}

export default WithImageScreen;     