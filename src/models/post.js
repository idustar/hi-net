import { getAllPosts, getPost, addPost, updatePost, deletePost,
  getComments, addComment, getPostsByUser} from '../services/community';
import { notification } from 'antd';

export default {
  namespace: 'post',

  state: {
    list: [],
    item: {},
    loading: true,
    commentLoading: true,
    comments: [],
  },

  effects: {
    *fetchList({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(getAllPosts, payload);
      if (Array.isArray(response)) {
        yield put({
          type: 'saveList',
          payload: response,
        });
      } else {
        notification.error({message: 'get posts failed!'});
      }
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *fetchUserList({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(getPostsByUser, payload);
      if (Array.isArray(response)) {
        yield put({
          type: 'saveList',
          payload: response,
        });
      } else {
        notification.error({message: 'get posts failed!'});
      }
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *fetch ({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(getPost, payload);
      if (response.postId) {
        yield put({
          type: 'save',
          payload: response,
        });
      } else {
        notification.error({message: 'get post failed!'});
      }
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *add({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(addPost, payload);
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *put({ payload }, { call, put }) {
      const {postId, params} = payload;
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      yield call(updatePost, {postId, params});
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *remove({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      yield call(deletePost, payload);
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *fetchComments ({ payload }, { call, put }) {
      yield put({
        type: 'changeCommentLoading',
        payload: true,
      });
      const response = yield call(getComments, payload);
      if (Array.isArray(response)) {
        yield put({
          type: 'saveComments',
          payload: response,
        });
      } else {
        notification.error({message: 'get comments failed!'});
      }
      yield put({
        type: 'changeCommentLoading',
        payload: false,
      });
    },
    * addComment ({ payload }, { call, put }) {
      yield put({
        type: 'changeCommentLoading',
        payload: true,
      });
      const response = yield call(addComment, payload);
      yield put({
        type: 'changeCommentLoading',
        payload: false,
      });
    },
  },

  reducers: {
    saveList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveComments(state, action) {
      return {
        ...state,
        comments: action.payload,
      };
    },
    save(state, action) {
      return {
        ...state,
        item: action.payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    changeCommentLoading(state, action) {
      return {
        ...state,
        commentLoading: action.payload,
      };
    },
  },
};
