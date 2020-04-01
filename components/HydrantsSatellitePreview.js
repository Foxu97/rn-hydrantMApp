import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

const HydrantsSatellitePreview = props => {
    return (
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
                latitude: props.latitude,
                longitude: props.longitude,
                latitudeDelta: 0.0009,
                longitudeDelta: 0.0009,
            }}
        >
            <MapView.Marker
                coordinate={{
                    latitude: props.latitude,
                    longitude: props.longitude,
                }}
                image={require('../assets/markers/hydrant.png')}
            />
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        height: Dimensions.get('window').height / 4,
        width: Dimensions.get('window').width
    }
})

export default HydrantsSatellitePreview;