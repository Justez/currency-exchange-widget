import { pathOr } from 'ramda';

import { NAMESPACE } from '.';

export const getCurrencyRates = () => pathOr(null, [NAMESPACE, NAMESPACE]);
