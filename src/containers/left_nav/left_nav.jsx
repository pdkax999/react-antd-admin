import React, { Component } from 'react'

import {Icon,Menu} from "antd";

import {Link, withRouter} from "react-router-dom";

import { connect } from 'react-redux';

import menuList from "../../config/menu_config";

import {createSaveTitleAction} from "../../redux/action_creators/save_title_action";

import  "./left_nav.less";

import logo from "../../static/logo.png";


const {SubMenu,Item} = Menu;

@connect(state=>({username:state.userInfo.user.username,
menuList:state.userInfo.user.role.menus}),
{
  saveTilte:createSaveTitleAction
})

@withRouter

 class LeftNav extends Component {


  isPass = (value)=>{

    let {username,menuList} = this.props
    console.log(menuList);
    
    if(username === 'admin'){
      return true
    }else if(!value.children){
          
     return  menuList.indexOf(value.key) !== -1 
    }else{

       return menuList.some((item)=>item ===value.key)
    }
  }

  getMenuList =(target)=>{
    
    return target.map((item)=>{
      
     if(this.isPass(item)){

      if(!item.children){

        return   <Item key={item.key} onClick={()=>{this.props.saveTilte(item.title)}}>
                   <Link to={item.path}>
                 <Icon type={item.icon}/>
                 <span>{item.title}</span>
                 </Link>
                 </Item>
 
        }else{
         
          return  <SubMenu
               key={item.key}
               title={
                <span>
                    <Icon type={item.icon} />
                   <span>{item.title}</span>
                </span>              
               }
             >
               {this.getMenuList(item.children)}          
          </SubMenu>
       }

     }
    })

  }

 

  render() {   
    let {pathname} = this.props.location
     
    
    
    return (
      <div className='left-nav'>
        <header>
          <img src={logo} alt="logo"/>
          <h3>商品管理系统</h3>
        </header>
         <Menu
          defaultSelectedKeys={pathname.indexOf('product') !== -1 ? 'product' : pathname.split('/').reverse()[0]}
          defaultOpenKeys={pathname.split('/').reverse()}
          mode="inline"
          theme="dark"
        >
          {this.getMenuList(menuList)}
          
        </Menu>
      </div>
     
    )
  }
}

export default LeftNav