export const SET_HYDRANTS = "SET_HYDRANTS";
export const ADD_HYDRANT = "ADD_HYDRANT";
export const SAVE_PICKED_IMAGE = "SAVE_PICKED_IMAGE";
export const SAVE_PICKED_IMAGE_URI = "SAVE_PICKED_IMAGE_URI";

import * as messageActions from './message';
import { createFormData } from '../../utils/createFormData';


export const fetchHydrants = (lat, lng, showMessage = true) => {
    return async dispatch => {
        try {
            const res = await fetch(`http://192.168.74.254:8081/hydrant/?latitude=${lat}&longitude=${lng}`);
            const json = await res.json();
            dispatch({ type: SET_HYDRANTS, hydrants: json.data });
            if (showMessage){
                dispatch(messageActions.setMessage(json.message));
            }
            if (!res.ok) {
                throw new Error(json.message);
            }
        }
        catch (err) {
            dispatch(messageActions.setMessage(err.message))
        }
    }
}

export const addHydrantWithPhoto = (hydrantPosition, image = null) => {
    return async dispatch => {
        try{
            let reqBody = null;
            if (image) {
                reqBody = {body: createFormData(image)}
            }
            const response = await fetch(
                `http://192.168.74.254:8081/hydrant/?latitude=${hydrantPosition.latitude}&longitude=${hydrantPosition.longitude}`,
                {
                    method: 'POST',
                    ...reqBody
                }
            );
            const resData = await response.json()
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