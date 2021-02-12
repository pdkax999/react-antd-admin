import {SAVE_USER_INFO,REMOVE_USER_INFO} from "../action_types";


export const createSaveUserInfoAction = (value) => {
     
  const {user,token} = value
  
  localStorage.setItem('user',JSON.stringify(user))
  
  localStorage.setItem('token',token)

  return {type:SAVE_USER_INFO,data:value}
}

export const createRemoveUserInfo = ()=>{
   
  localStorage.removeItem('user')
  
  localStorage.removeItem('token')

  return {type:REMOVE_USER_INFO}
}