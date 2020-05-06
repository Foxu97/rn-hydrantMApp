import {
    SET_HYDRANTS,
    SET_NEAREST_HYDRANTS,
    SAVE_PICKED_IMAGE,
    SAVE_IMAGE_TO_UPDATE,
    SET_RANGE,
    SET_AMOUNT,
    SET_EXIF_FILES,
    TOGGLE_EXIF_IMAGE

} from '../actions/hydrants';


const initialState = {
    image: null,
    hydrants: [],
    nearestHydrants: [],
    imageToUpdate: null,
    exifHydrantsImages: [],
    range: 2500,
    amount: 10
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
        case SET_RANGE:
            return {
                ...state,
                range: action.range
            }
        case SET_AMOUNT:
            return {
                ...state,
                amount: action.amount
            }
        case SET_EXIF_FILES:
            return {
                ...state,
                exifHydrantsImages: action.images
            }
        case TOGGLE_EXIF_IMAGE:
            const exifImages = [...state.exifHydrantsImages]
            const index = exifImages.findIndex(image => {
                return image.uri === action.image.uri
            });
            if (index === -1) {
                if (exifImages.length >= 12) {
                    // max 12 files to upload, show error
                    return state
                }
                exifImages.push(action.image)
            } else {
                exifImages.splice(index, 1);
            }
            return {
                ...state,
                exifHydrantsImages: [...exifImages]
            }

        default: return state;
    }
}

export default hydrantsReducer;