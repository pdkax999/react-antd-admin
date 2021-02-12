import myAxios from "./myAxios.js";

import {BASE_URL} from "../config/index";
import dayjs from "dayjs";
import jsonp from "jsonp";

import {WEATHERKEY,CITY} from "../config";

import {message} from "antd";

export  const reqLogin = (value)=> myAxios.post(`${BASE_URL}/login`,{...value})

export const  reqWeather = ()=>{

  return new Promise((resolve, reject) => {
    
    jsonp(`https://restapi.amap.com/v3/weather/weatherInfo?key=${WEATHERKEY}&city=${CITY}&extensions=base`,(err,data)=>{

      if(err){
  
        message.warning('天气请求失败')
        console.log(err);
        return
      }
      
      resolve(data)
  
    })

})

   

}

//请求分类列表

export const  reqCategoryList = () => myAxios.get(`${BASE_URL}/manage/category/list`)

export const  reqAddCategory = (value) => myAxios.post(`${BASE_URL}/manage/category/add`,{...value})

export const  reqUpdateCategory = (value) => myAxios.post(`${BASE_URL}/manage/category/update`,{...value})

//分页列表
export const  reqProductList = (value) => myAxios.get(`${BASE_URL}/manage/product/list`,{

   params:value

})

export const  reqUpdateProduct = (value) => myAxios.post(`${BASE_URL}/manage/product/updateStatus`,{...value})


export const  reqSearchProduct = ({pageNum,pageSize,keyWord,data}) => {
 
  
   
  return myAxios.get(`${BASE_URL}/manage/product/search`,{
    params:{
    pageNum,
    pageSize,
    [keyWord]:data
    }
  
  })
}


export const  reqProductOne = (value) => myAxios.get(`${BASE_URL}/manage/product/info`,{

  params:value

})
export const reqCategoryInfo = (value) => myAxios.get(`${BASE_URL}/manage/category/info`, {

  params:{
    categoryId:value
  }

})

export const  reqDeletePicture = (value) => myAxios.post(`${BASE_URL}/manage/img/delete`,{...value})

export const  reqAddProduct = (value) => myAxios.post(`${BASE_URL}/manage/product/add`,{...value})

export const  reqUpdateProductDetail = (value) => myAxios.post(`${BASE_URL}/manage/product/update`,{...value})

export const  reqAddRole = (value) => myAxios.post(`${BASE_URL}/manage/role/add`,{...value})

export const  reqUpdateRoleAuth = (value) => myAxios.post(`${BASE_URL}/manage/role/update`,{...value,auth_time:dayjs(Date.now()).format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A')})

export const  reqRoleList = () => myAxios.get(`${BASE_URL}/manage/role/list`)

export const  reqUserList = () => myAxios.get(`${BASE_URL}/manage/user/list`)

export const  reqAddUser = (value) => myAxios.post(`${BASE_URL}/manage/user/add`,{...value})