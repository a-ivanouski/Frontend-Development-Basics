$.widget('task.logger', {

    options: {
        actionLogger: null,
    },

    _create: function () {
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

        this.options.actionLogger = new ActionLogger();

        var mouseEventLogger = new MouseEventLogger();

        var keyboardEventLogger = new KeyboardEventLogger();

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
    },

    _ActionLogger: function () {
        this.log = [];

        this.showLog = function(){
            $.each(this.log, function (i, v) {
                console.log(v)
            });
        }

        this.addRecord = function(r){
            this.log.shift(r);
        }

        this.clearlog = function()
        {
            this.log = [];
        }
    },

    _MouseEventLogger: function () {
        this.log = [];

        this.logMouseClick = function(e){
            this.log.shift(e);
        }
    },

    _KeyboardEventLogger: function () {
        this.log = [];

        this.logButtonPressed = function (e) {
            this.log.shift(e);
        }
    }
});