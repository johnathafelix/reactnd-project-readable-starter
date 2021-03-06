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
  ADD_COMMENT
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
      copyPosts = [...action.posts]
      currentPosts = copyPosts.filter(post => !post.deleted)
      return {
        ...state,
        posts: currentPosts
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
      currentPosts = state.posts.map((post) => {
        if (action.post.id === post.id) {
          return {
            ...post,
            voteScore: post.voteScore + 1
          }
        }
        return post
      })
      return {
        ...state,
        posts: currentPosts,
      }

    case DOWNVOTE_POST:
      currentPosts = state.posts.map((post) => {
        if (action.post.id === post.id) {
          return {
            ...post,
            voteScore: post.voteScore - 1
          }
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
      return {
        ...state,
        posts: action.orderedPosts,
      }

    case ORDER_POSTS_BY_SCORE:
      return {
        ...state,
        posts: action.orderedPosts,
      }

    case ORDER_POSTS_BY_TIMESTAMP:
      return {
        ...state,
        posts: action.orderedPosts,
      }

    case GET_POST:
      console.log('get post', action)
      return {
        ...state,
        posts: [action.post]
      }

    case UPDATE_POST:
      return {
        ...state,
      }

    case DELETE_POST:
      copyPosts = [...state.posts]
      currentPosts = copyPosts.map((post) => {
        if (post.id === action.postId) {
          return {...post, deleted: true}
        }
        return post
      })
      return {
        ...state,
        posts: currentPosts
      }

    case UPVOTE_COMMENT:
      copyComments = [...state.comments]
      currentComments = copyComments.map((comment) => {
        if (action.comment.id === comment.id) {
          return {
            ...comment,
            voteScore: comment.voteScore + 1
          }
        }
        return comment
      })
      return {
        ...state,
        comments: currentComments,
      }

    case DOWNVOTE_COMMENT:
      copyComments = [...state.comments]
      currentComments = copyComments.map((comment) => {
        if (action.comment.id === comment.id) {
          return {
            ...comment,
            voteScore: comment.voteScore - 1
          }
        }
        return comment
      })
      return {
        ...state,
        comments: currentComments,
      }

    case ADD_POST:
      return {
        ...state,
      }

    case GET_COMMENT:
      return {
        ...state,
        comments: [action.comment]
      }

    case UPDATE_COMMENT:
      return {
        ...state,
      }

    case DELETE_COMMENT:
      return {
        ...state,
      }

    case ADD_COMMENT:
      return {
        ...state,
      }

    default:
      return state
  }
}

export default readableReducer
