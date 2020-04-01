import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';


import ImagePicker from '../components/ImagePicker';
import HydrantsSatellitePreview from '../components/HydrantsSatellitePreview';

const WithImageScreen = props => {
    const newHydrantLocation = useSelector(state => state.user.userPosition);
    const goBackHandler = () => {
        props.navigation.navigate("Map");
    }
    return (
        <View style={styles.container}>
            <HydrantsSatellitePreview
                latitude={newHydrantLocation.latitude}
                longitude={newHydrantLocation.longitude}
            />
            <ImagePicker
                goBack={goBackHandler} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
})

WithImageScreen.navigationOptions = {
    headerTitle: "Dodaj hydrant"
}

export default WithImageScreen;     