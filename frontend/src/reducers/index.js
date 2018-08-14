import {
  GET_POSTS,
  GET_COMMENTS,
  GET_CATEGORIES,
  UPVOTE_POST,
  DOWNVOTE_POST,
  GET_POSTS_BY_CATEGORY,
  ORDER_POSTS_BY_TITLE,
  ORDER_POSTS_BY_SCORE,
  ORDER_POSTS_BY_TIMESTAMP,
  GET_POST,
  UPDATE_POST,
  DELETE_POST,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,
  ADD_POST,
  GET_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
} from '../actions'

const initialState = {
  posts: [],
  comments: [],
  categories: []
}

function readableReducer(state = initialState, action) {
  let copyPosts = null
  let currentPosts = null
  let copyComments = null
  let currentComments = null

  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.posts
      }

    case GET_COMMENTS:
      return {
        ...state,
        comments: action.comments
      }

    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.categories
      }

    case UPVOTE_POST:
      copyPosts = [...state.posts]
      currentPosts = copyPosts.map((post) => {
        if (action.post.id === post.id) {
          post.voteScore = post.voteScore + 1
        }
        return post
      })
      return {
        ...state,
        posts: currentPosts,
      }

    case DOWNVOTE_POST:
      copyPosts = [...state.posts]
      currentPosts = copyPosts.map((post) => {
        if (action.post.id === post.id) {
          post.voteScore = post.voteScore - 1
        }
        return post
      })
      return {
        ...state,
        posts: currentPosts,
      }

    case GET_POSTS_BY_CATEGORY:
      return {
        ...state,
        posts: action.posts
      }

    case ORDER_POSTS_BY_TITLE:
      copyPosts = [...state.posts]
      currentPosts = copyPosts
      return {
        ...state,
        posts: currentPosts
      }

    case ORDER_POSTS_BY_SCORE:
      copyPosts = [...state.posts]
      currentPosts = copyPosts
      return {
        ...state,
        posts: currentPosts
      }

    case ORDER_POSTS_BY_TIMESTAMP:
      copyPosts = [...state.posts]
      currentPosts = copyPosts
      return {
        ...state,
        posts: currentPosts
      }

    case GET_POST:
      return {
        ...state,
        posts: [action.post]
      }

    case UPDATE_POST:
      return {
        ...state,
      }

    case DELETE_POST:
      return {
        ...state,
      }

    case UPVOTE_COMMENT:
      copyComments = [...state.comments]
      currentComments = copyComments.map((comment) => {
        if (action.comment.id === comment.id) {
          comment.voteScore = comment.voteScore + 1
        }
        return comment
      })
      return {
        ...state,
        posts: currentComments,
      }

    case DOWNVOTE_COMMENT:
      copyComments = [...state.comments]
      currentComments = copyComments.map((comment) => {
        if (action.comment.id === comment.id) {
          comment.voteScore = comment.voteScore - 1
        }
        return comment
      })
      return {
        ...state,
        posts: currentComments,
      }

    case ADD_POST:
      return {
        ...state,
      }

    case GET_COMMENT:
      return {
        ...state,
        comments: [action.comments]
      }

    case UPDATE_COMMENT:
      return {
        ...state,
      }

    case DELETE_COMMENT:
      return {
        ...state,
      }

    default:
      return state
  }
}

export default readableReducer
