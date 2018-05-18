import React from 'react';
import ReactDOM from 'react-dom';
import { Form , Input ,Select ,Upload , Button , Icon} from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
class FeedfackClue extends React.Component{
	constructor(props){
		super(props);
		this.state={
			tagColor:'#108ee9',
			tagBack:'#fff',
			requestModal:false
		}
	}

	//上传附件
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

	render(){
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
		  labelCol: {
		    xs: { span: 24 },
		    sm: { span: 5 },
		  },
		  wrapperCol: {
		    xs: { span: 24 },
		    sm: { span: 12 },
		  },
		};		
		return (
			<Form>
		        <FormItem {...formItemLayout} label="线索名称">
		          {getFieldDecorator('clueName', {
		            //rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
		          })(
		            <Input placeholder='请输入线索名称' />
		          )}
		        </FormItem>
		        <FormItem {...formItemLayout} label="线索说明">
		          {getFieldDecorator('clueMark', {
		            //rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
		          })(
		            <TextArea placeholder='请输入线索说明' />
		          )}
		        </FormItem>	
		        <FormItem  {...formItemLayout} label="附件">
		          {getFieldDecorator('attachment', {
		            valuePropName: 'fileList',
		            getValueFromEvent: this.normFile,
		          })(
		            <Upload name="logo" action="/upload.do" listType="picture">
		              <Button>
		                <Icon type="upload" /> 添加附件
		              </Button>
		            </Upload>
		          )}
		        </FormItem>	
		        <FormItem {...formItemLayout} label="附件说明">
		          {getFieldDecorator('attachmentDesc', {
		            //rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
		          })(
		            <TextArea placeholder='请输入附件说明' />
		          )}
		        </FormItem>		        	        	        	        			        		        				
			</Form>
		)
	}
}
export default  Form.create()(FeedfackClue)