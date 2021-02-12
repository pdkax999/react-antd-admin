import React, { Component } from 'react'

import { connect } from 'react-redux'

import {Layout} from "antd";

import LeftNav from "../left_nav/left_nav";

import Header from "./header/header";

import {Switch,Redirect,Route} from "react-router-dom";

import Home from '../../components/Home';

import Category from "../category/Category";

import Product from "../product/Product";

import Product_detail from "../product/Product_detail";

import Bar from "../charts/bar/bar";

import Pie from "../charts/pie/Pie";

import Line from "../charts/line/Line";

import User from "../user/User";

import Role from "../role/Role";

import Product_Info from "../../containers/product/Product_Info";


import {createRemoveUserInfo} from "../../redux/action_creators/login_action";

import './css/admin.less'

const {Footer, Sider, Content } = Layout;

@connect(state=>({userInfo:state.userInfo}),
{
  removeUser : createRemoveUserInfo
}
)

 class Admin extends Component {
   
   removeUser = ()=>{
     
     this.props.removeUser()

      this.props.history.replace('/login')
   }

  render() {

     const {isLogin} = this.props.userInfo

    if(!isLogin){

       return <Redirect to='/login'/>
    }     
    
    return (
      
      <Layout style={{width:'100%',height:'100%'}}>
      <Sider>
      <LeftNav></LeftNav>
      </Sider>
      <Layout>
        <Header>Header</Header>
        <Content className='content-admin'>
         <Switch>
            <Route path='/admin/home' component={Home}/>
            <Route path='/admin/prod_about/category' component={Category}/>
            <Route path='/admin/prod_about/product'  component={Product} exact/>
            <Route path='/admin/prod_about/product/detail/:id' component={Product_detail}/>
            <Route path='/admin/prod_about/product/Info' component={Product_Info} exact/>
            <Route path='/admin/prod_about/product/Info/:id' component={Product_Info}/>
            <Route path='/admin/user' component={User}/>
            <Route path='/admin/role' component={Role}/>
            <Route path='/admin/charts/pie' component={Pie}/>
            <Route path='/admin/charts/bar' component={Bar}/>
            <Route path='/admin/charts/Line' component={Line}/>
            <Redirect to='/admin/home'/>         
         </Switch> 
        </Content>
        <Footer style={{textAlign: 'center'}}>推荐使用谷歌浏览器,可以获得更加的页面体验</Footer>
      </Layout>
    </Layout>

    )
  }
}


export default Admin