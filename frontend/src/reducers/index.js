import {
  GET_POSTS,
  GET_COMMENTS,
  GET_CATEGORIES,
  UPVOTE_POST,
  DOWNVOTE_POST
} from '../actions'

const initialState = {
  posts: [],
  comments: [],
  categories: []
}

function readableReducer(state = initialState, action) {
  let copyPosts = null
  let currentPosts = null

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

    default:
      return state
  }
}

export default readableReducer