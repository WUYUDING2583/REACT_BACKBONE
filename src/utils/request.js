import {actions as appActions} from "../redux/modules/app";

const headers = new Headers({
  "Accept": "application/json",
  "Content-Type": "application/json",
});

function get(url) {
  appActions.startGetRequest();
  return fetch(url, {
    method: "GET",
    headers: headers,
    credentials: "include"  
  }).then(response => {
    appActions.finishGetRequest();
    return handleResponse(url, response);
  }).catch(err => {
    appActions.finishGetRequest();
    console.error(`Request failed. Url = ${url} . Message = ${err}`);
    return  { msg: "Request failed.", code: "404" ,error:"Request failed." };
  })
}

function _delete(url) {
  appActions.startDeleteRequest();
  return fetch(url, {
    method: "DELETE",
    headers: headers,
    credentials: "include"  
  }).then(response => {
    appActions.finishDeleteRequest();
    return handleResponse(url, response);
  }).catch(err => {
    appActions.finishDeleteRequest();
    console.error(`Request failed. Url = ${url} . Message = ${err}`);
    return {  msg: "Request failed.", code: "404" ,error:"Request failed." };
  })
}

function put(url, params) {
  appActions.startPutRequest();
  return fetch(url, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(params),
    credentials: "include"  
  }).then(response => {
    appActions.finishPutRequest();
    return handleResponse(url, response);
  }).catch(err => {
    appActions.finishPutRequest();
    console.error(`Request failed. Url = ${url} . Message = ${err}`);
    return { msg: "Request failed.", code: 404,error:"Request failed."  };
  })
}


function post(url, params) {
  appActions.startPostRequest();
  return fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(params),
    credentials: "include"  
  }).then(response => {
    appActions.finishPostRequest();
    return handleResponse(url, response);
  }).catch(err => {
    appActions.finishPostRequest();
    console.error(`Request failed. Url = ${url} . Message = ${err}`);
    return  { msg: "Request failed.", code: 404 ,error:"Request failed."};
  })
}

function handleResponse(url, response) {
  if(response.status===404){
    return { msg: "Request failed.", code: 404 ,error:"Request failed." };
  }
  if (response.status < 500) {
    return response.json();
  } else {
    console.error(`Request failed. Url = ${url} . Message = ${response.statusText}. in handleRequest`);
    return { msg: "Internal error", code: response.statusText,error:"Internal error" };
  }
}

export { post, get, put,_delete };