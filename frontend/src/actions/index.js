import * as APIUtil from '../util/api';


/**Get Categories */
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";

export const receiveCategories = categories => ({
    type: RECEIVE_CATEGORIES,
    categories
});

export const getCategories = () => dispatch => (
    APIUtil.getCategories()
        .then((resp) => resp.json()) // Transform the data into json
        .then(data => dispatch(receiveCategories(data)))
);


/**Get All Posts */
export const RECEIVE_POSTS = "RECEIVE_POSTS";

export const receivePosts = posts => ({
    type: RECEIVE_POSTS,
    posts
});

export const getPosts = () => dispatch => (
    APIUtil.getPosts()
        .then((resp) => resp.json()) // Transform the data into json
        .then(data => dispatch(receivePosts(data)))
);


/**Get Posts By Cateogry */
export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY';

export function getPostsByCategory( category ) {
    console.log('ACTION getPostsByCategory cat:',category);
    return {
        type: GET_POSTS_BY_CATEGORY,
        category
    }
}


/**Get a Post */
export const GET_POST = 'GET_POST';

export function getPost({ id }) {
    return {
        type: GET_POST,
        id
    }
}

/**Get Comments for a Post */
export const RECEIVE_POST_COMMENTS = "RECEIVE_POST_COMMENTS";

export const receivePostComments = comments => ({
    type: RECEIVE_POST_COMMENTS,
    comments
});

export const getPostComments = (id) => dispatch => (
    APIUtil.getPostComments(id)
        .then((resp) => resp.json()) // Transform the data into json
        .then(data => dispatch(receivePostComments(data)))
);


/**Add Posts */
export const ADD_POST = 'ADD_POST';

let nextId = 1;

export function addPost({ title, user, category, text }) {
    return {
        type: ADD_POST,
        id: nextId++,
        title,
        user,
        category,
        text
    }
}