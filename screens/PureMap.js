import React from 'react'
import MapView from 'react-native-maps';

const PureMap = props => {
    return (
        <MapView 
        style={{height: '100%', width: '100%'}}
        showsCompass={true}
        showsUserLocation
        showsMyLocationButton
        showsScale
        >

        </MapView>
    )
}

PureMap.navigationOptions = {
    header: null
}

export default PureMap;