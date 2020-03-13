const toString = Object.prototype.toString;

// 判断是否是日期类型
export function isDate(val: any) :val is Date {
    return toString.call(val) === '[object Date]';
}

// 判断是否是对象
export function isObject(val: any): val is Object {
    return val !== null && typeof val === 'object'
}

// 判断是否是普通对象
export function isPlainObject(val: any): val is Object {
    return Object.prototype.toString.call(val) === '[object Object]'
}