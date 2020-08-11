import qs from 'qs'
import axios from 'axios'

// GET（SELECT）：从服务器取出资源（一项或多项）。
// POST（CREATE）：在服务器新建一个资源。
// PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
// PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
// DELETE（DELETE）：从服务器删除资源。 
const defaultOptions = {
    method: 'get', // method:  get post delete put patch
    withCredentials: true, // 设置该属性可以把 cookie 信息传到后台 
    headers: {
        // headers 的键是不区分大小写的
        Accept: 'application/json',
        //'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Content-Type': 'application/json; charset=utf-8'
    },
    data: null
}
const axiosInstance = axios.create({
    timeout: 15000, // 请求超时时间
})


function callApi({
    url,
    data = {},
    options = {},
    prefix = 'api/',
}) {
    if (!url) {
        const error = new Error('请传入 url')
        return Promise.reject(error)
    }

    let fullUrl = ''
    if (url.indexOf('http') === 0) {
        fullUrl = url // 如果是绝对路径，则直接发请求
    } else {
        url.replace(/^\//, '')
        fullUrl = `${prefix}${url}`
    }

    const newOptions = { ...defaultOptions, ...options }
    const { method } = newOptions
    if (['get', 'head'].indexOf(method) === -1) {
        newOptions.data = data
        if (data instanceof FormData) {
            (newOptions.headers as any) = {
                'x-requested-with': 'XMLHttpRequest',
                'cache-control': 'no-cache',
            }
        } else if (newOptions.headers['Content-Type'].indexOf('x-www-form-urlencoded') !== -1) {
            newOptions.data = qs.stringify(data || {})
        }
        // else if (newOptions.headers['Content-Type'].indexOf('application/json') !== -1) {
        //     newOptions.data = JSON.stringify(data);
        // }
    }


    return (axiosInstance as any)({
        url: fullUrl,
        ...newOptions,
    })
}
const restful = {
    get(url, params, options) {
        return callApi({
            url, options: { params, method: 'get', ...options },
        })
    },

    post(url, data, options) {
        return callApi({ url, data, options: { method: 'post', ...options } })
    },
    put(url, data, options) {
        return callApi({ url, data, options: { method: 'put', ...options } })
    },
    delete(url, data, options) {
        return callApi({ url, data, options: { method: 'delete', ...options } })
    },
    patch(url, data, options) {
        return callApi({ url, data, options: { method: 'patch', ...options } })
    },
}

export {
    axiosInstance,
    restful
} 
