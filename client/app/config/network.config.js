import fetch from "isomorphic-fetch"
import { getPreset,ApiConfig } from "../network/constants"
import _ from "lodash"

const defaultMethod = 'post';
const defaultOption = { method: defaultMethod, headers: ApiConfig.headers };
const AUTHORIZE_URL = "http://newers-world-oauth.qa2.tothenew.net/oauth/authorize?client_id=e6d6a83e-6c7a-11e7-9394-406186be844b";
const TokenNotExistError = {
    message: '',
    code: 'TOKEN_NOT_EXIST'
};

/**
 * it takes only one parameter options which is nothing but an object containing info related to :-
 * method,headers,data
 * this function also extracts token from the cookie and adds it in headers object
 * @param options
 * @returns {{method: string, headers: (ApiConfig.headers|{Content-Type, Accept})}}
 */
const fetchHttpRequest = (options = defaultOption) => {
    //_.merge(defaultOption,options);
    let token;
    const tokenString = document.cookie.split(';').find( (cookie) => cookie.includes('Tsms') );
    if(!tokenString){
        throw new Error(TokenNotExistError);
    }
    if(tokenString) {
        token = tokenString.split("=")[1];
    }
    if(!options.headers){
        options.headers = {};
    }
    options.headers.authToken = token;

    if(options.data){
        options.data = JSON.stringify(options.data);
    }
    return options;
};


/**
 *it takes 2 parameters
 * one is the url which user want to hit
 * another one is customOptions which is nothing but an object containing following keys:-
 * method,headers,data
 * it also handles the case for TokenNotExistError in this case employee is redirected to the login page
 * it also makes fetch request and returns the response
 * @param url
 * @param customOptions
 */

export  function decoratedFetch (url, customOptions) {

    let apiConfig = null;
    try{
        apiConfig = fetchHttpRequest(customOptions);
    }catch(e){
        if(e && e.code == TokenNotExistError.code){
            fetch(AUTHORIZE_URL)
        }else{
            // todo: log error...
        }
    }
        return fetch(url,apiConfig);

}


