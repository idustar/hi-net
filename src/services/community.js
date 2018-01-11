import { stringify } from 'qs';
import request from '../utils/request';

const apiUrl = 'http://hi-net-community-server.azurewebsites.net';

export async function getAllPosts() {
  return request(`${apiUrl}/posts`);
}

export async function getPost(postId) {
  return request(`${apiUrl}/posts/post?postId=${postId}`);
}

export async function addPost(params) {
  return request(`${apiUrl}/posts/add`, {
    method: 'POST',
    body: params,
  });
}

export async function updatePost({postId, params}) {
  return request(`${apiUrl}/posts/post?post_id=${postId}`, {
    method: 'POST',
    body: params,
  });
}

export async function deletePost(postId) {
  return request(`${apiUrl}/posts/post?postId=${postId}`, {
    method: 'DELETE',
  });
}

export async function getComments(postId) {
  return request(`${apiUrl}/posts/comment?postId=${postId}`);
}

export async function addComment(params) {
  return request(`${apiUrl}/posts/comment/add`, {
    method: 'POST',
    body: params,
  });
}

export async function deleteComment(postId) {
  return request(`${apiUrl}/posts/comment?postId=${postId}`, {
    method: 'DELETE',
  });
}

export async function addLike({postId, userId}) {
  return request(`${apiUrl}/posts/comment?postId=${postId}&userId=${userId}`, {
    method: 'POST',
  });
}

export async function deleteLike({postId, userId}) {
  return request(`${apiUrl}/posts/comment?postId=${postId}&userId=${userId}`, {
    method: 'DELETE',
  });
}

export async function getPostsByUser(userId) {
  return request(`${apiUrl}/user/posts?userId=${userId}`);
}

