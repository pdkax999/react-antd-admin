import {SAVE_CATEGORY_INFO} from "../action_types";


export const createSaveCategoryListAction = (value)=>{
    
  return {type:SAVE_CATEGORY_INFO,data:value}
}