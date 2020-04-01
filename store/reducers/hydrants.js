import {
    SET_HYDRANTS,
    SAVE_PICKED_IMAGE,
    SAVE_PICKED_IMAGE_URI

} from '../actions/hydrants';

const initialState = {
    imageURI: null,
    image: null,
    hydrants: []
}

const hydrantsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_HYDRANTS:
            return {
                ...state,
                hydrants: [...action.hydrants]
            }
        case SAVE_PICKED_IMAGE_URI:
            return {
                ...state,
                imageURI: action.imageUri
            }
        case SAVE_PICKED_IMAGE:
            return {
                ...state,
                image: action.image
            }
    }
    return state;
}

export default hydrantsReducer;