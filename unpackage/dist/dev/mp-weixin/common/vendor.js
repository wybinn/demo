(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 17:
/*!*********************************************!*\
  !*** E:/共同观察/共同观察/static/head_portrait.jpg ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 37:
/*!**************************************!*\
  !*** E:/共同观察/共同观察/static/return.svg ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/return.5c671f66.svg";

/***/ }),

/***/ 4:
/*!*******************************!*\
  !*** E:/共同观察/共同观察/pages.json ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 41:
/*!***************************************!*\
  !*** E:/共同观察/共同观察/static/return2.svg ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/return2.3b2c4fcf.svg";

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map