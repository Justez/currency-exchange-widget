import { createAction } from 'redux-actions';

import reducer, { defaultState } from 'store/modules/currency-rates/reducer';
import { actions as currencyRatesActions } from 'store/modules/currency-rates';

describe('currency-rates reducer', () => {
    it('should return default state if action is irrelevant', () => {
        const irrelevantAction = createAction('test');
        const state = reducer(undefined, irrelevantAction());

        expect(state).toEqual(defaultState);
    });

    it('should handle "setCurrencyRates" action', () => {
        const payload = { rate: 10, reverse: 5 }
        const expectedState = { ...defaultState, ...payload };

        const state = reducer(undefined, currencyRatesActions.setCurrencyRates(payload));
        expect(state).toEqual(expectedState);
    });

    it('should handle "flipRates" action', () => {
        const expectedState = { rate: 5, reverse: 10 };

        const state = reducer({ rate: 10, reverse: 5 }, currencyRatesActions.flipRates());
        expect(state).toEqual(expectedState);
    });

    it('should handle "resetRates" action', () => {
        const state = reducer(undefined, currencyRatesActions.resetRates());
        expect(state).toEqual(defaultState);
    });
});
