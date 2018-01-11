import React, {Component} from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router';
import {Checkbox, Alert, Icon} from 'antd';
import Login from '../../components/Login';
import styles from './Login.less';

const {Tab, UserName, Password, Mobile, Captcha, Submit} = Login;

@connect(state => ({
  login: state.login,
}))
export default class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  }

  onTabChange = (type) => {
    this.setState({type});
  }

  handleSubmit = (err, values) => {
    const {type} = this.state;
    if (!err) {
      this.props.dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  }

  changeAutoLogin = (e) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  }

  renderMessage = (content) => {
    return (
      <Alert style={{marginBottom: 24}} message={content} type="error" showIcon closable/>
    );
  }

  render() {
    const {login} = this.props;
    const {type} = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
        >
          <Tab key="account" tab="Account and password">
            {
              login.code >= 400  &&
              login.submitting === false &&
              this.renderMessage('Wrong username or password.')
            }
            <UserName name="email"/>
            <Password name="password"/>
          </Tab>

          <div>
            <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>Remember Me</Checkbox>
            <Link className={styles.register} style={{float: 'right'}} to="/user/register">New Account</Link>

          </div>
          <Submit>Login</Submit>

        </Login>
      </div>
    );
  }
}
