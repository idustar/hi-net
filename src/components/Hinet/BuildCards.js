import React, {Component} from 'react';
import {Icon, Row, Col, List, Tooltip} from 'antd';
import {DropTarget, DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import BuildCard from './BuildCard';

const style = {}

const cardTarget = {
  drop() {
  },
}

@DropTarget('card', cardTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
export default class Container extends Component {
  render() {
    const {connectDropTarget, cards, moveCard, findCard, removeCard, createCard} = this.props

    return connectDropTarget(
      <div>
        {cards.map((card, index) => (
          <div key={card.id}>
            <Col lg={1} md={1} sm={1} xs={1}>
            {index === 0 ? null : (<div style={{fontSize: 20, textAlign: 'center', lineHeight: '80px'}}><Icon type="arrow-right"/></div>)}
            </Col>
            <Col lg={5} md={7} sm={11} xs={11}>
            <BuildCard
              index={index+1}
              card={card}
              moveCard={moveCard}
              findCard={findCard}
              removeCard={removeCard}
              createCard={createCard}
            />
            </Col>
          </div>
        ))}
      </div>
    )
  }
}
