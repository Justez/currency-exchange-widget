import { CurrencyMap } from './';

export type Pocket = {
    currency: CurrencyMap;
    sum: string;
    placedSum: number;
}

export type Pockets = Array<Pocket>