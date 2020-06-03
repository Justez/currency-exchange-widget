import parseNum from 'helpers/parseNum';

describe('parseNum helper', () => {
    test('parses numbers', () => {
        expect(parseNum(1, 2)).toBe(1.00);
    });

    test('parses string numbers', () => {
        expect(parseNum('1', '2')).toBe(1.00);
    });

    test('parses not numbers', () => {
        expect(parseNum('nan', '2')).toBe(0);
    });

    test('parses numbers', () => {
        expect(parseNum(1, 0)).toBe(1);
    });

    test('parses string numbers', () => {
        expect(parseNum('1', '0')).toBe(1);
    });

    test('consumes float param', () => {
        expect(parseNum(1.56789, '0')).toBe(2);
    });

    test('consumes float param', () => {
        expect(parseNum('1.26789', 2)).toBe(1.27);
    });
});