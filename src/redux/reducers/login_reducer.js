import {SAVE_USER_INFO,REMOVE_USER_INFO} from "../action_types";

const user = JSON.parse(localStorage.getItem('user'))

const token = localStorage.getItem('token')

let initState = {
  user: user|| '',
  token: token ||'',
  isLogin : !!(user&&token)
}

export default function LoginReducer(preState=initState,action) {

  const {type,data} = action

   let newPreState

  switch (type) {

    case SAVE_USER_INFO:
     
     const {token,user} = data

      newPreState = {token,user,isLogin:true}
     
      return newPreState

     
    case REMOVE_USER_INFO:

      newPreState = {token:'',user:'',isLogin:false}
     
      return newPreState

   

    default:
      
     return preState
  }




}