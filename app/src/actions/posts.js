import { getServerPosts, getServerPostsByCategory, addServerPost, getServerPost, editServerPost, deleteServerPost, voteServerPost } from '../utils/apiUtils'
import * as ACTIONS from './types'

function getPosts(posts) {
  return {
    type: ACTIONS.GET_POSTS,
    posts
  }
}

function getPostsByCategory(category, posts) {
  return {
    type: ACTIONS.GET_POSTS_BY_CATEGORY,
    category,
    posts
  }
}

function getPost(post) {
  return { type: ACTIONS.GET_POST, post }
}

function addPost(post) {
  return { type: ACTIONS.ADD_POST, post }
}

function editPost(post) {
  return { type: ACTIONS.EDIT_POST, post }
}

function deletePost(post) {
  return { type: ACTIONS.DELETE_POST, post }
}

function votePost(post) {
  return { type: ACTIONS.VOTE_POST, post }
}

export const votePostOnServer = (postId, option) => dispatch => (
  voteServerPost(postId, option).then(post => dispatch(votePost(post))
  )
)

export const deletePostOnServer = (postId) => dispatch => (
  deleteServerPost(postId).then(post => dispatch(deletePost(post))
  )
)

export const editPostOnServer = (postId, post) => dispatch => (
  editServerPost(postId, post).then(post => dispatch(editPost(post))
  )
)

export const addPostOnServer = ({ post }) => dispatch => (
  addServerPost(post).then(post => dispatch(addPost(post))
  )
)

export function sortPosts(sortBy, sortOrder) {
  return { type: ACTIONS.SORT_POSTS, sortBy, sortOrder }
}

export const getPostFromServer = (postId) => dispatch => (
  getServerPost(postId).then(post => dispatch(getPost(post))
  )
)

export const getPostsByCategoryFromServer = (category) => dispatch => (
  getServerPostsByCategory(category).then(posts => dispatch(getPostsByCategory(category, posts))
  )
)

export const getPostsFromServer = () => dispatch => (
  getServerPosts().then(posts => dispatch(getPosts(posts))
  )
)
