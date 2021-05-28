import axios from 'axios';

//import router from './router'

let loading        //定义loading变量

function startLoading() {    //使用Element loading-start 方法
  
    loading = Toast.loading({
        duration: 0, // 持续展示 toast
        message: '加载中...',
        forbidClick: true,
       });
}
function endLoading() {    //使用Element loading-close 方法
     loading.close()
}

// 请求拦截  设置统一header
// axios.interceptors.request.use(config => {
//     // 加载
//     // startLoading()
//     // if (localStorage.Token)
//     //     config.headers.token = localStorage.Token
//     //     return  config
//     // 测试
   
// }, error => {
//     return Promise.reject(error)
// })

// 响应拦截  401 token过期处理
// axios.interceptors.response.use(response => {
// //    endLoading()
//     return response
// }, error => {

// console.log(error)

// console.log("这里是统一返回的错误")
//      console.log(error)

//     return Promise.reject(error)
// })

export default axios