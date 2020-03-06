import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

const Map = props => {
    return (
        <View style={styles.container}>
            <MapView
                style={styles.mapStyle}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-end'
    },
    mapStyle: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
});

export default Map;