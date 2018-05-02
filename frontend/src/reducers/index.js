import {
    //Cateories
    RECEIVE_CATEGORIES,

    //Posts
    GET_POSTS_BY_CATEGORY,
    REORDER_POSTS,
    RECEIVE_POSTS,
    RECEIVE_POST,
    RECEIVE_POST_COMMENTS,
    UPDATE_POST_SCORE,
    UPDATE_POST,
    REMOVE_POST,
    ADD_POST,

    //Comments
    UPDATE_COMMENT_SCORE,
    UPDATE_COMMENT_TEXT,
    ADD_COMMENT,
    REMOVE_COMMENT
} from '../actions';

const initialState = {
    categoryFilter: '',
    postOrder: 'newest',
    addedPost: false
};

function posts(state = initialState, action) {
    switch (action.type) {

        //Categories
        case RECEIVE_CATEGORIES:
            return {
                ...state,
                categories: action.categories.categories
            }

        //Posts
        case GET_POSTS_BY_CATEGORY:
            return {
                ...state,
                categoryFilter: action.category
            }

        case REORDER_POSTS:
            return {
                ...state,
                postOrder: action.order
            }

        case RECEIVE_POSTS:
            return {
                ...state,
                posts: action.posts,
                addedPost: false
            }

        case RECEIVE_POST:
            return {
                ...state,
                post: action.post
            }

        case RECEIVE_POST_COMMENTS:
            return {
                ...state,
                comments: action.comments
            }

        case UPDATE_POST_SCORE:
            return {
                ...state,
                post: action.post,
                posts: state.posts.filter((p) => p.id !== action.post.id).concat(action.post)
            }

        case UPDATE_POST:
            return {
                ...state,
                post: action.post,
                posts: state.posts.filter((p) => p.id !== action.post.id).concat(action.post)
            }

        case REMOVE_POST:
            return {
                ...state,
                posts: state.posts.filter((p) => p.id !== action.post.id),
                post: ''
            }

        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, action.post],
                addedPost: true
            }

        //Comments
        case UPDATE_COMMENT_SCORE:
            return {
                ...state,
                comments: state.comments.filter((c) => c.id !== action.comment.id).concat(action.comment)
            }

        case UPDATE_COMMENT_TEXT:
            return {
                ...state,
                comments: state.comments.filter((c) => c.id !== action.comment.id).concat(action.comment)
            }

        case ADD_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.comment]
            }

        case REMOVE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter((c) => c.id !== action.comment.id)
            }

        default:
            return state
    }
}

export default posts;