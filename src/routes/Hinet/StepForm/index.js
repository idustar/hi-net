import React, {PureComponent} from 'react';
import {Route, Redirect, Switch} from 'dva/router';
import {Card, Steps} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import {connect} from 'dva';
import NotFound from '../../Exception/404';
import {getRoutes} from '../../../utils/utils';
import styles from './index.less';

const {Step} = Steps;

@connect(state => ({
  model: state.model.model,
  jobs: state.job.jobs.length,
  done: state.job.jobs.filter(e => !e.finishTime).length,
  layerLength: state.model.cards.length,
}))
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
  componentDidMount() {
    this.props.dispatch({
      type: 'model/fetch',
      payload: parseInt(this.props.match.params.id, 10),
    });
    this.props.dispatch({
      type: 'job/fetch',
      payload: parseInt(this.props.match.params.id, 10),
    });
  }
  render() {
    const {match, routerData, model} = this.props;

    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <p>Layers</p>
          <p>{this.props.layerLength}</p>
        </div>
        <div className={styles.statItem}>
            <p>Dataset</p>
          <p>{this.props.model.datasetName || 'None'}</p>
        </div>
        <div className={styles.statItem}>
          <p>Jobs</p>
          <p>{this.props.done || '0'}<span> / {this.props.jobs || '0'}</span></p>
        </div>
      </div>
    );

    return (
      <PageHeaderLayout content={<div><h1>{model.name}</h1><p>Enjoy training!</p></div>} extraContent={extraContent}>
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
              <Redirect exact from="/model/:id" to={`/model/${this.props.match.params.id}/result`} />
              <Route render={NotFound}/>
            </Switch>
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
