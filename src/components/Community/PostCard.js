import React, { Component } from 'react';
import { Link}  from 'dva/router';
import { Avatar, Card, Icon, Modal, Tooltip } from 'antd';

import Ellipsis from '../../components/Ellipsis';

const { Meta } = Card;

export default class PostCard extends Component {
  render() {
    const { post, loading } = this.props;
    return (
      <Card
        loading={loading}
        bordered={true}
        hoverable
        actions={[
          <Link to="/post"><Icon type="search" /></Link>,
          <Icon type="like" />,
          <Link to="/dashboard/monitor"><Icon type="edit" /></Link>]} >
        <Meta
          avatar={<Avatar
            style={{color: '#e2e4f5', backgroundColor: '#1e75fd', verticalAlign: 'middle'}}
            size="small">{post.userId.charAt(0)}</Avatar>}
          title={post.userId}
          description={<Ellipsis lines={1}><h3>{post.title}</h3></Ellipsis>}
        />
      </Card>
    )
  }
}

