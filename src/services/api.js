import { stringify } from 'qs';
import request from '../utils/request';

const apiUrl = 'http://192.168.1.103:8081';

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





export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
