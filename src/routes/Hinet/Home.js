import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Card, Button, Icon, List, Avatar, Modal, Form, Input, message, Row, Col} from 'antd';
import {routerRedux} from 'dva/router';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Ellipsis from '../../components/Ellipsis';

import styles from './Home.less';

@connect(state => ({}))
export default class WorkspaceList extends PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.inner}>
          <Row>
            <Col>
              <div className={styles.topBanner}>
                <Row className={styles.bannerWrapper}>
                  <Col span={8} offset={8}>
                    <img className={styles.logo}
                         src="https://raw.githubusercontent.com/Log-Loss/hi-net-community-server/master/logo.png"/>
                  </Col>
                </Row>
                <Row>
                  <Col span={8} offset={12}>
                    <p style={{opacity: 1}}>Your Deep Learning Playground</p>
                  </Col>
                </Row>
                <Button ghost onClick={() => this.props.dispatch(routerRedux.push('/'))}>Get Started</Button>
              </div>

            </Col>
          </Row>
          <Row className={styles.detail}>
            <Col span={24} className={styles.detailTitle}>Start Your Deep Learning Journey Here</Col>
            <Col span={8}>
              <div className="icon">
                < img src="https://image.flaticon.com/icons/svg/149/149356.svg" width="100%"/>
              </div>
              <h3 className={styles.featureTitle}>Notebook</h3>
              <p className={styles.featureContent}>Deep Learning Environment on Cloud</p>
            </Col>
            <Col span={8}>
              <div className="icon">
                <img src="https://image.flaticon.com/icons/svg/681/681660.svg&#10;" width="100%"/>
              </div>
              <h3 className={styles.featureTitle}>Model</h3>
              <p className={styles.featureContent}>Build Neural Network in One Minute</p>
            </Col>
            <Col span={8}>
              <div className="icon">
                < img src="https://image.flaticon.com/icons/svg/681/681631.svg&#10;" width="100%"/>
              </div>
              <h3 className={styles.featureTitle}>Community</h3>
              <p className={styles.featureContent}>Inspiration Starts Here</p>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
