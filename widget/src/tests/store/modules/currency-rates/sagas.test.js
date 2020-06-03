import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import { getCurrencyRates } from 'api/currency-rates';
import { getCurrencyRatesFlow } from 'store/modules/currency-rates/sagas';
import { actions as currencyRatesActions } from 'store/modules/currency-rates/';
import { CurrencyMap } from 'types';

describe('getCurrencyRatesFlow', () => {
    describe('happy path', () => {
        it('should dispatch appropiate actions with correct arguments', async () => {
            const response = {
                data: {
                    rates: {
                        [CurrencyMap.usd]: 1.22,
                    },
                }
            }

            await expectSaga(getCurrencyRatesFlow)
                .provide([[matchers.call.fn(getCurrencyRates), response]])
                .put(currencyRatesActions.getCurrencyRatesRequest())
                .call(getCurrencyRates)
                .dispatch(currencyRatesActions.setCurrencyRates({ rate: response.data.rates[CurrencyMap.usd], reverse: 0.88 }))
                .put(currencyRatesActions.getCurrencyRatesSuccess())
                .delay(10000)
                .put(currencyRatesActions.getCurrencyRates())
                .not.put(currencyRatesActions.getCurrencyRatesFailure())
        });
    });

    describe('sad path', () => {
        it('should dispatch appropiate actions with correct arguments', async () => {
            const response = {
                error: {
                  message: 'test',
                  apiErrors: [
                    {
                      message: 'error',
                    },
                  ],
                },
              };

            await expectSaga(getCurrencyRatesFlow)
                .provide([[matchers.call.fn(getCurrencyRates), response]])
                .put(currencyRatesActions.getCurrencyRatesRequest())
                .call(getCurrencyRates)
                .put(currencyRatesActions.getCurrencyRatesFailure())
                .dispatch(currencyRatesActions.setCurrencyRates({ rate: '', reverse: '' }))
                .not.put(currencyRatesActions.getCurrencyRatesSuccess())
                .not.delay(10000)
        });
    });
});
