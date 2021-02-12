import React, { Component } from 'react'

import {Button, Card,Icon,Table,Input,message,Select} from "antd"


import {reqProductList,reqUpdateProduct,reqSearchProduct} from "../../api/index";

import {PAGESIZE} from "../../config/index";

import {createSaveProductAction} from "../../redux/action_creators/save_product_action";

import { connect } from 'react-redux';

const {Option} = Select

@connect(state=>({}),{
   
   productList:createSaveProductAction
   
})


class Product extends Component {
 
   state={
     productList:[],
     total:'',
     pageNum:1,
     keyWord:'productName',
     data:'',
     isLoading:true

   }

  componentDidMount(){

    this.getProduct()

   
  }

  getProduct = async (pageNum=1,pageSize=PAGESIZE)=>{
      
    let result
     
     if(this.isSearch){
       
      const {keyWord,data} = this.state

     

       result = await reqSearchProduct({pageNum,pageSize,keyWord,data})

    
     
     }else{

       result =await reqProductList({pageNum,pageSize})
    
     
     }

     this.setState({productList:result.list,total:result.total,pageNum:result.pageNum,isLoading:false})
     
     this.props.productList(result.list)

  }

  changeProductStatus = async (status,_Id)=>{

    const {pageNum} = this.state
      
      
     if(status===1){

       status=2

     }else{

       status=1
     }

    
    
     let result = await reqUpdateProduct({status,productId:_Id})
     
     this.getProduct(pageNum)
     
     message.success('操作商品成功',1)

  }
    
   
   getSearchList = (event)=>{
    
    this.isSearch = true   
    this.getProduct()
   }

   getparams = (event)=>{
     
     this.setState({data:event.target.value})
     
   }
   getKeyWord = (event)=>{

   
     this.setState({keyWord:event})
     
   }

  render() {
   
    const dataSource = this.state.productList
    
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        width:'18%'
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: '状态',
        key: 'status',
        width:'10%',
        align: 'center',
        render: ({status,_id})=>{      
          return <div>
            <Button type={status=== 1 ? 'danger':'primary'} onClick={()=>{this.changeProductStatus(status,_id)}}>{status===1 ? '下架':'上架'}</Button>
            <span>{status===1 ? '在售':'以下架'}</span>
          </div>

        }
      },
      {
        title: '操作',
        key: 'opera',
        align: 'center',
        render: ({_id})=>{
        
          return <div>
            
            <Button type='link' onClick={()=>{this.props.history.push(`/admin/prod_about/product/detail/${_id}`)}}>详情</Button>
            <Button type='link' onClick={()=>{this.props.history.push(`/admin/prod_about/product/Info/${_id}`)}}>修改</Button>

          </div>

        }
      },      
    ];

    return (
      <Card title={<div>
        <Select defaultValue="productName" onChange={this.getKeyWord}>
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input style={{width:'20%',margin:'0 20px'}} placeholder="请输入关键词" onChange={this.getparams}/>
        <Button onClick={this.getSearchList}><Icon type="search" />搜索</Button>
          </div>} extra={<Button type='primary'  onClick={()=>{this.props.history.push('/admin/prod_about/product/Info')}}>
          <Icon type="plus" />
          添加商品</Button>}>
          <Table rowKey='_id' dataSource={dataSource} columns={columns} bordered  loading={this.state.isLoading}
          pagination={{pageSize:PAGESIZE,showQuickJumper:true,total:this.state.total,current:this.state.pageNum,
            onChange:(pageNum)=>{      
              
              this.getProduct(pageNum)
            
            }
          }}/>     
    </Card>
    )
  }


}

export default  Product