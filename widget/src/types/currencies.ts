export enum CurrencyExchangeTypes {
    in = 'in',
    out = 'out'
}

export interface Currencies {
    [CurrencyExchangeTypes.in]: string,
    [CurrencyExchangeTypes.out]: string
}

export enum CurrencyMap {
    euro = 'eur',
    dollar = 'usd',
    pound = 'gbp'
}