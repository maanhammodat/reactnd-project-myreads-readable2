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


/**Reorder Posts */
export const REORDER_POSTS = 'REORDER_POSTS';

export function reorderPosts(order) {
    console.log('ACTION reorderPosts:', order);
    return {
        type: REORDER_POSTS,
        order
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


/**Vote on a Comment */
export const UPDATE_COMMENT_SCORE = 'UPDATE_COMMENT_SCORE';

export const updateCommentScore = comment => ({
    type: UPDATE_COMMENT_SCORE,
    comment
});

export const voteComment = (id, vote) => dispatch => (
    APIUtil.voteComment(id, vote)
        .then((resp) => resp.json()) // Transform the data into json
        .then(data => dispatch(updateCommentScore(data)))
);


/**Add Comment */
export const ADD_COMMENT = 'ADD_COMMENT';

export function addComment({ comment }) {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export const postComment = (comment) => dispatch => (
    APIUtil.postComment(comment)
        .then((res) => {
            !res.ok && console.log('postComment Error',res.statusText);
            res.ok && dispatch(addComment(comment));
            res.json()
        })
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