import { stringify } from 'qs';
import request from '../utils/request';

import {apiUrl, hadoopUrl} from './config';

export async function login(params) {
  return request(`${apiUrl}/user/session`, {
    method: 'POST',
    body: params,
  });
}

export async function register(params) {
  return request(`${apiUrl}/user`, {
    method: 'POST',
    body: params,
  });
}

export async function addWorkspace(name) {
  return request(`${apiUrl}/workspace`, {
    method: 'POST',
    body: {
      userId: localStorage.getItem('id'),
      name,
    },
  });
}

export async function deleteWorkspace(id) {
  return request(`${apiUrl}/workspace?id=${id}`, {
    method: 'DELETE',
  });
}

export async function queryWorkspaces() {
  return request(`${apiUrl}/workspace?userId=${localStorage.getItem('id')}`);
}

export async function queryWorkspaceById(id) {
  return request(`${apiUrl}/workspace?id=${id}`);
}

export async function addModel({workspaceId, name}) {
  return request(`${apiUrl}/model`, {
    method: 'POST',
    body: {
      workspaceId,
      name,
    },
  });
}

export async function saveModel(params) {
  return request(`${apiUrl}/model`, {
    method: 'PUT',
    body: params,
  });
}


export async function deleteModel(id) {
  return request(`${apiUrl}/model?id=${id}`, {
    method: 'DELETE'
  });
}

export async function queryModels(workspaceId) {
  return request(`${apiUrl}/model?workspaceId=${workspaceId}`);
}

export async function queryModelById(id) {
  return request(`${apiUrl}/model?id=${id}`);
}

export async function queryJob(id) {
  return request(`${apiUrl}/job?id=${id}`);
}

export async function queryJobByModel(id) {
  return request(`${apiUrl}/job?modelId=${id}`);
}

export async function createJob(params) {
  return request(`${apiUrl}/job`, {
    method: 'POST',
    body: params,
  });
}

export async function startJob(id) {
  return request(`${apiUrl}/job/start?id=${id}`, {
    method: 'POST',
  });
}

export async function queryDatasets() {
  return request(`${hadoopUrl}/dataset`);
}

export async function downloadDataset(id) {
  return request(`${hadoopUrl}/dataset/download?id=${id}`);
}

export async function uploadDataset(params) {
  return request(`${hadoopUrl}/dataset`, {
    method: 'POST',
    body: params,
  });
}

