export const SET_USER_POSITION = "SET_USER_POSITION";

export const setUserPosition = (userPosition) => {
    return {
        type: SET_USER_POSITION,
        userPosition
    }
}