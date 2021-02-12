import {SAVE_PRODUT} from "../action_types";


export const createSaveProductAction = (value)=>{
    
  return {type:SAVE_PRODUT,data:value}
}