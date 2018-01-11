import React, {Component} from 'react';
import {Icon, Row, Col, List, Button, Divider, Badge, Popover, InputNumber} from 'antd';
import {DropTarget, DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import BuildCards from './BuildCards';
import LayerCard from './LayerCard';

const style = {}

@DragDropContext(HTML5Backend)
export default class Container extends Component {

  constructor(props) {
    super(props)
    this.moveCard = this.moveCard.bind(this)
    this.findCard = this.findCard.bind(this)
    this.createCard = this.createCard.bind(this)
    this.removeCard = this.removeCard.bind(this)
  }

  setCards(cards) {
    this.props.dispatch({
      type: 'model/refreshCards',
      payload: cards,
    })
  }

  moveCard(id, atIndex) {
    const {card, index} = this.findCard(id)
    let cards = [...this.props.cards];
    cards[index] = cards[atIndex];
    cards[atIndex] = card;
    this.setCards(cards);
  }

  createCard(layerId) {

    const {layers} = this.props;
    let cards = [...this.props.cards];
    cards.push({
      ...layers.find(e => e.layerId === layerId),
      id: parseInt(Math.random() * 100000000, 10),
    });
    this.setCards(cards);
    return cards[cards.length - 1];
  }

  removeCard(index) {
    let cards = [...this.props.cards];
    cards.splice(index, 1);
    this.setCards(cards);
  }

  findCard(id) {
    const {cards} = this.props;
    const card = cards.filter(c => c.id === id)[0]

    return {
      card,
      index: cards.indexOf(card),
    }
  }

  render() {
    const {cards, layers, globalVariable} = this.props
    const {l2, lr, iteration} = globalVariable;
    const changeIteration = (e) => {
      this.props.dispatch({
        type: 'model/changeGlobalVariable',
        payload: {
          key: 'iteration',
          value: e,
        }
      })
    }
    const changeL2 = (e) => {
      this.props.dispatch({
        type: 'model/changeGlobalVariable',
        payload: {
          key: 'l2',
          value: e,
        }
      })
    }
    const changeLr = (e) => {
      this.props.dispatch({
        type: 'model/changeGlobalVariable',
        payload: {
          key: 'lr',
          value: e,
        }
      })
    }

    return (
      <div>
        <Row gutter={20} style={{display: 'flex', marginBottom: 10}}>
          <Popover
            content={
              <div>
                <div style={{marginBottom: 10, display: 'flex',}}>
                  <div style={{width: 100,}}>learning rate</div>
                  <InputNumber min={0} max={1} step={0.01}
                               defaultValue={lr} data-name='lr' onChange={changeLr}/>
                </div>
                <div style={{marginBottom: 10, display: 'flex',}}>
                  <div style={{width: 100,}}>L2 Norm</div>
                  <InputNumber min={0} max={1} step={0.01} data-name='l2'
                               defaultValue={l2} onChange={changeL2}/>
                </div>
                <div style={{marginBottom: 10, display: 'flex',}}>
                  <div style={{width: 100,}}>iteration</div>
                  <InputNumber min={0} step={1} data-name='iteration'
                               defaultValue={iteration} onChange={changeIteration}/>
                </div>
              </div>
            }
            overlayStyle={{width: 240}}
            placement="right"
          >
            <Button type="danger"><Icon type="edit"/>Config</Button>
          </Popover>
          {layers.map((card, index) => (
            <div key={card.layerId}>
              <LayerCard
                layerId={card.layerId}
                text={card.ctype}
                findCard={this.findCard}
                createCard={this.createCard}
                removeCard={this.removeCard}
                stopDrag={this.changeCurrentId}
              />

            </div>
          ))}


        </Row>
        <Divider>
          <span>Layers &nbsp;</span><Badge count={cards.length}></Badge>
        </Divider>
        <Row>


          <BuildCards
            cards={cards}
            moveCard={this.moveCard}
            findCard={this.findCard}
            removeCard={this.removeCard}
            createCard={this.createCard}
          />


        </Row>
      </div>
    )
  }
}
