import {queryModelById, saveModel, queryDatasets} from '../services/api';
import {routerRedux} from 'dva/router';
import {notification} from 'antd';

export default {
  namespace: 'model',

  state: {
    globalVariable: {
      iteration: 1,
      lr: 0.01,
      l2: 0.002,
    },
    list: [],
    loading: false,
    model: {},
    epochs: undefined,
    batchSize: undefined,
    self_datasets: [],
    datasets: [{
      id: 11,
      type: 'conv',
      dataset: 'mnist',
      name: 'MNIST',
      amount: 60000,
      description: 'consists of images of handwritten digits. \nMNIST is a classic problem in machine learning. The problem is to look at greyscale 28x28 pixel images of handwritten digits and determine which digit the image represents, for all the digits from zero to nine.',
    }, {
      id: 1,
      type: 'dense',
      dataset: 'iris',
      name: 'Iris',
      amount: 100,
      description: 'This is perhaps the best known database to be found in the pattern recognition literature. The data set contains 3 classes of 50 instances each, where each class refers to a type of iris plant.',
    }, {
      id: 2,
      type: 'conv',
      dataset: 'cifar',
      name: 'Cifar-10',
      amount: 50000,
      description: 'The CIFAR-10 dataset consists of 60000 32x32 color images in 10 classes, with 6000 images per class.',
    }, {
      id: 3,
      type: 'conv',
      dataset: 'emnist-complete',
      name: 'EMNIST ByClass',
      amount: 697932,
      description: '814,255 characters, and 62 unbalanced classes.',
    }, {
      id: 4,
      type: 'conv',
      dataset: 'emnist-merge',
      name: 'EMNIST ByMerge',
      amount: 697932,
      description: '814,255 characters, and 47 unbalanced classes.',
    }, {
      id: 5,
      type: 'conv',
      dataset: 'emnist-balance',
      name: 'EMNIST Balanced',
      amount: 112800,
      description: '131,600 characters, and 47 balanced classes.',
    }, {
      id: 6,
      type: 'conv',
      dataset: 'emnist-letter',
      name: 'EMNIST Letters',
      amount: 88800,
      description: '1145,600 characters, and 26 balanced classes.',
    }, {
      id: 7,
      type: 'conv',
      dataset: 'emnist-digits',
      name: 'EMNIST Digits',
      amount: 240000,
      description: '280,000 characters, and 10 balanced classes.',
    }, {
      id: 8,
      type: 'conv',
      dataset: 'emnist-mnist',
      name: 'EMNIST MNIST',
      amount: 60000,
      description: '70,000 characters, and 10 balanced classes.',
    }, {
      id: 9,
      type: 'rnn',
      amount: 54000,
      dataset: 'shakespeare',
      name: 'Shakespeare',
      description: 'Complete Works of William Shakespeare\nfrom Project Gutenberg',
    }],
    layers: [
      {
        layerId: 0,
        type: 'convolution',
        ctype: 'Convolution Layer',
        filter: 5,
        kernelSize: 3,
        strides: 2,
        padding: 0,
        activation: 'relu',
      },
      {
        type: 'dense',
        layerId: 1,
        ctype: 'Dense Layer',
        outputDim: 200,
        activation: 'relu',
        weightInit: 'xavier',
      },
      {
        layerId: 2,
        type: 'pooling',
        ctype: 'Pooling Layer',
        kernelSize: 2,
        strides: 2,
        poolingType: 'max',
      },
      {
        layerId: 3,
        type: 'dropout',
        ctype: 'Dropout Layer',
        dropoutRate: 0.5,
      },
      {
        layerId: 4,
        ctype: 'Output Layer',
        type: 'output',
        outputNum: 2,
        activation: 'softmax',
        lossFunction: 'neg',
      },
      {
        layerId: 5,
        ctype: 'LSTM Layer',
        type: 'lstm',
        hiddenLayerWidth: 200,
        hiddenLayerCount: 3,
        sequenceLen: 200,
      },
    ],
    cards: [],
  },

  effects: {
    * save(_, {call, put, select}) {
      const layers = yield select(state => state.model.cards);
      const current = yield select(state => state.model.model);
      const globalVariable = yield select(state => state.model.globalVariable);
      if (!current.datasetId) {
        notification.error({message: 'save failed!', description: 'no dataset selected.'});
        return;
      }
      const outputs = layers.filter(e => e.layerId === 4);
      if (outputs.length === 0) {
        notification.error({message: 'Layers are invalid!', description: 'An output layer is required!'});
        return;
      } else if (outputs.length > 1) {
        notification.error({message: 'Layers are invalid!', description: 'Only one output layer in a model!'});
        return;
      } else if (layers[layers.length - 1].layerId !== 4) {
        notification.error({message: 'Layers are invalid!', description: 'The output layer is not the last layer!'});
        return;
      } else if (layers.length === 1) {
        notification.error({message: 'Layers are invalid!', description: 'You must add layers except output layer!'});
        return;
      } else if (layers.length > 12) {
        notification.warning({message: 'Layers are invalid!', description: 'only VIP users can add so many layers!'});
        return;
      }
      const config = {
        userid: parseInt(localStorage.getItem('id'), 10),
        dataset: current.datasetName,
        layers,
        globalVariable,
      };
      const params = {
        id: parseInt(current.id, 10),
        name: current.name,
        type: current.datasetType,
        config: JSON.stringify(config),
        datasetId: current.datasetId,
        datasetName: current.datasetName,
      }
      const response = yield call(saveModel, params);
      if (response.code === 200) {
        notification.success({message: 'saved!'});
      } else {
        notification.error({message: 'save failed!'});
      }
    },
    * dealCard({payload}, {call, put}) {
      yield put({
        type: payload.type,
        payload: payload,
      });
    },

    * run({payload}, {call, put}) {
      yield put({
        type: 'setRunConfig',
        payload,
      });
    },

    * fetch({payload}, {call, put}) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryModelById, payload);
      if (!(response.code && response.code === 200)) {
        yield put(routerRedux.push('/404'));
      } else {
        yield put({
          type: 'queryModel',
          payload: response.result,
        });
      }
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    * fetchDatasets({payload}, {call, put}) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryDatasets);
      if (!(response.code && response.code === 200)) {
        yield put(routerRedux.push('/404'));
      } else {
        yield put({
          type: 'saveDatasets',
          payload: Array.isArray(response.result) ? response.result : [],
        });
      }
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
  },

  reducers: {
    refreshCards(state, {payload: cards}) {
      return {
        ...state, cards,
      }
    },
    reverseCardAttr(state, {payload: {id, values}}) {
      let cards = [...state.cards];
      let index = cards.findIndex(e => e.id === id);
      console.log('index', index);
      if (index >= 0) cards[index] = {...cards[index], ...values}
      return {
        ...state, cards
      }
    },
    saveDatasetId(state, {payload: datasetId}) {
      if (datasetId)
        return {
          ...state,
          cards: [],
          model: {
            ...state.model, datasetId,
            datasetName: state.datasets.find(e => e.id === datasetId).dataset,
            datasetType: state.datasets.find(e => e.id === datasetId).type,
          },
        }
      else
        return {
          ...state,
          cards: [],
          model: {
            ...state.model, datasetId: null,
            datasetName: null,
            datasetType: null,
          },
        }
    },
    saveDatasets(state, {payload}) {
      return {
        ...state,
        self_datasets: payload,
      }
    },
    queryModel(state, action) {
      let model = action.payload;
      if (model.config) {
        const config = JSON.parse(model.config || {});
        model.datasetName = config && config.dataset ? config.dataset : null;
        console.log(model.datasetName);
        model.datasetId = model.datasetName ? state.datasets.find(e => e.dataset === model.datasetName).id : null;
        model.datasetType = model.datasetId ? state.datasets.find(e => e.id === model.datasetId).type : null;
        const cards = Array.isArray(config.layers) ? config.layers : [];
        const globalVariable = config.globalVariable || {};
        return {
          ...state,
          model,
          globalVariable,
          cards,

        };
      } else {
        model.datasetId = null;
        const cards = [];
        const globalVariable = {l2: 0, lr: 0, iteration: 0};
        return {
          ...state,
          model,
          globalVariable,
          cards,
        };
      }

    },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    },
    setRunConfig(state, {payload}) {
      return {
        ...state,
        epochs: payload.epochs,
        batchSize: payload.batchSize,
      }
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    changeGlobalVariable(state, {payload: {key, value}}) {
      const globalVariable = {...state.globalVariable};
      globalVariable[key] = value;
      return {
        ...state,
        globalVariable,
      };
    },
  },
};
