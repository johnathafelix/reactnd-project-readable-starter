const API_URL = 'http://localhost:3001'

const headers = {
  'Accept': 'application/json',
  'Authorization': 'johnatha-leitura-nd',
  'Content-Type': 'application/json',
}

export const getServerCategories = () => {
  return fetch(`${API_URL}/categories`, { headers })
    .then(response => response.json())
    .then(ret => ret.categories)
}

export const getServerPosts = () => {
  return fetch(`${API_URL}/posts`, { headers })
    .then(response => response.json())
}

export const getServerPostsByCategory = (category) => {
  return fetch(`${API_URL}/${category}/posts`, { headers })
    .then(response => response.json())
}

export const getServerComments = (id) => {
  return fetch(`${API_URL}/posts/${id}/comments`, { headers })
    .then(response => response.json())
}

export const getServerComment = (id) => {
  return fetch(`${API_URL}/comments/${id}`, { headers })
    .then(response => response.json())
}

export const deleteServerComment = (id) => {
  return fetch(`${API_URL}/comments/${id}`, {
    method: 'DELETE',
    headers
  })
}

export const addServerComment = (addComment) => {
  return fetch(`${API_URL}/comments`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(addComment)
  })
}

export const editServerComment = (id, editComment) => {
  return fetch(`${API_URL}/comments/${id}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(editComment)
  })
}

export const voteServerComment = (id, option) => {
  return fetch(`${API_URL}/comments/${id}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      option: option
    })
  })
}

export const addServerPost = (addPost) => {
  return fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(addPost)
  })
}

export const editServerPost = (id, editPost) => {
  return fetch(`${API_URL}/posts/${id}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(editPost)
  })
}

export const getServerPost = (postId) => {
  return fetch(`${API_URL}/posts/${postId}`, { headers })
    .then(response => response.json())
}

export const voteServerPost = (id, option) => {
  return fetch(`${API_URL}/posts/${id}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      option: option
    })
  })
}

export const deleteServerPost = (id) => {
  return fetch(`${API_URL}/posts/${id}`, {
    method: 'DELETE',
    headers
  })
}
