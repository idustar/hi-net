import React, {Component} from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router';
import moment from 'moment';
import {
  Row,
  Col,
  Icon,
  Tag,
  Card,
  Button,
  Divider,
  Avatar,
  List,
} from 'antd';
import PostForm from "../../components/Community/PostForm";
import Comments from "../../components/Community/Comments";
import styles from './AllPost.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {dateFtt} from '../../utils/utils'

const {Meta} = Card;


@connect((state) => ({
  list: state.post.list,
  loading: state.post.loading,
  comments: state.post.comments,
  commentLoading: state.post.commentLoading,
}))
export default class AllPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPost: false,
      current: null,
    }
    this.onCreate = this.onCreate.bind(this);
  }

  setNewPost() {
    this.setState({
      newPost: !this.state.newPost,
    })
  }

  queryComment(postId) {
    if (this.state.current === postId) {
      this.setState({
        current: null,
      })
    } else {
      this.setState({
        current: postId,
      })
    }
  }

  onDelete(postId) {
    console.log('delete', postId),
      this.props.dispatch({
        type: 'post/remove',
        payload: postId
      });
    setTimeout(() => this.onShow(), 500);
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
    if (this.props.match.url === '/community') {
      this.props.dispatch({
        type: 'post/fetchList',
      });
    } else {
      this.props.dispatch({
        type: 'post/fetchUserList',
        payload: this.props.match.params.id ? this.props.match.params.id : localStorage.getItem('email'),
      });
    }

  }

  componentWillUnmount() {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'list/fetch',
    // });
  }

  render() {
    const {list, loading, match} = this.props;
    const userId = localStorage.getItem('email');

    const IconText = ({type, text, onClick}) => (
      <span onClick={onClick}>
        <Icon type={type} style={{marginRight: 8}}/>
        {text}
      </span>
    );

    const ListContent = ({data: {content, timeStamp, userId, postId}}) => (
      <div className={styles.listContent}>
        <div className={styles.description}>{content}</div>
        <div className={styles.extra}>
          <Avatar size="small" style={{backgroundColor: '#2286ff'}}>{userId.charAt(0)}</Avatar>
          <Link to={`/posts/${userId}`}>{userId}</Link> Published
          at
          <em>{dateFtt('yyyy-MM-dd hh:mm', timeStamp)}</em>
        </div>
      </div>
    );

    return (
      <PageHeaderLayout
        title={match.url === '/community' ? 'Community' :
          (match.params.id ? (match.params.id + "'s Posts") : 'My Posts')}
        content={''}
      >
        <div className={styles.container}>
          {this.props.match.url === '/community' ?
            <Card

              style={{marginTop: 0}}
              bordered={false}
              bodyStyle={{padding: '16px 16px 16px 16px', textAlign: 'center'}}
            >
              {!this.state.newPost ?
                <div style={{width: '100%', cursor: 'pointer'}} onClick={() => this.setNewPost()}><Icon
                  type="plus"/> New
                  Post</div>
                :
                <div>
                  <PostForm callback={() => this.onShow()}/>
                  <div style={{width: '100%', cursor: 'pointer'}} onClick={() => this.setNewPost()}>
                    <Icon type="up"/> Fold
                  </div>
                </div>
              }
            </Card> : null}
          <Card
            style={{marginTop: 10}}
            bordered={false}
            bodyStyle={{padding: '8px 32px 32px 32px'}}
          >
            <List
              size="large"
              loading={list.length === 0 ? loading : false}
              rowKey="postId"
              itemLayout="vertical"
              dataSource={list}
              renderItem={item => (<div style={{borderBottom: '1px solid #eeeeee'}}>
                  <List.Item
                    key={item.postId}
                    actions={[
                      <IconText type="like-o" text='like'/>,
                      <IconText type="message" text='comment' onClick={() => this.queryComment(item.postId)}/>,
                      item.userId === userId ? <IconText type="delete" text='delete'
                                                         onClick={() => this.onDelete(item.postId)}/> : null,
                    ]}
                    extra={<div className={styles.listItemExtra}/>}
                  >
                    <List.Item.Meta
                      title={(
                        <a className={styles.listItemMetaTitle}>{item.title}</a>
                      )}
                      description={
                        <Tag>Hi, net</Tag>
                      }
                    />
                    <ListContent data={item}/>
                  </List.Item>
                  {item.postId === this.state.current ?
                    <div>
                      <Comments postId={item.postId} loading={this.props.commentLoading}
                                dispatch={this.props.dispatch} list={this.props.comments}/></div> : null}
                </div>
              )}
            />
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
