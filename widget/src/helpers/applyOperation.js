import parseNum from './parseNum';

export function add(num1, num2) {
    return parseNum(+num1) + parseNum(+num2);
};

export function deduct(num1, num2) {
    return parseNum(+num1) - parseNum(+num2);
};