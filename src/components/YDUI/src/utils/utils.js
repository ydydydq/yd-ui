/**
 * 生命随机数ID
 * @returns {number}
 */
export const generateId = function() {
  return Math.floor(Math.random() * 10000);
};

/**
 * 是否为空
 * @param val
 * @returns {boolean}
 */
export const isEmpty = function(val) {
  // null or undefined
  if (val == null) return true;

  if (typeof val === 'boolean') return false;

  if (typeof val === 'number') return !val;

  if (val instanceof Error) return val.message === '';

  switch (Object.prototype.toString.call(val)) {
    // String or Array
    case '[object String]':
    case '[object Array]':
      return !val.length;

    // Map or Set or File
    case '[object File]':
    case '[object Map]':
    case '[object Set]': {
      return !val.size;
    }
    // Plain Object
    case '[object Object]': {
      return !Object.keys(val).length;
    }
  }

  return false;
};

/**
 * 判断是否是火狐
 * @returns {boolean}
 */
export const isFirefox = function() {
  return !!window.navigator.userAgent.match(/firefox/i);
};

/**
 *
 * @param fn
 * @returns {Function}
 */
export function rafThrottle(fn) {
  let locked = false;
  return function(...args) {
    if (locked) return;
    locked = true;
    window.requestAnimationFrame(_ => {
      fn.apply(this, args);
      locked = false;
    });
  };
}
