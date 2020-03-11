import React, { useEffect } from 'react';
import { ToastAndroid } from 'react-native'
import { useSelector } from 'react-redux';

const Message = props => {
    const message = useSelector(state => state.message.messageObject);
    useEffect(() => {
        if (message) {
            ToastAndroid.show(message.message, ToastAndroid.LONG);
        }
    });
    return (
        null
    )
}
export default Message;