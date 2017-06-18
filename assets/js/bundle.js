/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.qs = qs;
exports.$on = $on;
exports.$delegate = $delegate;
exports.debounce = debounce;
/**
 * querySelector wrapper
 *
 * @param {string} selector Selector to query
 * @param {Element} [scope] Optional scope element for the selector
 */
function qs(selector, scope) {
  return (scope || document).querySelector(selector);
}

/**
 * addEventListener wrapper
 *
 * @param {Element|Window} target Target Element
 * @param {string} type Event name to bind to
 * @param {Function} callback Event callback
 * @param {boolean} [capture] Capture the event
 */
function $on(target, type, callback, capture) {
  target.addEventListener(type, callback, !!capture);
}

/**
 * Attach a handler to an event for all elements matching a selector.
 *
 * @param {Element} target Element which the event must bubble to
 * @param {string} selector Selector to match
 * @param {string} type Event name
 * @param {Function} handler Function called when the event bubbles to target
 *                           from an element matching selector
 * @param {boolean} [capture] Capture the event
 */
function $delegate(target, selector, type, handler, capture) {
  var dispatchEvent = function dispatchEvent(event) {
    var targetElement = event.target;
    var potentialElements = target.querySelectorAll(selector);
    var i = potentialElements.length;

    while (i--) {
      if (potentialElements[i] === targetElement) {
        handler.call(targetElement, event);
        break;
      }
    }
  };

  $on(target, type, dispatchEvent, !!capture);
}

/**
 * Encode less-than and ampersand characters with entity codes to make user-
 * provided text safe to parse as HTML.
 *
 * @param {string} s String to escape
 *
 * @returns {string} String with unsafe characters escaped with entity codes
 */
var escapeForHTML = exports.escapeForHTML = function escapeForHTML(s) {
  return s.replace(/[&<]/g, function (c) {
    return c === '&' ? '&amp;' : '&lt;';
  });
};

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * @param {Function} func to be executed on debounce
 * @param {number} wait time in milliseconds
 * @param {boolean} immediate boolean
 *
 * */
function debounce(func, wait, immediate) {
  var timeout = void 0;
  return function () {
    var context = this,
        args = arguments;
    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _store = __webpack_require__(3);

var _store2 = _interopRequireDefault(_store);

var _view = __webpack_require__(4);

var _view2 = _interopRequireDefault(_view);

var _controller = __webpack_require__(2);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * App structure inspired by https://github.com/tastejs/todomvc/tree/gh-pages/examples/vanilla-es6
 * */

var app = {

    start: function start() {

        console.log('app started');

        var store = new _store2.default('responsive-css-sprite-generator');
        var view = new _view2.default();

        new _controller2.default(store, view);
    }

};

exports.default = app;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
  /**
   * @param  {!Store} store A Store instance
   * @param  {!View} view A View instance
   */
  function Controller(store, view) {
    _classCallCheck(this, Controller);

    this.store = store;
    this.view = view;

    this.view.setSettingsValues(this.store.getSettings());

    this.view.bindFileExplorer(this.addImages.bind(this));
    this.view.bindDropboxImages(this.addImages.bind(this));
    this.view.bindSettingsInputs(this.updateSettingsValues.bind(this));

    console.log(this);
  }

  _createClass(Controller, [{
    key: 'addImages',
    value: function addImages(files) {
      console.log(files);
    }
  }, {
    key: 'updateSettingsValues',
    value: function updateSettingsValues(settings) {
      console.log('update input values', settings);
      this.store.saveSettings(settings);
    }
  }]);

  return Controller;
}();

exports.default = Controller;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var localStorage = window.localStorage;
var instance = null;
var defaultSettings = {
  prefix: '',
  padding: 2,
  path: 'sprite.png'
};

var Store = function () {
  /**
   * @param {!string} name Database name
   * @param {function()} [callback] Called when the Store is ready
   */
  function Store(name, callback) {
    _classCallCheck(this, Store);

    if (!instance) {
      instance = this;
    } else {
      return instance;
    }

    // init settings
    if (localStorage.getItem(name)) {
      // TODO: Check this object
      this.settings = JSON.parse(localStorage.getItem(name));
    } else {
      this.settings = defaultSettings;
      localStorage.setItem(name, JSON.stringify(this.settings));
    }

    this.name = name;
    this.id = 0;
    this.blocks = [];
    this.loaded = 0;
    this.loadInProgress = false;

    console.log('store init', this.settings);

    if (callback) {
      callback();
    }
  }

  _createClass(Store, [{
    key: 'getSettings',
    value: function getSettings() {
      return this.settings;
    }
  }, {
    key: 'saveSettings',
    value: function saveSettings(settings) {
      // TODO: Check this object
      this.settings = settings;
      localStorage.setItem(this.name, JSON.stringify(settings));
    }
  }]);

  return Store;
}();

exports.default = Store;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instance = null;

var View = function () {
  function View() {
    _classCallCheck(this, View);

    if (!instance) {
      instance = this;
    } else {
      return instance;
    }

    this.$fileInput = (0, _helpers.qs)("#fileElem");
    this.$fileList = (0, _helpers.qs)("#fileList");
    this.$listItems = document.createElement('ul');
    this.$prefix = (0, _helpers.qs)("#prefix");
    this.$padding = (0, _helpers.qs)("#padding");
    this.$path = (0, _helpers.qs)("#path");
    this.$canvas = (0, _helpers.qs)("#canvas");
    this.$css = (0, _helpers.qs)("#css");
    this.dimensions = (0, _helpers.qs)("#dimensions");
    this.$dropbox = (0, _helpers.qs)("#dropbox");
    this.$fileList.appendChild(this.$listItems);
  }

  _createClass(View, [{
    key: "bindFileExplorer",
    value: function bindFileExplorer(handler) {
      var _this = this;

      (0, _helpers.$on)(this.$dropbox, 'click', function (e) {
        if (_this.$fileInput) {
          _this.$fileInput.click();
        }
        e.preventDefault();
        // TODO: Analytics
      });

      (0, _helpers.$on)(this.$fileInput, 'change', function () {
        handler(this.files);
      });
    }
  }, {
    key: "bindDropboxImages",
    value: function bindDropboxImages(handler) {

      (0, _helpers.$on)(this.$dropbox, 'dragenter', function (e) {
        e.stopPropagation();
        e.preventDefault();
      });

      (0, _helpers.$on)(this.$dropbox, 'dragover', function (e) {
        e.stopPropagation();
        e.preventDefault();
      });

      (0, _helpers.$on)(this.$dropbox, 'drop', function (e) {
        e.stopPropagation();
        e.preventDefault();

        var dt = e.dataTransfer;
        var files = dt.files;

        handler(files);
      });
    }
  }, {
    key: "setSettingsValues",
    value: function setSettingsValues(settings) {
      this.$prefix.value = settings.prefix;
      this.$padding.value = settings.padding;
      this.$path.value = settings.path;
    }
  }, {
    key: "getSettingsValues",
    value: function getSettingsValues() {
      return {
        'prefix': this.$prefix.value,
        'padding': parseInt(this.$padding.value),
        'path': this.$path.value
      };
    }
  }, {
    key: "bindSettingsInputs",
    value: function bindSettingsInputs(handler) {
      var _this2 = this;

      var returnValues = function returnValues() {
        handler(_this2.getSettingsValues());
      };

      (0, _helpers.$on)(this.$prefix, 'keyup', (0, _helpers.debounce)(returnValues, 250, false));
      (0, _helpers.$on)(this.$padding, 'keyup', (0, _helpers.debounce)(returnValues, 250, false));
      (0, _helpers.$on)(this.$path, 'keyup', (0, _helpers.debounce)(returnValues, 250, false));
    }
  }]);

  return View;
}();

exports.default = View;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _app = __webpack_require__(1);

var _app2 = _interopRequireDefault(_app);

var _helpers = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _helpers.$on)(window, 'load', _app2.default.start);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map