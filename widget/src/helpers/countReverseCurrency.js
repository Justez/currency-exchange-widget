import parseNum from './parseNum';

export default function countReverseCurrency (rate) {
    return parseNum(1/rate, 4);
};