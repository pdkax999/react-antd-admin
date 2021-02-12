import {SAVE_CATEGORY_INFO} from "../action_types";


let initState = []

export default function LoginReducer(preState=initState,action) {

  const {type,data} = action

   let newPreState

  switch (type) {

    case SAVE_CATEGORY_INFO:
     
      newPreState = data
     
      return newPreState

    default:
      
     return preState
  }




}