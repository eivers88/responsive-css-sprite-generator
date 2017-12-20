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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
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

var _view = __webpack_require__(6);

var _view2 = _interopRequireDefault(_view);

var _controller = __webpack_require__(2);

var _controller2 = _interopRequireDefault(_controller);

var _templates = __webpack_require__(4);

var _templates2 = _interopRequireDefault(_templates);

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

    console.log('app started!');
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

var _texturePacker = __webpack_require__(5);

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
        this.updateCSS(css);
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
      this.updateCSS(css);
    }
  }, {
    key: 'updateSettingsValues',
    value: function updateSettingsValues(settings) {
      console.log('update input values', settings);
      this.store.saveSettings(settings);
      var css = this.texturePacker.updateSettings(settings);
      this.updateCSS(css);
    }
  }, {
    key: 'updateCSS',
    value: function updateCSS(css) {
      if (this.texturePacker.textures.length) {
        this.view.setCSSValue(css);
      } else {
        this.view.setCSSValue('');
      }
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_SIZE = 256;
var GITHUB_URL = '/**\nResponsive CSS Sprite created using: ' + 'https://responsive-css.us/\n' + '*/\n\n';

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
          ctx.fillRect(texture.fit.x + pad, texture.fit.y + pad, texture.w, texture.h);
          ctx.stroke();

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

      this.ctx.clearRect(0, 0, canvas.width, canvas.height);

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
/* 6 */
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
/* 7 */
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