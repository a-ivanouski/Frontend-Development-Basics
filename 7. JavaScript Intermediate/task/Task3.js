function process(a, b, c, d, e) {
    return 10000 * a + 1000 * b + 100 * c + 10 * d + e;
}

function schonfinkelize()
{
    var f = arguments[0];

    if (typeof (f) != 'function')
        return;

    return Function.prototype.bind.apply(f, [undefined].concat(Array.prototype.slice.call(arguments, 1, arguments.length)));
}


var newProcess = schonfinkelize(process, 1, 2, 3, 4);
console.log(newProcess(5)); // 12345

console.log(schonfinkelize(process, 1)(2, 3, 4, 5));  // 12345
console.log(schonfinkelize(process, 1, 2)(3, 4, 5));  // 12345
console.log(schonfinkelize(process, 1, 2, 3)(4, 5));  // 12345
console.log(schonfinkelize(process, 1, 2, 3, 4)(5));  // 12345