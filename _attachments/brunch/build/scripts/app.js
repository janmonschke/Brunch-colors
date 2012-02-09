(function(/*! Brunch !*/) {
  if (!this.require) {
    var modules = {}, cache = {}, require = function(name, root) {
      var module = cache[name], path = expand(root, name), fn;
      if (module) {
        return module;
      } else if (fn = modules[path] || modules[path = expand(path, './index')]) {
        module = {id: name, exports: {}};
        try {
          cache[name] = module.exports;
          fn(module.exports, function(name) {
            return require(name, dirname(path));
          }, module);
          return cache[name] = module.exports;
        } catch (err) {
          delete cache[name];
          throw err;
        }
      } else {
        throw 'module \'' + name + '\' not found';
      }
    }, expand = function(root, name) {
      var results = [], parts, part;
      if (/^\.\.?(\/|$)/.test(name)) {
        parts = [root, name].join('/').split('/');
      } else {
        parts = name.split('/');
      }
      for (var i = 0, length = parts.length; i < length; i++) {
        part = parts[i];
        if (part == '..') {
          results.pop();
        } else if (part != '.' && part != '') {
          results.push(part);
        }
      }
      return results.join('/');
    }, dirname = function(path) {
      return path.split('/').slice(0, -1).join('/');
    };
    this.require = function(name) {
      return require(name, '');
    }
    this.require.define = function(bundle) {
      for (var key in bundle)
        modules[key] = bundle[key];
    };
  }
}).call(this);(function (con) {
    // the dummy function
    function dummy() {};
    // console methods that may exist
    for(var methods = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(','), func; func = methods.pop();) {
        con[func] = con[func] || dummy;
    }
}(window.console = window.console || {})); 
// we do this crazy little dance so that the `console` object
// inside the function is a name that can be shortened to a single
// letter by the compressor to make the compressed script as tiny
// as possible.//     Underscore.js 1.1.7
//     (c) 2011 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore is freely distributable under the MIT license.
//     Portions of Underscore are inspired or borrowed from Prototype,
//     Oliver Steele's Functional, and John Resig's Micro-Templating.
//     For all details and documentation:
//     http://documentcloud.github.com/underscore

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var slice            = ArrayProto.slice,
      unshift          = ArrayProto.unshift,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) { return new wrapper(obj); };

  // Export the Underscore object for **CommonJS**, with backwards-compatibility
  // for the old `require()` API. If we're not in CommonJS, add `_` to the
  // global object.
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = _;
    _._ = _;
  } else {
    // Exported as a string, for Closure Compiler "advanced" mode.
    root['_'] = _;
  }

  // Current version.
  _.VERSION = '1.1.7';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    return results;
  };

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = memo !== void 0;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError("Reduce of empty array with no initial value");
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return memo !== void 0 ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var reversed = (_.isArray(obj) ? obj.slice() : _.toArray(obj)).reverse();
    return _.reduce(reversed, iterator, memo, context);
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    each(obj, function(value, index, list) {
      if (!iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator = iterator || _.identity;
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result |= iterator.call(context, value, index, list)) return breaker;
    });
    return !!result;
  };

  // Determine if a given value is included in the array or object using `===`.
  // Aliased as `contains`.
  _.include = _.contains = function(obj, target) {
    var found = false;
    if (obj == null) return found;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    any(obj, function(value) {
      if (found = value === target) return true;
    });
    return found;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    return _.map(obj, function(value) {
      return (method.call ? method || value : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Return the maximum element or (element-based computation).
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj)) return Math.max.apply(Math, obj);
    var result = {computed : -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj)) return Math.min.apply(Math, obj);
    var result = {computed : Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, iterator, context) {
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria, b = right.criteria;
      return a < b ? -1 : a > b ? 1 : 0;
    }), 'value');
  };

  // Groups the object's values by a criterion produced by an iterator
  _.groupBy = function(obj, iterator) {
    var result = {};
    each(obj, function(value, index) {
      var key = iterator(value, index);
      (result[key] || (result[key] = [])).push(value);
    });
    return result;
  };

  // Use a comparator function to figure out at what index an object should
  // be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator) {
    iterator || (iterator = _.identity);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >> 1;
      iterator(array[mid]) < iterator(obj) ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function(iterable) {
    if (!iterable)                return [];
    if (iterable.toArray)         return iterable.toArray();
    if (_.isArray(iterable))      return slice.call(iterable);
    if (_.isArguments(iterable))  return slice.call(iterable);
    return _.values(iterable);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    return _.toArray(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head`. The **guard** check allows it to work
  // with `_.map`.
  _.first = _.head = function(array, n, guard) {
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the first entry of the array. Aliased as `tail`.
  // Especially useful on the arguments object. Passing an **index** will return
  // the rest of the values in the array from that index onward. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = function(array, index, guard) {
    return slice.call(array, (index == null) || guard ? 1 : index);
  };

  // Get the last element of an array.
  _.last = function(array) {
    return array[array.length - 1];
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, function(value){ return !!value; });
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array) {
    return _.reduce(array, function(memo, value) {
      if (_.isArray(value)) return memo.concat(_.flatten(value));
      memo[memo.length] = value;
      return memo;
    }, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted) {
    return _.reduce(array, function(memo, el, i) {
      if (0 == i || (isSorted === true ? _.last(memo) != el : !_.include(memo, el))) memo[memo.length] = el;
      return memo;
    }, []);
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays. (Aliased as "intersect" for back-compat.)
  _.intersection = _.intersect = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and another.
  // Only the elements present in just the first array will remain.
  _.difference = function(array, other) {
    return _.filter(array, function(value){ return !_.include(other, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) results[i] = _.pluck(args, "" + i);
    return results;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i, l;
    if (isSorted) {
      i = _.sortedIndex(array, item);
      return array[i] === item ? i : -1;
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item);
    for (i = 0, l = array.length; i < l; i++) if (array[i] === item) return i;
    return -1;
  };


  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item) {
    if (array == null) return -1;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) return array.lastIndexOf(item);
    var i = array.length;
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Binding with arguments is also known as `curry`.
  // Delegates to **ECMAScript 5**'s native `Function.bind` if available.
  // We check for `func.bind` first, to fail fast when `func` is undefined.
  _.bind = function(func, obj) {
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    var args = slice.call(arguments, 2);
    return function() {
      return func.apply(obj, args.concat(slice.call(arguments)));
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length == 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return hasOwnProperty.call(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(func, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Internal function used to implement `_.throttle` and `_.debounce`.
  var limit = function(func, wait, debounce) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var throttler = function() {
        timeout = null;
        func.apply(context, args);
      };
      if (debounce) clearTimeout(timeout);
      if (debounce || !timeout) timeout = setTimeout(throttler, wait);
    };
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
    return limit(func, wait, false);
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds.
  _.debounce = function(func, wait) {
    return limit(func, wait, true);
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      return memo = func.apply(this, arguments);
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func].concat(slice.call(arguments));
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = slice.call(arguments);
    return function() {
      var args = slice.call(arguments);
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) { return func.apply(this, arguments); }
    };
  };


  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (hasOwnProperty.call(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    return _.map(obj, _.identity);
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (source[prop] !== void 0) obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (obj[prop] == null) obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    // Check object identity.
    if (a === b) return true;
    // Different types?
    var atype = typeof(a), btype = typeof(b);
    if (atype != btype) return false;
    // Basic equality test (watch out for coercions).
    if (a == b) return true;
    // One is falsy and the other truthy.
    if ((!a && b) || (a && !b)) return false;
    // Unwrap any wrapped objects.
    if (a._chain) a = a._wrapped;
    if (b._chain) b = b._wrapped;
    // One of them implements an isEqual()?
    if (a.isEqual) return a.isEqual(b);
    if (b.isEqual) return b.isEqual(a);
    // Check dates' integer values.
    if (_.isDate(a) && _.isDate(b)) return a.getTime() === b.getTime();
    // Both are NaN?
    if (_.isNaN(a) && _.isNaN(b)) return false;
    // Compare regular expressions.
    if (_.isRegExp(a) && _.isRegExp(b))
      return a.source     === b.source &&
             a.global     === b.global &&
             a.ignoreCase === b.ignoreCase &&
             a.multiline  === b.multiline;
    // If a is not an object by this point, we can't handle it.
    if (atype !== 'object') return false;
    // Check for different array lengths before comparing contents.
    if (a.length && (a.length !== b.length)) return false;
    // Nothing else worked, deep compare the contents.
    var aKeys = _.keys(a), bKeys = _.keys(b);
    // Different object sizes?
    if (aKeys.length != bKeys.length) return false;
    // Recursive comparison of contents.
    for (var key in a) if (!(key in b) || !_.isEqual(a[key], b[key])) return false;
    return true;
  };

  // Is a given array or object empty?
  _.isEmpty = function(obj) {
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (hasOwnProperty.call(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType == 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Is a given variable an arguments object?
  _.isArguments = function(obj) {
    return !!(obj && hasOwnProperty.call(obj, 'callee'));
  };

  // Is a given value a function?
  _.isFunction = function(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
  };

  // Is a given value a string?
  _.isString = function(obj) {
    return !!(obj === '' || (obj && obj.charCodeAt && obj.substr));
  };

  // Is a given value a number?
  _.isNumber = function(obj) {
    return !!(obj === 0 || (obj && obj.toExponential && obj.toFixed));
  };

  // Is the given value `NaN`? `NaN` happens to be the only value in JavaScript
  // that does not equal itself.
  _.isNaN = function(obj) {
    return obj !== obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false;
  };

  // Is a given value a date?
  _.isDate = function(obj) {
    return !!(obj && obj.getTimezoneOffset && obj.setUTCFullYear);
  };

  // Is the given value a regular expression?
  _.isRegExp = function(obj) {
    return !!(obj && obj.test && obj.exec && (obj.ignoreCase || obj.ignoreCase === false));
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function (n, iterator, context) {
    for (var i = 0; i < n; i++) iterator.call(context, i);
  };

  // Add your own custom functions to the Underscore object, ensuring that
  // they're correctly added to the OOP wrapper as well.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      addToWrapper(name, _[name] = obj[name]);
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = idCounter++;
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(str, data) {
    var c  = _.templateSettings;
    var tmpl = 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' +
      'with(obj||{}){__p.push(\'' +
      str.replace(/\\/g, '\\\\')
         .replace(/'/g, "\\'")
         .replace(c.interpolate, function(match, code) {
           return "'," + code.replace(/\\'/g, "'") + ",'";
         })
         .replace(c.evaluate || null, function(match, code) {
           return "');" + code.replace(/\\'/g, "'")
                              .replace(/[\r\n\t]/g, ' ') + "__p.push('";
         })
         .replace(/\r/g, '\\r')
         .replace(/\n/g, '\\n')
         .replace(/\t/g, '\\t')
         + "');}return __p.join('');";
    var func = new Function('obj', tmpl);
    return data ? func(data) : func;
  };

  // The OOP Wrapper
  // ---------------

  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.
  var wrapper = function(obj) { this._wrapped = obj; };

  // Expose `wrapper.prototype` as `_.prototype`
  _.prototype = wrapper.prototype;

  // Helper function to continue chaining intermediate results.
  var result = function(obj, chain) {
    return chain ? _(obj).chain() : obj;
  };

  // A method to easily add functions to the OOP wrapper.
  var addToWrapper = function(name, func) {
    wrapper.prototype[name] = function() {
      var args = slice.call(arguments);
      unshift.call(args, this._wrapped);
      return result(func.apply(_, args), this._chain);
    };
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      method.apply(this._wrapped, arguments);
      return result(this._wrapped, this._chain);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      return result(method.apply(this._wrapped, arguments), this._chain);
    };
  });

  // Start chaining a wrapped Underscore object.
  wrapper.prototype.chain = function() {
    this._chain = true;
    return this;
  };

  // Extracts the result from a wrapped and chained object.
  wrapper.prototype.value = function() {
    return this._wrapped;
  };

})();
//     Backbone.js 0.5.3
//     (c) 2010 Jeremy Ashkenas, DocumentCloud Inc.
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://documentcloud.github.com/backbone

(function(){

  // Initial Setup
  // -------------

  // Save a reference to the global object.
  var root = this;

  // Save the previous value of the `Backbone` variable.
  var previousBackbone = root.Backbone;

  // The top-level namespace. All public Backbone classes and modules will
  // be attached to this. Exported for both CommonJS and the browser.
  var Backbone;
  if (typeof exports !== 'undefined') {
    Backbone = exports;
  } else {
    Backbone = root.Backbone = {};
  }

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '0.5.3';

  // Require Underscore, if we're on the server, and it's not already present.
  var _ = root._;
  if (!_ && (typeof require !== 'undefined')) _ = require('underscore')._;

  // For Backbone's purposes, jQuery or Zepto owns the `$` variable.
  var $ = root.jQuery || root.Zepto;

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option will
  // fake `"PUT"` and `"DELETE"` requests via the `_method` parameter and set a
  // `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Backbone.Events
  // -----------------

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may `bind` or `unbind` a callback function to an event;
  // `trigger`-ing an event fires all callbacks in succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.bind('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  Backbone.Events = {

    // Bind an event, specified by a string name, `ev`, to a `callback` function.
    // Passing `"all"` will bind the callback to all events fired.
    bind : function(ev, callback, context) {
      var calls = this._callbacks || (this._callbacks = {});
      var list  = calls[ev] || (calls[ev] = []);
      list.push([callback, context]);
      return this;
    },

    // Remove one or many callbacks. If `callback` is null, removes all
    // callbacks for the event. If `ev` is null, removes all bound callbacks
    // for all events.
    unbind : function(ev, callback) {
      var calls;
      if (!ev) {
        this._callbacks = {};
      } else if (calls = this._callbacks) {
        if (!callback) {
          calls[ev] = [];
        } else {
          var list = calls[ev];
          if (!list) return this;
          for (var i = 0, l = list.length; i < l; i++) {
            if (list[i] && callback === list[i][0]) {
              list[i] = null;
              break;
            }
          }
        }
      }
      return this;
    },

    // Trigger an event, firing all bound callbacks. Callbacks are passed the
    // same arguments as `trigger` is, apart from the event name.
    // Listening for `"all"` passes the true event name as the first argument.
    trigger : function(eventName) {
      var list, calls, ev, callback, args;
      var both = 2;
      if (!(calls = this._callbacks)) return this;
      while (both--) {
        ev = both ? eventName : 'all';
        if (list = calls[ev]) {
          for (var i = 0, l = list.length; i < l; i++) {
            if (!(callback = list[i])) {
              list.splice(i, 1); i--; l--;
            } else {
              args = both ? Array.prototype.slice.call(arguments, 1) : arguments;
              callback[0].apply(callback[1] || this, args);
            }
          }
        }
      }
      return this;
    }

  };

  // Backbone.Model
  // --------------

  // Create a new model, with defined attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  Backbone.Model = function(attributes, options) {
    var defaults;
    attributes || (attributes = {});
    if (defaults = this.defaults) {
      if (_.isFunction(defaults)) defaults = defaults.call(this);
      attributes = _.extend({}, defaults, attributes);
    }
    this.attributes = {};
    this._escapedAttributes = {};
    this.cid = _.uniqueId('c');
    this.set(attributes, {silent : true});
    this._changed = false;
    this._previousAttributes = _.clone(this.attributes);
    if (options && options.collection) this.collection = options.collection;
    this.initialize(attributes, options);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Backbone.Model.prototype, Backbone.Events, {

    // A snapshot of the model's previous attributes, taken immediately
    // after the last `"change"` event was fired.
    _previousAttributes : null,

    // Has the item been changed since the last `"change"` event?
    _changed : false,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute : 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize : function(){},

    // Return a copy of the model's `attributes` object.
    toJSON : function() {
      return _.clone(this.attributes);
    },

    // Get the value of an attribute.
    get : function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape : function(attr) {
      var html;
      if (html = this._escapedAttributes[attr]) return html;
      var val = this.attributes[attr];
      return this._escapedAttributes[attr] = escapeHTML(val == null ? '' : '' + val);
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has : function(attr) {
      return this.attributes[attr] != null;
    },

    // Set a hash of model attributes on the object, firing `"change"` unless you
    // choose to silence it.
    set : function(attrs, options) {

      // Extract attributes and options.
      options || (options = {});
      if (!attrs) return this;
      if (attrs.attributes) attrs = attrs.attributes;
      var now = this.attributes, escaped = this._escapedAttributes;

      // Run validation.
      if (!options.silent && this.validate && !this._performValidation(attrs, options)) return false;

      // Check for changes of `id`.
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      // We're about to start triggering change events.
      var alreadyChanging = this._changing;
      this._changing = true;

      // Update attributes.
      for (var attr in attrs) {
        var val = attrs[attr];
        if (!_.isEqual(now[attr], val)) {
          now[attr] = val;
          delete escaped[attr];
          this._changed = true;
          if (!options.silent) this.trigger('change:' + attr, this, val, options);
        }
      }

      // Fire the `"change"` event, if the model has been changed.
      if (!alreadyChanging && !options.silent && this._changed) this.change(options);
      this._changing = false;
      return this;
    },

    // Remove an attribute from the model, firing `"change"` unless you choose
    // to silence it. `unset` is a noop if the attribute doesn't exist.
    unset : function(attr, options) {
      if (!(attr in this.attributes)) return this;
      options || (options = {});
      var value = this.attributes[attr];

      // Run validation.
      var validObj = {};
      validObj[attr] = void 0;
      if (!options.silent && this.validate && !this._performValidation(validObj, options)) return false;

      // Remove the attribute.
      delete this.attributes[attr];
      delete this._escapedAttributes[attr];
      if (attr == this.idAttribute) delete this.id;
      this._changed = true;
      if (!options.silent) {
        this.trigger('change:' + attr, this, void 0, options);
        this.change(options);
      }
      return this;
    },

    // Clear all attributes on the model, firing `"change"` unless you choose
    // to silence it.
    clear : function(options) {
      options || (options = {});
      var attr;
      var old = this.attributes;

      // Run validation.
      var validObj = {};
      for (attr in old) validObj[attr] = void 0;
      if (!options.silent && this.validate && !this._performValidation(validObj, options)) return false;

      this.attributes = {};
      this._escapedAttributes = {};
      this._changed = true;
      if (!options.silent) {
        for (attr in old) {
          this.trigger('change:' + attr, this, void 0, options);
        }
        this.change(options);
      }
      return this;
    },

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overriden,
    // triggering a `"change"` event.
    fetch : function(options) {
      options || (options = {});
      var model = this;
      var success = options.success;
      options.success = function(resp, status, xhr) {
        if (!model.set(model.parse(resp, xhr), options)) return false;
        if (success) success(model, resp);
      };
      options.error = wrapError(options.error, model, options);
      return (this.sync || Backbone.sync).call(this, 'read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save : function(attrs, options) {
      options || (options = {});
      if (attrs && !this.set(attrs, options)) return false;
      var model = this;
      var success = options.success;
      options.success = function(resp, status, xhr) {
        if (!model.set(model.parse(resp, xhr), options)) return false;
        if (success) success(model, resp, xhr);
      };
      options.error = wrapError(options.error, model, options);
      var method = this.isNew() ? 'create' : 'update';
      return (this.sync || Backbone.sync).call(this, method, this, options);
    },

    // Destroy this model on the server if it was already persisted. Upon success, the model is removed
    // from its collection, if it has one.
    destroy : function(options) {
      options || (options = {});
      if (this.isNew()) return this.trigger('destroy', this, this.collection, options);
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        model.trigger('destroy', model, model.collection, options);
        if (success) success(model, resp);
      };
      options.error = wrapError(options.error, model, options);
      return (this.sync || Backbone.sync).call(this, 'delete', this, options);
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url : function() {
      var base = getUrl(this.collection) || this.urlRoot || urlError();
      if (this.isNew()) return base;
      return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + encodeURIComponent(this.id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse : function(resp, xhr) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone : function() {
      return new this.constructor(this);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew : function() {
      return this.id == null;
    },

    // Call this method to manually fire a `change` event for this model.
    // Calling this will cause all objects observing the model to update.
    change : function(options) {
      this.trigger('change', this, options);
      this._previousAttributes = _.clone(this.attributes);
      this._changed = false;
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged : function(attr) {
      if (attr) return this._previousAttributes[attr] != this.attributes[attr];
      return this._changed;
    },

    // Return an object containing all the attributes that have changed, or false
    // if there are no changed attributes. Useful for determining what parts of a
    // view need to be updated and/or what attributes need to be persisted to
    // the server.
    changedAttributes : function(now) {
      now || (now = this.attributes);
      var old = this._previousAttributes;
      var changed = false;
      for (var attr in now) {
        if (!_.isEqual(old[attr], now[attr])) {
          changed = changed || {};
          changed[attr] = now[attr];
        }
      }
      return changed;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous : function(attr) {
      if (!attr || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes : function() {
      return _.clone(this._previousAttributes);
    },

    // Run validation against a set of incoming attributes, returning `true`
    // if all is well. If a specific `error` callback has been passed,
    // call that instead of firing the general `"error"` event.
    _performValidation : function(attrs, options) {
      var error = this.validate(attrs);
      if (error) {
        if (options.error) {
          options.error(this, error, options);
        } else {
          this.trigger('error', this, error, options);
        }
        return false;
      }
      return true;
    }

  });

  // Backbone.Collection
  // -------------------

  // Provides a standard collection class for our sets of models, ordered
  // or unordered. If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.comparator) this.comparator = options.comparator;
    _.bindAll(this, '_onModelEvent', '_removeReference');
    this._reset();
    if (models) this.reset(models, {silent: true});
    this.initialize.apply(this, arguments);
  };

  // Define the Collection's inheritable methods.
  _.extend(Backbone.Collection.prototype, Backbone.Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model : Backbone.Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize : function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON : function() {
      return this.map(function(model){ return model.toJSON(); });
    },

    // Add a model, or list of models to the set. Pass **silent** to avoid
    // firing the `added` event for every new model.
    add : function(models, options) {
      if (_.isArray(models)) {
        for (var i = 0, l = models.length; i < l; i++) {
          this._add(models[i], options);
        }
      } else {
        this._add(models, options);
      }
      return this;
    },

    // Remove a model, or a list of models from the set. Pass silent to avoid
    // firing the `removed` event for every model removed.
    remove : function(models, options) {
      if (_.isArray(models)) {
        for (var i = 0, l = models.length; i < l; i++) {
          this._remove(models[i], options);
        }
      } else {
        this._remove(models, options);
      }
      return this;
    },

    // Get a model from the set by id.
    get : function(id) {
      if (id == null) return null;
      return this._byId[id.id != null ? id.id : id];
    },

    // Get a model from the set by client id.
    getByCid : function(cid) {
      return cid && this._byCid[cid.cid || cid];
    },

    // Get the model at the given index.
    at: function(index) {
      return this.models[index];
    },

    // Force the collection to re-sort itself. You don't need to call this under normal
    // circumstances, as the set will maintain sort order as each item is added.
    sort : function(options) {
      options || (options = {});
      if (!this.comparator) throw new Error('Cannot sort a set without a comparator');
      this.models = this.sortBy(this.comparator);
      if (!options.silent) this.trigger('reset', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck : function(attr) {
      return _.map(this.models, function(model){ return model.get(attr); });
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any `added` or `removed` events. Fires `reset` when finished.
    reset : function(models, options) {
      models  || (models = []);
      options || (options = {});
      this.each(this._removeReference);
      this._reset();
      this.add(models, {silent: true});
      if (!options.silent) this.trigger('reset', this, options);
      return this;
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `add: true` is passed, appends the
    // models to the collection instead of resetting.
    fetch : function(options) {
      options || (options = {});
      var collection = this;
      var success = options.success;
      options.success = function(resp, status, xhr) {
        collection[options.add ? 'add' : 'reset'](collection.parse(resp, xhr), options);
        if (success) success(collection, resp);
      };
      options.error = wrapError(options.error, collection, options);
      return (this.sync || Backbone.sync).call(this, 'read', this, options);
    },

    // Create a new instance of a model in this collection. After the model
    // has been created on the server, it will be added to the collection.
    // Returns the model, or 'false' if validation on a new model fails.
    create : function(model, options) {
      var coll = this;
      options || (options = {});
      model = this._prepareModel(model, options);
      if (!model) return false;
      var success = options.success;
      options.success = function(nextModel, resp, xhr) {
        coll.add(nextModel, options);
        if (success) success(nextModel, resp, xhr);
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse : function(resp, xhr) {
      return resp;
    },

    // Proxy to _'s chain. Can't be proxied the same way the rest of the
    // underscore methods are proxied because it relies on the underscore
    // constructor.
    chain: function () {
      return _(this.models).chain();
    },

    // Reset all internal state. Called when the collection is reset.
    _reset : function(options) {
      this.length = 0;
      this.models = [];
      this._byId  = {};
      this._byCid = {};
    },

    // Prepare a model to be added to this collection
    _prepareModel: function(model, options) {
      if (!(model instanceof Backbone.Model)) {
        var attrs = model;
        model = new this.model(attrs, {collection: this});
        if (model.validate && !model._performValidation(attrs, options)) model = false;
      } else if (!model.collection) {
        model.collection = this;
      }
      return model;
    },

    // Internal implementation of adding a single model to the set, updating
    // hash indexes for `id` and `cid` lookups.
    // Returns the model, or 'false' if validation on a new model fails.
    _add : function(model, options) {
      options || (options = {});
      model = this._prepareModel(model, options);
      if (!model) return false;
      var already = this.getByCid(model);
      if (already) throw new Error(["Can't add the same model to a set twice", already.id]);
      this._byId[model.id] = model;
      this._byCid[model.cid] = model;
      var index = options.at != null ? options.at :
                  this.comparator ? this.sortedIndex(model, this.comparator) :
                  this.length;
      this.models.splice(index, 0, model);
      model.bind('all', this._onModelEvent);
      this.length++;
      if (!options.silent) model.trigger('add', model, this, options);
      return model;
    },

    // Internal implementation of removing a single model from the set, updating
    // hash indexes for `id` and `cid` lookups.
    _remove : function(model, options) {
      options || (options = {});
      model = this.getByCid(model) || this.get(model);
      if (!model) return null;
      delete this._byId[model.id];
      delete this._byCid[model.cid];
      this.models.splice(this.indexOf(model), 1);
      this.length--;
      if (!options.silent) model.trigger('remove', model, this, options);
      this._removeReference(model);
      return model;
    },

    // Internal method to remove a model's ties to a collection.
    _removeReference : function(model) {
      if (this == model.collection) {
        delete model.collection;
      }
      model.unbind('all', this._onModelEvent);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent : function(ev, model, collection, options) {
      if ((ev == 'add' || ev == 'remove') && collection != this) return;
      if (ev == 'destroy') {
        this._remove(model, options);
      }
      if (model && ev === 'change:' + model.idAttribute) {
        delete this._byId[model.previous(model.idAttribute)];
        this._byId[model.id] = model;
      }
      this.trigger.apply(this, arguments);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  var methods = ['forEach', 'each', 'map', 'reduce', 'reduceRight', 'find', 'detect',
    'filter', 'select', 'reject', 'every', 'all', 'some', 'any', 'include',
    'contains', 'invoke', 'max', 'min', 'sortBy', 'sortedIndex', 'toArray', 'size',
    'first', 'rest', 'last', 'without', 'indexOf', 'lastIndexOf', 'isEmpty', 'groupBy'];

  // Mix in each Underscore method as a proxy to `Collection#models`.
  _.each(methods, function(method) {
    Backbone.Collection.prototype[method] = function() {
      return _[method].apply(_, [this.models].concat(_.toArray(arguments)));
    };
  });

  // Backbone.Router
  // -------------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var namedParam    = /:([\w\d]+)/g;
  var splatParam    = /\*([\w\d]+)/g;
  var escapeRegExp  = /[-[\]{}()+?.,\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Backbone.Router.prototype, Backbone.Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize : function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route : function(route, name, callback) {
      Backbone.history || (Backbone.history = new Backbone.History);
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      Backbone.history.route(route, _.bind(function(fragment) {
        var args = this._extractParameters(route, fragment);
        callback.apply(this, args);
        this.trigger.apply(this, ['route:' + name].concat(args));
      }, this));
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate : function(fragment, triggerRoute) {
      Backbone.history.navigate(fragment, triggerRoute);
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes : function() {
      if (!this.routes) return;
      var routes = [];
      for (var route in this.routes) {
        routes.unshift([route, this.routes[route]]);
      }
      for (var i = 0, l = routes.length; i < l; i++) {
        this.route(routes[i][0], routes[i][1], this[routes[i][1]]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp : function(route) {
      route = route.replace(escapeRegExp, "\\$&")
                   .replace(namedParam, "([^\/]*)")
                   .replace(splatParam, "(.*?)");
      return new RegExp('^' + route + '$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted parameters.
    _extractParameters : function(route, fragment) {
      return route.exec(fragment).slice(1);
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on URL fragments. If the
  // browser does not support `onhashchange`, falls back to polling.
  Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');
  };

  // Cached regex for cleaning hashes.
  var hashStrip = /^#*/;

  // Cached regex for detecting MSIE.
  var isExplorer = /msie [\w.]+/;

  // Has the history handling already been started?
  var historyStarted = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(Backbone.History.prototype, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment : function(fragment, forcePushState) {
      if (fragment == null) {
        if (this._hasPushState || forcePushState) {
          fragment = window.location.pathname;
          var search = window.location.search;
          if (search) fragment += search;
          if (fragment.indexOf(this.options.root) == 0) fragment = fragment.substr(this.options.root.length);
        } else {
          fragment = window.location.hash;
        }
      }
      return decodeURIComponent(fragment.replace(hashStrip, ''));
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start : function(options) {

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      if (historyStarted) throw new Error("Backbone.history has already been started");
      this.options          = _.extend({}, {root: '/'}, this.options, options);
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.options.pushState && window.history && window.history.pushState);
      var fragment          = this.getFragment();
      var docMode           = document.documentMode;
      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));
      if (oldIE) {
        this.iframe = $('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo('body')[0].contentWindow;
        this.navigate(fragment);
      }

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._hasPushState) {
        $(window).bind('popstate', this.checkUrl);
      } else if ('onhashchange' in window && !oldIE) {
        $(window).bind('hashchange', this.checkUrl);
      } else {
        setInterval(this.checkUrl, this.interval);
      }

      // Determine if we need to change the base url, for a pushState link
      // opened by a non-pushState browser.
      this.fragment = fragment;
      historyStarted = true;
      var loc = window.location;
      var atRoot  = loc.pathname == this.options.root;
      if (this._wantsPushState && !this._hasPushState && !atRoot) {
        this.fragment = this.getFragment(null, true);
        window.location.replace(this.options.root + '#' + this.fragment);
        // Return immediately as browser will do redirect to new url
        return true;
      } else if (this._wantsPushState && this._hasPushState && atRoot && loc.hash) {
        this.fragment = loc.hash.replace(hashStrip, '');
        window.history.replaceState({}, document.title, loc.protocol + '//' + loc.host + this.options.root + this.fragment);
      }

      if (!this.options.silent) {
        return this.loadUrl();
      }
    },

    // Add a route to be tested when the fragment changes. Routes added later may
    // override previous routes.
    route : function(route, callback) {
      this.handlers.unshift({route : route, callback : callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl : function(e) {
      var current = this.getFragment();
      if (current == this.fragment && this.iframe) current = this.getFragment(this.iframe.location.hash);
      if (current == this.fragment || current == decodeURIComponent(this.fragment)) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl() || this.loadUrl(window.location.hash);
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl : function(fragmentOverride) {
      var fragment = this.fragment = this.getFragment(fragmentOverride);
      var matched = _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
      return matched;
    },

    // Save a fragment into the hash history. You are responsible for properly
    // URL-encoding the fragment in advance. This does not trigger
    // a `hashchange` event.
    navigate : function(fragment, triggerRoute) {
      var frag = (fragment || '').replace(hashStrip, '');
      if (this.fragment == frag || this.fragment == decodeURIComponent(frag)) return;
      if (this._hasPushState) {
        var loc = window.location;
        if (frag.indexOf(this.options.root) != 0) frag = this.options.root + frag;
        this.fragment = frag;
        window.history.pushState({}, document.title, loc.protocol + '//' + loc.host + frag);
      } else {
        window.location.hash = this.fragment = frag;
        if (this.iframe && (frag != this.getFragment(this.iframe.location.hash))) {
          this.iframe.document.open().close();
          this.iframe.location.hash = frag;
        }
      }
      if (triggerRoute) this.loadUrl(fragment);
    }

  });

  // Backbone.View
  // -------------

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    this._configure(options || {});
    this._ensureElement();
    this.delegateEvents();
    this.initialize.apply(this, arguments);
  };

  // Element lookup, scoped to DOM elements within the current view.
  // This should be prefered to global lookups, if you're dealing with
  // a specific view.
  var selectorDelegate = function(selector) {
    return $(selector, this.el);
  };

  // Cached regex to split keys for `delegate`.
  var eventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be merged as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(Backbone.View.prototype, Backbone.Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName : 'div',

    // Attach the `selectorDelegate` function as the `$` property.
    $       : selectorDelegate,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize : function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render : function() {
      return this;
    },

    // Remove this view from the DOM. Note that the view isn't present in the
    // DOM by default, so calling this method may be a no-op.
    remove : function() {
      $(this.el).remove();
      return this;
    },

    // For small amounts of DOM Elements, where a full-blown template isn't
    // needed, use **make** to manufacture elements, one at a time.
    //
    //     var el = this.make('li', {'class': 'row'}, this.model.escape('title'));
    //
    make : function(tagName, attributes, content) {
      var el = document.createElement(tagName);
      if (attributes) $(el).attr(attributes);
      if (content) $(el).html(content);
      return el;
    },

    // Set callbacks, where `this.callbacks` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save'
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents : function(events) {
      if (!(events || (events = this.events))) return;
      if (_.isFunction(events)) events = events.call(this);
      $(this.el).unbind('.delegateEvents' + this.cid);
      for (var key in events) {
        var method = this[events[key]];
        if (!method) throw new Error('Event "' + events[key] + '" does not exist');
        var match = key.match(eventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;
        if (selector === '') {
          $(this.el).bind(eventName, method);
        } else {
          $(this.el).delegate(selector, eventName, method);
        }
      }
    },

    // Performs the initial configuration of a View with a set of options.
    // Keys with special meaning *(model, collection, id, className)*, are
    // attached directly to the view.
    _configure : function(options) {
      if (this.options) options = _.extend({}, this.options, options);
      for (var i = 0, l = viewOptions.length; i < l; i++) {
        var attr = viewOptions[i];
        if (options[attr]) this[attr] = options[attr];
      }
      this.options = options;
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` proeprties.
    _ensureElement : function() {
      if (!this.el) {
        var attrs = this.attributes || {};
        if (this.id) attrs.id = this.id;
        if (this.className) attrs['class'] = this.className;
        this.el = this.make(this.tagName, attrs);
      } else if (_.isString(this.el)) {
        this.el = $(this.el).get(0);
      }
    }

  });

  // The self-propagating extend function that Backbone classes use.
  var extend = function (protoProps, classProps) {
    var child = inherits(this, protoProps, classProps);
    child.extend = this.extend;
    return child;
  };

  // Set up inheritance for the model, collection, and view.
  Backbone.Model.extend = Backbone.Collection.extend =
    Backbone.Router.extend = Backbone.View.extend = extend;

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'delete': 'DELETE',
    'read'  : 'GET'
  };

  // Backbone.sync
  // -------------

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, uses makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded` instead of
  // `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default JSON-request options.
    var params = _.extend({
      type:         type,
      dataType:     'json'
    }, options);

    // Ensure that we have a URL.
    if (!params.url) {
      params.url = getUrl(model) || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (!params.data && model && (method == 'create' || method == 'update')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(model.toJSON());
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (Backbone.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data        = params.data ? {model : params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (Backbone.emulateHTTP) {
      if (type === 'PUT' || type === 'DELETE') {
        if (Backbone.emulateJSON) params.data._method = type;
        params.type = 'POST';
        params.beforeSend = function(xhr) {
          xhr.setRequestHeader('X-HTTP-Method-Override', type);
        };
      }
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !Backbone.emulateJSON) {
      params.processData = false;
    }

    // Make the request.
    return $.ajax(params);
  };

  // Helpers
  // -------

  // Shared empty constructor function to aid in prototype-chain creation.
  var ctor = function(){};

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var inherits = function(parent, protoProps, staticProps) {
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call `super()`.
    if (protoProps && protoProps.hasOwnProperty('constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Inherit class (static) properties from parent.
    _.extend(child, parent);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Add static properties to the constructor function, if supplied.
    if (staticProps) _.extend(child, staticProps);

    // Correctly set child's `prototype.constructor`.
    child.prototype.constructor = child;

    // Set a convenience property in case the parent's prototype is needed later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Helper function to get a URL from a Model or Collection as a property
  // or as a function.
  var getUrl = function(object) {
    if (!(object && object.url)) return null;
    return _.isFunction(object.url) ? object.url() : object.url;
  };

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

  // Wrap an optional error callback with a fallback error event.
  var wrapError = function(onError, model, options) {
    return function(resp) {
      if (onError) {
        onError(model, resp, options);
      } else {
        model.trigger('error', model, resp, options);
      }
    };
  };

  // Helper function to escape a string for HTML rendering.
  var escapeHTML = function(string) {
    return string.replace(/&(?!\w+;|#\d+;|#x[\da-f]+;)/gi, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g,'&#x2F;');
  };

}).call(this);
(function() {
  /*
  (c) 2011 Jan Monschke
  v1.0
  backbone-couchdb.js is licensed under the MIT license.
  */  var con;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Backbone.couch_connector = con = {
    config: {
      db_name: "backbone_connect",
      ddoc_name: "backbone_example",
      view_name: "byCollection",
      global_changes: false,
      base_url: null
    },
    helpers: {
      extract_collection_name: function(model) {
        var _name, _splitted;
        if (model == null) {
          throw new Error("No model has been passed");
        }
        if (!(((model.collection != null) && (model.collection.url != null)) || (model.url != null))) {
          return "";
        }
        if (model.url != null) {
          _name = _.isFunction(model.url) ? model.url() : model.url;
        } else {
          _name = _.isFunction(model.collection.url) ? model.collection.url() : model.collection.url;
        }
        if (_name[0] === "/") {
          _name = _name.slice(1, _name.length);
        }
        _splitted = _name.split("/");
        _name = _splitted.length > 0 ? _splitted[0] : _name;
        _name = _name.replace("/", "");
        return _name;
      },
      make_db: function() {
        var db;
        db = $.couch.db(con.config.db_name);
        if (con.config.base_url != null) {
          db.uri = "" + con.config.base_url + "/" + con.config.db_name + "/";
        }
        return db;
      }
    },
    read: function(model, opts) {
      if (model.models) {
        return con.read_collection(model, opts);
      } else {
        return con.read_model(model, opts);
      }
    },
    read_collection: function(coll, opts) {
      var keys, _ref, _view;
      _view = this.config.view_name;
      keys = [this.helpers.extract_collection_name(coll)];
      if (coll.db != null) {
        if (coll.db.changes || this.config.global_changes) {
          coll.listen_to_changes();
        }
        if (coll.db.view != null) {
          _view = coll.db.view;
          keys = (_ref = coll.db.keys) != null ? _ref : null;
        }
      }
      return this.helpers.make_db().view("" + this.config.ddoc_name + "/" + _view, {
        keys: keys,
        success: __bind(function(data) {
          var doc, _i, _len, _ref, _temp;
          _temp = [];
          _ref = data.rows;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            doc = _ref[_i];
            _temp.push(doc.value);
          }
          return opts.success(_temp);
        }, this),
        error: function() {
          return opts.error();
        }
      });
    },
    read_model: function(model, opts) {
      if (!model.id) {
        throw new Error("The model has no id property, so it can't get fetched from the database");
      }
      return this.helpers.make_db().openDoc(model.id, {
        success: function(doc) {
          return opts.success(doc);
        },
        error: function() {
          return opts.error();
        }
      });
    },
    create: function(model, opts) {
      var coll, vals;
      vals = model.toJSON();
      coll = this.helpers.extract_collection_name(model);
      if (coll.length > 0) {
        vals.collection = coll;
      }
      return this.helpers.make_db().saveDoc(vals, {
        success: function(doc) {
          return opts.success({
            _id: doc.id,
            _rev: doc.rev
          });
        },
        error: function() {
          return opts.error();
        }
      });
    },
    update: function(model, opts) {
      return this.create(model, opts);
    },
    del: function(model, opts) {
      return this.helpers.make_db().removeDoc(model.toJSON(), {
        success: function() {
          return opts.success();
        },
        error: function(nr, req, e) {
          if (e === "deleted") {
            return opts.success();
          } else {
            return opts.error();
          }
        }
      });
    }
  };
  Backbone.sync = function(method, model, opts) {
    switch (method) {
      case "read":
        return con.read(model, opts);
      case "create":
        return con.create(model, opts);
      case "update":
        return con.update(model, opts);
      case "delete":
        return con.del(model, opts);
    }
  };
  Backbone.Collection = (function() {
    function Collection() {
      this._db_on_change = __bind(this._db_on_change, this);;
      this._db_prepared_for_changes = __bind(this._db_prepared_for_changes, this);;      Collection.__super__.constructor.apply(this, arguments);
    }
    __extends(Collection, Backbone.Collection);
    Collection.prototype.initialize = function() {
      if (!this._db_changes_enabled && ((this.db && this.db.changes) || con.config.global_changes)) {
        return this.listen_to_changes();
      }
    };
    Collection.prototype.listen_to_changes = function() {
      if (!this._db_changes_enabled) {
        this._db_changes_enabled = true;
        if (!this._db_inst) {
          this._db_inst = con.helpers.make_db();
        }
        window.db_inst = this._db_inst;
        console.log(db_inst);
        return this._db_inst.info({
          "beforeSend" : function(){
            console.log(arguments, this)
          },
          "success": this._db_prepared_for_changes
        });
      }
    };
    Collection.prototype.stop_changes = function() {
      this._db_changes_enabled = false;
      if (this._db_changes_handler != null) {
        this._db_changes_handler.stop();
        return this._db_changes_handler = null;
      }
    };
    Collection.prototype._db_prepared_for_changes = function(data) {
      var opts;
      this._db_update_seq = data.update_seq || 0;
      opts = {
        include_docs: true,
        collection: con.helpers.extract_collection_name(this),
        filter: "" + con.config.ddoc_name + "/by_collection"
      };
      _.extend(opts, this.db);
      return _.defer(__bind(function() {
        this._db_changes_handler = this._db_inst.changes(this._db_update_seq, opts);
        return this._db_changes_handler.onChange(this._db_on_change);
      }, this));
    };
    Collection.prototype._db_on_change = function(changes) {
      var obj, _doc, _i, _len, _ref, _results;
      _ref = changes.results;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _doc = _ref[_i];
        obj = this.get(_doc.id);
        _results.push(obj != null ? _doc.deleted ? this.remove(obj) : obj.get("_rev") !== _doc.doc._rev ? obj.set(_doc.doc) : void 0 : !_doc.deleted ? this.add(_doc.doc) : void 0);
      }
      return _results;
    };
    return Collection;
  })();
  Backbone.Model = (function() {
    function Model() {
      Model.__super__.constructor.apply(this, arguments);
    }
    __extends(Model, Backbone.Model);
    Model.prototype.idAttribute = "_id";
    return Model;
  })();
}).call(this);
var canvasR = {
    context : null,
    width : 0,
    height : 0,
    "init" : function(_canvasElem){
        this.context = _canvasElem.getContext('2d');
        this.update();
    },
    "update" : function(){
        this.width = this.context.canvas.width;
        this.height = this.context.canvas.height;
    },
    "rect" : function(x,y,width,height,color){
        this.context.fillStyle = color;
        this.context.fillRect(x,y,width,height);
    },
    "alpha" : function(_alpha){
        this.context.globalAlpha = _alpha;
    }
};/** returns the element with the given id */
function id(_id){
    return document.getElementById(_id);
};
/** adds an eventlistener to the given element */
function event(name,elem,func){
    elem.addEventListener(name,func,false);
};
/** click on desktop and touchend on supported mobile*/
function action(elem,func){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.indexOf("iphone") != -1 || ua.indexOf("ipod") != -1 || ua.indexOf("ipad") != -1 || ua.indexOf("android") != -1)
        event("touchend",elem,func);
    else
        event("click",elem,func);
};
/** sets the inner html of the given element */
function html(elem,html){
    elem.innerHTML = html;
};
function hide(elem){
	elem.style.display = "none";
};
function show(elem){
	elem.style.display = "block";
};
/** do something over all the elements in the collection*/
function each(collection,func){
    for (var i=0; i < collection.length; i++)
        func(collection[i],i);
};
/** calls the function for each child elem with elem and index as params*/
function eachChildTag(elem,tagName,func){
    each(elem.getElementsByTagName(tagName),func);
};(this.require.define({
  "templates/HighscoreEntry": function(exports, require, module) {
    module.exports = function (__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
    
      __out.push('<td>');
    
      __out.push(this.player.substring(0, 10));
    
      __out.push('</td><td>');
    
      __out.push(this.moves_needed);
    
      __out.push('</td><td><a href=\'#/play/');
    
      __out.push(__sanitize(this._id));
    
      __out.push('\'>Beat this one!</a></td>');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}
  }
}));
(this.require.define({
  "templates/HighscoreView": function(exports, require, module) {
    module.exports = function (__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
    
      __out.push('See best <span class="button">25</span>, <span class="button">50</span> or <span class="button">100</span> players.\n<table>\n  <thead>\n    <tr>\n      <th>Name:</th>\n      <th>Moves:</th>\n      <th></th>\n    </tr>\n  </thead>\n</table>');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}
  }
}));
(this.require.define({
  "templates/home": function(exports, require, module) {
    module.exports = function (__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
    
      __out.push('<p>\n  Brunch-Colors is a simple, addictive color-matching game. Learn how to play <a href="#!instructions">here</a> or start playing <a href="#!play/new">right now</a>. Don\'t forget to challenge your friends after finishing a field!\n</p>\n<p>\n  This game was written with <a href="http://brunchwithcoffee.org">brunch</a>, a client-side framework powered by components like CoffeeScript and Backbone.js. As a backend it uses CouchDB / couchapp.\n</p>');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}
  }
}));
(this.require.define({
  "templates/instructionsview": function(exports, require, module) {
    module.exports = function (__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
    
      __out.push('<p>\n  You start in the upper left corner with a single rectangle. By clicking on a color in the color list at the top, you choose which of the neighbour fields you would like to take over. After each step the field is redrawn and the step counter increased. Aim of the game is to take over all of the fields.\n</p>\n<p>\n  <h3>Challenge your friends!</h3>\n  You can easily challenge your friends by sending them the url of your finished game or directly by posting it to your Facebook wall. They will then be able to play the same field that you just played. When they score better than you they can take away your highscore but you can simply try again to beat their new highscore.\n</p>\n<p>\n  All finished games will be sent to the highscore-list. There you can look up the 100 best games played and you can even try to beat other players\' highscores.\n</p>\n<p>\n  Whenever someone finishes a game you will receive a notification so that you can immediately try to beat his/her highscore.\n</p>');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}
  }
}));
(this.require.define({
  "templates/notification_element": function(exports, require, module) {
    module.exports = function (__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
    
      __out.push('<span>New highscore by ');
    
      __out.push(__sanitize(this.original_player.substring(0, 20)));
    
      __out.push('! ');
    
      __out.push(__sanitize(this.moves_needed));
    
      __out.push(' moves needed.\n');
    
      if (this.id != null) {
        __out.push('\n  <a href="#/play/');
        __out.push(__sanitize(this.id));
        __out.push('">Beat the highscore now!</a> </span>');
      }
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}
  }
}));
(this.require.define({
  "views/game_view": function(exports, require, module) {
    (function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  exports.GameView = (function(_super) {

    __extends(GameView, _super);

    function GameView() {
      this.game_over = __bind(this.game_over, this);
      this.update_moves = __bind(this.update_moves, this);
      this.update_name = __bind(this.update_name, this);
      GameView.__super__.constructor.apply(this, arguments);
    }

    GameView.prototype.initialize = function() {
      this.el = $("#content");
      this.template = require("templates/game_view");
      this.model.bind("change:moves_needed", this.update_moves);
      this.model.bind("gameover", this.game_over);
      if (!(this.model.get('moves_needed') < 0)) {
        return this.original_moves = this.model.get('moves_needed');
      }
    };

    GameView.prototype.render = function() {
      var vals;
      vals = this.model.toJSON();
      vals.original_moves = this.original_moves;
      vals.player = vals.player || app.configs.player || "unnamed";
      this.el.html(this.template(vals));
      $('#player_name').blur(this.update_name);
      return this.legacy();
    };

    GameView.prototype.update_name = function(e) {
      var element;
      element = $(e.currentTarget);
      this.model.set({
        "player": element.val()
      });
      return app.configs.player = element.val();
    };

    GameView.prototype.update_moves = function(model, moves) {
      return $('#stats').html("Moves: " + moves);
    };

    GameView.prototype.game_over = function() {
      var vals;
      this.link = "http://brunch-colors.com/#/play/" + this.model.id;
      vals = {
        original_moves: this.original_moves,
        moves_needed: this.model.get('moves_needed'),
        link: this.link
      };
      $('#messagez').html(require("templates/GameOver")(vals));
      $("#canvas").remove();
      if (!vals.original_moves || vals.original_moves > vals.moves_needed) {
        this.model.save();
        if (window.FB) return this.start_FB();
      }
    };

    GameView.prototype.start_FB = function() {
      var moves, render_post_button, show_login, that;
      that = this;
      show_login = function() {
        $('#fb').html('<fb:login-button perms="publish_stream" show-faces="true" width="400" max-rows="1"></fb:login-button>');
        if (FB) return FB.XFBML.parse();
      };
      moves = this.model.get("moves_needed");
      render_post_button = function() {
        $('#fb').html("<button id='fb_post'>Challenge your friends on Facebook</button>");
        return $('#fb_post').click(function() {
          if (FB) {
            return FB.ui({
              method: 'feed',
              message: "Can you beat my highscore on Brunch-Colors? (" + moves + " moves)",
              link: that.link,
              picture: "http://img.ly/system/uploads/000/735/352/original_brunch_logo.png"
            }, function(response) {});
          }
        });
      };
      FB.getLoginStatus(function(response) {
        if (response.session) {
          return render_post_button();
        } else {
          return show_login();
        }
      });
      return FB.Event.subscribe('auth.login', function(response) {
        return render_post_button();
      });
    };

    GameView.prototype.legacy = function() {
      
    that = this;
    window.cb = {
    	testfield : "124312343123412332123431231344432"
    };
    cb.users = [{
    	name : "John",
    	lastColor : -1,
    	steps : 0,
    	fillColor : "#999",
    	fieldPercentage : 0
    }];

    cb.activeUser = 0;

    cb.colors = ["#E54661","#FFA644","#998A2F","#2C594F","#002D40"];

    cb.field = null;

    cb.logic = {
    	// 0:singpleplayer, 1:2playerround, 2:2playerkamikaze
    	mode : 0,
    	player : 1,
    	opponent  : 2,
    	free : -1,
    	stop : "#",
    	init : function(){
    		//	TODO: only single player atm
    		cb.field.possessions[0][0] = 0;
    		cb.ui.init();
    		cb.ui.update();
    	},
    	next : function(color){
    	    if(!cb.logic.isGameOver()){
    		    cb.logic.recalcField(color, cb.activeUser);
    		    cb.users[cb.activeUser].steps++;
    		    that.model.set({"moves_needed" : cb.users[cb.activeUser].steps});
    		    cb.ui.update();
    		}else{
    		    console.log("Game is over");
    		}
    	},
    	recalcField : function(_newColor,_by){
    		var l1 = cb.field.possessions.length;
    		var l2 = cb.field.possessions[0].length;
    		for(var y = 0; y<l1; y++){

    			for(var x = 0; x < l2; x++){
    				if(cb.logic.fieldIsColor(_newColor,x,y) && cb.logic.fieldIsFree(x, y) 
    				        && cb.logic.playerHasNeighbourField(_by, x, y)){
    					cb.logic.takePossessionOf(_by,_newColor, x, y)
    				}
    			}
    		}
    		cb.logic.updateColorsByPlayer(_newColor, _by);
    	},
    	isGameOver : function(){
    	    return (cb.users[cb.activeUser].fieldPercentage == 100);
    	}, 
    	fieldIsColor : function(color,x,y){
    		return (cb.field.colors[y][x] == color);
    	},
    	fieldIsFree : function(x,y){
    		return (cb.field.possessions[y][x] == cb.logic.free);
    	},
    	playerHasNeighbourField : function(player,x,y){
    		if(x > 0 && cb.field.possessions[y][x-1] == player) // to the left
    			return true;
    		if(x < cb.field.possessions[y].length - 1 && cb.field.possessions[y][x+1] == player) // to the right
    			return true;
    		if(y > 0  && cb.field.possessions[y-1][x] == player) // above
    			return true;
    		if(y < cb.field.possessions.length -1  && cb.field.possessions[y+1][x] == player) // underneath
    			return true;
    		return false;
    	},
    	takePossessionOf : function(player,color,x,y){
    	  cb.field.possessions[y][x] = player;
    		cb.field.colors[y][x] = color;
    	  if(x > 0 && cb.logic.fieldIsColor(color,x-1,y) && cb.field.possessions[y][x-1] != player){ // to the left
    			this.takePossessionOf(player,color,x-1,y);
    		}
    		if(x < cb.field.possessions[y].length - 1 && cb.logic.fieldIsColor(color,x+1,y) && cb.field.possessions[y][x+1] != player){ // to the right
    			this.takePossessionOf(player,color,x+1,y);
    		}
    		if(y > 0  && cb.logic.fieldIsColor(color,x,y-1) && cb.field.possessions[y]-1[x] != player){ // above
    			this.takePossessionOf(player,color,x,y-1);
    		}
    		if(y < cb.field.possessions.length -1  && cb.logic.fieldIsColor(color,x,y+1) && cb.field.possessions[y+1][x] != player){ // underneath
    			this.takePossessionOf(player,color,x,y+1);
    		}
    	},
    	updateColorsByPlayer : function(_color,_player){
    		var len1 = cb.field.colors.length;
    		var len2 = cb.field.colors[0].length;
    		var totalRects = len1*len2;
    		var playerRects = 0;
    		for(var i = 0; i < len1; i++){
    			for(var j = 0; j < len2; j++){
    				if(cb.field.possessions[i][j] == _player){
    					cb.field.colors[i][j] = _color;
    					playerRects++;
    				}
    			}
    		}

    		if(playerRects == totalRects)
    		    cb.users[_player].fieldPercentage = 100;
    		else
    		    cb.users[_player].fieldPercentage = Math.floor(100 * (playerRects/totalRects));
    	}
    };

    cb.ui = {
      model : this.model,
        init : function(){
            this.showAllColors();
        },
    	update : function(){
    		displayField(cb.field.colors);
    		var act = cb.users[cb.activeUser];
    		console.log("Steps count: " + act.steps + "Percentage: " + act.fieldPercentage);
        if(act.fieldPercentage == 100){
          this.model.set({ "field" : cb.field });
          this.model.trigger("gameover");
        }
		    var vals = {
		      "moves_needed" : act.steps
		    };
		    this.model.set(vals);
    	},

    	showAllColors : function(){
    		var newHtml = "";
    		var len = cb.colors.length;
    		for(var i = 0; i < len; i++){
    			newHtml += "<li class='color' style='background-color:"+cb.colors[i]+";color:"+cb.colors[i]+";'></li>";
    		}
    		newHtml += "";
    		$('#controls').html(newHtml);

    		eachChildTag(id('controls'),"li",function(elem,index){
    		    action(elem,function(){
    		        cb.logic.next(index);
    		    });
    		});
    	}
    };

    window.Utils = {
    	makeArrayOfChars : function(str,len){
    		ret = [];
    		row = [];
    		strlen = str.length;
    		for ( var ind = 0; ind < strlen; ind++) {
    			currChar = str[ind];
    			row.push(currChar);
    			if(row.length == len){
    				ret.push(row);
    				row = [];
    			}
    		}
    		return ret;
    	},
    	printField : function(_field){
    	    //calculate rect sizes
    	    var width = Math.floor(canvasR.width / _field.length);
    	    var height = Math.floor(canvasR.height / _field[0].length);
    	    len = _field.length;
    	    var a = new Date();
    		for(i = 0; i < len; i++){
    			len2 = _field[i].length;

    			for(u=0; u < len2; u++){
    				var color = cb.colors[cb.field.colors[i][u]];
    				if(cb.field.possessions[i][u] != -1){
    				    color = cb.users[cb.field.possessions[i][u]].fillColor;
    				}
    				canvasR.rect((i)*width,(u)*height,width,height,color);
    			}
    		}
    	},
    	generateRandomField : function(_width,_height,_colors){
    		field = {};
    		field.colors = _colors || [];
    		field.possessions = [];
    		currow = [];
    		currowPos = [];
    		for(i = 0; i < _height; i++){
    			currow = [];
    			currowPos = [];
    			for(u = 0; u < _width; u++){
    				currow.push(Utils.generateRandomColor(cb.colors.length));
    				currowPos.push(cb.logic.free);
    			}
    			if(!_colors)
            field.colors.push(currow);
          field.possessions.push(currowPos);
    		}
    		field.original = []
    		for(i = 0; i < _height; i++){
    		  field.original.push([])
    		  for(u = 0; u < _width; u++){
    		    field.original[i].push(field.colors[i][u]);
    			}
    		}
    		return field;
    	},
    	generateRandomColor : function(nrColors){
    		ret = Math.random() * (nrColors-1);
    		return  Math.floor(ret + 0.5);
    	}
    };

    function displayField(_f){

    	Utils.printField(_f);
    };
    canvasR.init(document.getElementById('canvas'));
    window.cb.field = window.Utils.generateRandomField(20,20,this.model.get("field").original);
    window.cb.logic.init();

    ;      return this;
    };

    return GameView;

  })(Backbone.View);

}).call(this);

  }
}));
(this.require.define({
  "collections/games_collection": function(exports, require, module) {
    (function() {
  var Game,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Game = require("models/game").Game;

  exports.GamesCollection = (function(_super) {

    __extends(GamesCollection, _super);

    function GamesCollection() {
      GamesCollection.__super__.constructor.apply(this, arguments);
    }

    GamesCollection.prototype.model = Game;

    GamesCollection.prototype.url = "/games";

    return GamesCollection;

  })(Backbone.Collection);

}).call(this);

  }
}));
(this.require.define({
  "views/HighscoreView": function(exports, require, module) {
    (function() {
  var Game, HighscoreEntry,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  HighscoreEntry = require("views/HighscoreEntry").HighscoreEntry;

  Game = require("models/game").Game;

  exports.HighscoreView = (function(_super) {

    __extends(HighscoreView, _super);

    function HighscoreView() {
      this.amount_clicked = __bind(this.amount_clicked, this);
      this.received = __bind(this.received, this);
      HighscoreView.__super__.constructor.apply(this, arguments);
    }

    HighscoreView.prototype.amount = "25";

    HighscoreView.prototype.initialize = function() {
      this.template = require("templates/HighscoreView");
      this.el = $('#content');
      return this.fetch_highscores();
    };

    HighscoreView.prototype.events = {
      "click .button": "amount_clicked"
    };

    HighscoreView.prototype.fetch_highscores = function() {
      app.views.loadingview.show("Loading Highscores...");
      return $.getJSON("/brunch_colors/_design/brunch_colors_game/_view/highscores?limit=" + this.amount + "&include_docs=true", this.received);
    };

    HighscoreView.prototype.received = function(data) {
      app.views.loadingview.hide();
      this.rows = data.rows;
      return this.render();
    };

    HighscoreView.prototype.amount_clicked = function(e) {
      this.amount = $(e.currentTarget).text();
      return this.fetch_highscores();
    };

    HighscoreView.prototype.render = function() {
      var table, that;
      this.el.html(this.template());
      table = this.$('table');
      that = this;
      _.each(this.rows, function(game) {
        var g;
        g = new Game(game.doc);
        g.id = game.doc._id;
        app.collections.games.add(g, {
          silent: true
        });
        return table.append(new HighscoreEntry({
          model: game.doc
        }).render().el);
      });
      return this.delegateEvents();
    };

    return HighscoreView;

  })(Backbone.View);

}).call(this);

  }
}));
(this.require.define({
  "views/home_view": function(exports, require, module) {
    (function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  exports.HomeView = (function(_super) {

    __extends(HomeView, _super);

    function HomeView() {
      HomeView.__super__.constructor.apply(this, arguments);
    }

    HomeView.prototype.initialize = function() {
      return this.el = $('#content');
    };

    HomeView.prototype.render = function() {
      return this.el.html(require("templates/home"));
    };

    return HomeView;

  })(Backbone.View);

}).call(this);

  }
}));
(this.require.define({
  "views/InstructionsView": function(exports, require, module) {
    (function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  exports.InstructionsView = (function(_super) {

    __extends(InstructionsView, _super);

    function InstructionsView() {
      InstructionsView.__super__.constructor.apply(this, arguments);
    }

    InstructionsView.prototype.initialize = function() {
      this.el = $("#content");
      return this.template = require("templates/instructionsview");
    };

    InstructionsView.prototype.render = function() {
      return this.el.html(this.template());
    };

    return InstructionsView;

  })(Backbone.View);

}).call(this);

  }
}));
(this.require.define({
  "views/LoadingView": function(exports, require, module) {
    (function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  exports.LoadingView = (function(_super) {

    __extends(LoadingView, _super);

    function LoadingView() {
      LoadingView.__super__.constructor.apply(this, arguments);
    }

    LoadingView.prototype.initialize = function() {
      return this.el = $('#loading');
    };

    LoadingView.prototype.show = function(text) {
      this.el.html("<img src='images/ajax-loader.gif' /> " + text);
      return this.el.slideDown();
    };

    LoadingView.prototype.hide = function() {
      return this.el.slideUp();
    };

    return LoadingView;

  })(Backbone.View);

}).call(this);

  }
}));
(this.require.define({
  "views/notification_element": function(exports, require, module) {
    (function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  exports.NotificationElement = (function(_super) {

    __extends(NotificationElement, _super);

    function NotificationElement() {
      this.hide = __bind(this.hide, this);
      NotificationElement.__super__.constructor.apply(this, arguments);
    }

    NotificationElement.prototype.className = "notification_element";

    NotificationElement.prototype.render = function() {
      var vals;
      this.el = this.$(this.el);
      vals = this.model.toJSON();
      vals.id = this.model.id;
      this.el.html(require("templates/notification_element")(vals));
      window.setTimeout(this.hide, 5000);
      this.el.click(this.hide);
      return this;
    };

    NotificationElement.prototype.hide = function() {
      var that;
      that = this;
      return this.el.fadeOut("slow", function() {
        return that.el.remove();
      });
    };

    return NotificationElement;

  })(Backbone.View);

}).call(this);

  }
}));
(this.require.define({
  "views/notification_view": function(exports, require, module) {
    (function() {
  var NotificationElement,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  NotificationElement = require("views/notification_element").NotificationElement;

  exports.NotificationView = (function(_super) {

    __extends(NotificationView, _super);

    function NotificationView() {
      this.add = __bind(this.add, this);
      NotificationView.__super__.constructor.apply(this, arguments);
    }

    NotificationView.prototype.initialize = function() {
      this.el = $('#notification-view');
      return app.collections.games.bind("add", this.add);
    };

    NotificationView.prototype.render = function() {};

    NotificationView.prototype.add = function(model) {
      var new_element;
      new_element = new NotificationElement({
        "model": model
      });
      return this.el.append(new_element.render().el);
    };

    return NotificationView;

  })(Backbone.View);

}).call(this);

  }
}));
(this.require.define({
  "main": function(exports, require, module) {
    (function() {
  var MainController;

  Backbone.couch_connector.config.db_name = "brunch_colors";

  Backbone.couch_connector.config.ddoc_name = "brunch_colors_game";

  Backbone.couch_connector.config.global_changes = true;

  window.app = {};

  app.controllers = {};

  app.collections = {};

  app.models = {};

  app.views = {};

  app.configs = {};

  MainController = require('controllers/MainController').MainController;

  $(document).ready(function() {
    app.controllers.main = new MainController();
    return Backbone.history.start();
  });

}).call(this);

  }
}));
(this.require.define({
  "controllers/MainController": function(exports, require, module) {
    (function() {
  var Game, GameView, GamesCollection, HighscoreView, HomeView, InstructionsView, LoadingView, NotificationView,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  LoadingView = require("views/LoadingView").LoadingView;

  HomeView = require("views/home_view").HomeView;

  InstructionsView = require("views/InstructionsView").InstructionsView;

  GameView = require("views/game_view").GameView;

  HighscoreView = require("views/HighscoreView").HighscoreView;

  NotificationView = require("views/notification_view").NotificationView;

  Game = require("models/game").Game;

  GamesCollection = require("collections/games_collection").GamesCollection;

  exports.MainController = (function(_super) {

    __extends(MainController, _super);

    MainController.prototype.routes = {
      "": "home",
      "/": "home",
      "/home": "home",
      "/homebmb=1": "home",
      "/instructions": "instructions",
      "/play/new": "play_new",
      "/play/:id": "play",
      "/highscores": "highscores"
    };

    function MainController() {
      MainController.__super__.constructor.apply(this, arguments);
      app.collections.games = new GamesCollection();
      this.bind("all", function(msg) {
        if (typeof _gaq !== "undefined" && _gaq !== null) {
          return _gaq.push(['_trackPageview', msg.replace(/route:/, '')]);
        }
      });
      this.init_loading_view();
      this.init_notifications();
    }

    MainController.prototype.home = function() {
      this.navigate("/home");
      return new HomeView().render();
    };

    MainController.prototype.instructions = function() {
      this.navigate("/instructions");
      return new InstructionsView().render();
    };

    MainController.prototype.play_new = function() {
      var that;
      that = this;
      app.views.loadingview.show("Generating new field...");
      return $.ajax({
        url: "/_uuids",
        dataType: "json",
        success: function(resp) {
          var game;
          game = new Game();
          game.id = resp.uuids[0];
          game.set({
            "_id": game.id
          });
          app.collections.games.add(game, {
            silent: true
          });
          return that.play(game.id);
        },
        error: function() {
          return alert("Couldn't connect to DB-Server, try again later!");
        },
        complete: function() {
          return app.views.loadingview.hide();
        }
      });
    };

    MainController.prototype.play = function(id) {
      var game, that;
      this.navigate("/play/" + id);
      game = app.collections.games.get(id);
      that = this;
      if (game != null) {
        return that.get_fb_name_and_render_game(game);
      } else {
        app.views.loadingview.show("Loading field...");
        return $.ajax({
          url: "/brunch_colors/" + id,
          dataType: 'json',
          success: function(game) {
            game = new Game(game);
            app.collections.games.add(game, {
              silent: true
            });
            return that.get_fb_name_and_render_game(game);
          },
          error: function() {
            alert("Couldn't find game by id. Started new game instead.");
            return that.play_new();
          }
        });
      }
    };

    MainController.prototype.get_fb_name_and_render_game = function(game) {
      if (window.FB) {
        return FB.api('/me', function(response) {
          if (response.name) {
            game.set({
              'player': response.name
            });
          }
          new GameView({
            model: game
          }).render();
          return app.views.loadingview.hide();
        });
      } else {
        return new GameView({
          model: game
        }).render();
      }
    };

    MainController.prototype.highscores = function() {
      this.navigate("/highscores");
      return new HighscoreView();
    };

    MainController.prototype.init_loading_view = function() {
      return app.views.loadingview = new LoadingView();
    };

    MainController.prototype.init_notifications = function() {
      $("#add").click(function() {
        var g;
        g = new Game();
        app.collections.games.add(g);
        return g.save();
      });
      return new NotificationView().render();
    };

    return MainController;

  })(Backbone.Router);

}).call(this);

  }
}));
(this.require.define({
  "models/game": function(exports, require, module) {
    (function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  exports.Game = (function(_super) {

    __extends(Game, _super);

    function Game() {
      Game.__super__.constructor.apply(this, arguments);
    }

    Game.prototype.defaults = {
      "moves_needed": -1,
      "free": -1,
      "stop": "#",
      "colors": ["#0000ff", "#ff5555", "#00ffaa", "#ee00ff", "#fff000"],
      "field": {}
    };

    Game.prototype.initialize = function(opts) {
      this.set({
        "created_at": new Date().getTime()
      });
      this.set({
        "player": app.configs.player || opts.player || "unnamed"
      });
      if (opts.player != null) {
        return this.set({
          "original_player": opts.player
        });
      }
    };

    Game.prototype.next = function(color) {
      var moves;
      if (!this.game_is_over()) {
        this.recalc_field(color, 0);
        moves = this.get("moves_needed");
        moves++;
        return this.set({
          "moves_needed": moves
        });
      } else {
        return this.trigger("game_over");
      }
    };

    Game.prototype.validate = function() {
      if ((new Date().getTime() - this.get("created_at")) < 10000) {
        return "Were you really that fast?";
      }
    };

    return Game;

  })(Backbone.Model);

}).call(this);

  }
}));
(this.require.define({
  "templates/game_view": function(exports, require, module) {
    module.exports = function (__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
    
      __out.push('Player: <input type="text" id="player_name" value=\'');
    
      __out.push(__sanitize(this.player));
    
      __out.push('\' class=\'name\' />\n');
    
      if (this.original_moves != null) {
        __out.push('\n  <p>Highscore: ');
        __out.push(__sanitize(this.original_moves));
        __out.push('\n  by ');
        __out.push(__sanitize(this.original_player.substring(0, 20)));
        __out.push('</p>\n');
      }
    
      __out.push('\n<ul id="controls"></ul>\n<div id="messagez"></div>\n<div id="canvas_wrapper"><canvas id="canvas" width="400" height="400" style="margin-top: 20px;"></canvas></div>\n<div id="ui">\n    <div id="menu"></div>\n\t\t<div id="stats"></div>\n</div>');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}
  }
}));
(this.require.define({
  "templates/GameOver": function(exports, require, module) {
    module.exports = function (__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
    
      if (!this.original_moves || (this.original_moves > this.moves_needed)) {
        __out.push('\n  <p>\n    New Highscore for this field with ');
        __out.push(__sanitize(this.moves_needed));
        __out.push(' moves. <br />\n    Challenge your friends and send them this url: <input type="text" style="width: 350px; font-size: 8pt;" value=\'');
        __out.push(__sanitize(this.link));
        __out.push('\' />  \n  </p>\n  <p>\n    Or directly post the link on your Facebook wall so that all your Facebook friends can try to beat your Highscore!\n    <div id="fb"></div>\n  </p>\n');
      } else {
        __out.push('\n  <p>\n    You didn\'t score better than the previous player!\n  </p>\n');
      }
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}
  }
}));
(this.require.define({
  "views/HighscoreEntry": function(exports, require, module) {
    (function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  exports.HighscoreEntry = (function(_super) {

    __extends(HighscoreEntry, _super);

    function HighscoreEntry() {
      HighscoreEntry.__super__.constructor.apply(this, arguments);
    }

    HighscoreEntry.prototype.tagName = "tr";

    HighscoreEntry.prototype.initialize = function() {
      this.el = $(this.el);
      return this.template = require("templates/HighscoreEntry");
    };

    HighscoreEntry.prototype.render = function() {
      this.el.html(this.template(this.model));
      return this;
    };

    return HighscoreEntry;

  })(Backbone.View);

}).call(this);

  }
}));
