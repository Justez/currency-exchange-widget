export default function parseNum(num) {
    const number = +Number.parseFloat(num)
    if (number % 1 > 0) {
        return number.toFixed(2)
    }
    if (isNaN(number)) {
        return 0
    }
    return number
}