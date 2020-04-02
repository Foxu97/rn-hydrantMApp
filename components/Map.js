import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MapView from 'react-native-maps';

import Colors from '../constants/Colors';
import CircleButton from '../components/CircleButton';

import * as appActions from '../store/actions/app';

const Map = props => {
    const initialReg = useSelector(state => state.app.region);
    const hydrants = useSelector(state => state.hydrants.hydrants)
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <MapView
                initialRegion={initialReg}
                region={initialReg}
                style={styles.mapStyle}
                showsUserLocation
                showsCompass
                onRegionChangeComplete={(reg) => {
                    dispatch(appActions.setMapRegion(reg));
                }}
                onPress={() => { }}
            >
                {hydrants?.map(hydrant => {
                    return <MapView.Marker
                        key={hydrant._id}
                        coordinate={{
                            latitude: hydrant.latitude,
                            longitude: hydrant.longitude
                        }}
                        title={hydrant.address.Label}
                        image={require('../assets/markers/hydrant.png')}
                        onPress={() => {
                            props.navigation.navigate("HydrantHighlightsModal", {
                                hydrant: hydrant
                            });
                        }}
                    />
                })}

            </MapView>
            <CircleButton
                styles={{
                    top: 8,
                    backgroundColor: Colors.iosBlue,
                    height: 48,
                    width: 48
                }}
                icon="md-locate"
                iconSize={28}
                onPressButton={props._getLocationAsync}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    mapStyle: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
});

export default Map;