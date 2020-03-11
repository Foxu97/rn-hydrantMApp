import { SET_USER_POSITION } from "../actions/user";

const initialState = {
    userPosition: null
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
       case SET_USER_POSITION: 
       console.log("setting user position:", action.userPosition)
            return {
                userPosition: {...action.userPosition}
            }
    }
    return state;
}
export default userReducer;