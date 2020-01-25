import {
    GET_PROFILE,
    GET_PRICE,
    GET_DCF,
    SET_TICKER
} from '../actions/constants';

export default (state = {}, action) => {
    switch(action.type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload
            };
        case GET_PRICE:
            return {
                ...state,
                price: action.payload
            };
        case GET_DCF:
            return {
                ...state,
                dcf: action.payload
            };
        case SET_TICKER:
            return {
                ...state,
                ticker: action.payload
            };
        default:
            return state;
    }
}
