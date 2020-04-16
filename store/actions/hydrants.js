export const SET_HYDRANTS = "SET_HYDRANTS";
export const SET_NEAREST_HYDRANTS = "SET_NEAREST_HYDRANTS";
export const ADD_HYDRANT = "ADD_HYDRANT";
export const SAVE_PICKED_IMAGE = "SAVE_PICKED_IMAGE";
export const SAVE_IMAGE_TO_UPDATE = "SAVE_IMAGE_TO_UPDATE"

import * as messageActions from './message';
import { createFormData } from '../../utils/createFormData';


export const fetchHydrants = (lat, lng, showMessage = true) => {
    return async dispatch => {
        try {
            const res = await fetch(`http://192.168.74.254:8081/hydrant/?latitude=${lat}&longitude=${lng}`);
            const json = await res.json();
            dispatch({ type: SET_HYDRANTS, hydrants: json.data });

            const nearestHydrants = await fetch(`http://192.168.74.254:8081/hydrant/nearest/?latitude=${lat}&longitude=${lng}&amount=10`) //chwilowo
            const nearestHydrantsJson = await nearestHydrants.json();
            dispatch({type: SET_NEAREST_HYDRANTS, nearestHydrants: nearestHydrantsJson.data});
            if (showMessage) {
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
        try {
            let reqBody = null;
            if (image) {
                reqBody = { body: createFormData(image, null) }
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

export const savePickedImage = image => {
    return {
        type: SAVE_PICKED_IMAGE,
        image
    }
}
export const saveImageToUpdate = image => {
    return {
        type: SAVE_IMAGE_TO_UPDATE,
        image
    }
}


export const uploadHydrantImage = (userPosition, image, hydrantId) => {
    return async dispatch => {
        try {
            const body = {
                latitude: userPosition.latitude,
                longitude: userPosition.longitude,
                hydrantID: hydrantId
            }
            const reqBody = { body: createFormData(image, body) }
            const response = await fetch(
                `http://192.168.74.254:8081/hydrant/image`,
                {
                    method: 'PUT',
                    ...reqBody
                }
            );
            const resData = await response.json()
            dispatch(messageActions.setMessage(resData.message));
        } catch(err) {
            console.log(err);
            dispatch(messageActions.setMessage(err.message));
        }
    }
}
