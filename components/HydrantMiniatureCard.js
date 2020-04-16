import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import Colors from '../constants/Colors';
import { withNavigation } from 'react-navigation';

const HydrantMiniatureCard = props => {
    return (
        <TouchableOpacity 
        style={styles.container} 
        onPress={ () => props.navigation.navigate("HydrantHighlightsModal", {
                hydrant: props.hydrant
            })
        }>
            <View style={styles.header}>
                <Text style={styles.headerText}>{props.street} {props.house}</Text>
                <Text style={styles.headerText}>{props.distance}m</Text>
            </View>
            <View>
                <Image
                    source={{ uri: `http://192.168.74.254:8081/images/${props.imageName}` }}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width / 2,
        backgroundColor: Colors.primary,
        marginLeft: 8,
        borderRadius: 16
    },
    header: {
        backgroundColor: Colors.primary,
        textAlign: 'center',
        paddingVertical: 4,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
    },
    headerText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 12
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

export default withNavigation(HydrantMiniatureCard);