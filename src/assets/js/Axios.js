import axios from 'axios';
import qs from 'qs'
import {notification} from 'antd';

const baseURL = (() => {
        return {
            development: 'https://dev.api-bi.etc.gplqdb.com', // 开发环境
            test: 'https://test.api-bi.etc.gplqdb.com',
            production: 'https://api-bi.etc.gplqdb.com'
        }[process.env.NODE_ENV]
    })(),

    Axios = axios.create({
        baseURL,
        timeout: 10000,
        responseType: "json",
        crossDomain: true,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        }
    }),
    OpenNotification = (type, {
        message = '发生错误',
        description = ''
    }) => {
        notification[type]({message, description});
    };

// Add a request interceptor
Axios.interceptors.request.use((config) => {
    // Do something before request is sent
    if (config.method === "post" || config.method === "put" || config.method === "delete") {
        // 序列化
        config.data = qs.stringify(config.data);
    }
    return config;
}, (err) => {
    // Do something with request error
    return Promise.reject(err.data.error.message);
});

Axios.interceptors.response.use((res) => {
    // Do something with response data
    return res.data;
}, (err) => {
    // Do something with response error
    return Promise.reject(err);
});

export default(opts) => {
    const defaults = {
        method: 'get'
    };
    opts = Object.assign(defaults, opts);


    opts.url+= '?advanced-backend=' + '';
    // 处理不同请求方式的传参格式
    if (method === 'get') {
        opts.params = {
            params:opts.params
        }
    }


    const {url, method, params} = opts;
    return new Promise((resolve, reject) => {
        Axios[method](url, params).then(res => {
            // 后端code 不为 0 抛出提示
            res.data.error_code && OpenNotification('warning', {
                message: '发生错误',
                description: res.data.message
            })
            resolve(res.data)
        }).catch(err => {
            OpenNotification('error', {
                description: err.message,
                message: '接口异常'
            })
            reject(err)
        });
    })
}
