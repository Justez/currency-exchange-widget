import parseNum from './parseNum';

export default function calcRates(rate, sum) {
    return parseNum(+rate * +sum);
};