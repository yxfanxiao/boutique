webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(108);


/***/ },

/***/ 55:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(58)();
	// imports


	// module
	exports.push([module.id, "ul.products-list {\n  list-style: none;\n  display: flex;\n}\nul.products-list > li.product-item > .product-item-img {\n  height: 250px;\n  width: 250px;\n}\nul.products-list > li.product-item > .product-item-img > img {\n  width: 100%;\n  height: 100%;\n  margin: auto;\n}\nul.products-list > li.product-item > .product-introduction {\n  text-align: center;\n}\nul.products-list > li.product-item > .product-introduction > p {\n  margin: 0;\n  padding: 0;\n}\n", ""]);

	// exports


/***/ },

/***/ 56:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(58)();
	// imports


	// module
	exports.push([module.id, "body {\n  padding: 0;\n  margin: 0;\n}\n", ""]);

	// exports


/***/ },

/***/ 57:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getAllProducts = getAllProducts;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _mockdataProducts = __webpack_require__(109);

	var _mockdataProducts2 = _interopRequireDefault(_mockdataProducts);

	var RECEIVE_PRODUCTS = "RECEIVE_PRODUCTS";
	exports.RECEIVE_PRODUCTS = RECEIVE_PRODUCTS;
	var ADD_TO_CART = "ADD_TO_CART";

	exports.ADD_TO_CART = ADD_TO_CART;
	function receiveProducts(products) {
	    return {
	        type: RECEIVE_PRODUCTS,
	        products: products
	    };
	}

	function addToCart(id) {
	    return {
	        type: ADD_TO_CART

	    };
	}

	function getAllProducts() {
	    return function (dispatch) {
	        _mockdataProducts2["default"].getProducts(function (products) {
	            dispatch(receiveProducts(products));
	        });
	    };
	}

/***/ },

/***/ 58:
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	"use strict";

	module.exports = function () {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },

/***/ 101:
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

/***/ 102:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _products = __webpack_require__(105);

	var _products2 = _interopRequireDefault(_products);

	exports["default"] = {
	    ProductsList: _products2["default"]
	};
	module.exports = exports["default"];

/***/ },

/***/ 103:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(13);

	var _react2 = _interopRequireDefault(_react);

	var ProductItem = (function (_Component) {
	    _inherits(ProductItem, _Component);

	    function ProductItem() {
	        _classCallCheck(this, ProductItem);

	        _get(Object.getPrototypeOf(ProductItem.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(ProductItem, [{
	        key: "render",
	        value: function render() {
	            var product = this.props.product;

	            return _react2["default"].createElement(
	                "li",
	                { className: "product-item" },
	                _react2["default"].createElement(
	                    "div",
	                    { className: "product-item-img" },
	                    _react2["default"].createElement("img", {
	                        src: product.url,
	                        alt: product.title
	                    })
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "product-introduction" },
	                    _react2["default"].createElement(
	                        "a",
	                        { href: "#" },
	                        product.title
	                    ),
	                    _react2["default"].createElement(
	                        "p",
	                        null,
	                        product.price
	                    ),
	                    _react2["default"].createElement(
	                        "p",
	                        null,
	                        product.desc
	                    )
	                )
	            );
	        }
	    }]);

	    return ProductItem;
	})(_react.Component);

	exports["default"] = ProductItem;
	module.exports = exports["default"];

/***/ },

/***/ 104:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(13);

	var _react2 = _interopRequireDefault(_react);

	var _ProductItem = __webpack_require__(103);

	var _ProductItem2 = _interopRequireDefault(_ProductItem);

	var ProductsList = (function (_Component) {
	    _inherits(ProductsList, _Component);

	    function ProductsList() {
	        _classCallCheck(this, ProductsList);

	        _get(Object.getPrototypeOf(ProductsList.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(ProductsList, [{
	        key: "render",
	        value: function render() {
	            var products = this.props.products;

	            return _react2["default"].createElement(
	                "ul",
	                { className: "products-list" },
	                products.map(function (product) {
	                    return _react2["default"].createElement(_ProductItem2["default"], { product: product, key: product.id });
	                })
	            );
	        }
	    }]);

	    return ProductsList;
	})(_react.Component);

	exports["default"] = ProductsList;
	module.exports = exports["default"];

/***/ },

/***/ 105:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	__webpack_require__(196);

	var _ProductsList = __webpack_require__(104);

	var _ProductsList2 = _interopRequireDefault(_ProductsList);

	exports["default"] = _ProductsList2["default"];
	module.exports = exports["default"];

/***/ },

/***/ 106:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(13);

	var _react2 = _interopRequireDefault(_react);

	var _ProductsContainer = __webpack_require__(107);

	var _ProductsContainer2 = _interopRequireDefault(_ProductsContainer);

	var App = (function (_Component) {
	    _inherits(App, _Component);

	    function App() {
	        _classCallCheck(this, App);

	        _get(Object.getPrototypeOf(App.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(App, [{
	        key: "render",
	        value: function render() {
	            return _react2["default"].createElement(
	                "div",
	                { className: "app" },
	                _react2["default"].createElement(_ProductsContainer2["default"], null)
	            );
	        }
	    }]);

	    return App;
	})(_react.Component);

	exports["default"] = App;
	module.exports = exports["default"];

/***/ },

/***/ 107:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(13);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(35);

	var _components = __webpack_require__(102);

	var ProductsContainer = (function (_Component) {
	    _inherits(ProductsContainer, _Component);

	    function ProductsContainer() {
	        _classCallCheck(this, ProductsContainer);

	        _get(Object.getPrototypeOf(ProductsContainer.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(ProductsContainer, [{
	        key: "render",
	        value: function render() {
	            var products = this.props.products;

	            return _react2["default"].createElement(
	                "div",
	                { className: "products-container" },
	                _react2["default"].createElement(
	                    "h3",
	                    null,
	                    "Products List"
	                ),
	                _react2["default"].createElement(_components.ProductsList, { products: products })
	            );
	        }
	    }]);

	    return ProductsContainer;
	})(_react.Component);

	function select(state) {
	    return {
	        products: state.products
	    };
	}

	exports["default"] = (0, _reactRedux.connect)(select)(ProductsContainer);
	module.exports = exports["default"];

/***/ },

/***/ 108:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	__webpack_require__(197);

	var _react = __webpack_require__(13);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(65);

	var _redux = __webpack_require__(34);

	var _reactRedux = __webpack_require__(35);

	var _reduxThunk = __webpack_require__(96);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _reduxLogger = __webpack_require__(95);

	var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

	var _reducers = __webpack_require__(110);

	var _reducers2 = _interopRequireDefault(_reducers);

	var _containersApp = __webpack_require__(106);

	var _containersApp2 = _interopRequireDefault(_containersApp);

	var _actions = __webpack_require__(57);

	var middleware = process.env.NODE_ENV === "production" ? [_reduxThunk2["default"]] : [_reduxThunk2["default"], (0, _reduxLogger2["default"])()];
	var createStoreWithMiddleware = _redux.applyMiddleware.apply(undefined, middleware)(_redux.createStore);
	var store = createStoreWithMiddleware(_reducers2["default"]);

	store.dispatch((0, _actions.getAllProducts)());

	(0, _reactDom.render)(_react2["default"].createElement(
	    _reactRedux.Provider,
	    { store: store },
	    _react2["default"].createElement(_containersApp2["default"], null)
	), document.getElementById("root"));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 109:
/***/ function(module, exports, __webpack_require__) {

	// Mock client-server processing

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _productsListJson = __webpack_require__(195);

	var _productsListJson2 = _interopRequireDefault(_productsListJson);

	var TIMEOUT = 100;

	exports["default"] = {
	    getProducts: function getProducts(cb, timeout) {
	        setTimeout(function () {
	            return cb(_productsListJson2["default"]);
	        }, timeout || TIMEOUT);
	    }
	};
	module.exports = exports["default"];

/***/ },

/***/ 110:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _redux = __webpack_require__(34);

	var _products = __webpack_require__(111);

	var _products2 = _interopRequireDefault(_products);

	var reducers = (0, _redux.combineReducers)({
	    products: _products2["default"]
	});

	exports["default"] = reducers;
	module.exports = exports["default"];

/***/ },

/***/ 111:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	var _actions = __webpack_require__(57);

	// export function () {}

	function products(state, action) {
	    if (state === undefined) state = [];

	    switch (action.type) {
	        case _actions.RECEIVE_PRODUCTS:
	            return [].concat(_toConsumableArray(action.products));
	        default:
	            return state;
	    }
	}

	exports["default"] = products;
	module.exports = exports["default"];

/***/ },

/***/ 195:
/***/ function(module, exports) {

	module.exports = [
		{
			"id": 1,
			"title": "iPhone 6s Plus",
			"price": "￥6888",
			"desc": "肾重之选",
			"inventory": 5,
			"url": "/assets/images/apple/iphone.png"
		},
		{
			"id": 2,
			"title": "iPad Pro",
			"price": "￥5888",
			"desc": "爱派德",
			"inventory": 3,
			"url": "/assets/images/apple/ipad.png"
		},
		{
			"id": 3,
			"title": "MacBook Air",
			"price": "￥10208",
			"desc": "麦克布克",
			"inventory": 10,
			"url": "/assets/images/apple/macbook.png"
		}
	];

/***/ },

/***/ 196:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(55);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(101)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(55, function() {
				var newContent = __webpack_require__(55);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 197:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(56);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(101)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(56, function() {
				var newContent = __webpack_require__(56);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }

});