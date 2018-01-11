import { queryWorkspaces, addWorkspace, deleteWorkspace,
addModel, deleteModel, queryModels, queryWorkspaceById } from '../services/api';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'workspace',

  state: {
    list: [],
    loading: false,
    workspace: {
      name: '',
      id: null,
    },
    models: [],
  },

  effects: {
    *add({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const { result } = yield call(addWorkspace, payload);
      yield put({type: 'fetch'});
    },
    *addModel({ payload }, { call, put, select }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const workspaceId = yield select(state => state.workspace.workspace.id);
      const { result } = yield call(addModel, { workspaceId, name: payload });
      yield put({type: 'fetchModels'});
    },
    *rm({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      yield call(deleteWorkspace, payload);
      yield put({type: 'fetch'});
    },
    *rmModel({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      yield call(deleteModel, payload);
      yield put({type: 'fetchModels'});
    },
    *fetch(_, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const { result } = yield call(queryWorkspaces);
      yield put({
        type: 'queryList',
        payload: Array.isArray(result) ? result : [],
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *fetchModels({ payload }, { call, put, select }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      if (payload) {
        const workspace = yield call(queryWorkspaceById, payload);
        if (workspace.code !== 200) {
          yield put(routerRedux.push('/404'));
        } else {
          yield put({
            type: 'setWorkspace',
            payload: workspace.result,
          });
        }
      }
      const workspace = yield select(state => state.workspace.workspace);
      if (workspace.id) {
        const {result} = yield call(queryModels, workspace.id);
        yield put({
          type: 'queryModels',
          payload: Array.isArray(result) ? result : [],
        });
      }
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *appendFetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    queryModels(state, action) {
      return {
        ...state,
        models: action.payload,
      };
    },
    setWorkspace(state, action) {
      return {
        ...state,
        workspace: action.payload,
      }
    },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
};
