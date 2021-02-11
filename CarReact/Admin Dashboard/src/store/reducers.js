import * as TYPES from './types'

export default (state = {
    login: false,
    token: "",
    users: [],
    vendors: [],
    countData:{},
    products:[],

}, action) => {
    switch (action.type) {

        case TYPES.LOGIN:
            return {
                ...state,
                login: action.payload,
            };

        case TYPES.TOKEN:
            return {
                ...state,
                token: action.payload
            };

        case TYPES.GET_USERS:
            return {
                ...state,
                users: action.payload
            };

        case TYPES.GET_VENDORS:
            return {
                ...state,
                vendors: action.payload
            }
        case TYPES.GET_COUNT_DATA:
            return {
                ...state,
                countData: action.payload
            }

            case TYPES.GET_PRODUCTS:
                return {
                    ...state,
                    products: action.payload
                }


            


        default:
            return state;
    }
};
