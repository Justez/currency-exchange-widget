import calcAmountByRate from 'helpers/calcAmountByRate';

describe('calcAmountByRate helper', () => {
    test('calculates amount', () => {
        expect(calcAmountByRate(1, 2)).toBe(2);
    });

    test('calculates amount with float rate', () => {
        expect(calcAmountByRate('1.7722', '2')).toBe(3.54);
    });

    test('handles incorrect params', () => {
        expect(calcAmountByRate('nan', '2')).toBe(0);
    });
});