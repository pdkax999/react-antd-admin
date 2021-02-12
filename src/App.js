import React,{Component} from 'react'

import Admin from "./containers/admin/Admin";

import Login from "./containers/login/login";

import {Route,Switch,Redirect} from 'react-router-dom'



export default class App extends Component{
  render(){
    return (
      <div className="app" style={{width:'100%',height:'100%'}}>
        <Switch>
          <Route path='/admin' component={Admin}/>
          <Route path='/login' component={Login}/>
          <Redirect  to='/login'/>
        </Switch>
      </div>
    )
  }
}