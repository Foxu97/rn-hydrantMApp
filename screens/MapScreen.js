import React, { useState, useMemo, Suspense } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import CircleButton from '../components/CircleButton'; 
import Map from '../components/Map';
import { addMethod } from '../models/AddMethod';



const MapScreen = props => {
    const [modalVisible, setModalVisible] = useState(false);
    const Dialog = React.lazy(() => import('../components/AddingHydrantMethodDialog'));

    const addMethodHandler = (method) => {
        switch(method) {
            case addMethod.WITH_IMAGE: 
                props.navigation.navigate("WithImageScreen");

            
            default: toggleModal()
        }
        
    }
    const toggleModal = () => {
        const visibility = !modalVisible;
        setModalVisible(visibility);
    }

    return (
        <View style={styles.container}>
            {useMemo(()=> (
                <Map 
                    
                />
            ), [])}
            {modalVisible ? <Suspense fallback={null}>
                <Dialog 
                    navigate={addMethodHandler}
                />
            </Suspense> : null}
            <CircleButton
                styles={{
                    bottom: 176
                }}
                icon={modalVisible ? "md-return-left" : "md-add"}
                iconSize={34}
                onPressButton={() => {
                    toggleModal()
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

MapScreen.navigationOptions = {
    headerTitle: "Hydranty w pobliżu"
}

export default MapScreen;