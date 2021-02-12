import React, { Component } from 'react';

import { EditorState, convertToRaw ,ContentState } from 'draft-js';

import { Editor } from 'react-draft-wysiwyg';

import draftToHtml from 'draftjs-to-html';

import htmlToDraft from 'html-to-draftjs';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'




class EditorConvertToHTML extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  }

  getEditorText = ()=>{
 
    const {editorState} = this.state
    return  draftToHtml(convertToRaw(editorState.getCurrentContent()))

  }

  setHtmltext = (html)=>{    
    const contentBlock = htmlToDraft(html);
    
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
     
       this.setState({
        editorState
       })
    }

  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          // wrapperClassName={{width:'50%'}}
          // editorClassName="demo-editor"
         
          editorStyle={{
            border:'1px solid #000',
            paddingLeft:'10px',
            lineHeight: '10px',
            minHeight: '200px'
          }}
          onEditorStateChange={this.onEditorStateChange}

         style={{ width:'80%'}}
        />
        {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </div>
    );
  }
}

export default EditorConvertToHTML