import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import {
    calcWithdrawAmount,
    placeSumFlow,
    placeExchangeFlow,
    placeAllFlow,
    flipRatesFlow,
} from 'store/modules/pockets/sagas';
import { getPockets, getPocketByCurrency } from 'store/modules/pockets/selectors';
import { actions } from 'store/modules/pockets';
import { CurrencyExchangeTypes, CurrencyMap } from 'types';

describe('calcWithdrawAmount', () => {
    describe('happy path', () => {
        it('should dispatch appropiate actions with correct arguments', async () => {
            await expectSaga(calcWithdrawAmount)
                .dispatch(actions.setPlacedAmount);
        });
    });
});

describe('placeSumFlow', () => {
    describe('happy path', () => {
        it('should dispatch appropiate actions with correct arguments', async () => {
            await expectSaga(placeSumFlow)
                .take('PLACE_SUM')
                .dispatch(actions.setPlacedAmount)

        });
    });
});

describe('placeExchangeFlow', () => {
    describe('happy path', () => {
        it('should dispatch appropiate actions with correct arguments', async () => {
            await expectSaga(placeExchangeFlow)
                .put(actions.placeExchangeRequest)
                .put(actions.setPlacedAmount)
                .put(actions.placeExchangeSuccess)
                .not.put(actions.placeExchangeFailure)
        });
    });
    describe('sad path', () => {
        it('should dispatch appropiate actions with correct arguments', async () => {
            await expectSaga(placeExchangeFlow)
                .put(actions.placeExchangeRequest)
                .not.put(actions.setPlacedAmount)
                .not.put(actions.placeExchangeSuccess)
                .put(actions.placeExchangeFailure)
        });
    });
});

describe('placeAllFlow', () => {
    describe('happy path', () => {
        it('should dispatch appropiate actions with correct arguments', async () => {
            await expectSaga(placeAllFlow)
                .put(actions.placeSum)
        });
    });
});

describe('flipRatesFlow', () => {
    describe('happy path', () => {
        it('should dispatch appropiate actions with correct arguments', async () => {
            await expectSaga(flipRatesFlow)
                .put(actions.setPlacedAmount)
        });
    });
});