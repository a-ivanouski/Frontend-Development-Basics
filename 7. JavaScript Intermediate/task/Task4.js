var Project = {};

Project.loggerProvider = function () {
    function ActionLogger() {
        this.log = [];

        var self = this;

        this.showLog = function () {
            $.each(this.log, function (i, v) {
                console.log(v)
            });
        }

        this.addRecord = function (r) {
            this.log.unshift(r);
        }

        this.clearlog = function () {
            this.log = [];
        }
    };

    function MouseEventLogger() {
        this.log = [];

        this.logMouseClick = function (e) {
            this.log.unshift("X:" + e.offsetX + " Y:" + e.offsetX);
        }
    };

    function KeyboardEventLogger() {
        this.log = [];

        this.logButtonPressed = function (e) {
            this.log.unshift("KeyCode:" + e.keyCode);
        }
    };

    MouseEventLogger.prototype = new ActionLogger();

    KeyboardEventLogger.prototype = new ActionLogger();

    return {
        getMouseEventLogger: function () {
            return new MouseEventLogger();
        },
        getActionLogger: function () {
            return new ActionLogger();
        },
        getKeyboardEventLogger: function () {
            return new KeyboardEventLogger();
        }
    }
}

$.widget('task.logger', {

    options: {
        actionLogger: null,
    },

    _create: function () {
        var loggers = Project.loggerProvider();

        this.options.actionLogger = loggers.getActionLogger();

        var mouseEventLogger = loggers.getMouseEventLogger();

        var keyboardEventLogger = loggers.getKeyboardEventLogger();

        this.element.on('click', function (e) {
            mouseEventLogger.logMouseClick(e);
            mouseEventLogger.showLog();
            mouseEventLogger.clearlog();
        });

        this.element.on('keypress', function (e) {
            keyboardEventLogger.logButtonPressed(e);
            keyboardEventLogger.showLog();
            keyboardEventLogger.clearlog();
        });
    }
});