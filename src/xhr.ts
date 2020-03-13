import { AxiosReauestConfig, AiosPromise, AxiosResponse } from './types'
import { parseHeaders } from './helpers/headers'

/** 原生ajax api
 * xhr.responseText    //收到的响应字符串
   xhr.status         //响应的状态码(200 404 ...)
   xhr.readystate    //响应下载状态0-4
   xhr.setRequestHeader() 设置请求头
   xht.getAllResponseHeaders() // 获取请求头, 默认返回字符串
 * 
*/

// 返回响应数据：服务端数据data、Http状态码status、响应头headers、状态消息： statusText、ajax请求对象config，xhr对象
export default function xhr(config: AxiosReauestConfig): AiosPromise {
    return new Promise(resolve => {

        const { url, data=null, method="get", headers, responseType } = config;
        let request = new XMLHttpRequest();

        if(responseType) {
            request.responseType = responseType;
        }

        request.open(method.toLocaleUpperCase(), url, true);

        // 设置请求头
        Object.keys(headers).forEach(name => {
            // 若无body请求数据，且header传入了content-type，删除content-type
            if(!data && name.toLowerCase() == 'content-type'){
                delete headers[name];
            }else { 
                request.setRequestHeader(name, headers[name])
            }
        })

        request.send(data);
    
        request.onreadystatechange = function() {
            if(request.readyState == 4){
                // headers默认返回字符串
                const responseHeaders = parseHeaders(request.getAllResponseHeaders());
                // const responseHeaders = request.getAllResponseHeaders();
                const status = request.status;
                const responseData = responseType === 'text' ? request.responseText : request.response; 
                const response: AxiosResponse = {
                    data: responseData,
                    status,
                    statusText: request.statusText,
                    config,
                    request,
                    headers: responseHeaders
                }
                if(request.status == 200 ){
                    resolve(response)
                    console.log("res===", request);
                }
            }
        }
    })
}