import React, { Component } from 'react'

import {Button, Card,Icon,Form,Input,Select,message} from "antd";

import  PicturesWall  from "./Upolad_picture";

import  EditorConvertToHTML  from "./rich_txt_editor";  

import {reqCategoryList,reqAddProduct, reqProductOne,reqUpdateProductDetail} from "../../api";
import { connect } from 'react-redux';



const {Item} = Form

const {Option} = Select


@connect(state=>({productList:state.productList}),{})

@Form.create()

 class Product_Info extends Component {

   state = {
    desc:'',
    price:'',
    detail:'',
    categoryId:'',
    imgs:[],
    title:'商品添加',
    categoryList:[]
   }
  
  componentDidMount(){

    this.operaType()
    this.getCategoryList()

     
  }

  operaType = async()=>{
    let {id} = this.props.match.params
    const {productList} = this.props
    let result 
    if(id){
     
     if(productList.length){

       result = productList.find((item)=>{
        
        return item._id === id
    })

     }else{
      
       result =  await reqProductOne({productId:id})
       
     }
     
     this.editor.setHtmltext(result.detail)
     this.refs.pricture.setimgArr(result.imgs)
     this.setState({
      title:'商品修改',
      ...result
    })
      

    }


  }

  getCategoryList = async()=>{
    
    let result = await reqCategoryList()

    this.setState({categoryList:result})
   
    


  }

  handleSubmit = (event)=>{
     
    event.preventDefault()

    let {id} = this.props.match.params

    const   {title} = this.state
    const {replace} =this.props.history
   
    let imgs = this.refs.pricture.getimgList()
    let detail = this.editor.getEditorText()
 
    let result = null
    this.props.form.validateFields(async(error,values)=>{

      if(error){

       message.error('表单输入有误',1)

       return 

      }else{
       
         if(title ==='商品添加'){

           
            result = await reqAddProduct({...values,imgs,detail})
          
          
         }else{

            result  = await reqUpdateProductDetail({...values,imgs,detail,_id:id})

           
         }

         message.success('操作商品成功',1)
         replace('/admin/prod_about/product')
      }  
    
  })

  }


  render() {
 
    const { getFieldDecorator } = this.props.form; 
    const  {categoryList} = this.state
    return (
      <Card title={
        <div >
          <Button type='link' style={{fontSize:'18px'}} onClick={()=>{this.props.history.goBack()}}><Icon type="arrow-left" /> 返回</Button>
          <span>{this.state.title}</span>
        </div>
      }>
            <Form onSubmit={this.handleSubmit} >
            <Item label="商品名称"  labelCol={{md:2}}
           wrapperCol={{md:8}}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '必须输入' }                     
                       ],
                initialValue:this.state.name || ''
              })(
                <Input
                  placeholder="商品名称"
                />,
              )}
            </Item>
            <Item label="商品描述" labelCol={{md:2}}
           wrapperCol={{md:8}}>
              {getFieldDecorator('desc', {
                rules: [{ required: true, message: '必须输入' }],
                initialValue:this.state.desc || ''
              })(
                <Input
                  placeholder="商品描述"
                />,
              )}
            </Item>
            <Item label="商品价格" labelCol={{md:2}}
           wrapperCol={{md:8}}>
              {getFieldDecorator('price', {
                rules: [{ required: true, message: '必须输入' }],
                initialValue:this.state.price || ''
              })(
                <Input
                  placeholder="商品价格"
                />,
              )}
            </Item>
            <Item label="商品分类" labelCol={{md:2}}
             wrapperCol={{md:8}}>
              {getFieldDecorator('categoryId', {
                rules: [{ required: true, message: '必须输入' }],
                initialValue: this.state.categoryId || '请选择商品分类'
              })(
            <Select>
             {categoryList.map((item)=>{
               
                return <Option key={item._id}>{item.name}</Option>
             })}
            </Select>
              )}
            </Item>
            <Item label='商品图片'  labelCol={{md:2}}
             wrapperCol={{md:8}}>
             <PicturesWall ref='pricture'/>
            </Item>
            <Item label='商品详情'  labelCol={{md:2}}
             wrapperCol={{md:20}}>

               <EditorConvertToHTML ref={(editor)=>{this.editor=editor}}/>
               
                          </Item>
            <Item>
              
              <Button type="primary" htmlType="submit" className="login-form-button">
                提交
              </Button>

            </Item>
          </Form>
         
       </Card>       
    )
  }
}

export default Product_Info