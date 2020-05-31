import { pathOr } from 'ramda';

import { NAMESPACE } from '.';
import { State } from 'store';

export const getSelectedCurrencies = (state: State) => pathOr(null, [NAMESPACE, NAMESPACE], state);
