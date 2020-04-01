import { SET_MAP_REGION, TOGGLE_HYDRANT_MODAL } from "../actions/app";

const initialState = {
    region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MAP_REGION:
            return {
                ...state,
                region: action.region
            }
    }

    return state;
}
export default appReducer;