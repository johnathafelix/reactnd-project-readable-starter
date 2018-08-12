import {
    GET_POSTS,
    GET_COMMENTS,
    GET_CATEGORIES
} from '../actions'

const initialState = {
    posts: null,
    comments: null,
    categories: null
}

function readableReducer(state = initialState, action) {
    switch(action.type) {
        case GET_POSTS:
            console.log('reducer get posts')
            let newState = {
                ...state,
                posts: action.posts
            }
            console.log('newState')
            console.log(newState)
            return newState
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
        default:
            return state
    }
}

export default readableReducer