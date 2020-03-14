export const SET_USER_POSITION = "SET_USER_POSITION";
export const FETCH_ADDRESS = "FETCH_ADDRESS";

export const setUserPosition = (userPosition) => {
    return {
        type: SET_USER_POSITION,
        userPosition
    }
}

export const fetchAddress = (userPosition) => {
    return async dispatch => {
        try {
            const response = await fetch(
            `http://192.168.74.254:8081/hydrant/getAddress/?latitude=${userPosition.latitude}&longitude=${userPosition.longitude}`
            );
            if(!response.ok) {
                dispatch({type: FETCH_ADDRESS, address: "UNKNOWN ADDRESS"});
            }
            const resData = await response.json();
            dispatch({type: FETCH_ADDRESS, address: resData.data})
            
        } catch (err) {
            dispatch({type: FETCH_ADDRESS, address: "UNKNOWN ADDRESS"});
            throw err
        }
    }
}