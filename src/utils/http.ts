import axios, { AxiosRequestConfig, Canceler } from 'axios';
import { IRequestBuilder } from 'jsmodules/lib/http/interface';
import { di, qs } from 'jsmodules';
import TokenService from '../services/tokenService';
import * as _ from 'lodash';


/**
 * 自动判断平台后,创建请求实例
 */

export function AutoHttpFactory(baseUrl) {
    return di.Resolve('httpFactory', baseUrl, AxiosRequestBuilder);
}

const contentTypes = {
    json: 'application/json',
    form: 'application/x-www-form-urlencoded'
};
export class AxiosRequestBuilder implements IRequestBuilder {

    @di.Inject() tokenService: TokenService

    constructor(public url) { }

    isJson() {
        return this.contentType(contentTypes.json);
    }

    isForm() {
        return this.contentType(contentTypes.form);
    }

    private securityHeaders = false
    addSecurityHeaders(securityHeaders = true) {
        this.securityHeaders = securityHeaders;
        return this;
    }

    private _contentType = contentTypes.json;

    contentType(contentType) {
        this._contentType = contentType;
        return this;
    }

    private _dataType:any = 'json';

    dataType(dataType) {
        this._dataType = dataType;
        return this;
    }

    private __headers: { [name: string]: string } = {
        'Accept-Language': "zh-Hans"
    };

    headers(obj: any): IRequestBuilder {
        this.__headers = {
            ...this.__headers,
            ...obj
        };
        return this;
    }

    private __timeout: number = 0;
    timeout(timeout) {
        this.__timeout = timeout;
        return this;
    }

    private __canceler__: Canceler;

    private async requestAsync(options: AxiosRequestConfig) {
        if (this.securityHeaders) {
            var authHeaders = await this.tokenService.getSecurityHeaders();
            if (!authHeaders) {
                throw new Error("未登录")
            } else {
                this.headers(authHeaders);
            }
        }
        try {
            var headers = this.__headers;
            if (this._contentType) {
                headers['Content-Type'] = this._contentType;
            }
            if (this.__timeout) {
                options.timeout = this.__timeout;
            }
            var response = await axios.request({
                url: this.url,
                responseType: this._dataType,
                cancelToken: new axios.CancelToken((c) => {
                    this.__canceler__ = c;
                }),
                headers,
                ...options
            });
            return response;
        } catch (err) {
            //如果服务器有响应,说明是服务器返回结果
            if (err.response) {
                var res = err.response;
                //axios把304认为是异常
                if (res.status == 304) {
                    return res;
                }
                if(res.status == 404){
                    
                }
                var data = res.data
                if (data) {
                    var message = "";
                    if (_.isString(data.error)) {
                        message = data.error_description || data.error
                    }
                    if (_.isPlainObject(data.error)) {
                        message = data.error.message;
                    }
                    throw {
                        response: res,
                        error: data.error,
                        message
                    }
                }
                else {
                    if (res.status == 403) {
                        res.message = "没有权限进行此操作"
                    }
                    throw res
                }
            }
            throw err;
        }
    }

    private getDataFormat(data) {
        if (this._contentType == contentTypes.form) {
            if (!data) {
                return '';
            }
            var pairs = [];
            for (var key in data) {
                var value = data[key];
                if (_.isArray(value)) {
                    for (var i = 0; i < value.length; ++i) {
                        pairs.push(encodeURIComponent(key + '[' + i + ']') + '=' + encodeURIComponent(value[i]));
                    }
                    continue;
                }
                pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
            }
            return pairs.join('&');
        }
        return data;
    }

    get(query?: any) {
        return this.requestAsync({ method: 'GET', params: query });
    }

    post(data?: any) {
        return this.requestAsync({
            method: 'POST',
            data: this.getDataFormat(data)
        });
    }

    put(data?: any) {
        return this.requestAsync({
            method: 'PUT',
            data: this.getDataFormat(data)
        });
    }

    head(data?: any) {
        return this.requestAsync({
            method: "HEAD",
            data: data
        });
    }

    remove(query?: any) {
        return this.requestAsync({ method: 'DELETE', data: query });
    }


    jsonp(query: any, callbackParam?: any): Promise<any> {
        throw new Error('不支持JSONP操作');
    }

    stop() {
        if (this.__canceler__) {
            this.__canceler__('ajax.abort');
        }
    }
}
