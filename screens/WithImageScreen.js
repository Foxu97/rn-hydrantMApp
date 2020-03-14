import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import MapView from 'react-native-maps';

import ImagePicker from '../components/ImagePicker';

const WithImageScreen = props => {
    const newHydrantLocation = useSelector(state => state.user.userPosition);
    const goBackHandler = () => {
        console.log(props.navigation)
        props.navigation.navigate("Map");
    }
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                mapType={"hybrid"}
                showsUserLocation={false}
                followsUserLocation={true}
                showsMyLocationButton={true}
                showsCompass={false}
                zoomEnabled={false}
                zoomTapEnabled={false}
                zoomControlEnabled={false}
                rotateEnabled={false}
                scrollEnabled={false}
                pitchEnabled={false}
                showsScale
                userLocationUpdateInterval={5000}
                region={{
                    latitude: newHydrantLocation?.latitude,
                    longitude: newHydrantLocation?.longitude,
                    latitudeDelta: 0.0005,
                    longitudeDelta: 0.0005,
                }}
            >
                <MapView.Marker
                    coordinate={{
                        latitude: newHydrantLocation?.latitude,
                        longitude: newHydrantLocation?.longitude,
                    }}
                    image={require('../assets/markers/hydrant.png')}
                />
            </MapView>
            <ImagePicker 
            goBack={goBackHandler}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        height: Dimensions.get('window').height / 4,
        width: Dimensions.get('window').width
    }
})

WithImageScreen.navigationOptions = {
    headerTitle: "Dodaj hydrant"
}

export default WithImageScreen;     