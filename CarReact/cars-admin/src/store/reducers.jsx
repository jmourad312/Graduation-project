import * as TYPES from './types'

export default (state = {
    login: false,
    token:""

}, action) => {
    switch (action.type) {
    
        case TYPES.LOGIN:
            return {
                ...state,
                login: action.payload,
            };

            case TYPES.TOKEN:
                return{
                    ...state,
                    token:action.payload
                }






            

        default:
            return state;
    }
};
