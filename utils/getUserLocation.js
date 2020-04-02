import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as messageActions from '../store/actions/message';

export const getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
        messageActions.setMessage("Permission to access location was denied");
    }

    const location = await Location.getCurrentPositionAsync({
        accuracy: 5
    });

    return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
    };
};