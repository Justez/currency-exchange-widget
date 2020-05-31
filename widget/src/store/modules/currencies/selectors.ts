import { pathOr } from 'ramda';

import { NAMESPACE } from '.';

export const getSelectedCurrencies = pathOr(null, [NAMESPACE, NAMESPACE]);
