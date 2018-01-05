import React, {PureComponent} from 'react';
import {connect} from 'dva';
import numeral from 'numeral';
import {Card, Button, Icon, List, Avatar, Tooltip, } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Ellipsis from '../../components/Ellipsis';

import styles from './ModelList.less';

const formatWan = (val) => {
  const v = val * 1;
  if (!v || isNaN(v)) return '';

  let result = val;
  if (val > 10000) {
    result = Math.floor(val / 10000);
    result = <span>{result}<em className={styles.wan}>万</em></span>;
  }
  return result;
};

@connect(state => ({
  list: state.workspace,
}))
export default class ModelList extends PureComponent {
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

    const CardInfo = ({ layers, state }) => (
      <div className={styles.cardInfo}>
        <div>
          <p>Layers</p>
          <p>{layers}</p>
        </div>
        <div>
          <p>State</p>
          <p>{state}</p>
        </div>
      </div>
    );

    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          Description of this workspace
        </p>
        <div className={styles.contentLink}>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"/> Back to workplace list
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
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <p>Models</p>
          <p>{list.length || '0'}</p>
        </div>
        <div className={styles.statItem}>
          <p>Calculated</p>
          <p>8<span> / {list.length || '0'}</span></p>
        </div>
        <div className={styles.statItem}>
          <p>Created At</p>
          <p>2017</p>
        </div>
      </div>
    );

    return (
      <PageHeaderLayout
        title={'Demo Workspace'}
        content={content}
        extraContent={extraContent}
      >
        <div className={styles.filterCardList}>
          <List
            rowKey="id"
            grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
            loading={loading}
            dataSource={list}
            renderItem={item => (
              <List.Item key={item.id}>
                <Card
                  hoverable
                  bodyStyle={{ paddingBottom: 20 }}
                  actions={[
                    <Tooltip title="View"><Icon type="search" /></Tooltip>,
                    <Tooltip title="Edit"><Icon type="edit" /></Tooltip>,
                    <Tooltip title="Delete"><Icon type="delete" /></Tooltip>,
                  ]}
                >
                  <Card.Meta
                    avatar={<Avatar
                      style={{color: '#e2e4f5', backgroundColor: '#1e75fd', verticalAlign: 'middle'}}
                      size="small">{item.title.charAt(0)}</Avatar>}
                    title={item.title}
                  />
                  <div className={styles.cardItemContent}>
                    <CardInfo
                      layers={numeral(item.newUser).format('0,0')}
                      state={'Trained'}
                    />
                  </div>
                </Card>
              </List.Item>
            )}
          />
        </div>
      </PageHeaderLayout>
    );
  }
}
