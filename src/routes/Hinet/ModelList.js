import React, {PureComponent} from 'react';
import {connect} from 'dva';
import numeral from 'numeral';
import { routerRedux } from 'dva/router';

import {Card, Button, Icon, List, Avatar, Tooltip, Modal, Form, Input} from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Ellipsis from '../../components/Ellipsis';

import styles from './ModelList.less';
import workspace from "../../models/workspace";

@connect(state => ({
  loading: state.workspace.loading,
  list: state.workspace.models,
  workspace: state.workspace.workspace,
}))
export default class ModelList extends PureComponent {
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

  handleDelete = (id) => {
    this.props.dispatch({
      type: 'workspace/rmModel',
      payload: id,
    });
  }

  handleAdd = () => {
    this.props.dispatch({
      type: 'workspace/addModel',
      payload: this.state.addInputValue,
    });

    this.setState({
      modalVisible: false,
    });
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'workspace/fetchModels',
      payload: parseInt(this.props.match.params.id, 10),
    });
  }


  render() {
    const {list, loading, workspace} = this.props;

    const CardInfo = ({layers, state}) => (
      <div className={styles.cardInfo}>
        <div>
          <p>Dataset</p>
          <p>{layers}</p>
        </div>
        <div>
          <p>Type</p>
          <p>{state}</p>
        </div>
      </div>
    );

    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          Enjoy coding, enjoy training.
        </p>
        <div className={styles.contentLink}>
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
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <p>ID</p>
          <p>{workspace.id}</p>
        </div>
        <div className={styles.statItem}>
          <p>Models</p>
          <p>{list.length || '0'}</p>
        </div>
        <div className={styles.statItem}>
          <p>Notebooks</p>
          <p>0</p>
        </div>
      </div>
    );

    return (
      <PageHeaderLayout
        title={workspace.name || ''}
        content={content}
        extraContent={extraContent}
      >
        <div className={styles.filterCardList}>
          <List
            rowKey="id"
            grid={{gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1}}
            loading={loading}
            dataSource={['', ...list]}
            renderItem={item => (item ? (
                <List.Item key={item.id}>
                  <Card
                    hoverable
                    bodyStyle={{paddingBottom: 20}}
                    actions={[
                      <Tooltip title="View">
                        <Icon type="search"
                              onClick={() => {
                                this.props.dispatch(routerRedux.push(`/model/${item.id}/result`));
                              }}/>
                      </Tooltip>,
                      <Tooltip title="Edit">
                        <Icon type="edit"
                              onClick={() => {
                                this.props.dispatch(routerRedux.push(`/model/${item.id}/dataset`));
                              }}/>
                      </Tooltip>,
                      <Tooltip title="Delete">
                        <Icon type="delete" onClick={() => this.handleDelete(item.id)} />
                      </Tooltip>,
                    ]}
                  >
                    <Card.Meta
                      avatar={<Avatar
                        style={{color: '#e2e4f5', backgroundColor: '#1e75fd', verticalAlign: 'middle'}}
                        size="small">{item.name.charAt(0)}</Avatar>}
                      title={item.name}
                    />
                    <div className={styles.cardItemContent}>
                      <CardInfo
                        layers={item.datasetName || 'none'}
                        state={item.type || 'none'}
                      />
                    </div>
                  </Card>
                </List.Item>
              ) : (
                <List.Item>
                  <Button type="dashed" className={styles.newButton} onClick={() => this.handleModalVisible(true)}>
                    <Icon type="plus"/> New Model
                  </Button>
                  <Button type="dashed" className={styles.newButton}
                          onClick={() => {window.location.href=`http://111.231.143.115:8888/`;}}>
                    <Icon type="plus"/> New Notebook
                  </Button>
                </List.Item>
              )
            )}
          />
        </div>
        <Modal
          title="New model"
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
