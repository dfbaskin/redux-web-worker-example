define("./chunk-2feafc53.js",['exports'], function (exports) { 'use strict';

	function symbolObservablePonyfill(root) {
		var result;
		var Symbol = root.Symbol;

		if (typeof Symbol === 'function') {
			if (Symbol.observable) {
				result = Symbol.observable;
			} else {
				result = Symbol('observable');
				Symbol.observable = result;
			}
		} else {
			result = '@@observable';
		}

		return result;
	}

	/* global window */

	var root;

	if (typeof self !== 'undefined') {
	  root = self;
	} else if (typeof window !== 'undefined') {
	  root = window;
	} else if (typeof global !== 'undefined') {
	  root = global;
	} else if (typeof module !== 'undefined') {
	  root = module;
	} else {
	  root = Function('return this')();
	}

	var result = symbolObservablePonyfill(root);

	/**
	 * These are private action types reserved by Redux.
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */
	var randomString = function randomString() {
	  return Math.random().toString(36).substring(7).split('').join('.');
	};

	var ActionTypes = {
	  INIT: "@@redux/INIT" + randomString(),
	  REPLACE: "@@redux/REPLACE" + randomString(),
	  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
	    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
	  }
	};

	/**
	 * @param {any} obj The object to inspect.
	 * @returns {boolean} True if the argument appears to be a plain object.
	 */
	function isPlainObject(obj) {
	  if (typeof obj !== 'object' || obj === null) return false;
	  var proto = obj;

	  while (Object.getPrototypeOf(proto) !== null) {
	    proto = Object.getPrototypeOf(proto);
	  }

	  return Object.getPrototypeOf(obj) === proto;
	}

	/**
	 * Creates a Redux store that holds the state tree.
	 * The only way to change the data in the store is to call `dispatch()` on it.
	 *
	 * There should only be a single store in your app. To specify how different
	 * parts of the state tree respond to actions, you may combine several reducers
	 * into a single reducer function by using `combineReducers`.
	 *
	 * @param {Function} reducer A function that returns the next state tree, given
	 * the current state tree and the action to handle.
	 *
	 * @param {any} [preloadedState] The initial state. You may optionally specify it
	 * to hydrate the state from the server in universal apps, or to restore a
	 * previously serialized user session.
	 * If you use `combineReducers` to produce the root reducer function, this must be
	 * an object with the same shape as `combineReducers` keys.
	 *
	 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
	 * to enhance the store with third-party capabilities such as middleware,
	 * time travel, persistence, etc. The only store enhancer that ships with Redux
	 * is `applyMiddleware()`.
	 *
	 * @returns {Store} A Redux store that lets you read the state, dispatch actions
	 * and subscribe to changes.
	 */

	function createStore(reducer, preloadedState, enhancer) {
	  var _ref2;

	  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
	    throw new Error('It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function.');
	  }

	  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
	    enhancer = preloadedState;
	    preloadedState = undefined;
	  }

	  if (typeof enhancer !== 'undefined') {
	    if (typeof enhancer !== 'function') {
	      throw new Error('Expected the enhancer to be a function.');
	    }

	    return enhancer(createStore)(reducer, preloadedState);
	  }

	  if (typeof reducer !== 'function') {
	    throw new Error('Expected the reducer to be a function.');
	  }

	  var currentReducer = reducer;
	  var currentState = preloadedState;
	  var currentListeners = [];
	  var nextListeners = currentListeners;
	  var isDispatching = false;
	  /**
	   * This makes a shallow copy of currentListeners so we can use
	   * nextListeners as a temporary list while dispatching.
	   *
	   * This prevents any bugs around consumers calling
	   * subscribe/unsubscribe in the middle of a dispatch.
	   */

	  function ensureCanMutateNextListeners() {
	    if (nextListeners === currentListeners) {
	      nextListeners = currentListeners.slice();
	    }
	  }
	  /**
	   * Reads the state tree managed by the store.
	   *
	   * @returns {any} The current state tree of your application.
	   */


	  function getState() {
	    if (isDispatching) {
	      throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
	    }

	    return currentState;
	  }
	  /**
	   * Adds a change listener. It will be called any time an action is dispatched,
	   * and some part of the state tree may potentially have changed. You may then
	   * call `getState()` to read the current state tree inside the callback.
	   *
	   * You may call `dispatch()` from a change listener, with the following
	   * caveats:
	   *
	   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
	   * If you subscribe or unsubscribe while the listeners are being invoked, this
	   * will not have any effect on the `dispatch()` that is currently in progress.
	   * However, the next `dispatch()` call, whether nested or not, will use a more
	   * recent snapshot of the subscription list.
	   *
	   * 2. The listener should not expect to see all state changes, as the state
	   * might have been updated multiple times during a nested `dispatch()` before
	   * the listener is called. It is, however, guaranteed that all subscribers
	   * registered before the `dispatch()` started will be called with the latest
	   * state by the time it exits.
	   *
	   * @param {Function} listener A callback to be invoked on every dispatch.
	   * @returns {Function} A function to remove this change listener.
	   */


	  function subscribe(listener) {
	    if (typeof listener !== 'function') {
	      throw new Error('Expected the listener to be a function.');
	    }

	    if (isDispatching) {
	      throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
	    }

	    var isSubscribed = true;
	    ensureCanMutateNextListeners();
	    nextListeners.push(listener);
	    return function unsubscribe() {
	      if (!isSubscribed) {
	        return;
	      }

	      if (isDispatching) {
	        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
	      }

	      isSubscribed = false;
	      ensureCanMutateNextListeners();
	      var index = nextListeners.indexOf(listener);
	      nextListeners.splice(index, 1);
	    };
	  }
	  /**
	   * Dispatches an action. It is the only way to trigger a state change.
	   *
	   * The `reducer` function, used to create the store, will be called with the
	   * current state tree and the given `action`. Its return value will
	   * be considered the **next** state of the tree, and the change listeners
	   * will be notified.
	   *
	   * The base implementation only supports plain object actions. If you want to
	   * dispatch a Promise, an Observable, a thunk, or something else, you need to
	   * wrap your store creating function into the corresponding middleware. For
	   * example, see the documentation for the `redux-thunk` package. Even the
	   * middleware will eventually dispatch plain object actions using this method.
	   *
	   * @param {Object} action A plain object representing “what changed”. It is
	   * a good idea to keep actions serializable so you can record and replay user
	   * sessions, or use the time travelling `redux-devtools`. An action must have
	   * a `type` property which may not be `undefined`. It is a good idea to use
	   * string constants for action types.
	   *
	   * @returns {Object} For convenience, the same action object you dispatched.
	   *
	   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
	   * return something else (for example, a Promise you can await).
	   */


	  function dispatch(action) {
	    if (!isPlainObject(action)) {
	      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
	    }

	    if (typeof action.type === 'undefined') {
	      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
	    }

	    if (isDispatching) {
	      throw new Error('Reducers may not dispatch actions.');
	    }

	    try {
	      isDispatching = true;
	      currentState = currentReducer(currentState, action);
	    } finally {
	      isDispatching = false;
	    }

	    var listeners = currentListeners = nextListeners;

	    for (var i = 0; i < listeners.length; i++) {
	      var listener = listeners[i];
	      listener();
	    }

	    return action;
	  }
	  /**
	   * Replaces the reducer currently used by the store to calculate the state.
	   *
	   * You might need this if your app implements code splitting and you want to
	   * load some of the reducers dynamically. You might also need this if you
	   * implement a hot reloading mechanism for Redux.
	   *
	   * @param {Function} nextReducer The reducer for the store to use instead.
	   * @returns {void}
	   */


	  function replaceReducer(nextReducer) {
	    if (typeof nextReducer !== 'function') {
	      throw new Error('Expected the nextReducer to be a function.');
	    }

	    currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
	    // Any reducers that existed in both the new and old rootReducer
	    // will receive the previous state. This effectively populates
	    // the new state tree with any relevant data from the old one.

	    dispatch({
	      type: ActionTypes.REPLACE
	    });
	  }
	  /**
	   * Interoperability point for observable/reactive libraries.
	   * @returns {observable} A minimal observable of state changes.
	   * For more information, see the observable proposal:
	   * https://github.com/tc39/proposal-observable
	   */


	  function observable() {
	    var _ref;

	    var outerSubscribe = subscribe;
	    return _ref = {
	      /**
	       * The minimal observable subscription method.
	       * @param {Object} observer Any object that can be used as an observer.
	       * The observer object should have a `next` method.
	       * @returns {subscription} An object with an `unsubscribe` method that can
	       * be used to unsubscribe the observable from the store, and prevent further
	       * emission of values from the observable.
	       */
	      subscribe: function subscribe(observer) {
	        if (typeof observer !== 'object' || observer === null) {
	          throw new TypeError('Expected the observer to be an object.');
	        }

	        function observeState() {
	          if (observer.next) {
	            observer.next(getState());
	          }
	        }

	        observeState();
	        var unsubscribe = outerSubscribe(observeState);
	        return {
	          unsubscribe: unsubscribe
	        };
	      }
	    }, _ref[result] = function () {
	      return this;
	    }, _ref;
	  } // When a store is created, an "INIT" action is dispatched so that every
	  // reducer returns their initial state. This effectively populates
	  // the initial state tree.


	  dispatch({
	    type: ActionTypes.INIT
	  });
	  return _ref2 = {
	    dispatch: dispatch,
	    subscribe: subscribe,
	    getState: getState,
	    replaceReducer: replaceReducer
	  }, _ref2[result] = observable, _ref2;
	}

	/**
	 * Prints a warning in the console if it exists.
	 *
	 * @param {String} message The warning message.
	 * @returns {void}
	 */
	function warning(message) {
	  /* eslint-disable no-console */
	  if (typeof console !== 'undefined' && typeof console.error === 'function') {
	    console.error(message);
	  }
	  /* eslint-enable no-console */


	  try {
	    // This error was thrown as a convenience so that if you enable
	    // "break on all exceptions" in your console,
	    // it would pause the execution at this line.
	    throw new Error(message);
	  } catch (e) {} // eslint-disable-line no-empty

	}

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	function ownKeys(object, enumerableOnly) {
	  var keys = Object.keys(object);

	  if (Object.getOwnPropertySymbols) {
	    keys.push.apply(keys, Object.getOwnPropertySymbols(object));
	  }

	  if (enumerableOnly) keys = keys.filter(function (sym) {
	    return Object.getOwnPropertyDescriptor(object, sym).enumerable;
	  });
	  return keys;
	}

	function _objectSpread2(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i] != null ? arguments[i] : {};

	    if (i % 2) {
	      ownKeys(source, true).forEach(function (key) {
	        _defineProperty(target, key, source[key]);
	      });
	    } else if (Object.getOwnPropertyDescriptors) {
	      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
	    } else {
	      ownKeys(source).forEach(function (key) {
	        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
	      });
	    }
	  }

	  return target;
	}

	/**
	 * Composes single-argument functions from right to left. The rightmost
	 * function can take multiple arguments as it provides the signature for
	 * the resulting composite function.
	 *
	 * @param {...Function} funcs The functions to compose.
	 * @returns {Function} A function obtained by composing the argument functions
	 * from right to left. For example, compose(f, g, h) is identical to doing
	 * (...args) => f(g(h(...args))).
	 */
	function compose() {
	  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }

	  if (funcs.length === 0) {
	    return function (arg) {
	      return arg;
	    };
	  }

	  if (funcs.length === 1) {
	    return funcs[0];
	  }

	  return funcs.reduce(function (a, b) {
	    return function () {
	      return a(b.apply(void 0, arguments));
	    };
	  });
	}

	/**
	 * Creates a store enhancer that applies middleware to the dispatch method
	 * of the Redux store. This is handy for a variety of tasks, such as expressing
	 * asynchronous actions in a concise manner, or logging every action payload.
	 *
	 * See `redux-thunk` package as an example of the Redux middleware.
	 *
	 * Because middleware is potentially asynchronous, this should be the first
	 * store enhancer in the composition chain.
	 *
	 * Note that each middleware will be given the `dispatch` and `getState` functions
	 * as named arguments.
	 *
	 * @param {...Function} middlewares The middleware chain to be applied.
	 * @returns {Function} A store enhancer applying the middleware.
	 */

	function applyMiddleware() {
	  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }

	  return function (createStore) {
	    return function () {
	      var store = createStore.apply(void 0, arguments);

	      var _dispatch = function dispatch() {
	        throw new Error('Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.');
	      };

	      var middlewareAPI = {
	        getState: store.getState,
	        dispatch: function dispatch() {
	          return _dispatch.apply(void 0, arguments);
	        }
	      };
	      var chain = middlewares.map(function (middleware) {
	        return middleware(middlewareAPI);
	      });
	      _dispatch = compose.apply(void 0, chain)(store.dispatch);
	      return _objectSpread2({}, store, {
	        dispatch: _dispatch
	      });
	    };
	  };
	}

	/*
	 * This is a dummy function to check if the function name has been altered by minification.
	 * If the function has been minified and NODE_ENV !== 'production', warn the user.
	 */

	function isCrushed() {}

	if ( typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
	  warning('You are currently using minified code outside of NODE_ENV === "production". ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' + 'to ensure you have the correct code for your production build.');
	}

	/* eslint no-param-reassign: 0, no-console: 0 */

	const objMap = new Map();
	const applyPatches = (oldState, patches) => {
	  let state = oldState;
	  patches.forEach((patch) => {
	    switch (patch.type) {
	      case 'CREATE_OBJECT': {
	        const obj = patch.isArray ? [] : {};
	        patch.props.forEach((prop) => {
	          if (prop.type === 'OBJECT') {
	            obj[prop.name] = objMap.get(prop.id);
	          } else {
	            obj[prop.name] = prop.value;
	          }
	        });
	        objMap.set(patch.id, obj);
	        break;
	      }
	      case 'DELETE_OBJECT':
	        objMap.delete(patch.id);
	        break;
	      case 'RETURN_STATE':
	        state = objMap.get(patch.id);
	        break;
	      default:
	        throw new Error(`wrapStore unknown patch type: ${patch.type}`);
	    }
	  });
	  return state;
	};

	const REPLACE_STATE = Symbol('REPLACE_STATE');
	const reducer = (state = {}, action) => {
	  if (action.type === REPLACE_STATE) {
	    return action.state;
	  }
	  return state;
	};

	const wrapStore = (worker, initialState) => {
	  const middleware = () => next => (action) => {
	    if (action.type !== REPLACE_STATE) {
	      worker.postMessage(action);
	    }
	    next(action);
	  };
	  const store = createStore(reducer, initialState, applyMiddleware(middleware));
	  worker.onmessage = (e) => {
	    const state = applyPatches(store.getState, e.data);
	    store.dispatch({ type: REPLACE_STATE, state });
	  };
	  worker.onerror = () => {
	    console.error('wrapStore worker error');
	  };
	  worker.onmessageerror = () => {
	    console.error('wrapStore worker message error');
	  };
	  return store;
	};

	/* eslint no-plusplus: 0 */

	let idCount = 0;
	const idSet = new Set();
	const idMap = new WeakMap();
	const createPatches = (state) => {
	  const patches = [];

	  // better way to detect "DELETE_OBJECT"?
	  const idSetToRemove = new Set(idSet);
	  const markUsed = (baseObj) => {
	    const pending = [baseObj];
	    while (pending.length) {
	      const obj = pending.pop();
	      const id = idMap.get(obj);
	      if (idSetToRemove.has(id)) {
	        idSetToRemove.delete(id);
	        Object.keys(obj).forEach((name) => {
	          if (typeof obj[name] === 'object' && obj[name] !== null) {
	            pending.push(obj[name]);
	          }
	        });
	      }
	    }
	  };

	  // so ugly, needs refinement
	  const walk = (rootObj) => {
	    const rootDest = {};
	    const pending = [{ obj: rootObj, dest: rootDest }];
	    while (pending.length) {
	      const { obj, dest } = pending.pop();
	      if (idMap.has(obj)) {
	        markUsed(obj);
	        dest.id = idMap.get(obj);
	      } else {
	        const id = ++idCount;
	        dest.id = id;
	        idMap.set(obj, id);
	        idSet.add(id);
	        const keys = Object.keys(obj);
	        const props = new Array(keys.length);
	        patches.unshift({
	          type: 'CREATE_OBJECT',
	          isArray: Array.isArray(obj),
	          id,
	          props,
	        });
	        keys.forEach((name, i) => {
	          if (typeof obj[name] === 'object' && obj[name] !== null) {
	            const prop = { type: 'OBJECT', name };
	            props[i] = prop;
	            pending.push({ obj: obj[name], dest: prop });
	          } else {
	            props[i] = { name, value: obj[name] };
	          }
	        });
	      }
	    }
	    return rootDest.id;
	  };

	  patches.push({
	    type: 'RETURN_STATE',
	    id: walk(state),
	  });

	  idSetToRemove.forEach((id) => {
	    idSet.delete(id);
	    patches.push({
	      type: 'DELETE_OBJECT',
	      id,
	    });
	  });

	  return patches;
	};

	const exposeStore = (store) => {
	  self.onmessage = (e) => {
	    store.dispatch(e.data);
	  };
	  const listener = () => {
	    const patches = createPatches(store.getState());
	    self.postMessage(patches);
	  };
	  store.subscribe(listener);
	  listener(); // run once
	};

	const initialState = {
	    columns: [],
	    data: [],
	    width: 100,
	    height: 100,
	    scrollLeft: 0,
	    scrollTop: 0,
	    usedColumnCount: 0
	};

	var obj;
	var NOTHING = typeof Symbol !== "undefined" ? Symbol("immer-nothing") : ( obj = {}, obj["immer-nothing"] = true, obj );
	var DRAFTABLE = typeof Symbol !== "undefined" && Symbol.for ? Symbol.for("immer-draftable") : "__$immer_draftable";
	var DRAFT_STATE = typeof Symbol !== "undefined" && Symbol.for ? Symbol.for("immer-state") : "__$immer_state";
	function isDraft(value) {
	  return !!value && !!value[DRAFT_STATE];
	}
	function isDraftable(value) {
	  if (!value || typeof value !== "object") { return false; }
	  if (Array.isArray(value)) { return true; }
	  var proto = Object.getPrototypeOf(value);
	  if (!proto || proto === Object.prototype) { return true; }
	  return !!value[DRAFTABLE] || !!value.constructor[DRAFTABLE];
	}
	var assign = Object.assign || function assign(target, value) {
	  for (var key in value) {
	    if (has(value, key)) {
	      target[key] = value[key];
	    }
	  }

	  return target;
	};
	var ownKeys$1 = typeof Reflect !== "undefined" && Reflect.ownKeys ? Reflect.ownKeys : typeof Object.getOwnPropertySymbols !== "undefined" ? function (obj) { return Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj)); } : Object.getOwnPropertyNames;
	function shallowCopy(base, invokeGetters) {
	  if ( invokeGetters === void 0 ) invokeGetters = false;

	  if (Array.isArray(base)) { return base.slice(); }
	  var clone = Object.create(Object.getPrototypeOf(base));
	  ownKeys$1(base).forEach(function (key) {
	    if (key === DRAFT_STATE) {
	      return; // Never copy over draft state.
	    }

	    var desc = Object.getOwnPropertyDescriptor(base, key);
	    var value = desc.value;

	    if (desc.get) {
	      if (!invokeGetters) {
	        throw new Error("Immer drafts cannot have computed properties");
	      }

	      value = desc.get.call(base);
	    }

	    if (desc.enumerable) {
	      clone[key] = value;
	    } else {
	      Object.defineProperty(clone, key, {
	        value: value,
	        writable: true,
	        configurable: true
	      });
	    }
	  });
	  return clone;
	}
	function each(value, cb) {
	  if (Array.isArray(value)) {
	    for (var i = 0; i < value.length; i++) { cb(i, value[i], value); }
	  } else {
	    ownKeys$1(value).forEach(function (key) { return cb(key, value[key], value); });
	  }
	}
	function isEnumerable(base, prop) {
	  var desc = Object.getOwnPropertyDescriptor(base, prop);
	  return !!desc && desc.enumerable;
	}
	function has(thing, prop) {
	  return Object.prototype.hasOwnProperty.call(thing, prop);
	}
	function is(x, y) {
	  // From: https://github.com/facebook/fbjs/blob/c69904a511b900266935168223063dd8772dfc40/packages/fbjs/src/core/shallowEqual.js
	  if (x === y) {
	    return x !== 0 || 1 / x === 1 / y;
	  } else {
	    return x !== x && y !== y;
	  }
	}

	/** Each scope represents a `produce` call. */

	var ImmerScope = function ImmerScope(parent) {
	  this.drafts = [];
	  this.parent = parent; // Whenever the modified draft contains a draft from another scope, we
	  // need to prevent auto-freezing so the unowned draft can be finalized.

	  this.canAutoFreeze = true; // To avoid prototype lookups:

	  this.patches = null;
	};

	ImmerScope.prototype.usePatches = function usePatches (patchListener) {
	  if (patchListener) {
	    this.patches = [];
	    this.inversePatches = [];
	    this.patchListener = patchListener;
	  }
	};

	ImmerScope.prototype.revoke = function revoke$1 () {
	  this.leave();
	  this.drafts.forEach(revoke);
	  this.drafts = null; // Make draft-related methods throw.
	};

	ImmerScope.prototype.leave = function leave () {
	  if (this === ImmerScope.current) {
	    ImmerScope.current = this.parent;
	  }
	};
	ImmerScope.current = null;

	ImmerScope.enter = function () {
	  return this.current = new ImmerScope(this.current);
	};

	function revoke(draft) {
	  draft[DRAFT_STATE].revoke();
	}

	// but share them all instead

	var descriptors = {};
	function willFinalize(scope, result, isReplaced) {
	  scope.drafts.forEach(function (draft) {
	    draft[DRAFT_STATE].finalizing = true;
	  });

	  if (!isReplaced) {
	    if (scope.patches) {
	      markChangesRecursively(scope.drafts[0]);
	    } // This is faster when we don't care about which attributes changed.


	    markChangesSweep(scope.drafts);
	  } // When a child draft is returned, look for changes.
	  else if (isDraft(result) && result[DRAFT_STATE].scope === scope) {
	      markChangesSweep(scope.drafts);
	    }
	}
	function createProxy(base, parent) {
	  var isArray = Array.isArray(base);
	  var draft = clonePotentialDraft(base);
	  each(draft, function (prop) {
	    proxyProperty(draft, prop, isArray || isEnumerable(base, prop));
	  }); // See "proxy.js" for property documentation.

	  var scope = parent ? parent.scope : ImmerScope.current;
	  var state = {
	    scope: scope,
	    modified: false,
	    finalizing: false,
	    // es5 only
	    finalized: false,
	    assigned: {},
	    parent: parent,
	    base: base,
	    draft: draft,
	    copy: null,
	    revoke: revoke$1,
	    revoked: false // es5 only

	  };
	  createHiddenProperty(draft, DRAFT_STATE, state);
	  scope.drafts.push(draft);
	  return draft;
	}

	function revoke$1() {
	  this.revoked = true;
	}

	function source(state) {
	  return state.copy || state.base;
	} // Access a property without creating an Immer draft.


	function peek(draft, prop) {
	  var state = draft[DRAFT_STATE];

	  if (state && !state.finalizing) {
	    state.finalizing = true;
	    var value = draft[prop];
	    state.finalizing = false;
	    return value;
	  }

	  return draft[prop];
	}

	function get(state, prop) {
	  assertUnrevoked(state);
	  var value = peek(source(state), prop);
	  if (state.finalizing) { return value; } // Create a draft if the value is unmodified.

	  if (value === peek(state.base, prop) && isDraftable(value)) {
	    prepareCopy(state);
	    return state.copy[prop] = createProxy(value, state);
	  }

	  return value;
	}

	function set(state, prop, value) {
	  assertUnrevoked(state);
	  state.assigned[prop] = true;

	  if (!state.modified) {
	    if (is(value, peek(source(state), prop))) { return; }
	    markChanged(state);
	    prepareCopy(state);
	  }

	  state.copy[prop] = value;
	}

	function markChanged(state) {
	  if (!state.modified) {
	    state.modified = true;
	    if (state.parent) { markChanged(state.parent); }
	  }
	}

	function prepareCopy(state) {
	  if (!state.copy) { state.copy = clonePotentialDraft(state.base); }
	}

	function clonePotentialDraft(base) {
	  var state = base && base[DRAFT_STATE];

	  if (state) {
	    state.finalizing = true;
	    var draft = shallowCopy(state.draft, true);
	    state.finalizing = false;
	    return draft;
	  }

	  return shallowCopy(base);
	}

	function proxyProperty(draft, prop, enumerable) {
	  var desc = descriptors[prop];

	  if (desc) {
	    desc.enumerable = enumerable;
	  } else {
	    descriptors[prop] = desc = {
	      configurable: true,
	      enumerable: enumerable,

	      get: function get$1() {
	        return get(this[DRAFT_STATE], prop);
	      },

	      set: function set$1(value) {
	        set(this[DRAFT_STATE], prop, value);
	      }

	    };
	  }

	  Object.defineProperty(draft, prop, desc);
	}

	function assertUnrevoked(state) {
	  if (state.revoked === true) { throw new Error("Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + JSON.stringify(source(state))); }
	} // This looks expensive, but only proxies are visited, and only objects without known changes are scanned.


	function markChangesSweep(drafts) {
	  // The natural order of drafts in the `scope` array is based on when they
	  // were accessed. By processing drafts in reverse natural order, we have a
	  // better chance of processing leaf nodes first. When a leaf node is known to
	  // have changed, we can avoid any traversal of its ancestor nodes.
	  for (var i = drafts.length - 1; i >= 0; i--) {
	    var state = drafts[i][DRAFT_STATE];

	    if (!state.modified) {
	      if (Array.isArray(state.base)) {
	        if (hasArrayChanges(state)) { markChanged(state); }
	      } else if (hasObjectChanges(state)) { markChanged(state); }
	    }
	  }
	}

	function markChangesRecursively(object) {
	  if (!object || typeof object !== "object") { return; }
	  var state = object[DRAFT_STATE];
	  if (!state) { return; }
	  var base = state.base;
	  var draft = state.draft;
	  var assigned = state.assigned;

	  if (!Array.isArray(object)) {
	    // Look for added keys.
	    Object.keys(draft).forEach(function (key) {
	      // The `undefined` check is a fast path for pre-existing keys.
	      if (base[key] === undefined && !has(base, key)) {
	        assigned[key] = true;
	        markChanged(state);
	      } else if (!assigned[key]) {
	        // Only untouched properties trigger recursion.
	        markChangesRecursively(draft[key]);
	      }
	    }); // Look for removed keys.

	    Object.keys(base).forEach(function (key) {
	      // The `undefined` check is a fast path for pre-existing keys.
	      if (draft[key] === undefined && !has(draft, key)) {
	        assigned[key] = false;
	        markChanged(state);
	      }
	    });
	  } else if (hasArrayChanges(state)) {
	    markChanged(state);
	    assigned.length = true;

	    if (draft.length < base.length) {
	      for (var i = draft.length; i < base.length; i++) { assigned[i] = false; }
	    } else {
	      for (var i$1 = base.length; i$1 < draft.length; i$1++) { assigned[i$1] = true; }
	    }

	    for (var i$2 = 0; i$2 < draft.length; i$2++) {
	      // Only untouched indices trigger recursion.
	      if (assigned[i$2] === undefined) { markChangesRecursively(draft[i$2]); }
	    }
	  }
	}

	function hasObjectChanges(state) {
	  var base = state.base;
	  var draft = state.draft; // Search for added keys and changed keys. Start at the back, because
	  // non-numeric keys are ordered by time of definition on the object.

	  var keys = Object.keys(draft);

	  for (var i = keys.length - 1; i >= 0; i--) {
	    var key = keys[i];
	    var baseValue = base[key]; // The `undefined` check is a fast path for pre-existing keys.

	    if (baseValue === undefined && !has(base, key)) {
	      return true;
	    } // Once a base key is deleted, future changes go undetected, because its
	    // descriptor is erased. This branch detects any missed changes.
	    else {
	        var value = draft[key];
	        var state$1 = value && value[DRAFT_STATE];

	        if (state$1 ? state$1.base !== baseValue : !is(value, baseValue)) {
	          return true;
	        }
	      }
	  } // At this point, no keys were added or changed.
	  // Compare key count to determine if keys were deleted.


	  return keys.length !== Object.keys(base).length;
	}

	function hasArrayChanges(state) {
	  var draft = state.draft;
	  if (draft.length !== state.base.length) { return true; } // See #116
	  // If we first shorten the length, our array interceptors will be removed.
	  // If after that new items are added, result in the same original length,
	  // those last items will have no intercepting property.
	  // So if there is no own descriptor on the last position, we know that items were removed and added
	  // N.B.: splice, unshift, etc only shift values around, but not prop descriptors, so we only have to check
	  // the last one

	  var descriptor = Object.getOwnPropertyDescriptor(draft, draft.length - 1); // descriptor can be null, but only for newly created sparse arrays, eg. new Array(10)

	  if (descriptor && !descriptor.get) { return true; } // For all other cases, we don't have to compare, as they would have been picked up by the index setters

	  return false;
	}

	function createHiddenProperty(target, prop, value) {
	  Object.defineProperty(target, prop, {
	    value: value,
	    enumerable: false,
	    writable: true
	  });
	}

	var legacyProxy = /*#__PURE__*/Object.freeze({
		willFinalize: willFinalize,
		createProxy: createProxy
	});

	function willFinalize$1() {}
	function createProxy$1(base, parent) {
	  var scope = parent ? parent.scope : ImmerScope.current;
	  var state = {
	    // Track which produce call this is associated with.
	    scope: scope,
	    // True for both shallow and deep changes.
	    modified: false,
	    // Used during finalization.
	    finalized: false,
	    // Track which properties have been assigned (true) or deleted (false).
	    assigned: {},
	    // The parent draft state.
	    parent: parent,
	    // The base state.
	    base: base,
	    // The base proxy.
	    draft: null,
	    // Any property proxies.
	    drafts: {},
	    // The base copy with any updated values.
	    copy: null,
	    // Called by the `produce` function.
	    revoke: null
	  };
	  var ref = Array.isArray(base) ? // [state] is used for arrays, to make sure the proxy is array-ish and not violate invariants,
	  // although state itself is an object
	  Proxy.revocable([state], arrayTraps) : Proxy.revocable(state, objectTraps);
	  var revoke = ref.revoke;
	  var proxy = ref.proxy;
	  state.draft = proxy;
	  state.revoke = revoke;
	  scope.drafts.push(proxy);
	  return proxy;
	}
	var objectTraps = {
	  get: get$1,

	  has: function has(target, prop) {
	    return prop in source$1(target);
	  },

	  ownKeys: function ownKeys(target) {
	    return Reflect.ownKeys(source$1(target));
	  },

	  set: set$1,
	  deleteProperty: deleteProperty,
	  getOwnPropertyDescriptor: getOwnPropertyDescriptor,

	  defineProperty: function defineProperty() {
	    throw new Error("Object.defineProperty() cannot be used on an Immer draft"); // prettier-ignore
	  },

	  getPrototypeOf: function getPrototypeOf(target) {
	    return Object.getPrototypeOf(target.base);
	  },

	  setPrototypeOf: function setPrototypeOf() {
	    throw new Error("Object.setPrototypeOf() cannot be used on an Immer draft"); // prettier-ignore
	  }

	};
	var arrayTraps = {};
	each(objectTraps, function (key, fn) {
	  arrayTraps[key] = function () {
	    arguments[0] = arguments[0][0];
	    return fn.apply(this, arguments);
	  };
	});

	arrayTraps.deleteProperty = function (state, prop) {
	  if (isNaN(parseInt(prop))) {
	    throw new Error("Immer only supports deleting array indices"); // prettier-ignore
	  }

	  return objectTraps.deleteProperty.call(this, state[0], prop);
	};

	arrayTraps.set = function (state, prop, value) {
	  if (prop !== "length" && isNaN(parseInt(prop))) {
	    throw new Error("Immer only supports setting array indices and the 'length' property"); // prettier-ignore
	  }

	  return objectTraps.set.call(this, state[0], prop, value);
	}; // returns the object we should be reading the current value from, which is base, until some change has been made


	function source$1(state) {
	  return state.copy || state.base;
	} // Access a property without creating an Immer draft.


	function peek$1(draft, prop) {
	  var state = draft[DRAFT_STATE];
	  var desc = Reflect.getOwnPropertyDescriptor(state ? source$1(state) : draft, prop);
	  return desc && desc.value;
	}

	function get$1(state, prop) {
	  if (prop === DRAFT_STATE) { return state; }
	  var drafts = state.drafts; // Check for existing draft in unmodified state.

	  if (!state.modified && has(drafts, prop)) {
	    return drafts[prop];
	  }

	  var value = source$1(state)[prop];

	  if (state.finalized || !isDraftable(value)) {
	    return value;
	  } // Check for existing draft in modified state.


	  if (state.modified) {
	    // Assigned values are never drafted. This catches any drafts we created, too.
	    if (value !== peek$1(state.base, prop)) { return value; } // Store drafts on the copy (when one exists).

	    drafts = state.copy;
	  }

	  return drafts[prop] = createProxy$1(value, state);
	}

	function set$1(state, prop, value) {
	  if (!state.modified) {
	    var baseValue = peek$1(state.base, prop); // Optimize based on value's truthiness. Truthy values are guaranteed to
	    // never be undefined, so we can avoid the `in` operator. Lastly, truthy
	    // values may be drafts, but falsy values are never drafts.

	    var isUnchanged = value ? is(baseValue, value) || value === state.drafts[prop] : is(baseValue, value) && prop in state.base;
	    if (isUnchanged) { return true; }
	    markChanged$1(state);
	  }

	  state.assigned[prop] = true;
	  state.copy[prop] = value;
	  return true;
	}

	function deleteProperty(state, prop) {
	  // The `undefined` check is a fast path for pre-existing keys.
	  if (peek$1(state.base, prop) !== undefined || prop in state.base) {
	    state.assigned[prop] = false;
	    markChanged$1(state);
	  } else if (state.assigned[prop]) {
	    // if an originally not assigned property was deleted
	    delete state.assigned[prop];
	  }

	  if (state.copy) { delete state.copy[prop]; }
	  return true;
	} // Note: We never coerce `desc.value` into an Immer draft, because we can't make
	// the same guarantee in ES5 mode.


	function getOwnPropertyDescriptor(state, prop) {
	  var owner = source$1(state);
	  var desc = Reflect.getOwnPropertyDescriptor(owner, prop);

	  if (desc) {
	    desc.writable = true;
	    desc.configurable = !Array.isArray(owner) || prop !== "length";
	  }

	  return desc;
	}

	function markChanged$1(state) {
	  if (!state.modified) {
	    state.modified = true;
	    state.copy = assign(shallowCopy(state.base), state.drafts);
	    state.drafts = null;
	    if (state.parent) { markChanged$1(state.parent); }
	  }
	}

	var modernProxy = /*#__PURE__*/Object.freeze({
		willFinalize: willFinalize$1,
		createProxy: createProxy$1
	});

	function generatePatches(state, basePath, patches, inversePatches) {
	  Array.isArray(state.base) ? generateArrayPatches(state, basePath, patches, inversePatches) : generateObjectPatches(state, basePath, patches, inversePatches);
	}

	function generateArrayPatches(state, basePath, patches, inversePatches) {
	  var assign, assign$1;

	  var base = state.base;
	  var copy = state.copy;
	  var assigned = state.assigned; // Reduce complexity by ensuring `base` is never longer.

	  if (copy.length < base.length) {
	    (assign = [copy, base], base = assign[0], copy = assign[1]);
	    (assign$1 = [inversePatches, patches], patches = assign$1[0], inversePatches = assign$1[1]);
	  }

	  var delta = copy.length - base.length; // Find the first replaced index.

	  var start = 0;

	  while (base[start] === copy[start] && start < base.length) {
	    ++start;
	  } // Find the last replaced index. Search from the end to optimize splice patches.


	  var end = base.length;

	  while (end > start && base[end - 1] === copy[end + delta - 1]) {
	    --end;
	  } // Process replaced indices.


	  for (var i = start; i < end; ++i) {
	    if (assigned[i] && copy[i] !== base[i]) {
	      var path = basePath.concat([i]);
	      patches.push({
	        op: "replace",
	        path: path,
	        value: copy[i]
	      });
	      inversePatches.push({
	        op: "replace",
	        path: path,
	        value: base[i]
	      });
	    }
	  }

	  var useRemove = end != base.length;
	  var replaceCount = patches.length; // Process added indices.

	  for (var i$1 = end + delta - 1; i$1 >= end; --i$1) {
	    var path$1 = basePath.concat([i$1]);
	    patches[replaceCount + i$1 - end] = {
	      op: "add",
	      path: path$1,
	      value: copy[i$1]
	    };

	    if (useRemove) {
	      inversePatches.push({
	        op: "remove",
	        path: path$1
	      });
	    }
	  } // One "replace" patch reverses all non-splicing "add" patches.


	  if (!useRemove) {
	    inversePatches.push({
	      op: "replace",
	      path: basePath.concat(["length"]),
	      value: base.length
	    });
	  }
	}

	function generateObjectPatches(state, basePath, patches, inversePatches) {
	  var base = state.base;
	  var copy = state.copy;
	  each(state.assigned, function (key, assignedValue) {
	    var origValue = base[key];
	    var value = copy[key];
	    var op = !assignedValue ? "remove" : key in base ? "replace" : "add";
	    if (origValue === value && op === "replace") { return; }
	    var path = basePath.concat(key);
	    patches.push(op === "remove" ? {
	      op: op,
	      path: path
	    } : {
	      op: op,
	      path: path,
	      value: value
	    });
	    inversePatches.push(op === "add" ? {
	      op: "remove",
	      path: path
	    } : op === "remove" ? {
	      op: "add",
	      path: path,
	      value: origValue
	    } : {
	      op: "replace",
	      path: path,
	      value: origValue
	    });
	  });
	}

	function applyPatches$1(draft, patches) {
	  // First, find a patch that replaces the entire state, if found, we don't have to apply earlier patches and modify the state
	  for (var i = 0; i < patches.length; i++) {
	    var patch = patches[i];
	    var path = patch.path;
	    if (!path.length) { throw new Error("Illegal state"); }
	    var base = draft;

	    for (var i$1 = 0; i$1 < path.length - 1; i$1++) {
	      base = base[path[i$1]];
	      if (!base || typeof base !== "object") { throw new Error("Cannot apply patch, path doesn't resolve: " + path.join("/")); } // prettier-ignore
	    }

	    var key = path[path.length - 1];

	    switch (patch.op) {
	      case "replace":
	        base[key] = patch.value;
	        break;

	      case "add":
	        if (Array.isArray(base)) {
	          // TODO: support "foo/-" paths for appending to an array
	          base.splice(key, 0, patch.value);
	        } else {
	          base[key] = patch.value;
	        }

	        break;

	      case "remove":
	        if (Array.isArray(base)) {
	          base.splice(key, 1);
	        } else {
	          delete base[key];
	        }

	        break;

	      default:
	        throw new Error("Unsupported patch operation: " + patch.op);
	    }
	  }

	  return draft;
	}

	function verifyMinified() {}

	var configDefaults = {
	  useProxies: typeof Proxy !== "undefined" && typeof Reflect !== "undefined",
	  autoFreeze: typeof process !== "undefined" ? "development" !== "production" : verifyMinified.name === "verifyMinified",
	  onAssign: null,
	  onDelete: null,
	  onCopy: null
	};
	var Immer = function Immer(config) {
	  assign(this, configDefaults, config);
	  this.setUseProxies(this.useProxies);
	  this.produce = this.produce.bind(this);
	};

	Immer.prototype.produce = function produce (base, recipe, patchListener) {
	    var this$1 = this;

	  // curried invocation
	  if (typeof base === "function" && typeof recipe !== "function") {
	    var defaultBase = recipe;
	    recipe = base;
	    var self = this;
	    return function curriedProduce(base) {
	        var this$1 = this;
	        if ( base === void 0 ) base = defaultBase;
	        var args = [], len = arguments.length - 1;
	        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

	      return self.produce(base, function (draft) { return recipe.call.apply(recipe, [ this$1, draft ].concat( args )); }); // prettier-ignore
	    };
	  } // prettier-ignore


	  {
	    if (typeof recipe !== "function") {
	      throw new Error("The first or second argument to `produce` must be a function");
	    }

	    if (patchListener !== undefined && typeof patchListener !== "function") {
	      throw new Error("The third argument to `produce` must be a function or undefined");
	    }
	  }
	  var result; // Only plain objects, arrays, and "immerable classes" are drafted.

	  if (isDraftable(base)) {
	    var scope = ImmerScope.enter();
	    var proxy = this.createProxy(base);
	    var hasError = true;

	    try {
	      result = recipe(proxy);
	      hasError = false;
	    } finally {
	      // finally instead of catch + rethrow better preserves original stack
	      if (hasError) { scope.revoke(); }else { scope.leave(); }
	    }

	    if (result instanceof Promise) {
	      return result.then(function (result) {
	        scope.usePatches(patchListener);
	        return this$1.processResult(result, scope);
	      }, function (error) {
	        scope.revoke();
	        throw error;
	      });
	    }

	    scope.usePatches(patchListener);
	    return this.processResult(result, scope);
	  } else {
	    result = recipe(base);
	    if (result === undefined) { return base; }
	    return result !== NOTHING ? result : undefined;
	  }
	};

	Immer.prototype.produceWithPatches = function produceWithPatches (arg1, arg2, arg3) {
	    var this$1 = this;

	  if (typeof arg1 === "function") {
	    return function (state) {
	        var args = [], len = arguments.length - 1;
	        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

	        return this$1.produceWithPatches(state, function (draft) { return arg1.apply(void 0, [ draft ].concat( args )); });
	      };
	  } // non-curried form


	  if (arg3) { throw new Error("A patch listener cannot be passed to produceWithPatches"); }
	  var patches, inversePatches;
	  var nextState = this.produce(arg1, arg2, function (p, ip) {
	    patches = p;
	    inversePatches = ip;
	  });
	  return [nextState, patches, inversePatches];
	};

	Immer.prototype.createDraft = function createDraft (base) {
	  if (!isDraftable(base)) {
	    throw new Error("First argument to `createDraft` must be a plain object, an array, or an immerable object"); // prettier-ignore
	  }

	  var scope = ImmerScope.enter();
	  var proxy = this.createProxy(base);
	  proxy[DRAFT_STATE].isManual = true;
	  scope.leave();
	  return proxy;
	};

	Immer.prototype.finishDraft = function finishDraft (draft, patchListener) {
	  var state = draft && draft[DRAFT_STATE];

	  if (!state || !state.isManual) {
	    throw new Error("First argument to `finishDraft` must be a draft returned by `createDraft`"); // prettier-ignore
	  }

	  if (state.finalized) {
	    throw new Error("The given draft is already finalized"); // prettier-ignore
	  }

	  var scope = state.scope;
	  scope.usePatches(patchListener);
	  return this.processResult(undefined, scope);
	};

	Immer.prototype.setAutoFreeze = function setAutoFreeze (value) {
	  this.autoFreeze = value;
	};

	Immer.prototype.setUseProxies = function setUseProxies (value) {
	  this.useProxies = value;
	  assign(this, value ? modernProxy : legacyProxy);
	};

	Immer.prototype.applyPatches = function applyPatches$1$1 (base, patches) {
	  // If a patch replaces the entire state, take that replacement as base
	  // before applying patches
	  var i;

	  for (i = patches.length - 1; i >= 0; i--) {
	    var patch = patches[i];

	    if (patch.path.length === 0 && patch.op === "replace") {
	      base = patch.value;
	      break;
	    }
	  }

	  if (isDraft(base)) {
	    // N.B: never hits if some patch a replacement, patches are never drafts
	    return applyPatches$1(base, patches);
	  } // Otherwise, produce a copy of the base state.


	  return this.produce(base, function (draft) { return applyPatches$1(draft, patches.slice(i + 1)); });
	};
	/** @internal */


	Immer.prototype.processResult = function processResult (result, scope) {
	  var baseDraft = scope.drafts[0];
	  var isReplaced = result !== undefined && result !== baseDraft;
	  this.willFinalize(scope, result, isReplaced);

	  if (isReplaced) {
	    if (baseDraft[DRAFT_STATE].modified) {
	      scope.revoke();
	      throw new Error("An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft."); // prettier-ignore
	    }

	    if (isDraftable(result)) {
	      // Finalize the result in case it contains (or is) a subset of the draft.
	      result = this.finalize(result, null, scope);
	    }

	    if (scope.patches) {
	      scope.patches.push({
	        op: "replace",
	        path: [],
	        value: result
	      });
	      scope.inversePatches.push({
	        op: "replace",
	        path: [],
	        value: baseDraft[DRAFT_STATE].base
	      });
	    }
	  } else {
	    // Finalize the base draft.
	    result = this.finalize(baseDraft, [], scope);
	  }

	  scope.revoke();

	  if (scope.patches) {
	    scope.patchListener(scope.patches, scope.inversePatches);
	  }

	  return result !== NOTHING ? result : undefined;
	};
	/**
	 * @internal
	 * Finalize a draft, returning either the unmodified base state or a modified
	 * copy of the base state.
	 */


	Immer.prototype.finalize = function finalize (draft, path, scope) {
	    var this$1 = this;

	  var state = draft[DRAFT_STATE];

	  if (!state) {
	    if (Object.isFrozen(draft)) { return draft; }
	    return this.finalizeTree(draft, null, scope);
	  } // Never finalize drafts owned by another scope.


	  if (state.scope !== scope) {
	    return draft;
	  }

	  if (!state.modified) {
	    return state.base;
	  }

	  if (!state.finalized) {
	    state.finalized = true;
	    this.finalizeTree(state.draft, path, scope);

	    if (this.onDelete) {
	      // The `assigned` object is unreliable with ES5 drafts.
	      if (this.useProxies) {
	        var assigned = state.assigned;

	        for (var prop in assigned) {
	          if (!assigned[prop]) { this.onDelete(state, prop); }
	        }
	      } else {
	        var base = state.base;
	          var copy = state.copy;
	        each(base, function (prop) {
	          if (!has(copy, prop)) { this$1.onDelete(state, prop); }
	        });
	      }
	    }

	    if (this.onCopy) {
	      this.onCopy(state);
	    } // At this point, all descendants of `state.copy` have been finalized,
	    // so we can be sure that `scope.canAutoFreeze` is accurate.


	    if (this.autoFreeze && scope.canAutoFreeze) {
	      Object.freeze(state.copy);
	    }

	    if (path && scope.patches) {
	      generatePatches(state, path, scope.patches, scope.inversePatches);
	    }
	  }

	  return state.copy;
	};
	/**
	 * @internal
	 * Finalize all drafts in the given state tree.
	 */


	Immer.prototype.finalizeTree = function finalizeTree (root, rootPath, scope) {
	    var this$1 = this;

	  var state = root[DRAFT_STATE];

	  if (state) {
	    if (!this.useProxies) {
	      // Create the final copy, with added keys and without deleted keys.
	      state.copy = shallowCopy(state.draft, true);
	    }

	    root = state.copy;
	  }

	  var needPatches = !!rootPath && !!scope.patches;

	  var finalizeProperty = function (prop, value, parent) {
	    if (value === parent) {
	      throw Error("Immer forbids circular references");
	    } // In the `finalizeTree` method, only the `root` object may be a draft.


	    var isDraftProp = !!state && parent === root;

	    if (isDraft(value)) {
	      var path = isDraftProp && needPatches && !state.assigned[prop] ? rootPath.concat(prop) : null; // Drafts owned by `scope` are finalized here.

	      value = this$1.finalize(value, path, scope); // Drafts from another scope must prevent auto-freezing.

	      if (isDraft(value)) {
	        scope.canAutoFreeze = false;
	      } // Preserve non-enumerable properties.


	      if (Array.isArray(parent) || isEnumerable(parent, prop)) {
	        parent[prop] = value;
	      } else {
	        Object.defineProperty(parent, prop, {
	          value: value
	        });
	      } // Unchanged drafts are never passed to the `onAssign` hook.


	      if (isDraftProp && value === state.base[prop]) { return; }
	    } // Unchanged draft properties are ignored.
	    else if (isDraftProp && is(value, state.base[prop])) {
	        return;
	      } // Search new objects for unfinalized drafts. Frozen objects should never contain drafts.
	      else if (isDraftable(value) && !Object.isFrozen(value)) {
	          each(value, finalizeProperty);
	        }

	    if (isDraftProp && this$1.onAssign) {
	      this$1.onAssign(state, prop, value);
	    }
	  };

	  each(root, finalizeProperty);
	  return root;
	};

	var immer = new Immer();
	/**
	 * The `produce` function takes a value and a "recipe function" (whose
	 * return value often depends on the base state). The recipe function is
	 * free to mutate its first argument however it wants. All mutations are
	 * only ever applied to a __copy__ of the base state.
	 *
	 * Pass only a function to create a "curried producer" which relieves you
	 * from passing the recipe function every time.
	 *
	 * Only plain objects and arrays are made mutable. All other objects are
	 * considered uncopyable.
	 *
	 * Note: This function is __bound__ to its `Immer` instance.
	 *
	 * @param {any} base - the initial state
	 * @param {Function} producer - function that receives a proxy of the base state as first argument and which can be freely modified
	 * @param {Function} patchListener - optional function that will be called with all the patches produced here
	 * @returns {any} a new state, or the initial state if nothing was modified
	 */

	var produce = immer.produce;
	/**
	 * Like `produce`, but `produceWithPatches` always returns a tuple
	 * [nextState, patches, inversePatches] (instead of just the next state)
	 */

	var produceWithPatches = immer.produceWithPatches.bind(immer);
	/**
	 * Pass true to automatically freeze all copies created by Immer.
	 *
	 * By default, auto-freezing is disabled in production.
	 */

	var setAutoFreeze = immer.setAutoFreeze.bind(immer);
	/**
	 * Pass true to use the ES2015 `Proxy` class when creating drafts, which is
	 * always faster than using ES5 proxies.
	 *
	 * By default, feature detection is used, so calling this is rarely necessary.
	 */

	var setUseProxies = immer.setUseProxies.bind(immer);
	/**
	 * Apply an array of Immer patches to the first argument.
	 *
	 * This function is a producer, which means copy-on-write is in effect.
	 */

	var applyPatches$1$1 = immer.applyPatches.bind(immer);
	/**
	 * Create an Immer draft from the given base state, which may be a draft itself.
	 * The draft can be modified until you finalize it with the `finishDraft` function.
	 */

	var createDraft = immer.createDraft.bind(immer);
	/**
	 * Finalize an Immer draft from a `createDraft` call, returning the base state
	 * (if no changes were made) or a modified copy. The draft must *not* be
	 * mutated afterwards.
	 *
	 * Pass a function as the 2nd argument to generate Immer patches based on the
	 * changes that were made.
	 */

	var finishDraft = immer.finishDraft.bind(immer);

	function createReducer(reducers, initialState) {
	    const reducerMap = new Map(reducers.map(([ac, rd]) => [ac.toString(), rd]));
	    return (state = initialState, action) => {
	        const reducer = reducerMap.get(action.type);
	        return reducer
	            ? produce(state, draft => {
	                reducer(draft, action);
	            })
	            : state;
	    };
	}

	function emptyActionCreator(type) {
	    const fn = function () {
	        return {
	            type
	        };
	    };
	    fn.toString = () => type;
	    return fn;
	}
	function payloadActionCreator(type) {
	    const fn = function (payload) {
	        return {
	            type,
	            payload
	        };
	    };
	    fn.toString = () => type;
	    return fn;
	}

	const DEFAULT_WIDTH = 80;
	function randomBetween(min, max) {
	    return Math.floor(Math.random() * (max - min)) + min;
	}
	const defaultData = [
	    [50, row => row + 1],
	    [DEFAULT_WIDTH, () => randomBetween(100, 900)],
	    [DEFAULT_WIDTH, () => randomBetween(0, 1000)],
	    [100, () => randomBetween(100000, 999999)],
	    [150, () => Math.random()]
	];
	const resetDataAction = payloadActionCreator("RESET_DATA");
	function resetDataReducer(draft, action) {
	    let { rows, cols } = action.payload;
	    draft.columns = [];
	    draft.usedColumnCount = defaultData.length;
	    for (const [width] of defaultData) {
	        const idx = draft.columns.length + 1;
	        draft.columns.push({
	            id: `C${idx}`,
	            width
	        });
	    }
	    while (draft.columns.length < cols) {
	        const idx = draft.columns.length;
	        const id = `C${idx + 1}`;
	        const [width] = idx < defaultData.length ? defaultData[idx] : [DEFAULT_WIDTH];
	        draft.columns.push({ id, width });
	    }
	    draft.data = [];
	    while (draft.data.length < rows) {
	        const row = draft.data.length;
	        const dataRow = [];
	        for (let idx = 0; idx < cols; idx++) {
	            if (idx < defaultData.length) {
	                const [_, dataFn] = defaultData[idx];
	                dataRow.push(dataFn(row));
	            }
	            else {
	                dataRow.push(null);
	            }
	        }
	        draft.data.push(dataRow);
	    }
	}

	const setGridSizeAction = payloadActionCreator("SET_GRID_SIZE");
	function setGridSizeReducer(draft, action) {
	    let { width, height } = action.payload;
	    draft.width = width;
	    draft.height = height;
	}

	const setGridScrollAction = payloadActionCreator("SET_GRID_SCROLL");
	function setGridScrollReducer(draft, action) {
	    let { scrollLeft, scrollTop } = action.payload;
	    draft.scrollLeft = scrollLeft;
	    draft.scrollTop = scrollTop;
	}

	const addRandomDataColumnAction = emptyActionCreator("ADD_RANDOM_DATA_COLUMN");
	function addRandomDataColumnReducer(draft, _) {
	    let columnIndex = draft.usedColumnCount++;
	    const column = draft.columns[columnIndex];
	    column.width = 150;
	    for (const dataRow of draft.data) {
	        if (Math.random() < 0.4) {
	            dataRow[columnIndex] = Math.random();
	        }
	    }
	}

	const reducer$1 = createReducer([
	    [resetDataAction, resetDataReducer],
	    [setGridSizeAction, setGridSizeReducer],
	    [setGridScrollAction, setGridScrollReducer],
	    [addRandomDataColumnAction, addRandomDataColumnReducer]
	], initialState);

	exports.addRandomDataColumnAction = addRandomDataColumnAction;
	exports.createStore = createStore;
	exports.exposeStore = exposeStore;
	exports.reducer = reducer$1;
	exports.resetDataAction = resetDataAction;
	exports.setGridScrollAction = setGridScrollAction;
	exports.setGridSizeAction = setGridSizeAction;
	exports.wrapStore = wrapStore;

});
