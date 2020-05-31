import { pathOr } from 'ramda';

import { NAMESPACE } from '.';

export const getPockets = pathOr(null, [NAMESPACE, NAMESPACE]);
