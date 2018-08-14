import {
  getServerPosts,
  getServerCategories,
  getServerComments,
  voteServerPost,
  getServerPostsByCategory,
  getServerPost,
  editServerPost,
  deleteServerPost,
  voteServerComment
} from '../services'

export const GET_POSTS = 'GET_POSTS'
export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY'
export const GET_COMMENTS = 'GET_COMMENTS'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const ORDER_POSTS_BY_TITLE = 'ORDER_POSTS_BY_TITLE'
export const ORDER_POSTS_BY_SCORE = 'ORDER_POSTS_BY_SCORE'
export const ORDER_POSTS_BY_TIMESTAMP = 'ORDER_POSTS_BY_TIMESTAMP'
export const GET_POST = 'GET_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT'
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'

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

export function updatePost(post) {
  return {
    type: UPDATE_POST,
    post,
  }
}

export function deletePost(post) {
  return {
    type: DELETE_POST,
    post,
  }
}

export function orderPostsByTitle(posts, option) {
  let orderedPosts = posts.sort((a, b) => {
    return (a.title < b.title ? -1 : a.title > b.title ? 1 : 0)
  })

  if (option === 'desc') {
    orderedPosts = orderedPosts.reverse()
  }

  return {
    type: ORDER_POSTS_BY_TITLE,
    option,
    orderedPosts,
  }
}

export function orderPostsByScore(posts, option) {
  let orderedPosts = posts.sort((a, b) => {
    return (a.voteScore < b.voteScore ? -1 : a.voteScore > b.voteScore ? 1 : 0)
  })

  if (option === 'desc') {
    orderedPosts = orderedPosts.reverse()
  }

  return {
    type: ORDER_POSTS_BY_SCORE,
    option,
    orderedPosts,
  }
}

export function orderPostsByTimeStamp(posts, option) {
  let orderedPosts = posts.sort((a, b) => {
    return (a.timestamp < b.timestamp ? -1 : a.timestamp > b.timestamp ? 1 : 0)
  })

  if (option === 'desc') {
    orderedPosts = orderedPosts.reverse()
  }

  return {
    type: ORDER_POSTS_BY_TIMESTAMP,
    option,
    orderedPosts,
  }
}

export function getPost(post) {
  return {
    type: GET_POST,
    post,
  }
}

export function upvoteComment(comment) {
  return {
    type: UPVOTE_COMMENT,
    comment,
    option: 'upVote'
  }
}

export function downvoteComment(comment) {
  return {
    type: DOWNVOTE_COMMENT,
    comment,
    option: 'downVote'
  }
}

export const getPostsFromServer = () => dispatch => (
  getServerPosts().then(posts => dispatch(getPosts(posts))
  )
)

export const getCommentsFromServer = (postId) => dispatch => (
  getServerComments(postId).then(comments => dispatch(getComments(comments))
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

export const getPostFromServer = (postId) => dispatch => (
  getServerPost(postId).then(post => dispatch(getPost(post))
  )
)

export const updatePostOnServer = (post) => dispatch => (
  editServerPost(post.id, post).then(post => dispatch(updatePost(post))
  )
)

export const deletePostOnServer = (postId) => dispatch => (
  deleteServerPost(postId).then(post => dispatch(deletePost(post))
  )
)

export const upvoteCommentOnServer = (comment, option) => dispatch => (
  voteServerComment(comment.id, option).then(() => dispatch(upvoteComment(comment))
  )
)

export const downvoteCommentOnServer = (comment, option) => dispatch => (
  voteServerComment(comment.id, option).then(() => dispatch(downvoteComment(comment))
  )
)
