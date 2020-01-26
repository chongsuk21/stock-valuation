import {
    GET_PROFILE,
    GET_PRICE,
    GET_DCF,
    SET_TICKER,
    GET_QUOTE,
    GET_FINANCIAL_RATIOS,
    GET_FINANCIAL_GROWTH,
    GET_RATING,
    GET_HISTORICAL_PRICES,
    GET_KEY_RATIOS
} from '../actions/constants';
import _ from 'lodash';

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
        case GET_QUOTE:
            return {
                ...state,
                quote: action.payload[0]
            };
        case GET_FINANCIAL_RATIOS:
            return {
                ...state,
                ratios: action.payload
            };
        case GET_FINANCIAL_GROWTH:
            return {
                ...state,
                growth: action.payload
            };
        case GET_RATING:
            return {
                ...state,
                rating: action.payload
            };
        case GET_HISTORICAL_PRICES:
            return {
                ...state,
                histoPrices: action.payload.historical
            };
        case GET_KEY_RATIOS:
            return {
                ...state,
                keyratios: action.payload
            };

        default:
            return state;
    }
}
