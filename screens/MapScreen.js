import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';


import AddingHydrantMethodDialog from '../components/AddingHydrantMethodDialog';
import CircleButton from '../components/CircleButton';
import Map from '../components/Map';

const MapScreen = props => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.container}>
            {useMemo(()=> (
                <Map />
            ), [])}
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default MapScreen;