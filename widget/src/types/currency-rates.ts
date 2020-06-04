import { CurrencyMap } from 'types';

export type CurrencyRateResponse = {
  data: {
    base: string;
    rates: {
      [key in CurrencyMap]: number;
    };
  }
}

export type CurrencyRateError = {
    error: boolean;
    status: number;
    message: string;
    description: string;
}