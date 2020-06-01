//@ts-ignore
import { createActions } from 'redux-actions';

export const NAMESPACE = 'pockets';

export const actions = createActions(
  'SET_POCKET',
  'PLACE_SUM',
  'PLACE_EXCHANGE',
  'SET_PLACED_AMOUNT',
  { prefix: NAMESPACE },
);
