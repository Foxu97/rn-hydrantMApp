import React from "react";
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';

const ExifMiniature = props => {
    return (
        <View style={styles.imageContainer}>
            <Image
                source={{ uri: props.uri }}
                style={styles.image}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        paddingTop: 10,
        paddingLeft: 5,
        paddingRight: 5,
        alignItems: 'center',
        height: Dimensions.get('window').width / 2 
    },
    image: {
        resizeMode: "cover",
        justifyContent: "center",
        height: '100%',
        width: '100%'
    },
})

export default ExifMiniature;