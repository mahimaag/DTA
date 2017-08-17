import fetch from "isomorphic-fetch"
import { getPreset,ApiResponseCode,ApiConfig } from "../network/constants"

const defaultMethod = 'get';

const fetchHttpRequest = ( option, headers = {}, payload = {} ) => {
    let token;
    const tokenString = document.cookie.split(',').find( (cookie) => cookie.includes('Tsms') );
    if(tokenString) {
        token = tokenString.split("=")[1];
    }
    const { data } = payload;
    const _data = { authToken: token, ...data };
    return {
             method: option || defaultMethod,
             headers: headers || ApiConfig.headers,
             data: JSON.stringify(_data)
    }
};

export function decoratedFetch (url, customOption, customHeaders, customPayload) {
    const { method, headers, data } = fetchHttpRequest(customOption, customHeaders, customPayload);
    return fetch( getPreset(url) , {
        method,
        headers,
        data,
    });
}