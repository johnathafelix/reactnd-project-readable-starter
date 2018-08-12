import { getServerPosts, getServerCategories, getServerComments } from '../services'

export const GET_POSTS = 'GET_POSTS'
export const GET_COMMENTS = 'GET_COMMENTS'
export const GET_CATEGORIES = 'GET_CATEGORIES'

export function getPosts(posts) {
    console.log('action creator getposts')
    console.log(posts)
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