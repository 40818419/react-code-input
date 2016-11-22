(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactCodeInput"] = factory(require("react"));
	else
		root["ReactCodeInput"] = factory(root["react"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
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
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ReactCodeInput = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ReactCodeInput = exports.ReactCodeInput = function (_Component) {
	  _inherits(ReactCodeInput, _Component);
	
	  function ReactCodeInput(props) {
	    _classCallCheck(this, ReactCodeInput);
	
	    var _this = _possibleConstructorReturn(this, (ReactCodeInput.__proto__ || Object.getPrototypeOf(ReactCodeInput)).call(this, props));
	
	    _this.state = {
	      value: props.value || '',
	      digits: props.digits || 4,
	      type: props.type || 'text',
	      input: []
	    };
	
	    for (var i = 0; i < Number(_this.state.digits); i += 1) {
	      var value = [].concat(_toConsumableArray(_this.state.value))[i] || '';
	      _this.state.input.push(value);
	    }
	
	    _this.handleChange = _this.handleChange.bind(_this);
	    _this.onKeyDown = _this.onKeyDown.bind(_this);
	    _this.handleBlur = _this.handleBlur.bind(_this);
	    return _this;
	  }
	
	  _createClass(ReactCodeInput, [{
	    key: 'handleBlur',
	    value: function handleBlur(e) {
	      this.handleTouch(e.target.value);
	    }
	  }, {
	    key: 'handleTouch',
	    value: function handleTouch(value) {
	      if (typeof this.props.touch === 'function' && typeof this.props.untouch === 'function') {
	        if (value === '') {
	          this.props.touch(this.props.name);
	        } else {
	          this.props.untouch(this.props.name);
	        }
	      }
	    }
	  }, {
	    key: 'handleChange',
	    value: function handleChange(e) {
	      var target = Number(e.target.id);
	      var value = String(e.target.value);
	
	      if (value !== '') {
	        if (this.state.type === 'number') {
	          if (!value.match(/(\d)/g)) {
	            return;
	          }
	          if (value.length > 1) {
	            this.refs[target].value = value.slice(-1);
	          }
	        }
	
	        var input = this.state.input.slice();
	        input[target] = this.refs[target].value;
	        value = input.join('');
	
	        this.setState({ value: value, input: input });
	
	        var newTarget = this.refs[target + 1];
	        if (newTarget) {
	          newTarget.focus();
	          newTarget.select();
	        }
	      }
	      if ('onChange' in this.props) {
	        this.props.onChange(value);
	      }
	      this.handleTouch(value);
	    }
	  }, {
	    key: 'onKeyDown',
	    value: function onKeyDown(e) {
	      var target = Number(e.target.id),
	          prevTarget = this.refs[target - 1];
	      var input = void 0,
	          value = void 0;
	
	      switch (e.keyCode) {
	        case 8:
	          e.preventDefault();
	          this.refs[target].value = '';
	          input = this.state.input.slice();
	          input[target] = '';
	          value = input.join('');
	
	          this.setState({ value: value, input: input });
	          if (this.refs[target].value === '') {
	            if (prevTarget) {
	              prevTarget.focus();
	              prevTarget.select();
	            }
	          }
	          break;
	        default:
	          break;
	      }
	      if ('onChange' in this.props) {
	        this.props.onChange(value);
	      }
	      this.handleTouch(value);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var _props$options = this.props.options,
	          options = _props$options === undefined ? {} : _props$options;
	
	
	      var styles = {
	        container: {
	          display: 'inline-block'
	        },
	        input: {
	          fontFamily: 'monospace',
	          borderRadius: options.borderRadius || '6px',
	          border: options.border || '1px solid lightgrey',
	          boxShadow: options.boxShadow || '0px 0px 10px 0px rgba(0,0,0,.10)',
	          margin: options.margin || '4px',
	          paddingLeft: options.paddingLeft || '10px',
	          width: options.width || '30px',
	          height: options.height || '42px',
	          fontSize: options.fontSize || '32px',
	          backgroundColor: options.backgroundColor || 'white',
	          color: options.color || 'black',
	          MozAppearance: 'textfield'
	        }
	      };
	
	      return _react2.default.createElement(
	        'div',
	        { className: 'react-code-input', style: styles.container },
	        this.state.input.map(function (value, i) {
	          return _react2.default.createElement('input', {
	            ref: i,
	            id: i,
	            autoFocus: i === 0 ? 'autoFocus' : '',
	            defaultValue: value,
	            key: 'input_' + i,
	            type: _this2.props.type,
	            min: 0,
	            max: 9,
	            maxLength: 1,
	            style: styles.input,
	            autoComplete: 'off',
	            onFocus: function onFocus(e) {
	              return e.target.select();
	            },
	            onBlur: _this2.handleBlur,
	            onChange: _this2.handleChange,
	            onKeyDown: _this2.onKeyDown
	          });
	        })
	      );
	    }
	  }]);
	
	  return ReactCodeInput;
	}(_react.Component);
	
	ReactCodeInput.propTypes = {
	  type: _react.PropTypes.oneOf(['text', 'number', 'password']),
	  options: _react.PropTypes.shape({
	    fontFamily: _react.PropTypes.string,
	    borderRadius: _react.PropTypes.string,
	    border: _react.PropTypes.string,
	    boxShadow: _react.PropTypes.string,
	    margin: _react.PropTypes.string,
	    paddingLeft: _react.PropTypes.string,
	    width: _react.PropTypes.string,
	    height: _react.PropTypes.string,
	    fontSize: _react.PropTypes.string,
	    backgroundColor: _react.PropTypes.string,
	    color: _react.PropTypes.string
	  }),
	  digits: _react.PropTypes.number,
	  value: _react.PropTypes.string,
	  onChange: _react.PropTypes.func,
	  name: _react.PropTypes.string,
	  touch: _react.PropTypes.func,
	  untouch: _react.PropTypes.func
	};
	
	exports.default = ReactCodeInput;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=index.js.map