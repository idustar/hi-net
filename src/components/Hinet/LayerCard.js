import React, { Component } from 'react'
import { DragSource, DropTarget } from 'react-dnd';

import { Card, Icon, Avatar, Tooltip, Button } from 'antd';

const cardSource = {
  beginDrag(props) {
    const card = props.createCard(props.layerId);
    return {
      id: card.id,
      originalIndex: props.findCard(card.id).index,
      cardType: 'layer',
    }
  },

  endDrag(props, monitor) {
    const { id: droppedId, originalIndex } = monitor.getItem()
    const didDrop = monitor.didDrop()

    if (!didDrop) {
      props.removeCard(originalIndex)
    }
  },
}

@DragSource('card', cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export default class BuildCard extends Component {

  render() {
    const {
      text,
      isDragging,
      connectDragSource,
    } = this.props
    const background = isDragging ? 0.2 : 1;

    return connectDragSource(
         <div><Button type="dashed">{text}</Button></div>
    )
  }
}
