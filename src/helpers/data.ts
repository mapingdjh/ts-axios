import {isPlainObject } from './utils'

export function transformRequest(data: any): any {
    // ajax发送post请求，普通对象需要序列化成json字符串
    if(isPlainObject(data)) {
        return JSON.stringify(data)
    }
    // Buffer、FormData等其他对象可直接发送
    return data
}

// ajax返回的json字符串转换成json对象
export function transformResponse(data: any): any {
    if(typeof data === 'string') {
        try {
            data = JSON.parse(data)
        }catch(e){
            // 
        }
    }
    return data;
}