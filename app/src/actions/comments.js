import { getServerComments, addServerComment, getServerComment, editServerComment, deleteServerComment, voteServerComment, } from '../utils/apiUtils'

import * as ACTIONS from './types'

function getComments(postId, comments) {
  return {
    type: ACTIONS.GET_COMMENTS,
    postId,
    comments
  }
}

function getComment(comment) {
  return { type: ACTIONS.GET_COMMENT, comment }
}

function addComment(comment) {
  return { type: ACTIONS.ADD_COMMENT, comment }
}

function editComment(comment) {
  return { type: ACTIONS.EDIT_COMMENT, comment }
}

function deleteComment(comment) {
  return { type: ACTIONS.DELETE_COMMENT, comment }
}

function voteComment(comment) {
  return { type: ACTIONS.VOTE_COMMENT, comment }
}

export const voteCommentOnServer = (commentId, option) => dispatch => (
  voteServerComment(commentId, option).then(comment => dispatch(voteComment(comment))
  )
)

export const deleteCommentOnServer = (commentId) => dispatch => (
  deleteServerComment(commentId).then(comment => dispatch(deleteComment(comment))
  )
)

export const editCommentOnServer = (commentId, comment) => dispatch => (
  editServerComment(commentId, comment).then(comment => dispatch(editComment(comment))
  )
)

export const addCommentOnServer = ({ comment }) => dispatch => (
  addServerComment(comment).then(comment => dispatch(addComment(comment))
  )
)

export const getCommentFromServer = (commentId) => dispatch => (
  getServerComment(commentId).then(comment => dispatch(getComment(comment))
  )
)

export const getCommentsFromServer = (postId) => dispatch => (
  getServerComments(postId).then(comments => dispatch(getComments(postId, comments))
  )
)
