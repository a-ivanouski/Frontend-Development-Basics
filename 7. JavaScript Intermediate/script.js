//Task 1
String.prototype.repeat = function (count) {
    var _thisStr = Array.prototype.slice.call(this, 0).join('');
    var i, result = '';
    for (i = 0; i < count; i++) {
        result = result.concat(_thisStr)
    }

    return result;
}
console.log("string1".repeat(3));
//Task 2

var fullname = 'John Doe';
var obj = {
    fullname: 'Colin Ihrig', prop: {
        fullname: 'Aurelio De Rosa',
        getFullname: function () {
            return this.fullname;
        }
    }
};
console.log(obj.prop.getFullname());
var test = obj.prop.getFullname;
console.log(test.call(obj.prop));

//Task 3
function process(a, b, c, d, e) {
    return 10000 * a + 1000 * b + 100 * c + 10 * d + e;
}
function schonfinkelize() {
    var arg = Array.prototype.slice.call(arguments, 0);

    function inner() {
        var _arg = Array.prototype.slice.call(arguments, 0);
        return schonfinkelize.apply(this, arg.concat(_arg));
    }

    inner.valueOf = function () {
        if (arg[0] instanceof Function)
            return arg[0].apply(this, arg.slice(1));
    }
    return inner;
}

console.log(schonfinkelize(process, 1)(2, 3, 4, 5));
console.log(schonfinkelize(process, 1, 2)(3, 4, 5));
console.log(schonfinkelize(process, 1, 2, 3)(4, 5));
console.log(schonfinkelize(process, 1, 2, 3, 4)(5));


//Task 4

function actionLogger() {
    var log = '';

    actionLogger.prototype.addRecord = function (value) {
        log += value + '\n';
    }

    actionLogger.prototype.showLog = function () {
        return log;
    }

    actionLogger.prototype.clearLog = function () {
        log = '';
    }
}

var mouseEventLogger = new actionLogger();

mouseEventLogger.logMouseClick = function (clickEvent) {
    this.addRecord(clickEvent);
}

mouseEventLogger.logMouseClick("click1");
mouseEventLogger.logMouseClick("click2");
mouseEventLogger.clearLog();
mouseEventLogger.logMouseClick("click3");
mouseEventLogger.logMouseClick("click4");

console.log(mouseEventLogger.showLog());

var keyboardEventLogger = new actionLogger();

keyboardEventLogger.logButtonPressed = function (buttonPressedEvent) {
    this.addRecord(buttonPressedEvent);
}

keyboardEventLogger.logButtonPressed("button1");
keyboardEventLogger.logButtonPressed("button2");
keyboardEventLogger.clearLog();
keyboardEventLogger.logButtonPressed("button3");
keyboardEventLogger.logButtonPressed("button4");

console.log(keyboardEventLogger.showLog());
