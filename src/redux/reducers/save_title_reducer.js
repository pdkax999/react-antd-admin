import {SAVE_TITLE} from "../action_types";

let initState = ''

export default function TitleReducer(preState=initState,action) {

  const {type,data} = action

   let newPreState

  switch (type) {

    case SAVE_TITLE:
      
     newPreState =data    
      return newPreState

    default:
      
     return preState
  }




}