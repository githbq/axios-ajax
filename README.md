# axios-ajax

## 功能介绍
1. 针对axios使用二次封装，更友好的发请求 
2. 对外输出 axiosInstance 与 restful 对象, axios 为新实例对象  

## 安装
```
npm install axios-ajax
```

## 测试   
```js
import {axiosInstance,restful} from 'axios-ajax' 
// 第一个参数为url,第二个参数为原生axios options
// 如果url以http开头则直接发送请求否则自动追回前缀 'api/'
const response = await restful.get('http://www.com/getUser',{a:1,b:2}) // 发送 http://www.com/getUser 请求

const response = await restful.post('getUser',{a:1,b:2}) // 发送 api/getUser?a=1&b=2 请求

const response = await restful.put('http://www.com/api',{a:1,b:2})
const response = await restful.delete('http://www.com/api',{a:1,b:2})
const response = await restful.patch('http://www.com/api',{a:1,b:2})

// axiosInstance 为axios实例对象，
// 你可以使用 axiosInstance.interceptors.request.use 或者 axiosInstance.interceptors.response.use 

```
## restful 动词介绍
 ```
// GET（SELECT）：从服务器取出资源（一项或多项）。
// POST（CREATE）：在服务器新建一个资源。
// PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
// PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
// DELETE（DELETE）：从服务器删除资源。
 ```

相关 restful api 介绍链接:<http://www.ruanyifeng.com/blog/2014/05/restful_api.html>