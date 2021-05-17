var sum_to_n_a = function (n) {
    let res = 0;
    for (let i = 1; i <= n; i++) {
        res = res + i;
    }
    return res;
};

var sum_to_n_b = function (n) {
    let middle = 1 + n;
    let times = n / 2;
    return middle * times
};

var sum_to_n_c = function (n) {
    const arr = Array.from({length: n}, (v, k) => k + 1)
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let res = arr.reduce(reducer)
    return res
};

module.exports = {sum_to_n_a, sum_to_n_b, sum_to_n_c}
