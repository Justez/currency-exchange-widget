import countReverseCurrencyRate from 'helpers/countReverseCurrencyRate';

describe('countReverseCurrencyRate helper', () => {
    test('calculates reverse currency rate', () => {
        expect(countReverseCurrencyRate(1)).toBe(1);
    });

    test('calculates reverse currency rate', () => {
        expect(countReverseCurrencyRate(1.669988)).toBe(0.5988);
    });

    test('handles incorrect params', () => {
        expect(countReverseCurrencyRate('nan')).toBe(0);
    });
});