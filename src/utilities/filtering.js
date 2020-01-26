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

export const filterBalanceForPolar = data => {
    if (!data)
        return;

    const single = data[0];
    console.log(data);
    return [single['Cash and cash equivalents'], single['Total debt'], single['Total assets'], single['Total shareholders equity'], single['Retained earnings (deficit)']];
}