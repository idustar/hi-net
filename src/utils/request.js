import fetch from 'dva/fetch';
import { notification } from 'antd';

const codeMessage = {
  200: 'successfully operated',
  201: 'data has been updated successfully.',
  202: 'the computer will dispose your request soon.',
  204: 'delete successfully!',
  400: 'the request is invalid.',
  401: 'you have no permission to do this.',
  403: 'you are not allowed to do this.',
  404: 'nothing found.',
  406: 'please check your request.',
  410: 'the resource has been deleted.',
  422: 'invalid.',
  500: 'the server responses an error.',
  502: 'gateway error.',
  503: 'timeout.',
  504: 'gateway timeout.',
};
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `Error: ${response.status}: ${response.url}`,
    description: errortext,
  });
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const defaultOptions = {
    credentials: 'same-origin',
  };
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers,
    };
    newOptions.body = JSON.stringify(newOptions.body);
  }

  return fetch(url, newOptions)
    .then(checkStatus)
    .then((response) => {
      if (newOptions.method === 'DELETE' || response.status === 204) {
        return response.text();
      }
      return response.json();
    });
}
