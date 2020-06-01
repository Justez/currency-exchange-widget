//@ts-ignore
import { createActions } from 'redux-actions';

export const NAMESPACE = 'currencyRates';

export const actions = createActions(
  'FLIP_RATES',
  'REGISTER_CHECKSUM',
  'GET_CURRENCY_RATES',
  'GET_CURRENCY_RATES_REQUEST',
  'GET_CURRENCY_RATES_SUCCESS',
  'GET_CURRENCY_RATES_FAILURE',
  'SET_CURRENCY_RATES',
  { prefix: NAMESPACE },
);
