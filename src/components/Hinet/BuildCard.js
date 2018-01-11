import React, {Component} from 'react'
import {DragSource, DropTarget} from 'react-dnd';

import {Card, Avatar, Modal, Popover} from 'antd';
import CardForm from "./CardForm";
const confirm = Modal.confirm;

const cardSource = {
  beginDrag(props) {
    return {
      id: props.card.id,
      originalIndex: props.findCard(props.card.id).index,
      cardType: 'card',
    }
  },

  endDrag(props, monitor) {
    const {id: droppedId, originalIndex} = monitor.getItem()
    const didDrop = monitor.didDrop()

    if (!didDrop) {
      props.moveCard(droppedId, originalIndex)

      confirm({
        title: 'Warning',
        content: 'Are you sure to delete this layer?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          props.removeCard(originalIndex)
        },
        onCancel() {
        },
      });
    }
  },
}

const cardTarget = {
  canDrop() {
    return false
  },

  hover(props, monitor) {
    const {id: draggedId, type: draggedType} = monitor.getItem();
    const {id: overId} = props.card;

    if (draggedId !== overId) {
      const {index: overIndex} = props.findCard(overId);
      props.moveCard(draggedId, overIndex);
    }
  },

  drop(props, moniter) {
  }
}

@DropTarget('card', cardTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))
@DragSource('card', cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export default class BuildCard extends Component {

  render() {
    const {
      index,
      card,
      isDragging,
      isOver,
      connectDragSource,
      connectDropTarget,
    } = this.props
    const opacity = isOver || isDragging ? 0 : 1
    const opacity1 = isOver || isDragging ? 0.2 : 1

    return connectDragSource(
      connectDropTarget(<div>
        <Popover placement="top" content={
          <CardForm card={card}/>
        } title="setting" trigger="click">


        <Card
          hoverable
          style={{ marginBottom: 20, opacity: opacity1 }}
          bodyStyle={{ height: 80 }}
        >
          <Card.Meta
            style = {{opacity}}
            avatar={<Avatar
              style={{color: '#e2e4f5', backgroundColor: '#1e75fd', verticalAlign: 'middle'}}
              size="small">{index}</Avatar>}
            description={card.ctype}
          />
        </Card>
        </Popover>

      </div>),
    )
  }
}
