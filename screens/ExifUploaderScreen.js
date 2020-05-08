import React, { useEffect, useCallback, useState } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';


import Button from '../components/Button';
import HeaderButton from '../components/HeaderButton';
import ExifMiniature from '../components/ExifMiniature';
import Colors from '../constants/Colors';

import * as hydrantsActions from '../store/actions/hydrants';
import * as uiActions from '../store/actions/ui';


const ExifUploaderScreen = props => {
  const exifHydrants = useSelector(state => state.hydrants.exifHydrantsImages);
  const [imagesStatus, setImagesStatus] = useState();
  const dispatch = useDispatch();

  const uploadFiles = useCallback(async () => {
    dispatch(uiActions.setIsLoading(true));
    const uploadStatus = await dispatch(hydrantsActions.uploadExifImages(exifHydrants));
    setImagesStatus(uploadStatus);
    dispatch(uiActions.setIsLoading(false));
  }, [dispatch, exifHydrants]);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Wybrano: {exifHydrants.length}
        </Text></View>

      <View style={styles.grid}>
        {exifHydrants.length > 0 ?
          <FlatList
            data={exifHydrants}
            numColumns={3}
            keyExtractor={item => item.id}
            renderItem={(item) => (
              <ExifMiniature 
                uri={item.item.uri}
                status={imagesStatus ? imagesStatus.get(item.item.filename) : null}
               />
            )}
          /> : <View style={styles.noImagesChosenAlert}><Text>Nie wybrano plików.</Text></View>}

      </View>
      {exifHydrants.length > 0 ?
        <View style={styles.buttonContainer}>
          <Button
            title="Wyślij pliki"
            iconName="md-cloud-upload"
            iconStyle={{ color: "white" }}
            buttonStyle={styles.addHydrantButton}
            textStyle={styles.addHydrantText}
            onButtonPress={uploadFiles}
          />
        </View> : <View style={styles.buttonContainer}>
          <Button
            title="Wybierz pliki"
            iconName="md-images"
            onButtonPress={() => props.navigation.navigate('ImageBrowser')}
          />
        </View>}
    </View>
  )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 48,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 18
  },
  grid: {
    flex: 1,
    paddingHorizontal: 5
  },
  buttonContainer: {
    height: 48
  },  
  noImagesChosenAlert: {
    alignSelf: 'center',
    position: 'absolute',
    top: '50%'
  },
  addHydrantButton: {
    justifyContent: "center",
    backgroundColor: Colors.primary,
},
addHydrantText: {
    color: "white"
},
});

ExifUploaderScreen.navigationOptions = navData => {
  //const chooseImages = navData.navigation.getParam('chooseImages');
  return {
    headerRight: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Add new"
        iconName="md-images"
        onPress={() => {
          navData.navigation.navigate('ImageBrowser')
        }} />
    </HeaderButtons>)
  }
}

export default ExifUploaderScreen;