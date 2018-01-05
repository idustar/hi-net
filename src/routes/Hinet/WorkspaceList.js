import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Card, Button, Icon, List, Avatar} from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Ellipsis from '../../components/Ellipsis';

import styles from './WorkspaceList.less';

@connect(state => ({
  list: state.workspace,
}))
export default class WorkspaceList extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'workspace/fetch',
      payload: {
        count: 8,
      },
    });
  }

  render() {
    const {list: {list, loading}} = this.props;

    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          Description of workspaces
        </p>
        <div className={styles.contentLink}>
          <a>
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
        <img alt="这是一个标题" src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"/>
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
                      <a><Icon type="ellipsis"/>&nbsp;&nbsp;View</a>,
                      <a><Icon type="delete"/>&nbsp;&nbsp;Delete</a>
                    ]}>
                    <Card.Meta
                      avatar={<Avatar
                        style={{color: '#e2e4f5', backgroundColor: '#1e75fd', verticalAlign: 'middle'}}
                        size="large">{item.title.charAt(0)}</Avatar>}
                      title={<a href="#">{item.title}</a>}
                      description={(
                        <Ellipsis className={styles.item} lines={3}>{item.description}</Ellipsis>
                      )}
                    />
                  </Card>
                </List.Item>
              ) : (
                <List.Item>
                  <Button type="dashed" className={styles.newButton}>
                    <Icon type="plus"/> New Workspace
                  </Button>
                </List.Item>
              )
            )}
          />
        </div>
      </PageHeaderLayout>
    );
  }
}
