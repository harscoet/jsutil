const ID_RANDOM_VALUES = 'abcdefghijklmnopqrstuvwxyz0123456789';

export function getFrom(str: string, startToken: string, endToken: string): string {
  const startTokenLength = startToken.length;
  const start = str.indexOf(startToken) + startTokenLength;

  if (start < startTokenLength) {
    return '';
  }

  const lastHalf = str.substring(start);
  const end = lastHalf.indexOf(endToken);

  if (end === -1) {
    throw Error(`Could not find endTime ${endToken} in the given string.`);
  }

  return lastHalf.substring(0, end);
}

export function isNil<T>(val: T): boolean {
  return val === null || val === undefined;
}

export function arrify<T>(value: T|T[]): T[] {
  if (isNil(value)) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

export function checkArrayParam(value: string, options: string[], name: string = '') {
  if (options.indexOf(value) === -1) {
    throw new Error(`Invalid ${name} ${value}. Available values: ${options.join()})`);
  }
}

export function getOffset(limit: number = 10, page?: number, offset?: number) {
  if (!isNil(offset) && !isNil(page)) {
    throw new Error('Select between offset and page option, but not both');
  }

  if (!isNil(offset)) {
    return offset;
  }

  return page && page > 1 ? limit * (page - 1) : 0;
}

export function removeQueryUrl(val: string) {
  return val.substring(0, val.indexOf('?'));
}

export function paginateArray<T>(arr: T[], limit: number, page: number): T[] {
  const offset = getOffset(limit, page);

  return arr.slice(offset, offset + limit);
}

export function getPageNumber(total: number, limit: number) {
  return Math.ceil(total / limit);
}

export function padZeros(val: string|number, len: number) {
  val = String(val);
  len = len || 2;

  while (val.length < len) {
    val = '0' + val;
  }

  return val;
}

export function binaryToDecimal(data: string) {
  let ret = '';

  while (data !== '0') {
    let end = 0;
    let fullName = '';
    let i = 0;

    for (; i < data.length; i++) {
      end = 2 * end + parseInt(data[i], 10);
      if (end >= 10) {
        fullName += '1';
        end -= 10;
      } else {
        fullName += '0';
      }
    }

    ret = end.toString() + ret;
    data = fullName.slice(fullName.indexOf('1'));
  }

  return ret;
}

export function stringifyQuery(obj, prefix?) {
  const pairs = [];

  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }

    const value = obj[key];
    const enkey = encodeURIComponent(key);
    let pair;

    if (typeof value === 'object') {
      pair = stringifyQuery(value, prefix ? prefix + '[' + enkey + ']' : enkey);
    } else {
      pair = (prefix ? prefix + '[' + enkey + ']' : enkey) + '=' + encodeURIComponent(value);
    }

    pairs.push(pair);
  }

  return pairs.join('&');
}

export function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

export function toBoolean(value: string|number|boolean, emptyStringIsTrue?: boolean) {
  if (emptyStringIsTrue && value === '') {
    return true;
  }

  if (value === '0' || value === 'false' || value === 'null') {
    return false;
  }

  return Boolean(value);
}

function deepForEachLoop(obj, callback?: DeepForEach.Callback, options?: DeepForEach.Options, parent?) {
  for (let keys = Object.keys(obj), i = 0; i < keys.length; ++i) {
    const key = keys[i];
    const value = obj[key];
    const isSearchKey = options.key && key === options.key;
    const isObject = isPlainObject(value);
    const isArray = Array.isArray(value);

    if (!isSearchKey && (isObject || isArray)) {
      if ((isObject && options.callbackObject) || (isArray && options.callbackArray)) {
        callback(value, key, obj);
      }

      deepForEachLoop(value, callback, options, obj);
    } else if (!options.key || isSearchKey) {
      callback(value, key, obj);
    }
  }
}

export function deepForEach(obj, callback: DeepForEach.Callback, options: DeepForEach.Options = {}) {
  return deepForEachLoop(obj, callback, options);
}

export function createFilter(state: boolean|string, condition: (state?: boolean|string) => boolean, isReversed?: boolean): boolean {
  if (isNil(state) || state === '') {
    return true;
  }

  return isReversed || state === false ? !condition(state) : condition(state);
}

export function rand(min: number, max: number): number {
  return Math.floor(Math.random() * max) + min;
}

export function generateId(size: number = 8): string {
  let id = '';

  for (let i = 0; i < size; i++) {
    id += ID_RANDOM_VALUES.charAt(Math.floor(Math.random() * ID_RANDOM_VALUES.length));
  }

  return id;
}

export namespace DeepForEach {
  export type Callback = (value, key: string, object?) => void;

  export interface Options {
    key?: string;
    callbackObject?: boolean;
    callbackArray?: boolean;
  }
}
