String.prototype.repeat = function (n) {
    var result = "";
    for (var i = 0; i < n; i++)
        result += this;
    return result;
}
console.log("stringI".repeat(3));