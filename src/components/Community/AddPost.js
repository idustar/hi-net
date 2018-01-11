import React, { Component } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import {connect} from "dva";

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class AddPost extends Component {
  state = {
    visible: false,
    confirmLoading: false,
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.userId = "licor";
        this.props.dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
        console.log(values);
        setTimeout(() => {
          this.setState({
            visible: false,
          });
        }, 2000);
      }
    });
  }
  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    const { submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 14 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    return (
      <div>
        <Button type="dashed" shape="circle" icon="plus" size="large" onClick={this.showModal}/>
        <Modal title="Add New Post"
               visible={visible}
               okText="ADD"
               onOk={this.handleOk}
               confirmLoading={confirmLoading}
               onCancel={this.handleCancel}
               cancelText="CANCEL"
               destroyOnClose
               footer={null}
        >
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem
              {...formItemLayout}
              label="Title"
            >
              {getFieldDecorator('title', {
                rules: [{
                  required: true, message: 'Title is required',
                }],
              })(
                <Input placeholder="Your Post Title" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Content"
            >
              {getFieldDecorator('content', {
                rules: [{
                  required: true, message: 'Content is required',
                }],
              })(
                <TextArea placeholder="Your Post Here ..." autosize={{ minRows: 4, maxRows: 8 }} />
              )}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                Post
              </Button>
            </FormItem>
          </Form>
          <p align="center">{ModalText}</p>
        </Modal>
      </div>
    );
  }
}
