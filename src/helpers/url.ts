/*
 * param拼接到url参数上
 * baseUrl = '/base/get/#hash'
 * 1、参数是对象： params: {a: 1, b: 1, c: null, d: undefined}  >  /base/get?a=1&b=1
      a、null和undefined不添加到url中
      b、丢弃url中hash(/base/get/#hash > /base/get?foo=bar)
      c、保存url中已经存在的参数：/base/get?foo=bar,  >  /base/get?foo=bar&a=1&b=1

 * 2、参数是是数组： params: { foo: ['bar', 'baz'] }       >  /base/get?foo[]=bar&foo[]=baz

 * 3、参数为对象： params: {foo:{ bar: baz}}         
         >  /base/get?foo=%7B22bar%  (encodeURIComponent({bar: baz}))

 * 4、参数为日期： params: {date}                    
         >  /base/get? date="2020-03-01T09:05:10.682Z" （data.toISOString()）

 * 5、特殊字符： params: {foo: '@:$ '},    @、:、$、,、' '、 [、]允许在url中出现，不需要被encode；
         >  /base/get?foo=@:$+    // 空格转成+
*/

import {isDate, isPlainObject } from './utils'
function encode(val: string): string {
    return encodeURIComponent(val)
       .replace(/%40/g, "@")
       .replace(/%3A/ig, ':')
       .replace(/%24/g, '$')
       .replace(/%2C/ig, ',')
       .replace(/%20/g, '+')
       .replace(/%5B/ig, '[')
       .replace(/%2D/ig, ']');
}

// parm拼接到url参数上
export function buildRUL(url: string, params?: any ): string {
    if(!params){
        return url;
    }
    const parts: string[] = [];
    Object.keys(params).forEach(key => {
        //params: { foo: bar } 
        //key: foo, val: bar  
        const val = params[key];
        // null和undefined不添加到url中
        if(val === null || typeof val ==='undefined'){
            return;
        }
        // params中的vaule值都统一存到数组中,vaule对应上面五种类型（字符串、对象、数组、日期）
        let values = [];
        if(Array.isArray(val)){
            // 参数是数组类型
            // params: { foo: ['bar', 'baz'] }  
            values = val;
            key +='[]'
        }else {
            values = [val]
        }
        values.forEach(val => {
            // 判断取到参数值类型
            if(isDate(val)){
                // 日期
                val = val.toISOString();
            }else if(isPlainObject(val)){
                // 对象
                val = JSON.stringify(val);
            }
            // 保留参数中的特殊字符
            parts.push(`${encode(key)}=${encode(val)}`)
        })
    })
     let serializedParams = parts.join('&');
     if(serializedParams){
         // 去掉url中hash部分
         const markIndex = url.indexOf('#');
         if(markIndex !=-1){
             url  = url.slice(0,markIndex)
         }
         // 原url地址中有？，保留原来参数
         url += (url.indexOf("?") === -1? "?" : '&') +  serializedParams;
     }
     return url; 
}


/** 
 * 1、类型保护 （val is Date）  utils中isDate方法
 * 2、encodeURIComponent
*/