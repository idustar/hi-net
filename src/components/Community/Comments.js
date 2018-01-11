import React, {Component} from 'react';
import {connect} from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Input,
  Icon,
  Tag,
  Card,
  Button,
  Avatar,
  List,
} from 'antd';
import styles from './Comments.less';
import {dateFtt} from '../../utils/utils'

const Search = Input.Search;
const {Meta} = Card;


export default class AllPost extends Component {
  constructor(props) {
    super(props);
    this.onCreate = this.onCreate.bind(this);
  }

  onCreate() {
    setTimeout(() => {
      this.onShow();
      this.setState({
        newPost: false,
      })
    }, 500);
  }

  componentDidMount() {
    this.onShow();
  }

  onShow() {
    this.props.dispatch({
      type: 'post/fetchComments',
      payload: this.props.postId,
    });
  }

  onComment (value) {
    this.props.dispatch({
      type: 'post/addComment',
      payload: {
        userId: localStorage.getItem('email'),
        postId: this.props.postId,
        content: value,
      },
    });
    setTimeout(() => this.onShow(), 500);
  }

  componentWillUnmount() {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'list/fetch',
    // });
  }

  render() {
    const {postId, list, loading} = this.props;
    const userId = localStorage.getItem('email');

    const IconText = ({type, text, onClick}) => (
      <span onClick={onClick}>
        <Icon type={type} style={{marginRight: 8}}/>
        {text}
      </span>
    );

    const ListContent = ({data: {content, timeStamp, userId}}) => (
      <div className={styles.listContent}>
        <div className={styles.description}>{content}</div>
        <div className={styles.extra}>
          <Avatar size="small" style={{backgroundColor: '#2286ff'}}>{userId.charAt(0)}</Avatar><a>{userId}</a> Commented
          at
          <em>{dateFtt('yyyy-MM-dd hh:mm', timeStamp)}</em>
        </div>
      </div>
    );

    return (
      <div style={{backgroundColor: '#fafafa'}}>
        <List
          style={{paddingLeft: 60}}
          size="large"
          loading={list.length === 0 ? loading : false}
          rowKey="postId"
          itemLayout="vertical"
          dataSource={loading ? [] : list}
          renderItem={item => (
            <List.Item
              key={item.postId}
              actions={[
                <IconText type="like-o" text='like'/>,
                <IconText type="message" text='reply'/>,
                item.userId === userId ? <IconText type="delete" text='delete'
                /> : null,
              ]}
              extra={<div className={styles.listItemExtra}/>}
            >
              <ListContent data={item}/>
            </List.Item>
          )}
        />
        <Search placeholder="Share your idea..." onSearch={value => this.onComment(value)}
                enterButton="Comment" size="default"/>

      </div>
    );
  }
}
