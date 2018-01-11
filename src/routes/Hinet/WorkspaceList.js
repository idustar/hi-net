import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Card, Button, Icon, List, Avatar, Modal, Form, Input, message} from 'antd';
import { routerRedux } from 'dva/router';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Ellipsis from '../../components/Ellipsis';

import styles from './WorkspaceList.less';

@connect(state => ({
  list: state.workspace,
}))
export default class WorkspaceList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      addInputValue: '',
    }
  }

  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  }

  handleAddInput = (e) => {
    this.setState({
      addInputValue: e.target.value,
    });
  }

  handleAdd = () => {
    this.props.dispatch({
      type: 'workspace/add',
      payload: this.state.addInputValue,
    });

    this.setState({
      modalVisible: false,
    });
  }

  handleDelete = (id) => {
    this.props.dispatch({
      type: 'workspace/rm',
      payload: id,
    });
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'workspace/fetch',
    });
  }

  render() {
    const {list: {list, loading}} = this.props;

    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          A workspace is a set of models and notebooks.
        </p>
        <div className={styles.contentLink}>
          <a onClick={() => this.handleModalVisible(true)}>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"/> New Workspace
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg"/> Documentation
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"/> Discussion
          </a>
        </div>
      </div>
    );

    const extraContent = (
      <div className={styles.extraImg}>
        <img alt="png" src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"/>
      </div>
    );

    return (
      <PageHeaderLayout
        title="Workspaces"
        content={content}
        extraContent={extraContent}
      >
        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{gutter: 24, lg: 3, md: 2, sm: 1, xs: 1}}
            dataSource={['', ...list]}
            renderItem={item => (item ? (
                <List.Item key={item.id}>
                  <Card
                    hoverable
                    className={styles.card}
                    actions={[
                      <a onClick={() => {this.props.dispatch(routerRedux.push(`/workspace/${item.id}`));}}>
                        <Icon type="ellipsis"/>&nbsp;&nbsp;View
                      </a>,
                      <a onClick={() => this.handleDelete(item.id)}><Icon type="delete"/>&nbsp;&nbsp;Delete</a>
                    ]}>
                    <Card.Meta
                      avatar={<Avatar
                        style={{color: '#e2e4f5', backgroundColor: '#1e75fd', verticalAlign: 'middle'}}
                        size="large">{item.name.charAt(0)}</Avatar>}
                      title={<a href="#">{item.name}</a>}
                    />
                  </Card>
                </List.Item>
              ) : (
                <List.Item>
                  <Button type="dashed" className={styles.newButton} onClick={() => this.handleModalVisible(true)}>
                    <Icon type="plus"/> New Workspace
                  </Button>
                </List.Item>
              )
            )}
          />
        </div>
        <Modal
          title="New workspace"
          visible={this.state.modalVisible}
          onOk={this.handleAdd}
          onCancel={() => this.handleModalVisible()}
        >
          <Form.Item
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="name"
          >
            <Input placeholder="please input" onChange={this.handleAddInput} value={this.state.addInputValue} />
          </Form.Item>
        </Modal>
      </PageHeaderLayout>
    );
  }
}
