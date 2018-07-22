import * as ACTIONS from '../actions/types'

const post = (state = {}, action) => {
  switch (action.type) {
    case ACTIONS.GET_POST:
    case ACTIONS.ADD_POST:
    case ACTIONS.EDIT_POST:
    case ACTIONS.VOTE_POST:
        return action.post
    case ACTIONS.DELETE_POST:
      return state.map(post => post.id !== action.post.id)
    default:
      return state
  }
}

export default post
