//@ts-ignore
import { createActions } from 'redux-actions';

export const NAMESPACE = 'pockets';

export const actions = createActions(
  'SET_POCKET',
  { prefix: NAMESPACE },
);
