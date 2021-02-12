import React, { Component } from 'react'

import {Button, Card,Icon,Table,Modal,Form,Input,message} from "antd";

import {reqCategoryList,reqAddCategory,reqUpdateCategory} from "../../api/index";

import {PAGESIZE} from "../../config/index";

import {createSaveCategoryListAction} from "../../redux/action_creators/category_action";
 
import { connect } from 'react-redux';

const {Item} = Form

@connect(state=>({}),{

  categoryList:createSaveCategoryListAction

})

@Form.create()

 class Category extends Component {

  state ={
    categoryList:[],
    visible: false,
    openType:'',
    categoryName:'',  //分类名
    categoryId:''
  
  }

  componentDidMount(){
    this.getCategoryList()
  }

  getAddCategory = ()=>{

    this.props.form.validateFields(async(error,values)=>{

      if(error){  

       message.error('表单输入有误',1)

       return 

      }else{
      
         if(this.state.openType ==='add'){
          let result = await reqAddCategory(values)
      
          let  categoryList = [...this.state.categoryList]
    
          categoryList.unshift(result)
          
          message.success('添加成功',1)
            this.setState({
              visible: false,
              categoryList
            }); 
            this.props.form.resetFields() 
                       
          }else{

           const {categoryId} = this.state

            let result = await reqUpdateCategory({categoryId,...values})
            message.success('修改成功',1)
            this.getCategoryList()
            console.log(1);
            this.setState({visible:false})
            this.props.form.resetFields() 
          }  
         
         }
     
     })
  }

  getCategoryList = async()=>{
    
    let result = await reqCategoryList()

    this.setState({
      categoryList:result.reverse()
    })

     this.props.categoryList(result)
   

  }


   showModalAdd = ()=>{
     this.setState({
      visible: true,
      openType:'add'
    });
   }

   showModalUpdate =(item)=>{
    this.setState({
          visible: true,
          categoryName:item.name,
          categoryId:item._id,
          openType:'update'
        });
   }



  hideModal = () => {
    this.props.form.resetFields()
    this.setState({
      visible: false,
    }); 
  };
  render() {
    const {getFieldDecorator } = this.props.form; 

    const dataSource = this.state.categoryList
    
    const columns = [
      {
        title: '分类列表',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        key: 'opera',
        width: '25%',
        align: 'center',
        render:(item)=>{ return <Button type='link' onClick={()=>{
          this.showModalUpdate(item)}
        }>修改分类</Button> }
      },
      
    ];
    return (
      <Card extra={<Button type='primary' onClick={this.showModalAdd}>
        <Icon type="plus" />
         添加</Button>}>
         <Modal
          title={this.state.openType === 'add' ? '添加分类':'修改分类'}
          visible={this.state.visible}
          onOk={this.getAddCategory}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
        >
           <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {getFieldDecorator('categoryName', {
                rules: [{ required: true, message: '用户名必须输入' }                     
                       ],
                       initialValue: this.state.categoryName||''
              })(
                <Input
                />,
              )}
            </Item>           
          </Form>
        </Modal>
      
         <Table dataSource={dataSource} columns={columns} 
          pagination={{pageSize:PAGESIZE,showQuickJumper:true}}
          bordered
          rowKey='_id'
           />
       
      </Card>
    )
  }
}

export default Category