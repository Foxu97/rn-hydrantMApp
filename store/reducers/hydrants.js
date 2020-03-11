import { SET_HYDRANTS } from '../actions/hydrants';

const initialState = {
    hydrants: []
}

const hydrantsReducer =  (state = initialState, action) => {
    switch (action.type) {
        case SET_HYDRANTS:
            return {
                hydrants: [...action.hydrants]
            }

    }
    return state;
}

export default hydrantsReducer;