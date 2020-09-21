
const headers = new Headers({
  "Accept": "application/json",
  "Content-Type": "application/json",
});

function get(url) {
  return fetch(url, {
    method: "GET",
    headers: headers,
    credentials: "include"  
  }).then(response => {
    return handleResponse(url, response);
  }).catch(err => {
    console.error(`Request failed. Url = ${url} . Message = ${err}`);
    return  { msg: "Request failed.", code: "404" ,error:"Request failed." };
  })
}

function _delete(url) {
  return fetch(url, {
    method: "DELETE",
    headers: headers,
    credentials: "include"  
  }).then(response => {
    return handleResponse(url, response);
  }).catch(err => {
    console.error(`Request failed. Url = ${url} . Message = ${err}`);
    return {  msg: "Request failed.", code: "404" ,error:"Request failed." };
  })
}

function put(url, params) {
  return fetch(url, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(params),
    credentials: "include"  
  }).then(response => {
    return handleResponse(url, response);
  }).catch(err => {
    console.error(`Request failed. Url = ${url} . Message = ${err}`);
    return { msg: "Request failed.", code: 404,error:"Request failed."  };
  })
}


function post(url, params) {
  return fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(params),
    credentials: "include"  
  }).then(response => {
    return handleResponse(url, response);
  }).catch(err => {
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