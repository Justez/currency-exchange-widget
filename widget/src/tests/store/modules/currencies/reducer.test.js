import { createAction } from 'redux-actions';

import { CurrencyExchangeTypes, CurrencyMap } from 'types';
import { actions as currencyActions } from 'store/modules/currencies';
import reducer, { defaultState } from 'store/modules/currencies/reducer';

describe('currencies reducer', () => {
    it('should return default state if action is irrelevant', () => {
        const irrelevantAction = createAction('test');
        const state = reducer(undefined, irrelevantAction());
        expect(state).toEqual(defaultState);
    });

    it('should handle "setSelectedCurrency" action', () => {
        const payload = { [CurrencyExchangeTypes.in]: CurrencyMap.pound, }
        const expectedState = { ...defaultState, ...payload };

        const state = reducer(undefined, currencyActions.setSelectedCurrency(payload));
        expect(state).toEqual(expectedState);
    });

    it('should handle "flipSelectedCurrencies" action', () => {
        const expectedState = {
            in: CurrencyMap.euro,
            out: CurrencyMap.pound,
        };

        const state = reducer(undefined, currencyActions.flipSelectedCurrencies());
        expect(state).toEqual(expectedState);
    });
});
