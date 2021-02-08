import * as TYPES from './types'

export default (state = {
    login: false,

}, action) => {
    switch (action.type) {
    
        case TYPES.LOGIN:
            return {
                ...state,
                login: action.payload,
            };






            

        default:
            return state;
    }
};
