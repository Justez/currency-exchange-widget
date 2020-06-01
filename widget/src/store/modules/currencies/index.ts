//@ts-ignore
import { createActions } from 'redux-actions';

export const NAMESPACE = 'currencies';

export const actions = createActions(
  'SET_SELECTED_CURRENCY',
  'FLIP_SELECTED_CURRENCIES',
  { prefix: NAMESPACE },
);
