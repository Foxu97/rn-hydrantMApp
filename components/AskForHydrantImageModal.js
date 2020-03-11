import React, { useState } from "react";
import {Modal, Text, TouchableHighlight, View, Alert, StyleSheet} from 'react-native';

const AskForHydrantImageModal = props => {
    const [modalVisible, setModalVisible] = useState(false);
    const setModalVisibleHandler = (visible) => {
        setModalVisible(visible)
    }
    return (
        <View style={styles.modalContainer}>
        <Modal
            presentationStyle="overFullScreen"
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.modal}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
                    setModalVisibleHandler(!modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            setModalVisible(true);
          }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>
      </View>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: 'flex-end',
        flexDirection: "column-reverse"
    },
    modal: {
        alignItems: 'flex-end',
        height: 200,
        backgroundColor: '#ff6200'
    }
})

export default AskForHydrantImageModal;