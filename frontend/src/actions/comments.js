import * as APIUtil from '../util/api';

/**Add Comment */
export const ADD_COMMENT = 'ADD_COMMENT';

export function addComment(comment) {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export const postComment = (comment) => dispatch => (
    APIUtil.postComment(comment)
        .then((res) => res.json()) // Transform the data into json
        .then(data => {
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