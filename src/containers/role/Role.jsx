import React,{Component} from 'react'
import {Card,Button,Icon,Table, message,Modal,Form,Input,Tree, Result } from 'antd';
import dayjs from 'dayjs'
import {reqRoleList,reqAddRole,reqUpdateRoleAuth} from "../../api";
import menuList from '../../config/menu_config'
import {connect} from 'react-redux'
const {Item} = Form
const {TreeNode} = Tree;



@connect(state=>({username:state.userInfo.user.username}),{})

@Form.create()

class Role extends Component{

  state = {
    isShowAdd:false,
    isShowTree:false,
    roleList:[],
    // expandedKeys: [],
    checkedKeys: [],
    _id:'',
   
  }
  componentDidMount (){

    this.getRoleList()

  }

  getRoleList = async()=>{
   
    let result = await reqRoleList()
    
    this.setState({roleList:result.reverse()})
    
  }

  showAdd = ()=>{
    this.props.form.resetFields() 
    this.setState({isShowAdd:true})
  }

  handleOk = ()=>{
    this.props.form.validateFields(async(error,values)=>{

      if(error){

       message.error('表单输入有误',1)

       return 

      }else{
        let roleList = [...this.state.roleList]
      // console.log(values);
       let result = await reqAddRole(values)
        
        roleList.unshift(result)
       this.setState({roleList})
       message.success('添加角色成功',1)
       
      }  
    
  })  

    this.setState({isShowAdd:false})
  }
  handleCancel = ()=>{
    this.setState({isShowAdd:false})
  }
  
  showAuth = (_id)=>{
    let roleList = [...this.state.roleList]
    
    let result = roleList.find((item)=>{
      
      return item._id === _id
    })
   

    this.setState({isShowTree:true,_id,checkedKeys:result.menus})
  }

  showAuthOk = async()=>{
    let {username} = this.props
    let {checkedKeys,_id} = this.state
    let roleList = [...this.state.roleList]

    let result = await reqUpdateRoleAuth({auth_name:username,menus:checkedKeys,_id})
    
   roleList = roleList.map((item)=>{
        
         if(item._id === _id){

            item = result
         }
      
       return  item
     })
    
     
    this.setState({isShowTree:false,roleList})
  }
  showAuthCancel = ()=>{
    this.setState({isShowTree:false})
  }


  onCheck = checkedKeys => {
    this.setState({ checkedKeys });
  };

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} />;
    });

  render(){
    const dataSource = this.state.roleList
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
        render:(time)=> dayjs(time).format('YYYY年 MM月DD日 HH:mm:ss')
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        key: 'auth_time',
        render:(time)=> time ? dayjs(time).format('YYYY年 MM月DD日 HH:mm:ss') : ''
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
        key: 'auth_name',
      },
      {
        title: '操作',
        key: 'option',
        render: (item) => <Button type='link' onClick={()=>{this.showAuth(item._id)}}>设置权限</Button>
      }
    ];
   
    const {getFieldDecorator} = this.props.form
    return (
      <div>
        <Card
          title={<Button type='primary' onClick={()=>{this.showAdd()}}>
                  <Icon type="plus"/>
                  新增角色
                 </Button>}
          style={{ width: '100% '}}
        >
          <Table 
            dataSource={dataSource} 
            columns={columns}
            bordered
            pagination={{defaultPageSize:5}}
            rowKey="_id"
          />
        </Card>
        {/* 新增角色提示框 */}
        <Modal
          title="新增角色"
          visible={this.state.isShowAdd}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
          <Form onSubmit={this.handleOk}>
            <Item>
              {getFieldDecorator('roleName', {
                initialValue:'',
                rules: [
                  {required: true, message: '角色名必须输入' },
                ],
              })(
                <Input placeholder="请输入角色名" />
              )}
            </Item>
          </Form>
        </Modal>
        {/* 树形菜单 */}
        <Modal
          title="设置角色权限"
          visible={this.state.isShowTree}
          onOk={this.showAuthOk}
          onCancel={this.showAuthCancel}
        >
          
            <Tree
              checkable  
              onCheck={this.onCheck}             
              defaultExpandAll={true}
              checkedKeys={this.state.checkedKeys}
         >           
          <TreeNode title='平台权限' key='-1'>
            {this.renderTreeNodes(menuList)}
          </TreeNode>

          </Tree>

        </Modal>

      </div>
    )
  }
}

export default Role