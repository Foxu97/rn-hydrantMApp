import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Slider } from 'react-native';

import Button from '../components/Button';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import * as hydrantActions from '../store/actions/hydrants'

const AppSettings = props => {
    const range = useSelector(state => state.hydrants.range);
    const amount = useSelector(state => state.hydrants.amount);
    const userLocation = useSelector(state => state.user.userPosition);
    const [rangeToSet, setRangeToSet] = useState(range);
    const [amountToSet, setAmountToSet] = useState(amount);

    const dispatch = useDispatch();

    const saveSettings = async () => {
        dispatch(hydrantActions.setRange(rangeToSet));
        dispatch(hydrantActions.setAmount(amountToSet));
        await dispatch(hydrantActions.fetchHydrants(userLocation.latitude, userLocation.longitude, rangeToSet, amountToSet))
        props.navigation.navigate("Main");
    }
    return (
        <View style={styles.container}>
            <View style={styles.optionWrapper}>
                <View style={styles.optionView}>
                    <Text style={styles.label}>Zasięg ładowania hydrantów [m]</Text>
                    {range ? <Text>{rangeToSet}m</Text> : null}
                    <Slider
                        style={{ width: 200, height: 40 }}
                        value={rangeToSet}
                        onValueChange={value => setRangeToSet(value)}
                        minimumValue={100}
                        step={100}
                        maximumValue={10000}
                        minimumTrackTintColor={Colors.accent}
                        maximumTrackTintColor={Colors.primary}
                        thumbTintColor={Colors.primary}
                    />
                </View>
            </View>
            <View style={styles.optionWrapper}>
                <View style={styles.optionView}>
                    <Text style={styles.label}>Ilość wyświetlanych hydrantów w pobliżu</Text>
                    <Text>{amountToSet}</Text>
                    <Slider
                        style={{ width: 200, height: 40 }}
                        value={amountToSet}
                        onValueChange={
                            (value) => {
                                setAmountToSet(value);
                            }
                        }
                        minimumValue={0}
                        step={1}
                        maximumValue={20}
                        minimumTrackTintColor={Colors.accent}
                        maximumTrackTintColor={Colors.primary}
                        thumbTintColor={Colors.primary}
                    />
                </View>
            </View>
            <View style={styles.buttonWrapper}>

                <Button title="Save settings" onButtonPress={saveSettings} buttonStyle={{
                    width: '100%',
                    backgroundColor: Colors.primary
                }}
                    textStyle={{
                        color: 'white'
                    }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        fontSize: 18
    },
    optionView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        padding: 20,
        width: "100%",
        textAlign: 'center',
        borderRadius: 16,

    },
    optionWrapper: {
        padding: 12,
        borderRadius: 16,
        width: '90%',
        shadowColor: Colors.primary,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 0.25,
        elevation: 12
    },
    buttonWrapper: {
        height: 48,
        width: '100%',
        marginTop: 'auto'
    }
})

AppSettings.navigationOptions = navData => {
    return {
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Add new"
                    iconName="ios-menu"
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }} />
            </HeaderButtons>
        )
    }
}

export default AppSettings;