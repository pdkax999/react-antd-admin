
import axios from "axios";

import {message} from "antd";

import store from "../redux/store";

import  qs from "querystring";

import NProgress from "nprogress";

import  "nprogress/nprogress.css";


const  myAxios =  axios.create()

myAxios.interceptors.request.use(function (config) {

  NProgress.start()
  
  let {token}= store.getState().userInfo
 
   
   if(token){

     config.headers.Authorization = `atguigu_${token}`
    
   }

  const {method,data} = config

   if(method.toUpperCase() === 'POST'){

    if(data instanceof Object){
    
      config.data = qs.stringify(config.data)
  
     }

   }
   
  return config;
  
});




myAxios.interceptors.response.use(function (response) {
  
   NProgress.done()
   
  if(response.data.status!==0){

     message.warning(response.data.msg,1)

     return  new Promise(()=>{})
    
  } 
 
  
  return response.data.data;

}, function (error) {

  NProgress.done()
    
  message.error(error.message,1)
  
  return new Promise(()=>{});
});

export default myAxios
