import React from 'react';
import { Input, Icon } from 'antd';
import styles from './index.less';

const map = {
  UserName: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="user" className={styles.prefixIcon} />,
      placeholder: 'your email',
    },
    rules: [{
      required: true, message: 'your email is required',
    }, {
      type: 'email', message: 'email address is invalid.'
    }],
  },
  Password: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="lock" className={styles.prefixIcon} />,
      type: 'password',
      placeholder: 'your password',
    },
    rules: [{
      required: true, message: 'your password is required',
    }],
  }
};

export default map;
