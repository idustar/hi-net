import { stringify } from 'qs';
import request from '../utils/request';

import {communityUrl} from './config';

export async function getAllPosts() {
  return request(`${communityUrl}/posts`);
}

export async function getPost(postId) {
  return request(`${communityUrl}/posts/post?postId=${postId}`);
}

export async function addPost(params) {
  return request(`${communityUrl}/posts/add`, {
    method: 'POST',
    body: params,
  });
}

export async function updatePost({postId, params}) {
  return request(`${communityUrl}/posts/post?post_id=${postId}`, {
    method: 'POST',
    body: params,
  });
}

export async function deletePost(postId) {
  return request(`${communityUrl}/posts/post?postId=${postId}`, {
    method: 'DELETE',
  });
}

export async function getComments(postId) {
  return request(`${communityUrl}/posts/comment?postId=${postId}`);
}

export async function addComment(params) {
  return request(`${communityUrl}/posts/comment/add`, {
    method: 'POST',
    body: params,
  });
}

export async function deleteComment(postId) {
  return request(`${communityUrl}/posts/comment?postId=${postId}`, {
    method: 'DELETE',
  });
}

export async function addLike({postId, userId}) {
  return request(`${communityUrl}/posts/comment?postId=${postId}&userId=${userId}`, {
    method: 'POST',
  });
}

export async function deleteLike({postId, userId}) {
  return request(`${communityUrl}/posts/comment?postId=${postId}&userId=${userId}`, {
    method: 'DELETE',
  });
}

export async function getPostsByUser(userId) {
  return request(`${communityUrl}/user/posts?userId=${userId}`);
}

