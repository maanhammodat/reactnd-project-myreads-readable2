import * as APIUtil from '../util/api';


/**Get Categories */
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

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
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export function receivePosts(posts){
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


/**Get Posts By Cateogry */
export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY';

export function getPostsByCategory( category ) {
    console.log('ACTION getPostsByCategory cat:',category);
    return {
        type: GET_POSTS_BY_CATEGORY,
        category
    }
}


/**Reorder Posts */
export const REORDER_POSTS = 'REORDER_POSTS';

export function reorderPosts(order) {
    console.log('ACTION reorderPosts:', order);
    return {
        type: REORDER_POSTS,
        order
    }
}


/**Add Post */
export const ADD_POST = 'ADD_POST';

export function addPost(post) {
    console.log('addPost', post);
    return {
        type: ADD_POST,
        post
    }
}

export const createPost = (post) => dispatch => (
    APIUtil.createPost(post)
        .then((res) => res.json()) // Transform the data into json
        .then(data => {
            console.log('createPost data', data);
            dispatch(addPost(data))
        })
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


/**Add Comment */
export const ADD_COMMENT = 'ADD_COMMENT';

export function addComment( comment ) {
    console.log('addComment',comment);
    return {
        type: ADD_COMMENT,
        comment
    }
}

export const postComment = (comment) => dispatch => (
    APIUtil.postComment(comment)
        .then((res) => res.json()) // Transform the data into json
        .then(data => {
            console.log('postComment data',data);
            dispatch(addComment(data));
        })
);


/**Update a Comment */
export const UPDATE_COMMENT_TEXT = 'UPDATE_COMMENT_TEXT';

export const updateCommentText = comment => ({
    type: UPDATE_COMMENT_TEXT,
    comment
});

export const updateComment = (comment) => dispatch => (
    APIUtil.updateComment(comment)
        .then((res) => res.json()) // Transform the data into json
        .then(data => dispatch(updateCommentText(data)))
);


/**Vote on a Comment */
export const UPDATE_COMMENT_SCORE = 'UPDATE_COMMENT_SCORE';

export const updateCommentScore = comment => ({
    type: UPDATE_COMMENT_SCORE,
    comment
});

export const voteComment = (id, vote) => dispatch => (
    APIUtil.voteComment(id, vote)
        .then((res) => res.json()) // Transform the data into json
        .then(data => dispatch(updateCommentScore(data)))
);


/**Delete a Comment */
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

export const removeComment = comment => ({
    type: REMOVE_COMMENT,
    comment
});

export const deleteComment = (id) => dispatch => (
    APIUtil.deleteComment(id)
        .then((res) => res.json()) // Transform the data into json
        .then(data => dispatch(removeComment(data)))
);