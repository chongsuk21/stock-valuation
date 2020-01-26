import _ from 'lodash';

export const filterFinancialsForRevenue = data => {
    return _.map(data, rev => {
        return parseFloat(rev.Revenue);
    }).reverse();
};

export const filterFinancialsForDate = data => {
    return _.map(data, fin => {
        return fin.date;
    }).reverse();
};

export const filterFinancialsForNetIncome = data => {
    return _.map(data, rev => {
        return parseFloat(rev["Net Income"]);
    }).reverse();
};

export const filterFinancialsForEPS = data => {
    return _.map(data, rev => {
        return parseFloat(rev.EPS);
    }).reverse();
};

// Cashflow

export const filterCashflowForDate = data => {
    return _.map(data, fin => {
        return fin.date;
    }).reverse();
};

export const filterCashflowForNetcashflow = data => {
    return _.map(data, cf => {
        return parseFloat(cf["Net cash flow / Change in cash"]);
    }).reverse();
};
