import { isPlainObject } from './utils'
import { head } from 'shelljs';

// 处理content-type大小写问题
function normalizeHeaderName(headers:any, normalizedName: string): void{
    if(!headers) {
        return;
    }
    Object.keys(headers).forEach(name => {
        // 大小写不相等，统一用大写
        if(name !== normalizedName && name.toUpperCase() == normalizedName.toUpperCase()) {
            headers[normalizedName] = headers[name]
            delete headers[name];
        }
    })
}   

// ajax发送post请求：
// 按json上传的标准，body放json字符串，header加上Content-Type: application/json。
// 通常大部分库，直接把一个object给body，就是这样处理的。
export function processHeaders(headers: any, data: any): any {
    // 小写的content-type统一成大写的Content-Type
    normalizeHeaderName(headers, 'Content-Type')
    if(isPlainObject(data)) {
        if(headers && !headers['Content-Type']) {
            headers['Content-Type'] = 'application/json;charset=utf-8'
        }
    }
    return headers;
}


// 处理headers字符串 => json对象
// headers字符串默认格式回车换行
export function parseHeaders(headers: string): any {
    let parsed = Object.create(null);
    if(!headers){
        return;
    }
    headers.split('\r\n').forEach( header => {
        let [key, val] =  header.split(":")
        key = key.trim().toLowerCase();
        if(!key) {
            return;
        }
        if(val){
            val = val.trim();
        }
        parsed[key] = val;
    })
    return parsed
}