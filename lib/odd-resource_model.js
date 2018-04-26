(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("axios"), require("lodash.defaults"), require("odd-fetching_data_options_service"));
	else if(typeof define === 'function' && define.amd)
		define("odd-resource_model", ["axios", "lodash.defaults", "odd-fetching_data_options_service"], factory);
	else if(typeof exports === 'object')
		exports["odd-resource_model"] = factory(require("axios"), require("lodash.defaults"), require("odd-fetching_data_options_service"));
	else
		root["odd-resource_model"] = factory(root["axios"], root["lodash.defaults"], root["odd-fetching_data_options_service"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = __webpack_require__(1);

var _axios2 = _interopRequireDefault(_axios);

var _lodash = __webpack_require__(2);

var _lodash2 = _interopRequireDefault(_lodash);

var _oddFetching_data_options_service = __webpack_require__(3);

var _oddFetching_data_options_service2 = _interopRequireDefault(_oddFetching_data_options_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OPTIONS = new WeakMap();
var API_BASE_PATH = new WeakMap();
var DEFAULT_OPTIONS = {
  apiPath: '/api',
  apiVersion: 'v1',
  scope: 'web',
  resourceType: 'resources',
  attributes: [],
  editableAttributes: []
};

var Base = function () {
  function Base() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Base);

    OPTIONS.set(this, (0, _lodash2.default)(options, DEFAULT_OPTIONS));
    API_BASE_PATH.set(this, OPTIONS.get(this).apiPath + '/' + OPTIONS.get(this).apiVersion + '/' + OPTIONS.get(this).scope + '/' + OPTIONS.get(this).resourceType);

    OPTIONS.get(this).attributes.forEach(function (attr) {
      _this[attr] = attributes[attr];
    });
  }

  /**
   * 對 API 送出請求，拿回 resources 的 list
   *
   * @returns {Promise} 回傳 response 或 errors
   */


  _createClass(Base, [{
    key: 'save',


    /**
     * 把目前的 resource 內容存到 server。
     *
     * @returns {Promise} 回傳 response 或 errors
     */
    value: function save() {
      if (this.isNewRecord()) {
        return _axios2.default.post(API_BASE_PATH.get(this), this.requestBody());
      }
      return _axios2.default.put(API_BASE_PATH.get(this) + '/' + this.id, this.requestBody());
    }

    /**
     * 刪除目前的 resource
     *
     * @returns {Promise} 回傳 response 或 errors
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      return _axios2.default.delete(API_BASE_PATH.get(this) + '/' + this.id);
    }

    /**
     *  Helpers
     */

  }, {
    key: 'attributes',
    value: function attributes() {
      var _this2 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var result = {};

      if (options.all) {
        OPTIONS.get(this).attributes.forEach(function (attr) {
          result[attr] = _this2[attr];
        });
      } else {
        OPTIONS.get(this).editableAttributes.forEach(function (attr) {
          result[attr] = _this2[attr];
        });
      }

      return result;
    }
  }, {
    key: 'isNewRecord',
    value: function isNewRecord() {
      return this.id === undefined;
    }
  }, {
    key: 'requestBody',
    value: function requestBody() {
      return {
        data: {
          type: OPTIONS.get(this).resourceType,
          attributes: this.attributes()
        }
      };
    }
  }], [{
    key: 'all',
    value: function all() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return _axios2.default.get(API_BASE_PATH.get(this) + '?' + _oddFetching_data_options_service2.default.call(options));
    }

    /**
     * 對 API 送出請求，拿回單一 resource 的內容
     *
     * @param {number} id 指定的 resource ID
     * @returns {Promise} 回傳 response 或 errors
     */

  }, {
    key: 'find',
    value: function find(id) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return _axios2.default.get(API_BASE_PATH.get(this) + '/' + id + '?' + _oddFetching_data_options_service2.default.call(options));
    }
  }]);

  return Base;
}();

exports.default = Base;
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=odd-resource_model.js.map