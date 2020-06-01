export enum CurrencyExchangeTypes {
    in = 'in',
    out = 'out'
}

export interface Currencies {
    [CurrencyExchangeTypes.in]: CurrencyMap,
    [CurrencyExchangeTypes.out]: CurrencyMap
}

export enum CurrencyMap {
    euro = 'eur',
    dollar = 'usd',
    pound = 'gbp'
}