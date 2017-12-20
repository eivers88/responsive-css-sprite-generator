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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
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


var _app = __webpack_require__(2);

var _app2 = _interopRequireDefault(_app);

var _helpers = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _helpers.$on)(window, 'load', _app2.default.start);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _store = __webpack_require__(3);

var _store2 = _interopRequireDefault(_store);

var _view = __webpack_require__(4);

var _view2 = _interopRequireDefault(_view);

var _controller = __webpack_require__(5);

var _controller2 = _interopRequireDefault(_controller);

var _templates = __webpack_require__(7);

var _templates2 = _interopRequireDefault(_templates);

var _clipboard = __webpack_require__(8);

var _clipboard2 = _interopRequireDefault(_clipboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * App structure inspired by https://github.com/tastejs/todomvc/tree/gh-pages/examples/vanilla-es6
 * */

var app = {

  start: function start() {

    var template = new _templates2.default();

    var store = new _store2.default('responsive-css-sprite-generator');
    var view = new _view2.default(template);

    new _controller2.default(store, view);

    new _clipboard2.default('#copy');

    console.log('app started!');
  }

};

exports.default = app;

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

    // console.log('store init', this.settings);

    if (callback) {
      callback();
    }
  }

  _createClass(Store, [{
    key: 'getNewId',
    value: function getNewId() {
      var newId = this.id;
      this.id++;
      return newId;
    }
  }, {
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
  function View(template) {
    _classCallCheck(this, View);

    if (!instance) {
      instance = this;
    } else {
      return instance;
    }

    this.template = template;
    this.$fileInput = (0, _helpers.qs)("#fileElem");
    this.$fileList = (0, _helpers.qs)("#fileList");
    this.$listItems = document.createElement('ul');
    this.$prefix = (0, _helpers.qs)("#prefix");
    this.$padding = (0, _helpers.qs)("#padding");
    this.$path = (0, _helpers.qs)("#path");
    this.$canvas = (0, _helpers.qs)("#canvas");
    this.$css = (0, _helpers.qs)("#css");
    this.$download = (0, _helpers.qs)("#download");
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
  }, {
    key: "bindRemoveBtn",
    value: function bindRemoveBtn(handler) {
      (0, _helpers.$on)(this.$fileList, 'click', handler);
    }
  }, {
    key: "bindDownloadBtn",
    value: function bindDownloadBtn(handler) {
      (0, _helpers.$on)(this.$download, 'click', handler);
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
      var p = parseInt(this.$padding.value);
      return {
        'prefix': this.$prefix.value,
        'padding': Number.isInteger(p) ? p : 0,
        'path': this.$path.value
      };
    }
  }, {
    key: "addListItem",
    value: function addListItem(item) {
      var li = this.template.listItem(item);
      this.$listItems.appendChild(li);
    }
  }, {
    key: "setCSSValue",
    value: function setCSSValue(css) {
      this.$css.value = css;
      if (css !== '') {
        this.$dropbox.classList.remove('is-empty');
      } else {
        this.$dropbox.classList.add('is-empty');
      }
    }
  }]);

  return View;
}();

exports.default = View;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _texturePacker = __webpack_require__(6);

var _texturePacker2 = _interopRequireDefault(_texturePacker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
  /**
   * @param  {!Store} store A Store instance
   * @param  {!View} view A View instance
   */
  function Controller(store, view) {
    _classCallCheck(this, Controller);

    this.imgQueued = 0;
    this.imgLoaded = 0;
    this.loadInProgress = false;

    this.store = store;
    this.view = view;

    this.view.setSettingsValues(this.store.getSettings());

    this.view.bindFileExplorer(this.addImages.bind(this));
    this.view.bindDropboxImages(this.addImages.bind(this));
    this.view.bindRemoveBtn(this.removeImage.bind(this));
    this.view.bindDownloadBtn(this.download.bind(this));
    this.view.bindSettingsInputs(this.updateSettingsValues.bind(this));

    this.texturePacker = new _texturePacker2.default(this.view.$canvas, this.view.getSettingsValues());

    // console.log(this)
  }

  _createClass(Controller, [{
    key: 'addImages',
    value: function addImages(data) {

      if (this.loadInProgress) {
        console.log('Cannot add images while load is in progress');
        return;
      }

      var files = [];

      // add only image files to our file list
      for (var prop in data) {
        if (data[prop].type === "image/png" || data[prop].type === "image/jpeg") {
          files.push(data[prop]);
        }
      }

      if (files.length === 0) {
        return;
      }

      this.loadInProgress = true;
      this.imgQueued += files.length;

      for (var i = 0; i < files.length; i++) {

        this.view.addListItem({
          id: this.store.getNewId(),
          src: window.URL.createObjectURL(files[i]),
          name: files[i].name.substring(0, files[i].name.indexOf('.')),
          onLoadSuccess: this.onLoadSuccess.bind(this)
        });
      }
    }
  }, {
    key: 'removeImage',
    value: function removeImage(e) {
      if (this.loadInProgress) {
        console.log('Cannot remove image while load is in progress');
        return;
      }
      if (e.target && e.target.classList.contains('remove')) {
        e.target.parentNode.parentNode.removeChild(e.target.parentNode);
        var css = this.texturePacker.remove(parseInt(e.target.parentNode.getAttribute('data-id')));
        this.update(css);
      }
    }
  }, {
    key: 'onLoadSuccess',
    value: function onLoadSuccess(texture) {
      this.texturePacker.addTexture(texture);

      this.imgLoaded++;

      if (this.imgLoaded === this.imgQueued) {
        this.loadComplete();
      }
    }
  }, {
    key: 'loadComplete',
    value: function loadComplete() {
      console.log('all files loaded!');
      this.loadInProgress = false;
      this.imgQueued = 0;
      this.imgLoaded = 0;
      var css = this.texturePacker.pack();
      this.update(css);
    }
  }, {
    key: 'updateSettingsValues',
    value: function updateSettingsValues(settings) {
      console.log('update input values', settings);
      this.store.saveSettings(settings);
      var css = this.texturePacker.updateSettings(settings);
      this.update(css);
    }
  }, {
    key: 'update',
    value: function update(css) {
      if (this.texturePacker.textures.length) {
        this.view.setCSSValue(css);
      } else {
        this.view.setCSSValue('');
      }
    }
  }, {
    key: 'download',
    value: function download() {
      var a = document.createElement('a');
      a.setAttribute('target', '_blank');
      a.href = this.texturePacker.canvas.toDataURL();
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }]);

  return Controller;
}();

exports.default = Controller;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_SIZE = 256;
var GITHUB_URL = '/*\nResponsive CSS Sprite created using: ' + 'https://responsive-css.us/\n' + '*/\n\n';

function findNode(root, w, h) {
  if (root.used) {
    return findNode(root.right, w, h) || findNode(root.down, w, h);
  } else if (w <= root.w && h <= root.h) {
    return root;
  } else {
    return null;
  }
}

function splitNode(node, w, h) {
  node.used = true;
  node.down = { x: node.x, y: node.y + h, w: node.w, h: node.h - h };
  node.right = { x: node.x + w, y: node.y, w: node.w - w, h: h };
  return node;
}

var TexturePacker = function () {
  function TexturePacker(canvas, _ref) {
    var padding = _ref.padding,
        prefix = _ref.prefix,
        path = _ref.path;

    _classCallCheck(this, TexturePacker);

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.textures = [];

    this.root = {
      x: 0, // origin x
      y: 0, // origin y
      w: DEFAULT_SIZE - padding, // width
      h: DEFAULT_SIZE - padding, // height
      p: padding
    };

    this.prefix = prefix;
    this.path = path;
  }

  _createClass(TexturePacker, [{
    key: 'addTexture',
    value: function addTexture(texture) {
      this.textures.push(texture);
    }
  }, {
    key: 'sort',
    value: function sort() {
      this.textures.sort(function (a, b) {
        if (a.h < b.h) {
          return 1;
        }
        if (a.h > b.h) {
          return -1;
        }
        return 0;
      });
    }
  }, {
    key: 'fit',
    value: function fit() {
      var i = void 0,
          node = void 0,
          texture = void 0,
          pad = this.root.p;
      for (i = 0; i < this.textures.length; i++) {
        texture = this.textures[i];
        texture.fit = false;
        node = findNode(this.root, texture.w + pad, texture.h + pad);
        if (node) {
          texture.fit = splitNode(node, texture.w + pad, texture.h + pad);
        }
        if (!texture.fit) {
          this.resize();
          break;
        }
      }
    }
  }, {
    key: 'resize',
    value: function resize() {
      var w = void 0,
          h = void 0,
          pad = this.root.p;
      if (this.root.w > this.root.h) {
        w = this.root.w + pad;
        h = (this.root.h + pad) * 2;
      } else {
        w = (this.root.w + pad) * 2;
        h = this.root.h + pad;
      }
      this.root = {
        x: 0, // origin x
        y: 0, // origin y
        w: w - pad, // width
        h: h - pad, // height
        p: pad
      };
      this.fit();
    }
  }, {
    key: 'draw',
    value: function draw() {

      // TODO: Calc CSS output

      var canvas = this.canvas;
      var ctx = this.ctx;
      var pad = this.root.p;
      var prefix = this.prefix;
      var width = this.root.w + pad;
      var height = this.root.h + pad;

      var computedCSS = '';
      var selectorsString = '';
      var globalString = '\n{display:inline-block; overflow:hidden; ' + 'background-repeat: no-repeat;\n' + ('background-image:url(' + this.path + ');}\n\n');
      var spriteString = '';

      canvas.width = width;
      canvas.height = height;

      ctx.clearRect(0, 0, width, height);

      this.textures.sort(function (a, b) {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
      });

      for (var i = 0; i < this.textures.length; i++) {
        var texture = this.textures[i];
        if (texture.fit) {

          // turn on for testing
          // ctx.fillRect(texture.fit.x + pad, texture.fit.y + pad, texture.w, texture.h);
          // ctx.stroke();

          ctx.drawImage(texture.img, texture.fit.x + pad, texture.fit.y + pad);

          selectorsString += '.' + prefix + texture.name + (i === this.textures.length - 1 ? ' ' : ', ');

          spriteString += '.' + (prefix + texture.name) + ' {width: ' + texture.w + 'px; ' + ('height: ' + texture.h + 'px; ') + ('background-position: ' + ((texture.fit.x + pad) / (width - texture.w) * 100).toPrecision(6) + '% ') + (((texture.fit.y + pad) / (height - texture.h) * 100).toPrecision(6) + '%; ') + ('background-size: ' + (width / texture.w * 100).toPrecision(6) + '%; }\n');
        }
      }

      computedCSS = GITHUB_URL + selectorsString + globalString + spriteString;

      return computedCSS;
    }
  }, {
    key: 'pack',
    value: function pack() {
      this.sort();
      this.fit();
      return this.draw();
    }
  }, {
    key: 'remove',
    value: function remove(id) {

      for (var i = this.textures.length; i--;) {
        var texture = this.textures[i];
        if (texture.id === id) {
          this.textures.splice(i, 1);
          break;
        }
      }

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      var pad = this.root.p;

      // reset the root
      this.root = {
        x: 0, // origin x
        y: 0, // origin y
        w: DEFAULT_SIZE - pad, // width
        h: DEFAULT_SIZE - pad, // height
        p: pad
      };

      return this.pack();
    }
  }, {
    key: 'updateSettings',
    value: function updateSettings(_ref2) {
      var padding = _ref2.padding,
          prefix = _ref2.prefix,
          path = _ref2.path;


      var canvas = this.canvas;

      this.ctx.clearRect(0, 0, canvas.width || DEFAULT_SIZE, canvas.height || DEFAULT_SIZE);

      this.root = {
        x: 0, // origin x
        y: 0, // origin y
        w: DEFAULT_SIZE - padding, // width
        h: DEFAULT_SIZE - padding, // height
        p: padding
      };

      this.prefix = prefix;
      this.path = path;

      return this.pack();
    }
  }]);

  return TexturePacker;
}();

exports.default = TexturePacker;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Template = function () {
    function Template() {
        _classCallCheck(this, Template);
    }

    _createClass(Template, [{
        key: 'listItem',
        value: function listItem(item) {

            var li = document.createElement('li');
            var img = document.createElement('img');
            var info = document.createElement('span');
            var remove = document.createElement('div');

            li.setAttribute('data-id', item.id);

            img.src = item.src;
            img.height = 60;
            img.onload = function () {
                window.URL.revokeObjectURL(item.src);
                item.onLoadSuccess({
                    img: this,
                    w: this.naturalWidth,
                    h: this.naturalHeight,
                    name: item.name,
                    id: item.id
                });
            };

            li.appendChild(img);
            info.innerHTML = item.name;
            li.appendChild(info);

            remove.classList.add('remove');
            li.appendChild(remove);

            return li;
        }
    }]);

    return Template;
}();

exports.default = Template;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, __webpack_require__(9), __webpack_require__(11), __webpack_require__(12)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(module, require('./clipboard-action'), require('tiny-emitter'), require('good-listener'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, global.clipboardAction, global.tinyEmitter, global.goodListener);
        global.clipboard = mod.exports;
    }
})(this, function (module, _clipboardAction, _tinyEmitter, _goodListener) {
    'use strict';

    var _clipboardAction2 = _interopRequireDefault(_clipboardAction);

    var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

    var _goodListener2 = _interopRequireDefault(_goodListener);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var Clipboard = function (_Emitter) {
        _inherits(Clipboard, _Emitter);

        /**
         * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
         * @param {Object} options
         */
        function Clipboard(trigger, options) {
            _classCallCheck(this, Clipboard);

            var _this = _possibleConstructorReturn(this, (Clipboard.__proto__ || Object.getPrototypeOf(Clipboard)).call(this));

            _this.resolveOptions(options);
            _this.listenClick(trigger);
            return _this;
        }

        /**
         * Defines if attributes would be resolved using internal setter functions
         * or custom functions that were passed in the constructor.
         * @param {Object} options
         */


        _createClass(Clipboard, [{
            key: 'resolveOptions',
            value: function resolveOptions() {
                var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
                this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
                this.text = typeof options.text === 'function' ? options.text : this.defaultText;
                this.container = _typeof(options.container) === 'object' ? options.container : document.body;
            }
        }, {
            key: 'listenClick',
            value: function listenClick(trigger) {
                var _this2 = this;

                this.listener = (0, _goodListener2.default)(trigger, 'click', function (e) {
                    return _this2.onClick(e);
                });
            }
        }, {
            key: 'onClick',
            value: function onClick(e) {
                var trigger = e.delegateTarget || e.currentTarget;

                if (this.clipboardAction) {
                    this.clipboardAction = null;
                }

                this.clipboardAction = new _clipboardAction2.default({
                    action: this.action(trigger),
                    target: this.target(trigger),
                    text: this.text(trigger),
                    container: this.container,
                    trigger: trigger,
                    emitter: this
                });
            }
        }, {
            key: 'defaultAction',
            value: function defaultAction(trigger) {
                return getAttributeValue('action', trigger);
            }
        }, {
            key: 'defaultTarget',
            value: function defaultTarget(trigger) {
                var selector = getAttributeValue('target', trigger);

                if (selector) {
                    return document.querySelector(selector);
                }
            }
        }, {
            key: 'defaultText',
            value: function defaultText(trigger) {
                return getAttributeValue('text', trigger);
            }
        }, {
            key: 'destroy',
            value: function destroy() {
                this.listener.destroy();

                if (this.clipboardAction) {
                    this.clipboardAction.destroy();
                    this.clipboardAction = null;
                }
            }
        }], [{
            key: 'isSupported',
            value: function isSupported() {
                var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['copy', 'cut'];

                var actions = typeof action === 'string' ? [action] : action;
                var support = !!document.queryCommandSupported;

                actions.forEach(function (action) {
                    support = support && !!document.queryCommandSupported(action);
                });

                return support;
            }
        }]);

        return Clipboard;
    }(_tinyEmitter2.default);

    /**
     * Helper function to retrieve attribute value.
     * @param {String} suffix
     * @param {Element} element
     */
    function getAttributeValue(suffix, element) {
        var attribute = 'data-clipboard-' + suffix;

        if (!element.hasAttribute(attribute)) {
            return;
        }

        return element.getAttribute(attribute);
    }

    module.exports = Clipboard;
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, __webpack_require__(10)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(module, require('select'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, global.select);
        global.clipboardAction = mod.exports;
    }
})(this, function (module, _select) {
    'use strict';

    var _select2 = _interopRequireDefault(_select);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var ClipboardAction = function () {
        /**
         * @param {Object} options
         */
        function ClipboardAction(options) {
            _classCallCheck(this, ClipboardAction);

            this.resolveOptions(options);
            this.initSelection();
        }

        /**
         * Defines base properties passed from constructor.
         * @param {Object} options
         */


        _createClass(ClipboardAction, [{
            key: 'resolveOptions',
            value: function resolveOptions() {
                var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                this.action = options.action;
                this.container = options.container;
                this.emitter = options.emitter;
                this.target = options.target;
                this.text = options.text;
                this.trigger = options.trigger;

                this.selectedText = '';
            }
        }, {
            key: 'initSelection',
            value: function initSelection() {
                if (this.text) {
                    this.selectFake();
                } else if (this.target) {
                    this.selectTarget();
                }
            }
        }, {
            key: 'selectFake',
            value: function selectFake() {
                var _this = this;

                var isRTL = document.documentElement.getAttribute('dir') == 'rtl';

                this.removeFake();

                this.fakeHandlerCallback = function () {
                    return _this.removeFake();
                };
                this.fakeHandler = this.container.addEventListener('click', this.fakeHandlerCallback) || true;

                this.fakeElem = document.createElement('textarea');
                // Prevent zooming on iOS
                this.fakeElem.style.fontSize = '12pt';
                // Reset box model
                this.fakeElem.style.border = '0';
                this.fakeElem.style.padding = '0';
                this.fakeElem.style.margin = '0';
                // Move element out of screen horizontally
                this.fakeElem.style.position = 'absolute';
                this.fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px';
                // Move element to the same position vertically
                var yPosition = window.pageYOffset || document.documentElement.scrollTop;
                this.fakeElem.style.top = yPosition + 'px';

                this.fakeElem.setAttribute('readonly', '');
                this.fakeElem.value = this.text;

                this.container.appendChild(this.fakeElem);

                this.selectedText = (0, _select2.default)(this.fakeElem);
                this.copyText();
            }
        }, {
            key: 'removeFake',
            value: function removeFake() {
                if (this.fakeHandler) {
                    this.container.removeEventListener('click', this.fakeHandlerCallback);
                    this.fakeHandler = null;
                    this.fakeHandlerCallback = null;
                }

                if (this.fakeElem) {
                    this.container.removeChild(this.fakeElem);
                    this.fakeElem = null;
                }
            }
        }, {
            key: 'selectTarget',
            value: function selectTarget() {
                this.selectedText = (0, _select2.default)(this.target);
                this.copyText();
            }
        }, {
            key: 'copyText',
            value: function copyText() {
                var succeeded = void 0;

                try {
                    succeeded = document.execCommand(this.action);
                } catch (err) {
                    succeeded = false;
                }

                this.handleResult(succeeded);
            }
        }, {
            key: 'handleResult',
            value: function handleResult(succeeded) {
                this.emitter.emit(succeeded ? 'success' : 'error', {
                    action: this.action,
                    text: this.selectedText,
                    trigger: this.trigger,
                    clearSelection: this.clearSelection.bind(this)
                });
            }
        }, {
            key: 'clearSelection',
            value: function clearSelection() {
                if (this.trigger) {
                    this.trigger.focus();
                }

                window.getSelection().removeAllRanges();
            }
        }, {
            key: 'destroy',
            value: function destroy() {
                this.removeFake();
            }
        }, {
            key: 'action',
            set: function set() {
                var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'copy';

                this._action = action;

                if (this._action !== 'copy' && this._action !== 'cut') {
                    throw new Error('Invalid "action" value, use either "copy" or "cut"');
                }
            },
            get: function get() {
                return this._action;
            }
        }, {
            key: 'target',
            set: function set(target) {
                if (target !== undefined) {
                    if (target && (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && target.nodeType === 1) {
                        if (this.action === 'copy' && target.hasAttribute('disabled')) {
                            throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                        }

                        if (this.action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) {
                            throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                        }

                        this._target = target;
                    } else {
                        throw new Error('Invalid "target" value, use a valid Element');
                    }
                }
            },
            get: function get() {
                return this._target;
            }
        }]);

        return ClipboardAction;
    }();

    module.exports = ClipboardAction;
});

/***/ }),
/* 10 */
/***/ (function(module, exports) {

function select(element) {
    var selectedText;

    if (element.nodeName === 'SELECT') {
        element.focus();

        selectedText = element.value;
    }
    else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
        var isReadOnly = element.hasAttribute('readonly');

        if (!isReadOnly) {
            element.setAttribute('readonly', '');
        }

        element.select();
        element.setSelectionRange(0, element.value.length);

        if (!isReadOnly) {
            element.removeAttribute('readonly');
        }

        selectedText = element.value;
    }
    else {
        if (element.hasAttribute('contenteditable')) {
            element.focus();
        }

        var selection = window.getSelection();
        var range = document.createRange();

        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);

        selectedText = selection.toString();
    }

    return selectedText;
}

module.exports = select;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    };

    listener._ = callback
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

module.exports = E;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var is = __webpack_require__(13);
var delegate = __webpack_require__(14);

/**
 * Validates all params and calls the right
 * listener function based on its target type.
 *
 * @param {String|HTMLElement|HTMLCollection|NodeList} target
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listen(target, type, callback) {
    if (!target && !type && !callback) {
        throw new Error('Missing required arguments');
    }

    if (!is.string(type)) {
        throw new TypeError('Second argument must be a String');
    }

    if (!is.fn(callback)) {
        throw new TypeError('Third argument must be a Function');
    }

    if (is.node(target)) {
        return listenNode(target, type, callback);
    }
    else if (is.nodeList(target)) {
        return listenNodeList(target, type, callback);
    }
    else if (is.string(target)) {
        return listenSelector(target, type, callback);
    }
    else {
        throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
    }
}

/**
 * Adds an event listener to a HTML element
 * and returns a remove listener function.
 *
 * @param {HTMLElement} node
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNode(node, type, callback) {
    node.addEventListener(type, callback);

    return {
        destroy: function() {
            node.removeEventListener(type, callback);
        }
    }
}

/**
 * Add an event listener to a list of HTML elements
 * and returns a remove listener function.
 *
 * @param {NodeList|HTMLCollection} nodeList
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNodeList(nodeList, type, callback) {
    Array.prototype.forEach.call(nodeList, function(node) {
        node.addEventListener(type, callback);
    });

    return {
        destroy: function() {
            Array.prototype.forEach.call(nodeList, function(node) {
                node.removeEventListener(type, callback);
            });
        }
    }
}

/**
 * Add an event listener to a selector
 * and returns a remove listener function.
 *
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenSelector(selector, type, callback) {
    return delegate(document.body, selector, type, callback);
}

module.exports = listen;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

/**
 * Check if argument is a HTML element.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.node = function(value) {
    return value !== undefined
        && value instanceof HTMLElement
        && value.nodeType === 1;
};

/**
 * Check if argument is a list of HTML elements.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.nodeList = function(value) {
    var type = Object.prototype.toString.call(value);

    return value !== undefined
        && (type === '[object NodeList]' || type === '[object HTMLCollection]')
        && ('length' in value)
        && (value.length === 0 || exports.node(value[0]));
};

/**
 * Check if argument is a string.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.string = function(value) {
    return typeof value === 'string'
        || value instanceof String;
};

/**
 * Check if argument is a function.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.fn = function(value) {
    var type = Object.prototype.toString.call(value);

    return type === '[object Function]';
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var closest = __webpack_require__(15);

/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function _delegate(element, selector, type, callback, useCapture) {
    var listenerFn = listener.apply(this, arguments);

    element.addEventListener(type, listenerFn, useCapture);

    return {
        destroy: function() {
            element.removeEventListener(type, listenerFn, useCapture);
        }
    }
}

/**
 * Delegates event to a selector.
 *
 * @param {Element|String|Array} [elements]
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function delegate(elements, selector, type, callback, useCapture) {
    // Handle the regular Element usage
    if (typeof elements.addEventListener === 'function') {
        return _delegate.apply(null, arguments);
    }

    // Handle Element-less usage, it defaults to global delegation
    if (typeof type === 'function') {
        // Use `document` as the first parameter, then apply arguments
        // This is a short way to .unshift `arguments` without running into deoptimizations
        return _delegate.bind(null, document).apply(null, arguments);
    }

    // Handle Selector-based usage
    if (typeof elements === 'string') {
        elements = document.querySelectorAll(elements);
    }

    // Handle Array-like based usage
    return Array.prototype.map.call(elements, function (element) {
        return _delegate(element, selector, type, callback, useCapture);
    });
}

/**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Function}
 */
function listener(element, selector, type, callback) {
    return function(e) {
        e.delegateTarget = closest(e.target, selector);

        if (e.delegateTarget) {
            callback.call(element, e);
        }
    }
}

module.exports = delegate;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

var DOCUMENT_NODE_TYPE = 9;

/**
 * A polyfill for Element.matches()
 */
if (typeof Element !== 'undefined' && !Element.prototype.matches) {
    var proto = Element.prototype;

    proto.matches = proto.matchesSelector ||
                    proto.mozMatchesSelector ||
                    proto.msMatchesSelector ||
                    proto.oMatchesSelector ||
                    proto.webkitMatchesSelector;
}

/**
 * Finds the closest parent that matches a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @return {Function}
 */
function closest (element, selector) {
    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
        if (typeof element.matches === 'function' &&
            element.matches(selector)) {
          return element;
        }
        element = element.parentNode;
    }
}

module.exports = closest;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map