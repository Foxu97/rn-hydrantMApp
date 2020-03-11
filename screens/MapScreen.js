import React, { useState, useMemo, Suspense } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import CircleButton from '../components/CircleButton'; 
import Map from '../components/Map';



const MapScreen = props => {
    
    const [modalVisible, setModalVisible] = useState(false);
    const Dialog = React.lazy(() => import('../components/AddingHydrantMethodDialog'));

    return (
        <View style={styles.container}>
            {useMemo(()=> (
                <Map 
                    
                />
            ), [])}
            {modalVisible ? <Suspense fallback={null}>
                <Dialog 
                    navigation={props.navigation}
                />
            </Suspense> : null}
            <CircleButton
                styles={{
                    bottom: 176
                }}
                icon={modalVisible ? "md-return-left" : "md-add"}
                iconSize={34}
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