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

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/Users/digit/Sites/react-code-input/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/Users/digit/Sites/react-code-input/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(1);var _react2=_interopRequireDefault(_react);var _classnames=__webpack_require__(2);var _classnames2=_interopRequireDefault(_classnames);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var ReactCodeInput=function(_Component){_inherits(ReactCodeInput,_Component);function ReactCodeInput(props){_classCallCheck(this,ReactCodeInput);var _this=_possibleConstructorReturn(this,(ReactCodeInput.__proto__||Object.getPrototypeOf(ReactCodeInput)).call(this,props));var value=props.value,fields=props.fields,type=props.type,isValid=props.isValid,disabled=props.disabled;_this.state={value:value,fields:fields,type:type,input:[],isValid:isValid,disabled:disabled,defaultInputStyle:{fontFamily:'monospace',MozAppearance:'textfield',borderRadius:'6px',border:'1px solid',boxShadow:'0px 0px 10px 0px rgba(0,0,0,.10)',margin:'4px',paddingLeft:'8px',width:'36px',height:'42px',fontSize:'32px',boxSizing:'border-box'}};for(var i=0;i<Number(_this.state.fields);i+=1){if(i<32){var _value=[].concat(_toConsumableArray(_this.state.value))[i]||'';_this.state.input.push(_value);}}return _this;}_createClass(ReactCodeInput,[{key:'componentWillReceiveProps',value:function componentWillReceiveProps(nextProps){this.setState({isValid:nextProps.isValid,value:nextProps.value,disabled:nextProps.disabled});}},{key:'handleBlur',value:function handleBlur(e){this.handleTouch(e.target.value);}},{key:'handleTouch',value:function handleTouch(value){var _props=this.props,touch=_props.touch,untouch=_props.untouch,name=_props.name;if(typeof touch==='function'&&typeof untouch==='function'){if(value===''){touch(name);}else{untouch(name);}}}},{key:'handleChange',value:function handleChange(e){var target=Number(e.target.id);var value=String(e.target.value);if(value!==''){if(this.state.type==='number'){if(!value.match(/(\d)/g)){return;}if(value.length>1){this.refs[target].value=value.slice(-1);}}var input=this.state.input.slice();input[target]=this.refs[target].value;value=input.join('');this.setState({value:value,input:input});var newTarget=this.refs[target+1];if(newTarget){newTarget.focus();newTarget.select();}}if('onChange'in this.props){if(value){this.props.onChange(value);}}this.handleTouch(value);}},{key:'onKeyDown',value:function onKeyDown(e){var target=Number(e.target.id),prevTarget=this.refs[target-1];var input=void 0,value=void 0;switch(e.keyCode){case 8:e.preventDefault();this.refs[target].value='';input=this.state.input.slice();input[target]='';value=input.join('');this.setState({value:value,input:input});if(this.refs[target].value===''){if(prevTarget){prevTarget.focus();prevTarget.select();}}break;default:break;}if('onChange'in this.props){if(value){this.props.onChange(value);}}this.handleTouch(value);}},{key:'render',value:function render(){var _this2=this;var _props2=this.props,className=_props2.className,_props2$style=_props2.style,style=_props2$style===undefined?{}:_props2$style,_props2$inputStyle=_props2.inputStyle,inputStyle=_props2$inputStyle===undefined?{}:_props2$inputStyle,_props2$inputStyleInv=_props2.inputStyleInvalid,inputStyleInvalid=_props2$inputStyleInv===undefined?{}:_props2$inputStyleInv,type=_props2.type,_state=this.state,disabled=_state.disabled,input=_state.input,isValid=_state.isValid,defaultInputStyle=_state.defaultInputStyle,styles={container:style,input:isValid?inputStyle:inputStyleInvalid};Object.assign(styles.container,{display:'inline-block'});if(!className&&Object.keys(inputStyle).length===0){Object.assign(inputStyle,_extends({},defaultInputStyle,{color:'black',backgroundColor:'white',borderColor:'lightgrey'}));}if(!className&&Object.keys(inputStyleInvalid).length===0){Object.assign(inputStyleInvalid,_extends({},defaultInputStyle,{color:'#b94a48',backgroundColor:'#f2dede',borderColor:'#eed3d7'}));}if(disabled){Object.assign(styles.input,{cursor:'not-allowed',color:'lightgrey',borderColor:'lightgrey',backgroundColor:'#efeff1'});}return _react2.default.createElement('div',{className:(0,_classnames2.default)(className,'react-code-input'),style:styles.container},input.map(function(value,i){return _react2.default.createElement('input',{ref:i,id:i,autoFocus:i===0?'autoFocus':'',defaultValue:value,key:'input_'+i,type:type,min:0,max:9,maxLength:1,style:styles.input,autoComplete:'off',onFocus:function onFocus(e){return e.target.select(e);},onBlur:function onBlur(e){return _this2.handleBlur(e);},onChange:function onChange(e){return _this2.handleChange(e);},onKeyDown:function onKeyDown(e){return _this2.onKeyDown(e);},disabled:disabled,'data-valid':isValid});}));}}]);return ReactCodeInput;}(_react.Component);ReactCodeInput.defaultProps={isValid:true,disabled:false,fields:4,value:'',type:'text'};ReactCodeInput.propTypes={options:_react.PropTypes.object,type:_react.PropTypes.oneOf(['text','number','password']),fields:_react.PropTypes.number,value:_react.PropTypes.string,onChange:_react.PropTypes.func,name:_react.PropTypes.string,touch:_react.PropTypes.func,untouch:_react.PropTypes.func,className:_react.PropTypes.string,isValid:_react.PropTypes.bool,disabled:_react.PropTypes.bool,style:_react.PropTypes.object,inputStyle:_react.PropTypes.object,inputStyleInvalid:_react.PropTypes.object};exports.default=ReactCodeInput;
	
	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/Users/digit/Sites/react-code-input/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "ReactCodeInput.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */
	
	(function () {
		'use strict';
	
		var hasOwn = {}.hasOwnProperty;
	
		function classNames () {
			var classes = [];
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg;
	
				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}
	
			return classes.join(' ');
		}
	
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ }
/******/ ])
});
;
//# sourceMappingURL=ReactCodeInput.js.map