import { SET_HYDRANTS } from '../actions/hydrants';

const initialState = {
    hydrants: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_HYDRANTS:
            return {
                hydrants: [...action.hydrants]
            }

    }
    return state;
}