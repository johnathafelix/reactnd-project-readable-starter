import {
    GET_CATEGORIES,
    GET_POSTS,
    GET_POSTS_BY_CATEGORY,
    SORT_POSTS,
    GET_POST,
    ADD_POST,
    EDIT_POST,
    DELETE_POST,
    VOTE_POST
} from '../actions/actions'

const initialState = {
    categories = [],
    posts = []
}

function reducer(state = initialState, action) {
    switch(action.type) {
        case 'GET_POSTS':
            return {
                ...state,
                [posts]: action.posts
            }
        default:
            return currentState
    }
}

export default reducer
