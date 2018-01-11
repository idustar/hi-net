import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip, notification
} from 'antd';

import styles from '../Hinet/CardForm.less';

const FormItem = Form.Item;
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;

@connect(state => ({
  //submitting: state.form.regularFormSubmitting,
}))
@Form.create()
export default class CardForm extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'post/add',
          payload: {
            ...values, userId: localStorage.getItem('email'),
          },
        });
        notification.success({message: 'Finished!'});
        if (this.props.callback) this.props.callback();
      }
    });
  }

  render() {
    const {card} = this.props;
    const {getFieldDecorator, getFieldValue} = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 4},
        md: {span: 3},
        lg: {span: 2},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 20},
        md: {span: 21},
        lg: {span: 22},
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: {span: 24, offset: 0},
        sm: {span: 10, offset: 7},
      },
    };

    const renderTooltip = (title) => {
      return (
        <em className={styles.optional}>
          <Tooltip title={title}>
            <Icon type="info-circle-o" style={{marginRight: 4, marginLeft: 4}}/>
          </Tooltip>
        </em>
      )
    }

    return (
      <Form
        onSubmit={this.handleSubmit}
        hideRequiredMark
        style={{marginTop: 0}}
      >
        <FormItem {...formItemLayout}
                  key='title'
                  label={<span>Title</span>}>
          {getFieldDecorator('title', {
            rules: [{required: true, message: `title is required`,}],
          })(
            <Input />
          )}
        </FormItem>

        <FormItem {...formItemLayout}
                  key='content'
                  label={<span>Content</span>}>
          {getFieldDecorator('content', {
            rules: [{required: true, message: `content is required`,}],
          })(
            <TextArea rows={4} />
          )}
        </FormItem>

        <FormItem {...submitFormLayout} style={{marginTop: 0}}>
          <Button type="primary" htmlType="submit">
            Post
          </Button>
        </FormItem>
      </Form>
    );
  }
}
