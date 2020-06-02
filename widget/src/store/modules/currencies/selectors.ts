import { pathOr } from 'ramda';

import { CurrencyExchangeTypes, Currencies } from 'types';
import { NAMESPACE } from '.';

export const getSelectedCurrencies = pathOr(null, [NAMESPACE]);

export const getCurrencyByDirection = (state: Currencies, direction: CurrencyExchangeTypes) => 
    pathOr(null, [direction], state);

export const getOppositeDirection = (direction: CurrencyExchangeTypes): CurrencyExchangeTypes => 
    direction === CurrencyExchangeTypes.in ? CurrencyExchangeTypes.out : CurrencyExchangeTypes.in;