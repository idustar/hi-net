import React from 'react';
import {connect} from 'dva';
import {Button, Row, Col, Tooltip, Icon, Menu, Dropdown, Avatar} from 'antd';
import {routerRedux} from 'dva/router';
import Result from '../../../components/Result';
import styles from './style.less';
import TrainingForm from '../../../components/Hinet/TrainingForm';
import {WaterWave, ChartCard, Field} from '../../../components/Charts';
import FooterToolbar from '../../../components/FooterToolbar';
import {dateFtt} from '../../../utils/utils';


class Step3 extends React.PureComponent {
  render() {
    const colors = ['#ff4d4f', '#fadb14', '#389e0d', '#5b8dff'];
    const {dispatch, jobs, job} = this.props;
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
        <Field label="Iteration 1" value={'itttt'}/>
      </div>
    );
    return (
      <div>
        {job ? (
          <Row gutter={10} style={{marginBottom: 60}}>
            <Col span={18}>
              <div style={{width: '100%', border: '1px solid #eeeeee', padding: 20, marginBottom: 10}}>
                <TrainingForm/>
              </div>
              <div style={{width: '100%', border: '1px solid #eeeeee', padding: 20}}>
                charts
              </div>
            </Col>
            <Col span={6}>
              <ChartCard
                title={'Training Time'}
                avatar={
                  <Avatar size='large' style={{ backgroundColor: '#87d068' }}>{jobs.find(e=>e.id===job.id).id}</Avatar>
                }
                action={<Tooltip title="You can view your former training jobs by the dropdown menu.">
                  <Icon type="info-circle-o" /></Tooltip>}
                total={job.finishTime && job.startTime ?
                  `${((job.finishTime - job.startTime)/1000).toFixed(2)} s`: 'Training...'}
              />
              <ChartCard
                title={`${dateFtt("yyyy-MM-dd hh:mm:ss", job.createTime)}`}
                action={<Dropdown overlay={menu}><Icon type="sync"/></Dropdown>}
                contentHeight={200}
                footer={footer}
              >
                <div style={{textAlign: 'center'}}>
                  <WaterWave
                    color={colors[parseInt(job.accuracy / 0.4, 10)]}
                    height={161}
                    title="Accuracy"
                    percent={job.accuracy * 100}
                  />
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

export default connect(({model, job}) => ({
  jobs: job.jobs,
  job: job.job,
}))(Step3);
