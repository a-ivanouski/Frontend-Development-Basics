var myFramework = myFramework || {};

(function initApp() {
    var scope = myFramework.scope = this;

    var element = scope.targetElement = document.querySelectorAll('[my-framework]')[0];

    if (!element)
        return;

    var watchers = [];

    function evalExpresion(exp, context) {
        var result;
        with (context) {
            try{
                result = eval(exp);
            }catch(err){
                result = '';
            }
        }

        return result;
    }

    function getAlltextNodes(node) {
        var all = [];
        for (node = node.firstChild; node; node = node.nextSibling) {
            if (!node.hasAttribute || !node.hasAttribute('my-repeat')) {
                if (node.nodeType == 3) all.push(node);
                else all = all.concat(getAlltextNodes(node));
            }
        }
        return all;
    }

    textNodes = getAlltextNodes(element);


    function registerExpresionWatchers(el, context) {
        var textNodes = [];

        textNodes = getAlltextNodes((el || element));

        var expresionWatcherRegex = /\{\{[^}.]*\}\}/g;

        var processExpresion = function (expParams, exprResults) {
            var expr = expParams.initalContent.match(expresionWatcherRegex);

            var content = expParams.initalContent;

            for (var i = 0; i < expr.length; i++) {
                var content = content.replace(expr[i], exprResults[i]);
            }

            expParams.node.textContent = content;
        }

        var registerExpresionWatcher = function (node) {
            var expr = node.textContent.match(expresionWatcherRegex);

            expr.map(function (exp) { return exp.slice(2, exp[0].length - 2); });

            watchers.push({ node: node, expresions: expr, initalContent: node.textContent, watcherType: 'expWatcher', processExpresionCallback: processExpresion, context: context });
        }

        for (var i = 0; i < textNodes.length; i++) {
            if (expresionWatcherRegex.test(textNodes[i].textContent))
            {
                registerExpresionWatcher(textNodes[i]);
            }
        }
    }

    function applyExpresionWatchers(el, context) {
        var textNodes = [];

        textNodes = getAlltextNodes(el || element);

        var expresionWatcherRegex = /\{\{[^}.]*\}\}/g;

        var processExpresion = function (expParams, exprResults) {
            var expr = expParams.initalContent.match(expresionWatcherRegex);

            var content = expParams.initalContent;

            for (var i = 0; i < expr.length; i++) {
                var content = content.replace(expr[i], exprResults[i]);
            }

            expParams.node.textContent = content;
        }

        var registerExpresionWatcher = function (node) {
            var expr = node.textContent.match(expresionWatcherRegex);

            expr.map(function (exp) { return exp.slice(2, exp[0].length - 2); });

            var expResults = [];

            for (var i = 0; i < expr.length; i++) {
                expResults.push(evalExpresion(expr[i], context || scope));
            }

            processExpresion({ node: node, expresions: expr, initalContent: node.textContent }, expResults);
        }

        for (var i = 0; i < textNodes.length; i++) {
            if (expresionWatcherRegex.test(textNodes[i].textContent)) {
                registerExpresionWatcher(textNodes[i]);
            }
        }
    }

    function registerModelWatchers() {
        var nodes = element.querySelectorAll('input[my-model]');

        var processExpresion = function (expParams, exprResults) {
            expParams.node.value = exprResults[0];
        }

        var registerModelWatcher = function (node) {
            node.onkeyup = function () {
                evalExpresion(node.getAttribute('my-model') + '=' + '"' + node.value + '"', scope);

                renderLoop();
            };

            node.value = evalExpresion(node.getAttribute('my-model'), scope);

            watchers.push({ node: node, expresions: [node.getAttribute('my-model')], initalContent: node.value, watcherType: 'modelWatcher', processExpresionCallback: processExpresion });
        }

        for (var i = 0; i < nodes.length; i++) {
            registerModelWatcher(nodes[i]);
        }
    }

    function registerShowWatchers() {
        var nodes = element.querySelectorAll('[my-show]');

        var processExpresion = function (expParams, exprResults) {
            if (!exprResults[0]) {
                expParams.node.classList.add('my-framework-hide');
            } else {
                expParams.node.className = expParams.node.className.replace('my-framework-hide', '');
            }
        }

        var registerShowWatcher = function (node) {
            watchers.push({ node: node, expresions: [node.getAttribute('my-show')], initalContent: '', watcherType: 'showWatcher', processExpresionCallback: processExpresion });
        }

        for (var i = 0; i < nodes.length; i++) {
            registerShowWatcher(nodes[i]);
        }
    }

    function registerClickWatchers(el, context) {
        var nodes = (el || element).querySelectorAll('[my-click]');

        var registerClickWatcher = function (node) {
            node.onclick = function (event) {
                var expr = node.getAttribute('my-click');

                scope.event = event;

                evalExpresion(expr, context || scope);

                renderLoop();
            }
        }

        for (var i = 0; i < nodes.length; i++) {
            registerClickWatcher(nodes[i]);
        }
    }

    function registerChangeWatchers(el, context) {
        var nodes = (el || element).querySelectorAll('[my-change]');

        var registerChangeWatcher = function (node) {
            node.onchange= function (event) {
                var expr = node.getAttribute('my-change');

                scope.event = event;

                evalExpresion(expr, context || scope);

                renderLoop();
            }
        }

        for (var i = 0; i < nodes.length; i++) {
            registerChangeWatcher(nodes[i]);
        }
    }

    function registerRepeatWatchers(el, context) {
        var nodes = (el || element).querySelectorAll('[my-repeat]');

        var processExpresion = function (expParams, exprResults) {
            var arr = exprResults[0];

            expParams.parent.innerHTML = '';

            for (var i = 0; i < arr.length; i++) {
                var clone = expParams.node.cloneNode();

                clone.innerHTML = expParams.node.innerHTML;

                clone.removeAttribute('my-repeat');

                applyExpresionWatchers(clone, arr[i]);
                registerClickWatchers(clone);
                applyHrefWatchers(clone, arr[i]);

                expParams.parent.appendChild(clone);
            }
        }

        var registerRepeatWatcher = function (node) {
            var parent = node.parentNode;

            parent.removeChild(node)
            
            watchers.push({ node: node, expresions: [node.getAttribute('my-repeat')], initalContent: node, watcherType: 'showWatcher', processExpresionCallback: processExpresion, parent: parent });
        }

        for (var i = 0; i < nodes.length; i++) {
            registerRepeatWatcher(nodes[i]);
        }
    }

    function registerHrefWatchers() {
        var nodes = element.querySelectorAll('[my-href]');

        var processExpresion = function (expParams, exprResults) {
            expParams.node.setAttribute('href', exprResults[0]);
        }

        var registerShowWatcher = function (node) {
            watchers.push({ node: node, expresions: [node.getAttribute('my-href')], initalContent: '', watcherType: 'hrefWatcher', processExpresionCallback: processExpresion });
        }

        for (var i = 0; i < nodes.length; i++) {
            registerShowWatcher(nodes[i]);
        }
    }

    function applyHrefWatchers(el, context) {
        var nodes = (el || element).querySelectorAll('[my-href]');

        var processExpresion = function (expParams, exprResults) {
            expParams.node.setAttribute('href', exprResults);
        }

        var registerShowWatcher = function (node) {
            processExpresion({ node: node }, evalExpresion(node.getAttribute('my-href'), context || scope));
        }

        for (var i = 0; i < nodes.length; i++) {
            registerShowWatcher(nodes[i]);
        }
    }

    function renderLoop () {
        var processWatcher = function (watcher) {
            var expResults = [];

            for (var i = 0; i < watcher.expresions.length; i++) {
                expResults.push(evalExpresion(watcher.expresions[i], watcher.context || scope));
            }

            watcher.processExpresionCallback(watcher, expResults);
        }

        for (var i = 0; i < watchers.length; i++) {
            processWatcher(watchers[i]);
        }
    }

    scope.createMyCallback = function (fn) {
        return function (data) {
            fn(data);
            renderLoop();
        }
    }

    myFramework.initScope = function (fn) {
        fn(myFramework.scope);
        renderLoop();
    }

    registerExpresionWatchers();
    registerModelWatchers();
    registerShowWatchers();
    registerClickWatchers();
    registerRepeatWatchers();
    registerHrefWatchers();
    registerChangeWatchers();
})();