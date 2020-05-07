import {
    SET_IS_LOADING
} from '../actions/ui';

const initialState = {
    isLoading: false
}

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_LOADING:
            return {
                isLoading: action.isLoading
            }
    }
    return state;
}
export default uiReducer;