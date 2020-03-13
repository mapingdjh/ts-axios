export type Method = 'get' | 'GET'  
                     | 'delete' | 'DELETE' 
                     | 'head' | 'HEAD' 
                     | 'post' | 'POST' 
                     | 'options' | 'OPTIONS' 
                     | 'put' | 'PUT' 
                     | 'patch' | 'PATCH';

export interface AxiosReauestConfig {
    url: string,
    method?: Method,
    data?: any,
    params?: any,
    headers?: any,
    responseType?: XMLHttpRequestResponseType
}

// ajax请求返回数据
export interface AxiosResponse {
    data: any,
    status: number,
    statusText: string,
    config: AxiosReauestConfig,
    request: any,
    headers: any

} 

export interface AiosPromise extends Promise<AxiosResponse> {

}
