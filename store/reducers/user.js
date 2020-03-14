import { SET_USER_POSITION, FETCH_ADDRESS } from "../actions/user";

const initialState = {
    address: null,
    userPosition: null
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
       case SET_USER_POSITION: 
            return {
                ...state,
                userPosition: {...action.userPosition}
            }
        case FETCH_ADDRESS:
            return {
                ...state,
                address: action.address
            }
    }
    return state;
}
export default userReducer;