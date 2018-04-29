import * as APIUtil from '../util/api';

/**Get All Posts */
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export function receivePosts(posts) {
    return {
        type: RECEIVE_POSTS,
        posts
    }
};

export const getPosts = () => dispatch => (
    APIUtil.getPosts()
        .then((resp) => resp.json()) // Transform the data into json
        .then(data => dispatch(receivePosts(data)))
);


/**Get Posts By Cateogry */
export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY';

export function getPostsByCategory(category) {
    return {
        type: GET_POSTS_BY_CATEGORY,
        category
    }
}


/**Reorder Posts */
export const REORDER_POSTS = 'REORDER_POSTS';

export function reorderPosts(order) {
    return {
        type: REORDER_POSTS,
        order
    }
}


/**Get a Post */
export const RECEIVE_POST = 'RECEIVE_POST';

export const receivePost = post => ({
    type: RECEIVE_POST,
    post
});

export const getPost = (id) => dispatch => (
    APIUtil.getPost(id)
        .then((resp) => resp.json()) // Transform the data into json
        .then(data => dispatch(receivePost(data)))
);


/**Get Comments for a Post */
export const RECEIVE_POST_COMMENTS = 'RECEIVE_POST_COMMENTS';

export const receivePostComments = comments => ({
    type: RECEIVE_POST_COMMENTS,
    comments
});

export const getPostComments = (id) => dispatch => (
    APIUtil.getPostComments(id)
        .then((resp) => resp.json()) // Transform the data into json
        .then(data => dispatch(receivePostComments(data)))
);


/**Vote on a Post */
export const UPDATE_POST_SCORE = 'UPDATE_POST_SCORE';

export const updatePostScore = post => ({
    type: UPDATE_POST_SCORE,
    post
});

export const votePost = (id, vote) => dispatch => (
    APIUtil.votePost(id, vote)
        .then((resp) => resp.json()) // Transform the data into json
        .then(data => dispatch(updatePostScore(data)))
);


/**Update a Post */
export const UPDATE_POST = 'UPDATE_POST';

export const updatePost = post => ({
    type: UPDATE_POST,
    post
});

export const editPost = (post) => dispatch => (
    APIUtil.editPost(post)
        .then((res) => res.json()) // Transform the data into json
        .then(data => dispatch(updatePost(data)))
);


/**Add Post */
export const ADD_POST = 'ADD_POST';

export function addPost(post) {
    return {
        type: ADD_POST,
        post
    }
}

export const createPost = (post) => dispatch => (
    APIUtil.createPost(post)
        .then((res) => res.json()) // Transform the data into json
        .then(data => {
            dispatch(addPost(data))
        })
);


/**Delete a Post */
export const REMOVE_POST = 'REMOVE_POST';

export const removePost = post => ({
    type: REMOVE_POST,
    post
});

export const deletePost = (id) => dispatch => (
    APIUtil.deletePost(id)
        .then((res) => res.json()) // Transform the data into json
        .then(data => dispatch(removePost(data)))
);