import {
    SET_HYDRANTS,
    SET_NEAREST_HYDRANTS,
    SAVE_PICKED_IMAGE,
    SAVE_IMAGE_TO_UPDATE

} from '../actions/hydrants';

const initialState = {
    image: null,
    hydrants: [],
    nearestHydrants: [],
    imageToUpdate: null
}

const hydrantsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_HYDRANTS:
            return {
                ...state,
                hydrants: [...action.hydrants]
            }
        case SET_NEAREST_HYDRANTS:
                return {
                    ...state,
                    nearestHydrants: [...action.nearestHydrants]
                }
        case SAVE_PICKED_IMAGE:
            return {
                ...state,
                image: action.image
            }
        case SAVE_IMAGE_TO_UPDATE:
            return {
                ...state,
                imageToUpdate: action.image
            }
    }
    return state;
}

export default hydrantsReducer;