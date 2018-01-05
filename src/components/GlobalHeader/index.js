import React, {PureComponent} from 'react';
import {Layout, Menu, Icon, Spin, Tag, Dropdown, Avatar, Divider, Tooltip} from 'antd';

import Debounce from 'lodash-decorators/debounce';
import {Link} from 'dva/router';
import styles from './index.less';

const {Header} = Layout;

export default class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }

  toggle = () => {
    const {collapsed, onCollapse} = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  }

  @Debounce(600)
  triggerResizeEvent() { // eslint-disable-line
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }

  render() {
    const {
      currentUser, collapsed, isMobile, logo,
      onMenuClick,
    } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="logout"><Icon type="logout"/>Logout</Menu.Item>
      </Menu>
    );

    return (
      <Header className={styles.header}>
        {isMobile && (
          [
            (
              <Link to="/" className={styles.logo} key="logo">
                <img src={logo} alt="logo" width="32"/>
              </Link>
            ),
            <Divider type="vertical" key="line"/>,
          ]
        )}
        <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />


        <div className={styles.right}>
          <Tooltip placement="bottom" title="home">
            <Icon
              className={styles.trigger}
              type="home"
            />
          </Tooltip>
          <Tooltip placement="bottom" title="community">
            <Icon
              className={styles.trigger}
              type="team"
            />
          </Tooltip>
          <Tooltip placement="bottom" title="console">
            <Icon
              className={styles.trigger}
              type="code-o"
            />
          </Tooltip>
          {currentUser.name ? (
            <Dropdown overlay={menu}>
              <span className={`${styles.action} ${styles.account}`}>
                <Avatar size="small" className={styles.avatar} src={currentUser.avatar}/>
                <span className={styles.name}>{currentUser.name}</span>
              </span>
            </Dropdown>
          ) : <Spin size="small" style={{marginLeft: 8}}/>}
        </div>
      </Header>
    );
  }
}
