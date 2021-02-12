import React, { Component } from 'react'

import { Button,Icon,Modal} from "antd";

import {connect} from "react-redux";

import {withRouter} from "react-router-dom";

import menuList from "../../../config/menu_config";

import dayjs from "dayjs";

import screenfull from "screenfull";

import {reqWeather} from "../../../api";

import {createRemoveUserInfo} from "../../../redux/action_creators/login_action";

import  "./header.less";

const {confirm } = Modal;


@connect(state=>({userInfo:state.userInfo,titleInfo:state.titleInfo}),
{
  removeUser:createRemoveUserInfo
}

)

@withRouter

 class Header extends Component {  

  state = {
    isFull:false,
    weather:false,
    time:dayjs(Date.now()).format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A') 

  }

  componentDidMount(){
    
    this.WeatherTxt()     
   this.clearTime = setInterval(() => {
       
      this.setState({
       time:dayjs(Date.now()).format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A')
      })

    }, 1000);

    screenfull.on('change', () => {
      
      const isScreen=!this.state.isFull

      this.setState({isFull:isScreen})

    });
  }

  componentWillUnmount(){

    clearInterval(this.clearTime)

  }

  switchScreen = ()=>{
               
     screenfull.toggle()   
   
  }

  logOut =()=>{
   
    const {removeUser} =  this.props
   
    confirm({
      title: '您确定要退出登录',
      onOk:()=> {        
        removeUser()      
       
      },
      okText:"确认",
      cancelText:"取消"
    });


  }


  
   WeatherTxt = async()=>{
     
    let result = await reqWeather()

    if(result.lives.length){

      this.setState({
        weather:result.lives[0]
      })

    }
     

   }
  
   getTitle = ()=>{

    let {pathname} = this.props.location
   
    pathname = pathname.indexOf('product') !== -1 ? 'product' :  pathname 
      
    const keyWord = pathname.split('/').reverse()[0] 
           
    let result 
    
     menuList.forEach(item=>{      
       
      if(item.children instanceof Array){            
        
        let TS = item.children.find((item2)=>{           
           return item2.key === keyWord             
         }) 
        
          if(TS) result = TS.title
       }else{
         
          if(keyWord === item.key)  result = item.title
           
       }
        
     }) 
    return result
   }
  render() {

   

    return (
     
     <header>

       <div className="top-content">
          <Button size='small' onClick={this.switchScreen}>
          <Icon type={this.state.isFull === false ? 'fullscreen' : 'fullscreen-exit'} />
          </Button>
          <span className='userName'>欢迎,{this.props.userInfo.user.username}</span>
          <Button type='link' onClick={this.logOut}>退出</Button>
       </div>
       
       <div className="bottom-content">
        <div className="title">
         {this.props.titleInfo || this.getTitle()}
          </div>
        <div className='right-left'>
          <span>{dayjs().format('YYYY年 MM月DD日 HH:mm:ss')}</span>
          <span className='city'>{this.state.weather.city}</span>
          <span>{this.state.weather.weather}</span>
        </div>
       </div>
     </header>
    )
  }
}

export default Header