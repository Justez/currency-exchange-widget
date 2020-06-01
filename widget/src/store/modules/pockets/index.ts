//@ts-ignore
import { createActions } from 'redux-actions';

export const NAMESPACE = 'pockets';

export const actions = createActions(
  'SET_POCKET',
  'SET_PLACED_SUM',
  { prefix: NAMESPACE },
);
