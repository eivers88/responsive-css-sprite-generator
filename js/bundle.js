/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);
	__webpack_require__(5);
	var Clipboard = __webpack_require__(12);
	var Packer = __webpack_require__(21);
	var debounce = __webpack_require__(22);
	
	/*
	 * Files Selector
	 * */
	
	window.URL = window.URL || window.webkitURL;
	
	var loadInProgress = false;
	var fileElem = document.getElementById("fileElem"),
	    fileList = document.getElementById("fileList"),
	    prefixElem = document.getElementById("prefix"),
	    paddingElem = document.getElementById("padding"),
	    pathElem = document.getElementById("path");
	var id = 0;
	var blocks = [];
	var loaded = 0;
	var canvas = document.getElementById('canvas');
	var css = document.getElementById('css');
	css.value = '';
	var prefix = prefixElem.value;
	var padding = paddingElem.value;
	var path = pathElem.value;
	var dimensionsElem = document.getElementById('dimensions');
	
	var list = document.createElement("ul");
	fileList.appendChild(list);
	
	fileElem.addEventListener('change', function () {
	    handleFiles(this.files);
	});
	
	fileList.addEventListener('click', function (e) {
	    if (!loadInProgress) {
	        if (e.target && e.target.classList.contains('remove')) {
	            var id = e.target.parentNode.getAttribute('data-id');
	            for (var i = 0; i < blocks.length; i++) {
	                if (blocks[i].id == id) {
	                    blocks.splice(i, 1);
	                    loaded--;
	                    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
	                    break;
	                }
	            }
	            var packer = new Packer(padding, prefix, path);
	            packer.sort(blocks);
	            packer.fit(blocks);
	            packer.draw(blocks, canvas, css);
	            dimensionsElem.innerHTML = '(' + canvas.width + 'px by ' + canvas.height + 'px)';
	            if (blocks.length === 0) {
	                css.value = '';
	                dropbox.classList.add('is-empty');
	            }
	        }
	    }
	});
	
	prefixElem.addEventListener('keyup', debounce(updateValues, 250));
	paddingElem.addEventListener('keyup', debounce(updateValues, 250));
	pathElem.addEventListener('keyup', debounce(updateValues, 250));
	
	function updateValues() {
	    prefix = prefixElem.value;
	    padding = paddingElem.value;
	    path = pathElem.value;
	    if (blocks.length > 0) {
	        var packer = new Packer(padding, prefix, path);
	        packer.sort(blocks);
	        packer.fit(blocks);
	        packer.draw(blocks, canvas, css);
	        dimensionsElem.innerHTML = '(' + canvas.width + 'px by ' + canvas.height + 'px)';
	    }
	}
	
	var dropbox;
	
	dropbox = document.getElementById("dropbox");
	dropbox.addEventListener("dragenter", dragenter, false);
	dropbox.addEventListener("dragover", dragover, false);
	dropbox.addEventListener("drop", drop, false);
	dropbox.addEventListener("click", function (e) {
	    if (fileElem) {
	        fileElem.click();
	    }
	    e.preventDefault(); // prevent navigation to "#"
	}, false);
	
	function dragenter(e) {
	    e.stopPropagation();
	    e.preventDefault();
	}
	
	function dragover(e) {
	    e.stopPropagation();
	    e.preventDefault();
	}
	
	function drop(e) {
	    e.stopPropagation();
	    e.preventDefault();
	
	    var dt = e.dataTransfer;
	    var files = dt.files;
	
	    handleFiles(files);
	}
	
	/*
	 * Handle Files
	 * */
	
	function handleFiles(files) {
	    if (!files.length) {
	        fileList.innerHTML = "<p>No files selected!</p>";
	    } else {
	        loadInProgress = true;
	        //fileList.innerHTML = "";
	        //var list = document.createElement("ul");
	        //fileList.appendChild(list);
	        for (var i = 0; i < files.length; i++) {
	            id++;
	            var li = document.createElement("li");
	            var img = document.createElement("img");
	            var info = document.createElement("span");
	            var remove = document.createElement("div");
	
	            li.setAttribute('data-id', id);
	            list.appendChild(li);
	
	            img.src = window.URL.createObjectURL(files[i]);
	            img.height = 60;
	            img.onload = onload(id, files[i], files.length + blocks.length);
	            li.appendChild(img);
	
	            info.innerHTML = files[i].name.substring(0, files[i].name.indexOf('.'));
	            li.appendChild(info);
	
	            remove.classList.add('remove');
	            li.appendChild(remove);
	
	            dropbox.classList.remove('is-empty');
	        }
	    }
	    fileElem.value = '';
	}
	
	function loadComplete() {
	    var packer = new Packer(padding, prefix, path);
	    packer.sort(blocks);
	    packer.fit(blocks);
	    packer.draw(blocks, canvas, css);
	    dimensionsElem.innerHTML = '(' + canvas.width + 'px by ' + canvas.height + 'px)';
	    loadInProgress = false;
	}
	
	function onload(id, file, queue) {
	    return function () {
	        window.URL.revokeObjectURL(this.src);
	        blocks.push({
	            w: this.naturalWidth,
	            h: this.naturalHeight,
	            img: this,
	            name: file.name.substring(0, file.name.indexOf('.')),
	            id: id
	        });
	        loaded++;
	        if (loaded === queue) {
	            loadComplete();
	        }
	    };
	}
	
	document.getElementById('download').addEventListener('click', function () {
	    var a = document.createElement('a');
	    a.href = canvas.toDataURL();
	    a.download = 'sprite.png';
	    document.body.appendChild(a);
	    //console.log(a);
	    a.click();
	    document.body.removeChild(a);
	}, false);
	
	var clipboard = new Clipboard('#copy');

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./normalize.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./normalize.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, "/*! normalize.css v3.0.2 | MIT License | git.io/normalize */\n/**\n * 1. Set default font family to sans-serif.\n * 2. Prevent iOS text size adjust after orientation change, without disabling\n *    user zoom.\n */\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  -ms-text-size-adjust: 100%;\n  /* 2 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */ }\n\n/**\n * Remove default margin.\n */\nbody {\n  margin: 0; }\n\n/* HTML5 display definitions\n   ========================================================================== */\n/**\n * Correct `block` display not defined for any HTML5 element in IE 8/9.\n * Correct `block` display not defined for `details` or `summary` in IE 10/11\n * and Firefox.\n * Correct `block` display not defined for `main` in IE 11.\n */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  display: block; }\n\n/**\n * 1. Correct `inline-block` display not defined in IE 8/9.\n * 2. Normalize vertical alignment of `progress` in Chrome, Firefox, and Opera.\n */\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */ }\n\n/**\n * Prevent modern browsers from displaying `audio` without controls.\n * Remove excess height in iOS 5 devices.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\n/**\n * Address `[hidden]` styling not present in IE 8/9/10.\n * Hide the `template` element in IE 8/9/11, Safari, and Firefox < 22.\n */\n[hidden],\ntemplate {\n  display: none; }\n\n/* Links\n   ========================================================================== */\n/**\n * Remove the gray background color from active links in IE 10.\n */\na {\n  background-color: transparent; }\n\n/**\n * Improve readability when focused and also mouse hovered in all browsers.\n */\na:active,\na:hover {\n  outline: 0; }\n\n/* Text-level semantics\n   ========================================================================== */\n/**\n * Address styling not present in IE 8/9/10/11, Safari, and Chrome.\n */\nabbr[title] {\n  border-bottom: 1px dotted; }\n\n/**\n * Address style set to `bolder` in Firefox 4+, Safari, and Chrome.\n */\nb,\nstrong {\n  font-weight: bold; }\n\n/**\n * Address styling not present in Safari and Chrome.\n */\ndfn {\n  font-style: italic; }\n\n/**\n * Address variable `h1` font-size and margin within `section` and `article`\n * contexts in Firefox 4+, Safari, and Chrome.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\n/**\n * Address styling not present in IE 8/9.\n */\nmark {\n  background: #ff0;\n  color: #000; }\n\n/**\n * Address inconsistent and variable font size in all browsers.\n */\nsmall {\n  font-size: 80%; }\n\n/**\n * Prevent `sub` and `sup` affecting `line-height` in all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsup {\n  top: -0.5em; }\n\nsub {\n  bottom: -0.25em; }\n\n/* Embedded content\n   ========================================================================== */\n/**\n * Remove border when inside `a` element in IE 8/9/10.\n */\nimg {\n  border: 0; }\n\n/**\n * Correct overflow not hidden in IE 9/10/11.\n */\nsvg:not(:root) {\n  overflow: hidden; }\n\n/* Grouping content\n   ========================================================================== */\n/**\n * Address margin not present in IE 8/9 and Safari.\n */\nfigure {\n  margin: 1em 40px; }\n\n/**\n * Address differences between Firefox and other browsers.\n */\nhr {\n  -moz-box-sizing: content-box;\n  box-sizing: content-box;\n  height: 0; }\n\n/**\n * Contain overflow in all browsers.\n */\npre {\n  overflow: auto; }\n\n/**\n * Address odd `em`-unit font size rendering in all browsers.\n */\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em; }\n\n/* Forms\n   ========================================================================== */\n/**\n * Known limitation: by default, Chrome and Safari on OS X allow very limited\n * styling of `select`, unless a `border` property is set.\n */\n/**\n * 1. Correct color not being inherited.\n *    Known issue: affects color of disabled elements.\n * 2. Correct font properties not being inherited.\n * 3. Address margins set differently in Firefox 4+, Safari, and Chrome.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n  margin: 0;\n  /* 3 */ }\n\n/**\n * Address `overflow` set to `hidden` in IE 8/9/10/11.\n */\nbutton {\n  overflow: visible; }\n\n/**\n * Address inconsistent `text-transform` inheritance for `button` and `select`.\n * All other form control elements do not inherit `text-transform` values.\n * Correct `button` style inheritance in Firefox, IE 8/9/10/11, and Opera.\n * Correct `select` style inheritance in Firefox.\n */\nbutton,\nselect {\n  text-transform: none; }\n\n/**\n * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`\n *    and `video` controls.\n * 2. Correct inability to style clickable `input` types in iOS.\n * 3. Improve usability and consistency of cursor style between image-type\n *    `input` and others.\n */\nbutton,\nhtml input[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n  cursor: pointer;\n  /* 3 */ }\n\n/**\n * Re-set default cursor for disabled elements.\n */\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default; }\n\n/**\n * Remove inner padding and border in Firefox 4+.\n */\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0; }\n\n/**\n * Address Firefox 4+ setting `line-height` on `input` using `!important` in\n * the UA stylesheet.\n */\ninput {\n  line-height: normal; }\n\n/**\n * It's recommended that you don't attempt to style these elements.\n * Firefox's implementation doesn't respect box-sizing, padding, or width.\n *\n * 1. Address box sizing set to `content-box` in IE 8/9/10.\n * 2. Remove excess padding in IE 8/9/10.\n */\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */ }\n\n/**\n * Fix the cursor style for Chrome's increment/decrement buttons. For certain\n * `font-size` values of the `input`, it causes the cursor style of the\n * decrement button to change from `default` to `text`.\n */\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\n/**\n * 1. Address `appearance` set to `searchfield` in Safari and Chrome.\n * 2. Address `box-sizing` set to `border-box` in Safari and Chrome\n *    (include `-moz` to future-proof).\n */\ninput[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  -moz-box-sizing: content-box;\n  -webkit-box-sizing: content-box;\n  /* 2 */\n  box-sizing: content-box; }\n\n/**\n * Remove inner padding and search cancel button in Safari and Chrome on OS X.\n * Safari (but not Chrome) clips the cancel button when the search input has\n * padding (and `textfield` appearance).\n */\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\n/**\n * Define consistent border, margin, and padding.\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em; }\n\n/**\n * 1. Correct `color` not being inherited in IE 8/9/10/11.\n * 2. Remove padding so people aren't caught out if they zero out fieldsets.\n */\nlegend {\n  border: 0;\n  /* 1 */\n  padding: 0;\n  /* 2 */ }\n\n/**\n * Remove default vertical scrollbar in IE 8/9/10/11.\n */\ntextarea {\n  overflow: auto; }\n\n/**\n * Don't inherit the `font-weight` (applied by a rule above).\n * NOTE: the default cannot safely be changed in Chrome and Safari on OS X.\n */\noptgroup {\n  font-weight: bold; }\n\n/* Tables\n   ========================================================================== */\n/**\n * Remove most spacing between table cells.\n */\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\ntd,\nth {\n  padding: 0; }\n", ""]);
	
	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./main.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./main.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, "html {\n  box-sizing: border-box; }\n\n*, *:before, *:after {\n  box-sizing: inherit; }\n\nhtml, body {\n  height: 100%; }\n\ncanvas {\n  vertical-align: middle; }\n\n.page-wrap {\n  padding-top: 100px;\n  position: relative;\n  height: 100%; }\n\nheader {\n  height: 100px;\n  width: 100%;\n  background-color: #424242;\n  position: fixed;\n  z-index: 2;\n  padding: 8px 10px 0; }\n  header h1 {\n    font-size: 2em;\n    margin: 10px 0;\n    color: #ffffff;\n    font-weight: normal; }\n  header input {\n    font-size: 0.9em; }\n    header input:last-child {\n      width: 30px;\n      text-align: center; }\n  header label {\n    color: #ffffff;\n    font-size: 0.9em; }\n\n.content {\n  position: relative;\n  min-height: 100%; }\n\n.file-list {\n  width: 200px;\n  min-height: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  background-color: #F5F5F5; }\n  .file-list p {\n    color: #ffffff; }\n  .file-list ul {\n    list-style: none;\n    margin: 0;\n    padding: 5px 5px 0; }\n    .file-list ul li {\n      position: relative;\n      padding: 5px;\n      margin: 0 0 5px;\n      background-color: #fff;\n      min-height: 29px; }\n      .file-list ul li img {\n        max-width: 100%;\n        height: auto;\n        display: block; }\n      .file-list ul li span {\n        position: absolute;\n        bottom: 5px;\n        left: 5px;\n        background-color: #333333;\n        color: #ffffff;\n        padding: 3px;\n        font-size: 0.8em;\n        border-radius: 5px;\n        opacity: 0;\n        transition: opacity 300ms ease; }\n      .file-list ul li:hover span {\n        opacity: 1; }\n      .file-list ul li:hover .remove {\n        opacity: 1; }\n  .file-list .remove {\n    position: absolute;\n    top: 3px;\n    right: 3px;\n    width: 24px;\n    height: 24px;\n    background: transparent url(" + __webpack_require__(7) + ") 0 0 no-repeat;\n    /*background: transparent url('../img/ic_remove_circle_outline_black_24px.svg') 0 0 no-repeat;*/\n    cursor: pointer;\n    opacity: 0.5; }\n    .file-list .remove:hover {\n      transform: scale(1.1); }\n\n.output {\n  padding: 10px 10px 0 210px; }\n\n.add-files-btn {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  margin: auto;\n  width: 48px;\n  height: 48px;\n  background: transparent url(" + __webpack_require__(8) + ") center center no-repeat;\n  cursor: pointer;\n  display: none; }\n\n.add-files-text {\n  position: absolute;\n  top: 76px;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  margin: auto;\n  width: 175px;\n  height: 20px;\n  text-align: center;\n  cursor: pointer;\n  display: none; }\n\n.dropbox {\n  /*border: solid 1px #000;*/\n  background: transparent url(" + __webpack_require__(9) + ") 0 0 repeat;\n  background-size: 20px;\n  margin: 0 auto;\n  float: left;\n  position: relative;\n  /*width: 100%;*/\n  min-width: 100%;\n  min-height: 512px;\n  cursor: pointer; }\n  .dropbox.is-empty .add-files-btn, .dropbox.is-empty .add-files-text {\n    display: block; }\n\n.fileSelect {\n  display: block; }\n\n.clear {\n  width: 100%;\n  clear: both; }\n\n.result {\n  padding: 10px 0 0 0; }\n\ntextarea {\n  width: 1024px; }\n\n.download {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  width: 80px;\n  height: 48px;\n  background: transparent url(" + __webpack_require__(10) + ") center 0 no-repeat;\n  cursor: pointer; }\n  .download span {\n    font-size: 0.8em;\n    color: #ffffff;\n    width: 80px;\n    text-align: center;\n    position: absolute;\n    left: 0;\n    top: 46px; }\n  .download:active {\n    transform: scale(0.9); }\n\n.download-info {\n  font-size: 0.7em; }\n\n.copy {\n  position: absolute;\n  top: 10px;\n  right: 100px;\n  width: 80px;\n  height: 48px;\n  background: transparent url(" + __webpack_require__(11) + ") center 0 no-repeat;\n  cursor: pointer; }\n  .copy span {\n    font-size: 0.8em;\n    color: #ffffff;\n    width: 80px;\n    text-align: center;\n    position: absolute;\n    left: 0;\n    top: 54px; }\n  .copy:active {\n    transform: scale(0.9); }\n\n.dimensions {\n  font-size: 0.8em; }\n", ""]);
	
	// exports


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0xOSA2LjQxTDE3LjU5IDUgMTIgMTAuNTkgNi40MSA1IDUgNi40MSAxMC41OSAxMiA1IDE3LjU5IDYuNDEgMTkgMTIgMTMuNDEgMTcuNTkgMTkgMTkgMTcuNTkgMTMuNDEgMTJ6Ii8+CiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+Cjwvc3ZnPg=="

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjQ4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSI0OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem01IDExaC00djRoLTJ2LTRIN3YtMmg0VjdoMnY0aDR2MnoiLz4KPC9zdmc+"

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMxaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzA2NyA3OS4xNTc3NDcsIDIwMTUvMDMvMzAtMjM6NDA6NDIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY5RUVFNjAzODQzNzExRTVBQjQ1RjA2OTk1QjNGQ0FEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY5RUVFNjA0ODQzNzExRTVBQjQ1RjA2OTk1QjNGQ0FEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjlFRUU2MDE4NDM3MTFFNUFCNDVGMDY5OTVCM0ZDQUQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjlFRUU2MDI4NDM3MTFFNUFCNDVGMDY5OTVCM0ZDQUQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYGCAsMCgoLCgoMEAwMDAwMDBAMDg8QDw4MExMUFBMTHBsbGxwfHx8fHx8fHx8fAQcHBw0MDRgQEBgaFREVGh8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx//wAARCAAoACgDAREAAhEBAxEB/8QAWwABAQEBAAAAAAAAAAAAAAAAAAQFCAEBAAAAAAAAAAAAAAAAAAAAABABAAAFAwUBAAAAAAAAAAAAAMHhgqJjQwUVEVGREhM0EQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDpwAEO56dUAQgA3AAQ7np1QBCAC7k8d0gOTx3SA/dj+dXX28dgOMyWzA4zJbMEIALts1KYguABhgAu2zUpiC4AH//Z"

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjQ4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSI0OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0xOSA5aC00VjNIOXY2SDVsNyA3IDctN3pNNSAxOHYyaDE0di0ySDV6Ii8+CiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+Cjwvc3ZnPg=="

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjQ4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSI0OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik0xNiAxSDRjLTEuMSAwLTIgLjktMiAydjE0aDJWM2gxMlYxem0zIDRIOGMtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxMWMxLjEgMCAyLS45IDItMlY3YzAtMS4xLS45LTItMi0yem0wIDE2SDhWN2gxMXYxNHoiLz4KPC9zdmc+"

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _clipboardAction = __webpack_require__(13);
	
	var _clipboardAction2 = _interopRequireDefault(_clipboardAction);
	
	var _tinyEmitter = __webpack_require__(15);
	
	var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);
	
	var _goodListener = __webpack_require__(16);
	
	var _goodListener2 = _interopRequireDefault(_goodListener);
	
	/**
	 * Base class which takes one or more elements, adds event listeners to them,
	 * and instantiates a new `ClipboardAction` on each click.
	 */
	
	var Clipboard = (function (_Emitter) {
	    _inherits(Clipboard, _Emitter);
	
	    /**
	     * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
	     * @param {Object} options
	     */
	
	    function Clipboard(trigger, options) {
	        _classCallCheck(this, Clipboard);
	
	        _Emitter.call(this);
	
	        this.resolveOptions(options);
	        this.listenClick(trigger);
	    }
	
	    /**
	     * Helper function to retrieve attribute value.
	     * @param {String} suffix
	     * @param {Element} element
	     */
	
	    /**
	     * Defines if attributes would be resolved using internal setter functions
	     * or custom functions that were passed in the constructor.
	     * @param {Object} options
	     */
	
	    Clipboard.prototype.resolveOptions = function resolveOptions() {
	        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	        this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
	        this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
	        this.text = typeof options.text === 'function' ? options.text : this.defaultText;
	    };
	
	    /**
	     * Adds a click event listener to the passed trigger.
	     * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
	     */
	
	    Clipboard.prototype.listenClick = function listenClick(trigger) {
	        var _this = this;
	
	        this.listener = _goodListener2['default'](trigger, 'click', function (e) {
	            return _this.onClick(e);
	        });
	    };
	
	    /**
	     * Defines a new `ClipboardAction` on each click event.
	     * @param {Event} e
	     */
	
	    Clipboard.prototype.onClick = function onClick(e) {
	        var trigger = e.delegateTarget || e.currentTarget;
	
	        if (this.clipboardAction) {
	            this.clipboardAction = null;
	        }
	
	        this.clipboardAction = new _clipboardAction2['default']({
	            action: this.action(trigger),
	            target: this.target(trigger),
	            text: this.text(trigger),
	            trigger: trigger,
	            emitter: this
	        });
	    };
	
	    /**
	     * Default `action` lookup function.
	     * @param {Element} trigger
	     */
	
	    Clipboard.prototype.defaultAction = function defaultAction(trigger) {
	        return getAttributeValue('action', trigger);
	    };
	
	    /**
	     * Default `target` lookup function.
	     * @param {Element} trigger
	     */
	
	    Clipboard.prototype.defaultTarget = function defaultTarget(trigger) {
	        var selector = getAttributeValue('target', trigger);
	
	        if (selector) {
	            return document.querySelector(selector);
	        }
	    };
	
	    /**
	     * Default `text` lookup function.
	     * @param {Element} trigger
	     */
	
	    Clipboard.prototype.defaultText = function defaultText(trigger) {
	        return getAttributeValue('text', trigger);
	    };
	
	    /**
	     * Destroy lifecycle.
	     */
	
	    Clipboard.prototype.destroy = function destroy() {
	        this.listener.destroy();
	
	        if (this.clipboardAction) {
	            this.clipboardAction.destroy();
	            this.clipboardAction = null;
	        }
	    };
	
	    return Clipboard;
	})(_tinyEmitter2['default']);
	
	function getAttributeValue(suffix, element) {
	    var attribute = 'data-clipboard-' + suffix;
	
	    if (!element.hasAttribute(attribute)) {
	        return;
	    }
	
	    return element.getAttribute(attribute);
	}
	
	exports['default'] = Clipboard;
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _select = __webpack_require__(14);
	
	var _select2 = _interopRequireDefault(_select);
	
	/**
	 * Inner class which performs selection from either `text` or `target`
	 * properties and then executes copy or cut operations.
	 */
	
	var ClipboardAction = (function () {
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
	
	    ClipboardAction.prototype.resolveOptions = function resolveOptions() {
	        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	        this.action = options.action;
	        this.emitter = options.emitter;
	        this.target = options.target;
	        this.text = options.text;
	        this.trigger = options.trigger;
	
	        this.selectedText = '';
	    };
	
	    /**
	     * Decides which selection strategy is going to be applied based
	     * on the existence of `text` and `target` properties.
	     */
	
	    ClipboardAction.prototype.initSelection = function initSelection() {
	        if (this.text && this.target) {
	            throw new Error('Multiple attributes declared, use either "target" or "text"');
	        } else if (this.text) {
	            this.selectFake();
	        } else if (this.target) {
	            this.selectTarget();
	        } else {
	            throw new Error('Missing required attributes, use either "target" or "text"');
	        }
	    };
	
	    /**
	     * Creates a fake textarea element, sets its value from `text` property,
	     * and makes a selection on it.
	     */
	
	    ClipboardAction.prototype.selectFake = function selectFake() {
	        var _this = this;
	
	        this.removeFake();
	
	        this.fakeHandler = document.body.addEventListener('click', function () {
	            return _this.removeFake();
	        });
	
	        this.fakeElem = document.createElement('textarea');
	        this.fakeElem.style.position = 'absolute';
	        this.fakeElem.style.left = '-9999px';
	        this.fakeElem.style.top = (window.pageYOffset || document.documentElement.scrollTop) + 'px';
	        this.fakeElem.setAttribute('readonly', '');
	        this.fakeElem.value = this.text;
	
	        document.body.appendChild(this.fakeElem);
	
	        this.selectedText = _select2['default'](this.fakeElem);
	        this.copyText();
	    };
	
	    /**
	     * Only removes the fake element after another click event, that way
	     * a user can hit `Ctrl+C` to copy because selection still exists.
	     */
	
	    ClipboardAction.prototype.removeFake = function removeFake() {
	        if (this.fakeHandler) {
	            document.body.removeEventListener('click');
	            this.fakeHandler = null;
	        }
	
	        if (this.fakeElem) {
	            document.body.removeChild(this.fakeElem);
	            this.fakeElem = null;
	        }
	    };
	
	    /**
	     * Selects the content from element passed on `target` property.
	     */
	
	    ClipboardAction.prototype.selectTarget = function selectTarget() {
	        this.selectedText = _select2['default'](this.target);
	        this.copyText();
	    };
	
	    /**
	     * Executes the copy operation based on the current selection.
	     */
	
	    ClipboardAction.prototype.copyText = function copyText() {
	        var succeeded = undefined;
	
	        try {
	            succeeded = document.execCommand(this.action);
	        } catch (err) {
	            succeeded = false;
	        }
	
	        this.handleResult(succeeded);
	    };
	
	    /**
	     * Fires an event based on the copy operation result.
	     * @param {Boolean} succeeded
	     */
	
	    ClipboardAction.prototype.handleResult = function handleResult(succeeded) {
	        if (succeeded) {
	            this.emitter.emit('success', {
	                action: this.action,
	                text: this.selectedText,
	                trigger: this.trigger,
	                clearSelection: this.clearSelection.bind(this)
	            });
	        } else {
	            this.emitter.emit('error', {
	                action: this.action,
	                trigger: this.trigger,
	                clearSelection: this.clearSelection.bind(this)
	            });
	        }
	    };
	
	    /**
	     * Removes current selection and focus from `target` element.
	     */
	
	    ClipboardAction.prototype.clearSelection = function clearSelection() {
	        if (this.target) {
	            this.target.blur();
	        }
	
	        window.getSelection().removeAllRanges();
	    };
	
	    /**
	     * Sets the `action` to be performed which can be either 'copy' or 'cut'.
	     * @param {String} action
	     */
	
	    /**
	     * Destroy lifecycle.
	     */
	
	    ClipboardAction.prototype.destroy = function destroy() {
	        this.removeFake();
	    };
	
	    _createClass(ClipboardAction, [{
	        key: 'action',
	        set: function set() {
	            var action = arguments.length <= 0 || arguments[0] === undefined ? 'copy' : arguments[0];
	
	            this._action = action;
	
	            if (this._action !== 'copy' && this._action !== 'cut') {
	                throw new Error('Invalid "action" value, use either "copy" or "cut"');
	            }
	        },
	
	        /**
	         * Gets the `action` property.
	         * @return {String}
	         */
	        get: function get() {
	            return this._action;
	        }
	
	        /**
	         * Sets the `target` property using an element
	         * that will be have its content copied.
	         * @param {Element} target
	         */
	    }, {
	        key: 'target',
	        set: function set(target) {
	            if (target !== undefined) {
	                if (target && typeof target === 'object' && target.nodeType === 1) {
	                    this._target = target;
	                } else {
	                    throw new Error('Invalid "target" value, use a valid Element');
	                }
	            }
	        },
	
	        /**
	         * Gets the `target` property.
	         * @return {String|HTMLElement}
	         */
	        get: function get() {
	            return this._target;
	        }
	    }]);
	
	    return ClipboardAction;
	})();
	
	exports['default'] = ClipboardAction;
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports) {

	function select(element) {
	    var selectedText;
	
	    if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
	        element.focus();
	        element.setSelectionRange(0, element.value.length);
	
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


/***/ },
/* 15 */
/***/ function(module, exports) {

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


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var is = __webpack_require__(17);
	var delegate = __webpack_require__(18);
	
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
	
	    if (!is.function(callback)) {
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


/***/ },
/* 17 */
/***/ function(module, exports) {

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
	exports.function = function(value) {
	    var type = Object.prototype.toString.call(value);
	
	    return type === '[object Function]';
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var closest = __webpack_require__(19);
	
	/**
	 * Delegates event to a selector.
	 *
	 * @param {Element} element
	 * @param {String} selector
	 * @param {String} type
	 * @param {Function} callback
	 * @return {Object}
	 */
	function delegate(element, selector, type, callback) {
	    var listenerFn = listener.apply(this, arguments);
	
	    element.addEventListener(type, listenerFn);
	
	    return {
	        destroy: function() {
	            element.removeEventListener(type, listenerFn);
	        }
	    }
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
	        e.delegateTarget = closest(e.target, selector, true);
	
	        if (e.delegateTarget) {
	            callback.call(element, e);
	        }
	    }
	}
	
	module.exports = delegate;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var matches = __webpack_require__(20)
	
	module.exports = function (element, selector, checkYoSelf) {
	  var parent = checkYoSelf ? element : element.parentNode
	
	  while (parent && parent !== document) {
	    if (matches(parent, selector)) return parent;
	    parent = parent.parentNode
	  }
	}


/***/ },
/* 20 */
/***/ function(module, exports) {

	
	/**
	 * Element prototype.
	 */
	
	var proto = Element.prototype;
	
	/**
	 * Vendor function.
	 */
	
	var vendor = proto.matchesSelector
	  || proto.webkitMatchesSelector
	  || proto.mozMatchesSelector
	  || proto.msMatchesSelector
	  || proto.oMatchesSelector;
	
	/**
	 * Expose `match()`.
	 */
	
	module.exports = match;
	
	/**
	 * Match `el` to `selector`.
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @return {Boolean}
	 * @api public
	 */
	
	function match(el, selector) {
	  if (vendor) return vendor.call(el, selector);
	  var nodes = el.parentNode.querySelectorAll(selector);
	  for (var i = 0; i < nodes.length; ++i) {
	    if (nodes[i] == el) return true;
	  }
	  return false;
	}

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	
	function Packer(pad, pre, path) {
	    this.init(pad, pre, path);
	}
	
	Packer.prototype = {
	
	    init: function init(pad, pre, path) {
	        var padding = isNumeric(pad) ? pad : 2;
	        padding = Math.round(Math.abs(padding));
	        this.root = {
	            x: 0, // origin x
	            y: 0, // origin y
	            w: 256 - padding, // width
	            h: 256 - padding, // height
	            p: padding
	        };
	        this.prefix = pre;
	        //this.prefix = this.prefix.replace(/ /g, '');
	        this.path = path;
	    },
	
	    sort: function sort(blocks) {
	        blocks.sort(function (a, b) {
	            // should this be sorted by height?
	            if (a.h < b.h) {
	                return 1;
	            }
	            if (a.h > b.h) {
	                return -1;
	            }
	            return 0;
	        });
	    },
	
	    fit: function fit(blocks) {
	        var n,
	            node,
	            block,
	            p = this.root.p;
	        for (n = 0; n < blocks.length; n++) {
	            block = blocks[n];
	            block.fit = false; // reset
	            if (node = this.findNode(this.root, block.w + p, block.h + p)) {
	                block.fit = this.splitNode(node, block.w + p, block.h + p);
	            }
	            if (!block.fit) {
	                this.resize(blocks);
	                break;
	            }
	        }
	    },
	
	    resize: function resize(blocks) {
	        var w,
	            h,
	            p = this.root.p;
	        if (this.root.w > this.root.h) {
	            w = this.root.w + p;
	            h = (this.root.h + p) * 2;
	        } else {
	            w = (this.root.w + p) * 2;
	            h = this.root.h + p;
	        }
	        this.root = {
	            x: 0, // origin x
	            y: 0, // origin y
	            w: w - p, // width
	            h: h - p, // height
	            p: p
	        };
	        this.fit(blocks);
	    },
	
	    findNode: function findNode(root, w, h) {
	        if (root.used) return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);else if (w <= root.w && h <= root.h) return root;else return null;
	    },
	
	    splitNode: function splitNode(node, w, h) {
	        node.used = true;
	        node.down = { x: node.x, y: node.y + h, w: node.w, h: node.h - h };
	        node.right = { x: node.x + w, y: node.y, w: node.w - w, h: h };
	        return node;
	    },
	
	    draw: function draw(blocks, canvas, output) {
	        var ctx = canvas.getContext('2d');
	        var gitubUrl = '/*\nResponsive CSS Sprite created using: ' + 'http://eivers88.github.io/responsive-css-sprite-generator/\n' + '*/\n\n';
	        var groupSelectors = '';
	        var globalStyle = '\n{display:inline-block; overflow:hidden; background-repeat: ' + 'no-repeat;background-image:url(' + this.path + ');}\n\n';
	        var spriteStyle = '';
	        var p = this.root.p; // padding
	        var width = this.root.w + p;
	        var height = this.root.h + p;
	        var b; // block
	        canvas.width = width;
	        canvas.height = height;
	        ctx.clearRect(0, 0, canvas.width, canvas.height);
	        for (var n = 0; n < blocks.length; n++) {
	            b = blocks[n];
	            if (b.fit) {
	                // turn on for testing
	                //ctx.fillRect(b.fit.x + p, b.fit.y + p, b.w, b.h);
	                //ctx.stroke();
	                ctx.drawImage(b.img, b.fit.x + p, b.fit.y + p);
	                // add comma if not the last style
	                groupSelectors += '.' + this.prefix + b.name + (n === blocks.length - 1 ? ' ' : ', ');
	                // individual sprite style
	                spriteStyle += '.' + this.prefix + b.name + ' {width:' + b.w + 'px; ' + 'height:' + b.h + 'px; ' + 'background-position:' + ((b.fit.x + p) / (width - b.w) * 100).toPrecision(6) + '% ' + ((b.fit.y + p) / (height - b.h) * 100).toPrecision(6) + '%; ' + 'background-size:' + (width / b.w * 100).toPrecision(6) + '%; ' + '}\n';
	            }
	        }
	        output.value = gitubUrl + groupSelectors + globalStyle + spriteStyle;
	    }
	
	};
	
	function isNumeric(n) {
	    return !isNaN(parseFloat(n)) && isFinite(n);
	}
	
	module.exports = Packer;

/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";
	
	// Returns a function, that, as long as it continues to be invoked, will not
	// be triggered. The function will be called after it stops being called for
	// N milliseconds. If `immediate` is passed, trigger the function on the
	// leading edge, instead of the trailing.
	function debounce(func, wait, immediate) {
	    var timeout;
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
	};
	
	module.exports = debounce;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map