import axios from 'axios';
import {Config} from './config';

export class Base {
  constructor() {
    axios.defaults.baseURL = Config.restUrl;
    axios.defaults.headers.common['Authorization'] = "token_code";
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    // 添加响应拦截器
    axios.interceptors.response.use(function (response) {
      // 对响应数据做点什么
      console.log('对响应数据做点什么')
      return response;
    }, function (error) {
      // 对响应错误做点什么
      console.log('对响应错误做点什么')
      console.log(error)
      return Promise.reject(error);
    });
  }

  request(params) {
    let method = params.method ? params.method : 'get';
    axios({
      method: method,
      url: params.url,
      data: params.data,
      timeout: 5000
    }).then(function (response) {
      params.sCallback && params.sCallback(response);
      console.log(response.data);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);
    }).catch(function (error) {
      if (error.response) {
        // 请求已发出，但服务器响应的状态码不在 2xx 范围内
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
  }

}
