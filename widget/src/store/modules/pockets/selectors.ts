import { pathOr, find, pipe, propEq } from 'ramda';

import { NAMESPACE } from '.';

import { CurrencyMap, Pockets } from 'types'

export const getPockets = pathOr(null, [NAMESPACE]);

export const filterPocketByCurrency = (state: Pockets, currency: CurrencyMap) => pipe(
    find(propEq('currency', currency))
)(state)

export const getPocketByCurrency = (state: Pockets, currency: CurrencyMap) => pipe(
    pathOr(null, [NAMESPACE]),
    find(propEq('currency', currency))
)(state)