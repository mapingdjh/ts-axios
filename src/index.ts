import { AxiosReauestConfig, AiosPromise, AxiosResponse } from './types'
import xhr from './xhr';
import { buildRUL } from './helpers/url';
import { transformRequest, transformResponse } from './helpers/data';
import {processHeaders} from './helpers/headers'


function axios(config: AxiosReauestConfig): AiosPromise {
    processConfig(config);
    return xhr(config).then(res => {
        // 请求参数没有设置responseTyp: josn,默认将json字符串转出json对象
        return transformResponseData(res)
    })
}

function processConfig(config: AxiosReauestConfig): void { 
    config.url = transformURL(config);
    config.headers = transformHeaders(config)
    config.data = transformRequestData(config)
}

// 参数拼接到url地址上
function transformURL(config: AxiosReauestConfig): string {
    const { url, params } = config;
    return buildRUL(url,params)
}

// 处理请求参数
function transformRequestData(config: AxiosReauestConfig): any {
    return transformRequest(config.data)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
    res.data = transformResponse(res.data)
    return res;
}

// 处理请求头
function transformHeaders(config: AxiosReauestConfig): any{
    let {headers = {}, data } = config
    return processHeaders(headers, data)
}

export default axios;


/**
 * 1。原生ajax使用
 * 2、node命令形式启动webpack服务
 * 3、express、express路由使用（bodyparser发送post请求）
*/