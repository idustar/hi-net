import { getAllPosts, getPost, addPost, updatePost, deletePost } from '../services/community';
import { notification } from 'antd';

export default {
  namespace: 'post',

  state: {
    list: [
      {
        postId: "wqLvIbWCVQ",
        userId: "adduser3",
        title: "For most people in the world",
        topic: null,
        keywords: null,
        content: "new content2, For most people in the worlFor most people in the worlFor most people in the worlFor most people in the worlFor most people in the worlFor most people in the worlFor most people in the worl",
        timeStamp: 1515686324016,
      }, {
        postId: "wqLvIbWCVQ",
        userId: "adduser3",
        title: "add new post1111111",
        topic: null,
        keywords: null,
        content: "new content2",
        timeStamp: 1515686324016,
      }, {
        postId: "wqLvIbWCVQ",
        userId: "adduser3",
        title: "add new post1111111",
        topic: null,
        keywords: null,
        content: "new content2",
        timeStamp: 1515686324016,
      }, {
        postId: "wqLvIbWCVQ",
        userId: "adduser3",
        title: "add new post1111111",
        topic: null,
        keywords: null,
        content: "new content2",
        timeStamp: 1515686324016,
      }, {
        postId: "wqLvIbWCVQ",
        userId: "adduser3",
        title: "add new post1111111",
        topic: null,
        keywords: null,
        content: "new content2",
        timeStamp: 1515686324016,
      },
    ],
    item: {},
    loading: true,
  },

  effects: {
    *fetchList({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      // const response = yield call(getAllPosts, payload);
      // if (Array.isArray(response)) {
      //   yield put({
      //     type: 'saveList',
      //     payload: response,
      //   });
      // } else {
      //   notification.error({message: 'get posts failed!'});
      // }
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
  },

  reducers: {
    saveList(state, action) {
      return {
        ...state,
        list: action.payload,
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
  },
};
