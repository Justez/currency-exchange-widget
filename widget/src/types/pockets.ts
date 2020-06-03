import { CurrencyMap } from './';

export type Pocket = {
    currency: CurrencyMap;
    sum: number;
    placedSum: number;
}

export type Pockets = Array<Pocket>