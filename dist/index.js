"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ID_RANDOM_VALUES = 'abcdefghijklmnopqrstuvwxyz0123456789';
function getFrom(str, startToken, endToken) {
    var startTokenLength = startToken.length;
    var start = str.indexOf(startToken) + startTokenLength;
    if (start < startTokenLength) {
        return '';
    }
    var lastHalf = str.substring(start);
    var end = lastHalf.indexOf(endToken);
    if (end === -1) {
        throw Error("Could not find endTime " + endToken + " in the given string.");
    }
    return lastHalf.substring(0, end);
}
exports.getFrom = getFrom;
function isNil(val) {
    return val === null || val === undefined;
}
exports.isNil = isNil;
function arrify(value) {
    if (isNil(value)) {
        return [];
    }
    return Array.isArray(value) ? value : [value];
}
exports.arrify = arrify;
function checkArrayParam(value, options, name) {
    if (name === void 0) { name = ''; }
    if (options.indexOf(value) === -1) {
        throw new Error("Invalid " + name + " " + value + ". Available values: " + options.join() + ")");
    }
}
exports.checkArrayParam = checkArrayParam;
function getOffset(limit, page, offset) {
    if (limit === void 0) { limit = 10; }
    if (!isNil(offset) && !isNil(page)) {
        throw new Error('Select between offset and page option, but not both');
    }
    if (!isNil(offset)) {
        return offset;
    }
    return page && page > 1 ? limit * (page - 1) : 0;
}
exports.getOffset = getOffset;
function removeQueryUrl(val) {
    return val.substring(0, val.indexOf('?'));
}
exports.removeQueryUrl = removeQueryUrl;
function paginateArray(arr, limit, page) {
    var offset = getOffset(limit, page);
    return arr.slice(offset, offset + limit);
}
exports.paginateArray = paginateArray;
function getPageNumber(total, limit) {
    return Math.ceil(total / limit);
}
exports.getPageNumber = getPageNumber;
function padZeros(val, len) {
    val = String(val);
    len = len || 2;
    while (val.length < len) {
        val = '0' + val;
    }
    return val;
}
exports.padZeros = padZeros;
function binaryToDecimal(data) {
    var ret = '';
    while (data !== '0') {
        var end = 0;
        var fullName = '';
        var i = 0;
        for (; i < data.length; i++) {
            end = 2 * end + parseInt(data[i], 10);
            if (end >= 10) {
                fullName += '1';
                end -= 10;
            }
            else {
                fullName += '0';
            }
        }
        ret = end.toString() + ret;
        data = fullName.slice(fullName.indexOf('1'));
    }
    return ret;
}
exports.binaryToDecimal = binaryToDecimal;
function stringifyQuery(obj, prefix) {
    var pairs = [];
    for (var key in obj) {
        if (!obj.hasOwnProperty(key)) {
            continue;
        }
        var value = obj[key];
        var enkey = encodeURIComponent(key);
        var pair = void 0;
        if (typeof value === 'object') {
            pair = stringifyQuery(value, prefix ? prefix + '[' + enkey + ']' : enkey);
        }
        else {
            pair = (prefix ? prefix + '[' + enkey + ']' : enkey) + '=' + encodeURIComponent(value);
        }
        pairs.push(pair);
    }
    return pairs.join('&');
}
exports.stringifyQuery = stringifyQuery;
function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}
exports.isPlainObject = isPlainObject;
function toBoolean(value, emptyStringIsTrue) {
    if (emptyStringIsTrue && value === '') {
        return true;
    }
    if (value === '0' || value === 'false' || value === 'null') {
        return false;
    }
    return Boolean(value);
}
exports.toBoolean = toBoolean;
function deepForEachLoop(obj, callback, options, parent) {
    for (var keys = Object.keys(obj), i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var value = obj[key];
        var isSearchKey = options.key && key === options.key;
        var isObject = isPlainObject(value);
        var isArray = Array.isArray(value);
        if (!isSearchKey && (isObject || isArray)) {
            if ((isObject && options.callbackObject) || (isArray && options.callbackArray)) {
                callback(value, key, obj);
            }
            deepForEachLoop(value, callback, options, obj);
        }
        else if (!options.key || isSearchKey) {
            callback(value, key, obj);
        }
    }
}
function deepForEach(obj, callback, options) {
    if (options === void 0) { options = {}; }
    return deepForEachLoop(obj, callback, options);
}
exports.deepForEach = deepForEach;
function createFilter(state, condition, isReversed) {
    if (isNil(state) || state === '') {
        return true;
    }
    return isReversed || state === false ? !condition(state) : condition(state);
}
exports.createFilter = createFilter;
function rand(min, max) {
    return Math.floor(Math.random() * max) + min;
}
exports.rand = rand;
function generateId(size) {
    if (size === void 0) { size = 8; }
    var id = '';
    for (var i = 0; i < size; i++) {
        id += ID_RANDOM_VALUES.charAt(Math.floor(Math.random() * ID_RANDOM_VALUES.length));
    }
    return id;
}
exports.generateId = generateId;
//# sourceMappingURL=index.js.map