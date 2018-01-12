import React from 'react';
import {connect} from 'dva';
import {Button, Row, Col, Tooltip, Icon, Menu, Dropdown, Avatar} from 'antd';
import {routerRedux} from 'dva/router';
import Result from '../../../components/Result';
import styles from './style.less';
import TrainingForm from '../../../components/Hinet/TrainingForm';
import {WaterWave, Pie, ChartCard, Field} from '../../../components/Charts';
import FooterToolbar from '../../../components/FooterToolbar';
import {dateFtt} from '../../../utils/utils';
import StatChart from "../../../components/Hinet/StatChart";


class Step3 extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const colors = ['#ff4d4f', '#fadb14', '#389e0d', '#5b8dff'];
    const {dispatch, jobs, job, state, total, percent} = this.props;
    const onPrev = () => {
      dispatch(routerRedux.push(`/model/${this.props.match.params.id}/build`));
    };
    const menuClick = ({key}) => {
      this.props.dispatch({
        type: 'job/fetchJob',
        payload: jobs[key].id,
      })
    };
    const information = (
      <div className={styles.information}>
        goodbye
      </div>
    );
    const menu = (
      <Menu onClick={menuClick}>
        {jobs.map((e, index) => (
          <Menu.Item key={index}>
            <a style={{color: job.id === e.id ? '#5b8dff' : undefined}}>
              {`${dateFtt("yyyy-MM-dd hh:mm:ss", e.createTime)}`}
            </a>
          </Menu.Item>
        ))}
      </Menu>
    );

    const footer = (
      <div>
        <Tooltip placement='left' title={job.message || 'SUCCESS'}>
        <Field label="Message" value={job.message ? 'ERROR' : 'SUCCESS'}/>
        </Tooltip>
      </div>
    );
    return (
      <div>
        {job ? (
          <Row gutter={10} style={{marginBottom: 60}}>
            <Col span={18}>
              <div style={{width: '100%', border: '1px solid #eeeeee', padding: 20, marginBottom: 10}}>
                <TrainingForm onTrain={() => this.training}/>
              </div>
              <div style={{border: '1px solid #eeeeee', padding: 20}}>
                <StatChart style={{width: '100%'}} data={state}/>
              </div>
            </Col>
            <Col span={6}>
              <ChartCard
                title={'Training Time'}
                avatar={
                  <Avatar size='large'
                          style={{backgroundColor: '#87d068'}}>{jobs.find(e => e.id === job.id).id}</Avatar>
                }
                action={<Tooltip title="You can view your former training jobs by the dropdown menu.">
                  <Icon type="info-circle-o"/></Tooltip>}
                total={!job.message?(job.finishTime && job.startTime ?
                  `${((job.finishTime - job.startTime) / 1000).toFixed(2)} s` : 'Training'):'Error'}
              />
              <ChartCard
                title={`${dateFtt("yyyy-MM-dd hh:mm:ss", job.createTime)}`}
                action={<Dropdown overlay={menu}><Icon type="sync"/></Dropdown>}
                contentHeight={200}
                footer={footer}
              >
                <div style={{textAlign: 'center'}}>
                  {job.finishTime ?
                    <Pie
                      color={colors[parseInt(job.accuracy/0.4, 10)]}
                      height={161}
                      subTitle={'Accuracy'}
                      total={job.accuracy.toFixed(4)*100+'%'}
                      percent={job.accuracy*100}/>
                    :
                    <Pie
                      color={colors[3]}
                      height={161}
                      subTitle="Training"
                      total={percent.toFixed(2)+'%'}
                      percent={percent}/>}
                </div>
              </ChartCard>
            </Col>
          </Row>
        ) : (
          <div style={{width: '100%', border: '1px solid #eeeeee', padding: 20, marginBottom: 10}}>
            <TrainingForm/>
          </div>
        )}

        <FooterToolbar children={
          <Button type="dashed" onClick={onPrev} key={0}>
            Prev Step
          </Button>
        }/>

      </div>
    );
  }
}

export default connect(({model, job}) => {
  const state = job.job ? JSON.parse(job.job.state || '[]') : [];
  const total = (job.epochs && job.batchSize && model.model.datasetId) ?
    Math.round(model.datasets.find(e => e.id === model.model.datasetId).amount * job.epochs / job.batchSize) : 0;
  const percent = total ? (state.length / total * 100) : 0;

  return {
    jobs: job.jobs,
    job: job.job,
    state: job.job.finishTime?state:[...state, {iteration: total, score: null}],
    total,
    percent: percent > 100 ? 100 : percent,
  }
})(Step3);
