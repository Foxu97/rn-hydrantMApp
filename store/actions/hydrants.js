export const SET_HYDRANTS = "SET_HYDRANTS";
export const ADD_HYDRANT = "ADD_HYDRANT";
export const SAVE_PICKED_IMAGE = "SAVE_PICKED_IMAGE";
export const SAVE_PICKED_IMAGE_URI = "SAVE_PICKED_IMAGE_URI";

import * as messageActions from './message';
import { createFormData } from '../../utils/createFormData';


export const fetchHydrants = (lat, lng) => {
    return async dispatch => {
        try {
            const res = await fetch(`http://192.168.74.254:8081/hydrant/?latitude=${lat}&longitude=${lng}.json`);
            const json = await res.json();
            if (!res.ok) {
                throw new Error(json.message);
            }

            if (json.data){
                dispatch({ type: SET_HYDRANTS, hydrants: json.data });
                dispatch(messageActions.setMessage(json.message))
            } else {
                dispatch(messageActions.setMessage(json.message))
            }
        }
        catch (err) {
            dispatch(messageActions.setMessage(err.message))
        }
    }
}

export const addHydrantPosition = hydrantPosition => {
    return async dispatch => {
        try {
            const response = await fetch(
                'http://192.168.74.254:8081/hydrant',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(hydrantPosition)
                }
            );
            const resData = await response.json();
            console.log(resData.message)
            if(response.ok){
                dispatch({type: ADD_HYDRANT, hydrant: resData});
            }
            dispatch(messageActions.setMessage(resData.message));
        } catch (err) {
            console.log(err)
            dispatch(messageActions.setMessage("error kurwa "))
        }

    }
}
export const addHydrantWithPhoto = (hydrantPosition, image) => {
    return async dispatch => {
        try{
            const response = await fetch(
                `http://192.168.74.254:8081/hydrant/?latitude=${hydrantPosition.latitude}&longitude=${hydrantPosition.longitude}`,
                {
                    method: 'POST',
                    body: createFormData(image)
                }
            );
            const resData = await response.json()
            //console.log(resData)
            dispatch(messageActions.setMessage(resData.message));
        } catch (err) {
            console.log(err)
            dispatch(messageActions.setMessage(err.message));
        }
    }
}

export const savePickedImageUri = imageUri => {
    return {type: SAVE_PICKED_IMAGE_URI, imageUri: imageUri}
}
export const savePickedImage = image => {
    return {type: SAVE_PICKED_IMAGE, image: image}
}