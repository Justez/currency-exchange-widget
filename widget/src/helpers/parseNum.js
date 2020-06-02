export default function parseNum(num, float=2) {
    const number = +Number.parseFloat(num);
    
    if (number % 1 > 0) {
        return number.toFixed(float);
    }
    if (isNaN(number)) {
        return 0;
    }
    return number;
};