import React from 'react';
import {connect} from 'dva';
import {Form, Input, Icon, Button, Select, Divider, List, Card, Tooltip, Avatar} from 'antd';
import {routerRedux} from 'dva/router';
import styles from './style.less';

const {Option} = Select;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@Form.create()
class Step1 extends React.PureComponent {
  render() {
    const {form, dispatch} = this.props;
    const {getFieldDecorator, validateFields} = form;
    const list = [
      {id: 0, title: "DATASET1", description: "description1"},
      {id: 1, title: "DATASET2", description: "description2"},
      {id: 2, title: "DATASET3", description: "description3"},
      {id: 3, title: "DATASET5", description: "description3"},
      {id: 4, title: "DATASET6", description: "description3"},
      {id: 5, title: "DATASET33", description: "description3"}
    ]
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'form/saveStepFormData',
            payload: values,
          });
          dispatch(routerRedux.push('/form/step-form/confirm'));
        }
      });
    };
    return (
      <div>
        <div className={styles.chooseList}>
          <List
            rowKey="id"
            grid={{gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1}}
            dataSource={list}
            renderItem={item => (
              <List.Item key={item.id}>
                <Card
                  hoverable
                  bodyStyle={{paddingBottom: 20, marginRight: -10}}
                  actions={[
                    <Tooltip title="View"><Icon type="search"/></Tooltip>,
                    <Tooltip title="Edit"><Icon type="edit"/></Tooltip>,
                    <Tooltip title="Delete"><Icon type="delete"/></Tooltip>,
                  ]}
                >
                  <Card.Meta
                    title={item.title}
                  />
                  <div className={styles.cardItemContent}>
                    {item.description}
                  </div>
                </Card>
              </List.Item>
            )}
          />
        </div>
        <Button type="primary" onClick={onValidateForm}>
          Next Step
        </Button>

        <Divider style={{margin: '40px 0 24px'}}/>
        <div className={styles.desc}>
          <h3>说明</h3>
          <h4>转账到支付宝账户</h4>
          <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p>
          <h4>转账到银行卡</h4>
          <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p>
        </div>
      </div>
    );
  }
}

export default connect(({form}) => ({
  data: form.step,
}))(Step1);
