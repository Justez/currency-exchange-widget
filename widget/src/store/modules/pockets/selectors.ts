import { pathOr } from 'ramda';

import { NAMESPACE } from '.';
import { State } from 'store';

export const getPockets = (state: State) => pathOr(null, [NAMESPACE, NAMESPACE], state);
