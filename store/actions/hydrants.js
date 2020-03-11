export const SET_HYDRANTS = "SET_HYDRANTS";
export const ADD_HYDRANT = "ADD_HYDRANT";

import * as messageActions from './message';


export const fetchHydrants = (lat, lng) => {
    return async dispatch => {
        try {
            const res = await fetch(`http://192.168.74.254:8081/hydrant/?latitude=${lat}&longitude=${lng}.json`);
            if (!res.ok) {
                throw new Error('Something went wrong!');
            }
            const json = await res.json();
            dispatch({ type: SET_HYDRANTS, hydrants: json.data });
            dispatch(messageActions.setMessage(json.message))
        }
        catch (err) {
            dispatch(messageActions.setMessage(err))
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
            if(response.ok){
                dispatch({type: ADD_HYDRANT, hydrant: resData})
                //dispatch(messageActions.setMessage(resData.message));
            }


            dispatch(messageActions.setMessage(resData.message));

            console.log("resData: ", resData)
        } catch (err) {
            dispatch(messageActions.setMessage(err.toString()))
        }

    }
}