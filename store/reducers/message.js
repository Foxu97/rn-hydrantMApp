import { SET_MESSAGE } from "../actions/message";

const initialState = {
    messageObject: null
}

const messageReducer = (state = initialState, action) => {
    switch(action.type) {
       case SET_MESSAGE: 
            return {
                messageObject: new Object({
                    message: action.message
                })
            }
    }
    return state;
}
export default messageReducer;