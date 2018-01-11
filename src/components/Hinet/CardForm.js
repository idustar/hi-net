import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip, notification
} from 'antd';

import styles from './CardForm.less';

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
          type: 'model/reverseCardAttr',
          payload: {
            id: this.props.card.id,
            values
          },
        });
        notification.success({message:'saved.'});
      }
    });
  }

  render() {
    const {card} = this.props;
    const {getFieldDecorator, getFieldValue} = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 12},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 12},
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

    const formitem = (e) => {
      const {name, title, tooltip, content} = e;
      return (
        <FormItem {...formItemLayout}
                  key={e.name}
                  label={<span>{title}{renderTooltip(tooltip)}</span>}>
          {getFieldDecorator(name, {
            initialValue: card[name],
            rules: [{required: true, message: `${title} is required`,}],
          })(
            content
          )}
        </FormItem>)
    }

    const formitems = [
      [{
        name: 'filter',
        title: 'Filter',
        tooltip: 'number of filters applied to the layer\nnumber [> 0]',
        content: <InputNumber min={1}/>,
      }, {
        name: 'kernelSize',
        title: 'Kernel Size',
        tooltip: 'the kernel size\nnumber [eg. 3 for 3x3 >= 1 usually 1,3,5,7]',
        content: <InputNumber min={1}/>,
      }, {
        name: 'strides',
        title: 'Strides',
        tooltip: 'the strides applied\nnumber [eg. 2 for 2x2 >= 1]',
        content: <InputNumber min={1}/>,
      }, {
        name: 'padding',
        title: 'Padding',
        tooltip: 'the padding applied\nnumber [>= 0]',
        content: <InputNumber min={0}/>,
      },{
        name: 'activation',
        title: 'Activation',
        tooltip: 'activation function of the layer\nstring [relu, leakyrelu, tanh, sigmoid, none]',
        content: <Select placeholder="nothing selected" getPopupContainer={triggerNode => triggerNode.parentNode}>
          <Option value="relu">relu</Option>
          <Option value="leakyrelu">leakyrelu</Option>
          <Option value="tanh">tanh</Option>
          <Option value="sigmoid">sigmoid</Option>
          <Option value="none">none</Option>
        </Select>,
      }], [{
        name: 'outputDim',
        title: 'Output Dim',
        tooltip: 'output dimension of the layer\nnumber [> 0]',
        content: <InputNumber min={1}/>,
      }, {
        name: 'activation',
        title: 'Activation',
        tooltip: 'activation function of the layer\nstring [relu, leakyrelu, tanh, sigmoid]',
        content: <Select placeholder="nothing selected" getPopupContainer={triggerNode => triggerNode.parentNode}>
          <Option value="relu">relu</Option>
          <Option value="leakyrelu">leakyrelu</Option>
          <Option value="tanh">tanh</Option>
          <Option value="sigmoid">sigmoid</Option>
        </Select>,
      }, {
        name: 'weightInit',
        title: 'Weight Init',
        tooltip: 'the weight initialization method\nstring [xavier, zero, uniform]',
        content: <Select placeholder="nothing selected" getPopupContainer={triggerNode => triggerNode.parentNode}>
          <Option value="xavier">xavier</Option>
          <Option value="zero">zero</Option>
          <Option value="uniform">uniform</Option>
        </Select>,
      }], [{
        name: 'kernelSize',
        title: 'Kernel Size',
        tooltip: 'the kernel size\nnumber [eg. 3 for 3x3 >= 1 usually 1,3,5,7]',
        content: <InputNumber min={1}/>,
      }, {
        name: 'strides',
        title: 'Strides',
        tooltip: 'the strides applied\nnumber [eg. 2 for 2x2 >= 1]',
        content: <InputNumber min={1}/>,
      }, {
        name: 'poolingType',
        title: 'Pooling Type',
        tooltip: 'the type of pooling\nstring [max, average]',
        content: <Select placeholder="nothing selected" getPopupContainer={triggerNode => triggerNode.parentNode}>
          <Option value="max">max</Option>
          <Option value="average">average</Option>
        </Select>,
      }], [{
        name: 'dropoutRate',
        title: 'Dropout Rate',
        tooltip: 'dropout rate\nnumber [< 1]',
        content: <InputNumber min={0} max={1} step={0.01}/>,
      }], [{
        name: 'outputNum',
        title: 'Output Num',
        tooltip: 'output dimension of the model\nnumber [> 1]',
        content: <InputNumber min={1}/>,
      }, {
        name: 'activation',
        title: 'Activation',
        tooltip: 'activation function of the layer\nstring [softmax, tanh, sigmoid]',
        content: <Select placeholder="nothing selected" getPopupContainer={triggerNode => triggerNode.parentNode}>
          <Option value="softmax">softmax</Option>
          <Option value="tanh">tanh</Option>
          <Option value="sigmoid">sigmoid</Option>
        </Select>
      }, {
        name: 'lossFunction',
        title: 'Loss Func',
        tooltip: 'loss function of the model\nstring [neg, sqrt]',
        content: <Select placeholder="nothing selected" getPopupContainer={triggerNode => triggerNode.parentNode}>
          <Option value="neg">neg</Option>
          <Option value="sqrt">sqrt</Option>
        </Select>,
      }], [{
        name: 'hiddenLayerWidth',
        title: 'HL Width',
        tooltip: 'the units in one hidden layer\nnumber [>= 1]',
        content: <InputNumber min={1}/>,
      }, {
        name: 'hiddenLayerCount',
        title: 'HL Count',
        tooltip: 'the number of hidden layers\nnumber [>= 1]',
        content: <InputNumber min={1}/>,
      }, {
        name: 'sequenceLen',
        title: 'Sequence Len',
        tooltip: 'the length of the input sequence\nnumber [> 0]',
        content: <InputNumber min={1}/>,
      }],
    ];


    return (
      <Form
        onSubmit={this.handleSubmit}
        hideRequiredMark
        style={{marginTop: 0}}
      >

        {formitems[this.props.card.layerId].map(e => formitem(e))}

        <FormItem {...submitFormLayout} style={{marginTop: 0}}>
          <Button type="primary" htmlType="submit">
            save
          </Button>
        </FormItem>
      </Form>
    );
  }
}
