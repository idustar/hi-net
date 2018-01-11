import React from 'react';
import {connect} from 'dva';
import {Form, Input, Button, Alert, Divider, Row, Col, List, Card, message} from 'antd';
import {routerRedux} from 'dva/router';
import {DropTarget, DragDropContext} from 'react-dnd';
import styles from './style.less';
import BuildContainer from '../../../components/Hinet/BuildContainer';
import FooterToolbar from '../../../components/FooterToolbar';


class Step2 extends React.PureComponent {
  render() {
    const {dispatch, cards, layers, globalVariable} = this.props;
    const onPrev = () => {
      dispatch(routerRedux.push(`/model/${this.props.match.params.id}/dataset`));
    };
    const onSave = (e) => {
      e.preventDefault();
      dispatch({
        type: 'model/save'
      })
    };
    const onTrain = (e) => {
      e.preventDefault();
      onSave(e);
      dispatch(routerRedux.push(`/model/${this.props.match.params.id}/result`));
    };
    return (

      <div className={styles.stepForm} style={{marginBottom: 40}}>
        <BuildContainer
          cards={cards}
          layers={layers}
          dispatch={dispatch}
          globalVariable={globalVariable}
        />

        <FooterToolbar children={[
          <Button type="dashed" onClick={onPrev} key={0}>
            Prev Step
          </Button>,
          <Button type="primary" onClick={onSave} key={1}>
            Save
          </Button>,
          <Button type="primary" onClick={onTrain} key={2}>
            Train
          </Button>]
        } />
      </div>


    );
  }
}

export default connect(({model}) => {
  let layers;
  const l = model.layers;
  if (model.model.datasetType === 'dense') {
    layers = [l[1], l[3], l[4]];
  } else if (model.model.datasetType === 'rnn') {
    layers = [l[4], l[5]];
  } else {
    layers = [l[0], l[1], l[2], l[3], l[4]];
  }
  return {
    cards: model.cards,
    layers,
    globalVariable: model.globalVariable,
  }
})(Step2);
