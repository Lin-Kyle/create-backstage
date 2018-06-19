import axios from 'axios';
import qs from 'qs'
import {notification} from 'antd';
import {localCache} from 'JS/localCache';

//自定義彈窗
const OpenNotification = (type, {
        message = '发生错误',
        description = ''
    }) => {
        notification[type]({message, description});
    },
    //環境地址
    baseURL = (() => {
        return {
            development: 'https://dev.api-bi.etc.gplqdb.com', // 开发环境
            test: 'https://test.api-bi.etc.gplqdb.com',
            production: 'https://api-bi.etc.gplqdb.com'
        }[process.env.NODE_ENV]
    })(),
    //請求設置
    Axios = axios.create({
        baseURL,
        timeout: 10000,
        responseType: "json",
        crossDomain: true,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        }
    });

// Add a request interceptor
Axios.interceptors.request.use((config) => {
    // Do something before request is sent
    if (config.method === "post" || config.method === "put" || config.method === "delete") {
        // 序列化
        // params是添加到url的请求字符串中的，用于get请求。
        //data是添加到请求体（body）中的， 用于post请求。
        config.data = qs.stringify(config.data);
    }
    return config;
}, (err) => {
    // Do something with request error
    return Promise.reject(err.data.error.message);
});

Axios.interceptors.response.use((res) => {
    // Do something with response data
    return res;
}, (err) => {
    // Do something with response error
    return Promise.reject(err);
});

export default(settings) => {
    const defaults = {
            method: 'post'
        },
        opts = Object.assign(defaults, settings),
        userData = localCache.getItem('userData', 1);

    opts.url += '?advanced-backend=' + (
        userData
        ? userData['advanced-backend']
        : '');

    // 处理不同请求方式的传参格
    if (opts.method === 'get') {
        opts.data = {
            data: opts.data
        }
    }

    return new Promise((resolve, reject) => {
        Axios[opts.method](opts.url, opts.data).then(res => {
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
