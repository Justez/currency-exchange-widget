import { CurrencyMap } from './'

export type Pocket = {
    currency: CurrencyMap,
    sum: string;
}

export type Pockets = Array<Pocket>