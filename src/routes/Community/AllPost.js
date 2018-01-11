import React, {Component} from 'react';
import {connect} from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Icon,
  Tag,
  Card,
  Button,
  Avatar,
  List,
} from 'antd';
import AddPost from '../../components/Community/AddPost';
import PostCard from "../../components/Community/PostCard";
import styles from './AllPost.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const {Meta} = Card;


@connect((state) => ({
  list: state.post.list,
  loading: state.post.loading,
}))
export default class AllPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPost: false
    }
    this.setNewPost = this.setNewPost.bind(this);
  }

  setNewPost () {
    this.setState({
      newPost: !this.state.newPost,
    })
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'post/fetchList',
    });
  }

  componentWillUnmount() {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'list/fetch',
    // });
  }

  render() {
    const {list, loading} = this.props;

    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );

    const ListContent = ({ data: { content, timestamp, userId } }) => (
      <div className={styles.listContent}>
        <div className={styles.description}>{content}</div>
        <div className={styles.extra}>
          <Avatar size="small" style={{backgroundColor: '#2286ff'}}>{userId.charAt(0)}</Avatar><a>{userId}</a> Published at
          <em>{moment(timestamp).format('YYYY-MM-DD hh:mm')}</em>
        </div>
      </div>
    );

    return (
      <PageHeaderLayout
        title='Community'
        content={''}
      >
      <div className={styles.container}>
        <Card

          style={{ marginTop: 0 }}
          bordered={false}
          bodyStyle={{ padding: '16px 16px 16px 16px', textAlign: 'center' }}
        >
          {!this.state.newPost ?
            <div style={{width: '100%', cursor: 'pointer'}} onClick={this.setNewPost}><Icon type="plus" /> New Post</div>
            :
            <div style={{width: '100%', cursor: 'pointer'}} onClick={this.setNewPost}>
              Fold
            </div>
          }
        </Card>
        <Card
          style={{ marginTop: 10 }}
          bordered={false}
          bodyStyle={{ padding: '8px 32px 32px 32px' }}
        >
          <List
            size="large"
            loading={list.length === 0 ? loading : false}
            rowKey="postId"
            itemLayout="vertical"
            dataSource={list}
            renderItem={item => (
              <List.Item
                key={item.id}
                actions={[
                  <IconText type="search" text='view' />,
                  <IconText type="like-o" text='like' />,
                  <IconText type="message" text='comment' />,
                ]}
                extra={<div className={styles.listItemExtra} />}
              >
                <List.Item.Meta
                  title={(
                    <a className={styles.listItemMetaTitle}>{item.title}</a>
                  )}
                  description={
                      <Tag>Hi, net</Tag>
                  }
                />
                <ListContent data={item} />
              </List.Item>
            )}
          />
        </Card>
      </div>
      </PageHeaderLayout>
    );
  }
}
