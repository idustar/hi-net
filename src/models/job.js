import {queryJob, createJob, startJob, queryJobByModel} from '../services/api';
import {routerRedux} from 'dva/router';
import {notification} from 'antd';

export default {
  namespace: 'job',

  state: {
    jobs: [],
    job: {},
    lossAmount: 0,
  },

  effects: {
    * run({payload}, {call, put, select}) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      yield put({
        type: 'setRunConfig',
        payload,
      });
      const id = yield select(state => state.model.model.id);
      const {epochs, batchSize} = yield select(state => state.job);
      const response = yield call(createJob, {
        modelId: id,
        epochs,
        batchSize
      });
      setTimeout(()=>put({type: 'train'}), 5000);
      if (response.code === 200 && response.result && response.result.id) {
        yield put({type: 'fetch'});
        const response1 = yield call(startJob, response.result.id);
        if (response1.code === 200) {
          notification.success({message: 'Start Running!'});
        } else {
          notification.error({message: 'Run Failed!'});
        }
      } else {
        notification.error({message: 'Create Failed!'});
      }
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    * train(_, {call, put, select}) {
      console.log('hello')
    },

    * fetch({payload}, {call, put, select}) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const id = yield select(state => state.model.model.id);
      const response = yield call(queryJobByModel, payload ? payload : id);
      yield put({
        type: 'queryJobs',
        payload: Array.isArray(response.result) ? response.result : [],
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    * fetchJob({payload}, {call, put, select}) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryJob, payload);
      yield put({
        type: 'queryJob',
        payload: response.result,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
  },

  reducers: {
    queryJobs(state, {payload}) {
      return {
        ...state,
        jobs: payload,
        job: payload.length ? payload[payload.length - 1] : undefined,
      }
    },
    queryLossAmount(state, {payload}) {
      return {
        ...state,
        lossAmount: payload
      }
    },
    queryJob(state, {payload}) {
      return {
        ...state,
        job: payload,
      }
    },
    setRunConfig(state, {payload}) {
      return {
        ...state,
        epochs: payload.epochs,
        batchSize: payload.batchSize,
      }
    },
  },
};
