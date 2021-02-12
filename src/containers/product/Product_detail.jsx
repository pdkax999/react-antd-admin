import React, { Component } from 'react'

import {Button, Card,List,Icon} from "antd";

import { connect } from 'react-redux';

import {reqProductOne,reqCategoryInfo} from "../../api/index";

import { BASE_URL} from "../../config/index";

const {Item} = List

@connect(state=>({
   
   productList:state.productList,
   categoryList:state.categoryList
}),{})

class Product_detail extends Component {
  
    state = {
    name:'',
    desc:'',
    price:'',
    categoryId:'',
    categoryName:'',
    detail:'',
    imgs:[],
    isLoading:true


    }
 
    componentDidMount () {
    
     let {productList} = this.props
     
     let {id} = this.props.match.params
    
       if(productList.length){
         
         let result = productList.find((item)=>{
        
            return item._id === id
         })

         this.categoryId = result.categoryId
         this.getCategoryName(this.categoryId)
         if(result) this.setState({...result,isLoading:false})

       }else{


          this.getProduct()
         
        
       }
    
          
    }
    
    getCategoryName = async (categoryId)=>{
     
      let {categoryList} = this.props
   
      if(categoryList.length){

         let result = categoryList.find((item)=>{
            
            return item._id === this.categoryId
             
         })

         if(result) this.setState({categoryName:result.name})
          
      }else{
        
          let result = await reqCategoryInfo(categoryId)

        
         if(result)  this.setState({categoryName:result.name})
      }
      
    }

    getProduct = async ()=>{

      let {id} = this.props.match.params

      let result = await reqProductOne({productId:id})

      this.getCategoryName(result.categoryId)

      this.setState({...result,isLoading:false})

    }

    
  render() {
     const {name,desc,price,categoryName,detail,imgs} = this.state
    return (
   <Card 
   loading={this.state.isLoading}
   title={     
     <div >
       <Button type='link' style={{fontSize:'18px'}} onClick={()=>{this.props.history.goBack()}}><Icon type="arrow-left" /> 商品详情</Button>
     </div>
   }>
       <List
       
      >
      <Item>
         <span style={{fontSize:'20px',fontWeight:'bold'}}>商品名称：</span>
         <span>{name}</span>
      </Item>
      <Item>
         <span style={{fontSize:'20px',fontWeight:'bold'}}>商品描述：</span>
         <span>{desc}</span>
      </Item>
      <Item>
         <span style={{fontSize:'20px',fontWeight:'bold'}}>商品价格：</span>
         <span>{price}</span>
      </Item>
      <Item>
         <span style={{fontSize:'20px',fontWeight:'bold'}}>商品分类：</span>
         <span>{categoryName}</span>
      </Item>
      <Item>
         <span style={{fontSize:'20px',fontWeight:'bold',}}>商品图片：</span>
        
         <div style={{width:'100px'}}>
         {
                    
                    imgs.map((item,index)=>{
                      
                     return <img src={BASE_URL+/upload/+item} alt="图片" key={index}/>
           
                    })
              }
         </div>
      </Item>
      <Item>
         <span style={{fontSize:'20px',fontWeight:'bold',marginRight:'10px'}}>商品分类详情: </span>
         <span  dangerouslySetInnerHTML= {{__html:detail}}></span>
      </Item>
      </List>
    </Card>        
    )
  }
}

export default  Product_detail
