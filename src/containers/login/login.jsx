import React, { Component } from 'react'

import {Form,Input,Icon,Button,message} from "antd";

import { connect } from 'react-redux'

import {createSaveUserInfoAction} from "../../redux/action_creators/login_action";

import {reqLogin} from "../../api";

import './css/login.less'

import logo from "./img/logo.png";

const {Item} = Form


@connect(

  state=>({userInfo:state.userInfo}),
  {
    saveUserInfo:createSaveUserInfoAction
  }
)


@Form.create()

 class Login extends Component {


  componentDidMount(){

    if(this.props.userInfo.isLogin){

      this.props.history.replace('/admin/home')

    }


  }


   handleSubmit = (event)=>{

      event.preventDefault()

     this.props.form.validateFields(async(error,values)=>{

         if(error){

          message.error('表单输入有误',1)

          return 

         }else{
          
          const  {user,token} = await  reqLogin(values)
       
          this.props.saveUserInfo({user,token})
          
          this.props.history.replace('/admin/home')
          
         }  
       
     })


      
   }

   defaultRules = (rule, value, callback)=>{
    
     if (value ==='') {

       callback('输入不能为空')
        
     } else if(value.length<4){
      callback('密码必须大于等于4位')

     } else if(!(/^\w+$/).test(value)){

      callback('密码必须是英文、数字或下划线组成')

     }else if(value.length>12){

      callback('密码必须小于等于12位')

    }else{

       callback()
    }

    
  }
  
  render() {


    const { getFieldDecorator } = this.props.form; 

    return (
      <div className='login'>
       <header>
          <img src={logo} alt="logo"/>
          <h1>商品管理系统</h1>
       </header>
       <div className='content'>       
          <div className="from">
          <h1>用户登录</h1>
              <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '用户名必须输入' },                     
                       {min:4,message: '密码必须大于等于4位'},
                       {max:12,message: '密码必须小于等于12位'} ,
                       {pattern:/^\w+$/,message: '密码必须是英文、数字或下划线组成'}],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                />,
              )}
            </Item>
            <Item>
              {getFieldDecorator('password', {
                rules: [{ validator:this.defaultRules}],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />,
              )}
            </Item>
            <Item>
              
              <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100%'}}>
                登录
              </Button>

            </Item>
          </Form>
          </div>

       </div>
      </div>
    )
  }
  
}



export default Login
