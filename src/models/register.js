import { register } from '../services/api';

export default {
  namespace: 'register',

  state: {
    code: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      const response = yield call(register, payload);
      if (response.code === 200) {
        localStorage.setItem('id', response.result.id);
        localStorage.setItem('email', response.result.email);
      }
      yield put({
        type: 'registerHandle',
        payload: response,
      });
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      return {
        ...state,
        code: payload.code,
      };
    },
    changeSubmitting(state, { payload }) {
      return {
        ...state,
        submitting: payload,
      };
    },
  },
};
