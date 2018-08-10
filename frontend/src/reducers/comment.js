import * as ACTIONS from '../actions/types'

const initialState = {
  id: null,
  author: null,
  body: null,
  deleted: false,
  parentId: null,
  parentDeleted: false,
  timeStamp: 0,
  voteScore: 0
}

const comment = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_COMMENT:
      state.id = action.comment.id
      state.author = action.comment.author
      state.body = action.comment.body
      state.deleted = action.comment.deleted
      state.parentId = action.comment.parentId
      state.parentDeleted = action.comment.parentDeleted
      state.timeStamp = action.comment.timeStamp
      state.voteScore = action.comment.voteScore
      // console.log(state)
      // return state.filter(comment => action.comment.id === comment.id)
      // console.log(action.comment.id)
      // return action.comment.id
    case ACTIONS.ADD_COMMENT:
    case ACTIONS.EDIT_COMMENT:
      // return state.filter(comment => action.comment.id === comment.id)

    case ACTIONS.DELETE_COMMENT:
    case ACTIONS.VOTE_COMMENT:
      return action.comment
    default:
      return state
  }
}

export default comment
