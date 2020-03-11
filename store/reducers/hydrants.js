import { SET_HYDRANTS, ADD_HYDRANT } from '../actions/hydrants';

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