import { CurrencyMap } from './'

export type Pocket = {
    currency: CurrencyMap,
    sum: string;
    placedSum: string;
}

export type Pockets = Array<Pocket>