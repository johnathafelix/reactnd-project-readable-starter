import {
  getServerPosts,
  getServerCategories,
  getServerComments,
  voteServerPost,
  getServerPostsByCategory
} from '../services'

export const GET_POSTS = 'GET_POSTS'
export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY'
export const GET_COMMENTS = 'GET_COMMENTS'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'

export function getPosts(posts) {
  return {
    type: GET_POSTS,
    posts,
  }
}

export function getComments(comments) {
  return {
    type: GET_COMMENTS,
    comments,
  }
}

export function getCategories(categories) {
  return {
    type: GET_CATEGORIES,
    categories,
  }
}

export function upVotePost(post) {
  return {
    type: UPVOTE_POST,
    post,
    option: 'upVote',
  }
}

export function downVotePost(post) {
  return {
    type: DOWNVOTE_POST,
    post,
    option: 'downVote',
  }
}

export function getPostsByCategory(category, posts) {
  return {
    type: GET_POSTS_BY_CATEGORY,
    category,
    posts,
  }
}

export const getPostsFromServer = () => dispatch => (
  getServerPosts().then(posts => dispatch(getPosts(posts))
  )
)

export const getCommentsFromServer = () => dispatch => (
  getServerComments().then(comments => dispatch(getComments(comments))
  )
)

export const getCategoriesFromServer = () => dispatch => (
  getServerCategories().then(categories => dispatch(getCategories(categories))
  )
)

export const upVotePostOnServer = (post, option) => dispatch => (
  voteServerPost(post.id, option).then(() => dispatch(upVotePost(post)))
)

export const downVotePostOnServer = (post, option) => dispatch => (
  voteServerPost(post.id, option).then(() => dispatch(downVotePost(post)))
)

export const getPostsByCategoryFromServer = (category) => dispatch => (
  getServerPostsByCategory(category).then(posts => dispatch(getPostsByCategory(category, posts))
  )
)
