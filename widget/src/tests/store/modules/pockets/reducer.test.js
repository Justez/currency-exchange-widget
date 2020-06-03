import { createAction } from 'redux-actions';

import { actions as pocketActions } from 'store/modules/pockets';
import reducer from 'store/modules/pockets/reducer';
import { CurrencyMap } from 'types';

const defaultState = [
    {
        currency: CurrencyMap.euro,
        sum: 868.22,
        placedSum: 4,
    },
    {
        currency: CurrencyMap.pound,
        sum: 102.22,
        placedSum: 12,
    },
]

describe('pockets reducer', () => {
    it('should handle "setPlacedAmount" action', () => {
        const payload = [{
            currency: CurrencyMap.pound,
            sum: 102.22,
            placedSum: 100,
        }]

        const expectedState = [
            {
                currency: CurrencyMap.euro,
                sum: 868.22,
                placedSum: 4,
            },
            payload[0],
        ]

        const state = reducer(defaultState, pocketActions.setPlacedAmount(payload));
        expect(state).toEqual(expectedState);
    });
});
