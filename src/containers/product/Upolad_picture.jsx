import React, { Component } from 'react'

import { Upload, Modal,Icon,message} from 'antd';

import {BASE_URL} from "../../config/index";

import { reqDeletePicture,reqProductOne} from "../../api/index";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
    ]
  };


   setimgArr = (arr)=>{
    let result=[]

    arr.forEach((item,index)=>{
      
      result[result.length] = {uid:index,name:item,status: 'done',url:`${BASE_URL}/upload/${item}`}  
       
    })
    
    this.setState({
      fileList:result
    })

   }

   getimgList = ()=>{
     let imgs =[]
     this.state.fileList.forEach((item)=>{       
       imgs.push(item.name)
     })     
    return imgs
   }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
    
  };

  handleChange = async ({file,fileList }) => {
   
     if(file.status === 'done'){

      fileList[fileList.length-1].url = file.response.data.url;
      fileList[fileList.length-1].name = file.response.data.name;
     
    }
    if(file.status === 'removed'){
     
    await reqDeletePicture({name:file.name})
    
    message.success('成功移除图片',1)

    }
    this.setState({ fileList });
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action={`${BASE_URL}/manage/img/upload`}
          method='post'
          name='image'
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}