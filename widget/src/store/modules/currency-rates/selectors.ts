import { pathOr } from 'ramda';

import { NAMESPACE } from '.';

export const getCurrencyRates = pathOr(null, [NAMESPACE]);

export const getChecksum = pathOr(null, [NAMESPACE, 'checksum']);