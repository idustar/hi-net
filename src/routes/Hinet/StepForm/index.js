import React, {PureComponent} from 'react';
import {Route, Redirect, Switch} from 'dva/router';
import {Card, Steps} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import NotFound from '../../Exception/404';
import {getRoutes} from '../../../utils/utils';
import styles from './index.less';

const {Step} = Steps;

export default class StepForm extends PureComponent {
  getCurrentStep() {
    const {location} = this.props;
    const {pathname} = location;
    const pathList = pathname.split('/');
    switch (pathList[pathList.length - 1]) {
      case 'dataset':
        return 0;
      case 'build':
        return 1;
      case 'result':
        return 2;
      default:
        return 0;
    }
  }
  render() {
    const {match, routerData} = this.props;

    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <p>Layer</p>
          <p>3</p>
        </div>
        <div className={styles.statItem}>
            <p>State</p>
          <p>Trained</p>
        </div>
        <div className={styles.statItem}>
          <p>Created At</p>
          <p>2017</p>
        </div>
      </div>
    );

    return (
      <PageHeaderLayout content={<div><h1>title</h1><p>description</p></div>} extraContent={extraContent}>
        <Card bordered={false}>
          <div>
            <Steps current={this.getCurrentStep()} className={styles.steps}>
              <Step title="SELECT YOUR DATASET"/>
              <Step title="BUILD YOUR MODEL"/>
              <Step title="TRAINING"/>
            </Steps>
            <Switch>
              {
                getRoutes(match.path, routerData).map(item => (
                  <Route
                    key={item.key}
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
                  />
                ))
              }
              <Redirect exact from="/model/:id" to="/model/:id/result"/>
              <Route render={NotFound}/>
            </Switch>
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
