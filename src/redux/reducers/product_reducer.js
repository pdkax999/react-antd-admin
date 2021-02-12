import {SAVE_PRODUT} from "../action_types";

let initState = []

export default function ProductReducer(preState=initState,action) {

  const {type,data} = action

   let newPreState

  switch (type) {

    case SAVE_PRODUT:
      
      newPreState =data

      return newPreState

    default:
      
     return preState

  }




}