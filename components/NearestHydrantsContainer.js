import React from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import HydrantMiniatureCard from './HydrantMiniatureCard';

const NearestHydrantsContainer = props => {
    const nearestHydrants = useSelector(state => state.hydrants.nearestHydrants);
    if (nearestHydrants && nearestHydrants.length > 0) {
        return (
            <View style={styles.container}>
                <FlatList
                    data={nearestHydrants}
                    horizontal
                    renderItem={({ item, index }) => (
                        <HydrantMiniatureCard
                            id={item._id}
                            index={++index}
                            hydrant={item}
                            imageName={item.imageName}
                            street={item.address.Street}
                            house={item.address.HouseNumber}
                            distance={item.distance}
                        />
                    )}
                    keyExtractor={item => item._id}
                />

            </View>
        );
    }
    return null;
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        height: Dimensions.get('window').height / 4,
        width: '100%'
    }
});

export default NearestHydrantsContainer;