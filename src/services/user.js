import request from '../utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  if (localStorage.hasOwnProperty('id')) {
    return {
      id: localStorage.getItem('id'),
      email: localStorage.getItem('email'),
    }
  } else {
    return {
      error: true
    }
  }
}
