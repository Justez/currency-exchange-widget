import axios from 'axios'

import { CurrencyRateResponse, CurrencyRateError } from 'types';

const URL = 'https://openexchangerates.org/api/latest.json';

export const getCurrencyRates = () => axios.get(URL, {
    params: {
        app_id: '2b3e9170d55c46fead589f4fdeac1fb8',
    }
})
    .then((res: CurrencyRateResponse) => res.data)
    .catch((err: CurrencyRateError) => err);