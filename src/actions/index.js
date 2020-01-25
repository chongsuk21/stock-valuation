import axios from 'axios';
import _ from 'lodash';
import { parseCoin } from '../utilities/ParseCoin';

import {
    GET_PROFILE,
    GET_PRICE,
    GET_DCF,
    SET_TICKER
} from './constants';

import config from '../config/config';

export const getProfile = ticker => {
    return async dispatch => {
        let profile = await axios.get(`https://financialmodelingprep.com/api/v3/company/profile/${ticker}`);
        dispatch({type: GET_PROFILE, payload: profile.data});
    }
};

export const getPrice= ticker => {
    return async dispatch => {
        let price = await axios.get(`https://financialmodelingprep.com/api/v3/stock/real-time-price/${ticker}`);
        dispatch({type: GET_PRICE, payload: price.data});
    }
};

export const getDcf= ticker => {
    return async dispatch => {
        let dcf = await axios.get(`https://financialmodelingprep.com/api/v3/company/discounted-cash-flow/${ticker}`);
        dispatch({type: GET_DCF, payload: dcf.data});
    }
};

/*Tickers */

export const setTicker= ticker => {
    return async dispatch => {
        dispatch({type: SET_TICKER, payload: ticker});
    }
};
