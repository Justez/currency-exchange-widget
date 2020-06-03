import { createActions } from 'redux-actions';

export const NAMESPACE = 'pockets';

export const actions = createActions(
  'PLACE_SUM',
  'PLACE_ALL',
  'PLACE_EXCHANGE',
  'PLACE_EXCHANGE_REQUEST',
  'PLACE_EXCHANGE_SUCCESS',
  'PLACE_EXCHANGE_FAILURE',
  'SET_PLACED_AMOUNT',
  { prefix: NAMESPACE },
);
