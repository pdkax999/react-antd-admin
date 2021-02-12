import {combineReducers} from "redux";

import  loginReducer  from "./login_reducer";

import  saveTitle from "./save_title_reducer";

import  saveProduct from "./product_reducer";

import  saveCategory from "./category_reducer.js";


export default combineReducers({

  userInfo:loginReducer,
  titleInfo:saveTitle,
  productList:saveProduct,
  categoryList:saveCategory

})







