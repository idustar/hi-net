import React from 'react';
import {connect} from 'dva';
import {Form, Input, Icon, Modal, Button, Select, Divider, List, Card, Tooltip, notification} from 'antd';
import {routerRedux} from 'dva/router';
import styles from './style.less';
import Ellipsis from '../../../components/Ellipsis';
import FooterToolbar from '../../../components/FooterToolbar';
import DatasetForm from '../../../components/Hinet/DatasetForm';

const {Option} = Select;

class Step1 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  onClose = () => {
    this.setState({visible: false});
    this.onShow();
  }

  componentDidMount() {
    this.onShow();
  }

  onShow() {
    const {dispatch} = this.props;
    dispatch({
      type: 'model/fetchDatasets',
    });
  }

  selectDataset(id) {
    const {dispatch} = this.props;

    dispatch({
      type: 'model/saveDatasetId',
      payload: id !== this.props.selectId ? id : null,
    });
  }

  render() {
    const {dispatch} = this.props;

    const onValidateForm = () => {
      const {selectId} = this.props;
      if (selectId !== null) {
        dispatch(routerRedux.push(`/model/${this.props.match.params.id}/build`));
      } else {
        notification.error({
          message: "No dataset selected",
          description: 'A dataset is neccessary for training.',
        })
      }
    };

    return (

      <div>
        <Modal
          onOk={this.onClose}
          onCancel={this.onClose}
          title="Upload dataset"
          visible={this.state.visible}>
          <DatasetForm onClose={this.onClose}/>
        </Modal>
        <div className={styles.chooseList}>
          <List
            rowKey="id"
            grid={{gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1}}
            dataSource={[...this.props.datasets, ...this.props.self_datasets, '']}
            renderItem={item => (item ? (
              <List.Item key={item.id}>
                {item.type ?
                  <Card onClick={() => this.selectDataset(item.id)}
                        className={item.id === this.props.selectId ? styles.selected : null}
                        hoverable
                        bodyStyle={{paddingBottom: 20, marginRight: -10}}
                  >
                    <Card.Meta
                      title={item.name}
                    />
                    <div className={styles.cardItemContent}>
                      <Tooltip placement="bottom" title={item.description}>
                        <Ellipsis className={styles.item} lines={2}>{item.description}</Ellipsis> </Tooltip>
                    </div>
                  </Card>
                  :
                  <Card hoverable
                        bodyStyle={{paddingBottom: 20, marginRight: -10}}>
                    <Card.Meta
                      title={item.name}
                    />
                    <div className={styles.cardItemContent}>
                        <Ellipsis className={styles.item} lines={2}>Uploaded<br />by user.</Ellipsis>
                    </div>
                  </Card>}

              </List.Item>
            ) : (
              <List.Item>
                <Button type="dashed" className={styles.newButton} onClick={()=>this.setState({visible: true})}>
                  <Icon type="plus"/> New Dataset
                </Button>
              </List.Item>
            ))}
          />
        </div>

        <Divider style={{margin: '40px 0 24px'}}>INFORMATION</Divider>
        <div className={styles.desc}>
          <h3>INSTRUCTIONS</h3>
          <h4>Select a dataset</h4>
          <p>We provides you with 10 default datasets for quick start. If needed, you can upload own dataset.</p>
          <h4>Build the model</h4>
          <p>You can drag some layers to your model from the toolbar.<br/>
            Each type of datasets has its own avaiable set of layers.<br/>
            To change the order of layers, just drag and drop between layers,<br/>
            To delete layers, just drag it and drop out of the panel.</p>
        </div>
        <FooterToolbar children={
          <Button type="primary" onClick={onValidateForm}>
            Next Step
          </Button>
        }/>
      </div>
    )
      ;
  }
}

export default connect((state) => ({
  datasets: state.model.datasets,
  self_datasets: state.model.self_datasets,
  selectId: state.model.model.datasetId || null,
}))(Step1);
