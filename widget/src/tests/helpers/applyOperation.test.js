import { add, deduct } from 'helpers/applyOperation';

describe('applyOperation helper', () => {
    test('adds numbers', () => {
        expect(add(1, 2)).toBe(3);
    });

    test('adds string numbers', () => {
        expect(add('1', '2')).toBe(3);
    });

    test('deducts numbers', () => {
        expect(deduct(4, 2)).toBe(2);
    });

    test('deducts string numbers', () => {
        expect(deduct('4', '2')).toBe(2);
    });
});