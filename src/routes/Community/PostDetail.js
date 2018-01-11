import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Avatar, List, Icon, Input, Button } from 'antd';
import styles from './PostDetail.less';

const { Secured } = Authorized;
const { Meta } = Card;
const { TextArea } = Input;


@Secured('admin')
@connect(({ item, loading }) => ({
  item,
  loading: loading.models.item,
}))
@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
export default class PostDetail extends Component {

  componentDidMount() {
    this.props.dispatch({
      type: 'item/fetch',
      payload: {
        postId: 'Yqh4LIgX7k',
      },
    });
    this.props.dispatch({
      type: 'list/fetchComments',
      payload: {
        postId: 'Yqh4LIgX7k',
      },
    });
  }

  render() {
    const { list: { list }, loading } = this.props;
    console.log(this.props);
    return (
      <div>
        <Row>
          <Col className={styles.post} span={16} offset={4} style={{ marginBottom: 24 }}>
            <Card bordered={false}>
              <h1 className={styles.postTitle}>Post Title</h1>
              <p className={styles.postContent}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in ex ex. Donec a lacinia risus. Nullam quis lorem lobortis, malesuada enim id, accumsan turpis. Integer tincidunt urna ligula, at feugiat libero volutpat a. Integer auctor, eros non ullamcorper porttitor, ex dolor accumsan urna, ut molestie purus felis non ante. Phasellus ac lorem faucibus, condimentum erat ac, fermentum mi. Suspendisse potenti. Fusce convallis scelerisque dolor, id feugiat sem. Maecenas in mi non turpis posuere bibendum non eget ipsum. Praesent blandit, nunc sed efficitur mattis, tellus magna elementum velit, a ullamcorper neque risus quis nibh. Pellentesque ut mollis velit. Maecenas rutrum justo ligula, ac luctus tortor tristique at.

                Fusce nulla diam, pellentesque sit amet fermentum ut, rhoncus varius nisl. Nullam pharetra libero sed egestas accumsan. Etiam rhoncus purus sit amet mollis consectetur. Integer sed libero id sapien rhoncus varius. Nunc felis urna, pharetra ut justo ut, pharetra volutpat ex. Quisque libero lorem, sodales at tincidunt eu, blandit ut est. Duis aliquet nec velit sit amet sodales. Curabitur vel nunc diam. In commodo nulla a massa iaculis pellentesque.
              </p>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={16} offset={4} style={{ marginBottom: 24 }}>
            <Card title="Comments" bordered={false}/>
          </Col>
        </Row>

        <List
          rowKey="id"
          dataSource={['', ...list]}
          split={false}
          renderItem={item =>( item? (
              <List.Item key={item.id} >
                <Col span={16} offset={4}>
                  <Card
                    loading={loading}
                    bordered={false}
                  >
                    <Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={item.title}
                      description={item.description}
                    />
                  </Card>
                </Col>
              </List.Item>
            ) : (<div></div>)
          )}
        />
        <Row>
          <Col span={16} offset={4} style={{ marginBottom: 24 }}>
            <Card title="Add Comments" bordered={false}>
              <TextArea placeholder="Your Comment Here ..." autosize={{ minRows: 2, maxRows: 4 }} />
              <Row>
                <Col span={4} offset={20}>
                  <Button style={{ marginTop: 20 }}>Comment</Button>
                </Col>
              </Row>

            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
