/**
 * Created by sourabh on 16/8/17.
 */

const UrlConfig = {
  protocol : 'http',
  domain : 'localhost',
  port : 3000,
};

export const ApiResponseCode = {
  OK : 200,
  AUTH_FAIL : 401,
};

export const getPreset = (url) => {
    return {
        baseUrl : `${UrlConfig.protocol}://${UrlConfig.domain}:${UrlConfig.port}${url}`
    }
};

export const ApiConfig = {
  headers : {
      'Content-Type' : 'application/json',
      'Accept' : 'application/json',
   }
};

