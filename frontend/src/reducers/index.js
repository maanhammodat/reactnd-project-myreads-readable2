import { combineReducers } from 'redux';

import {
    ADD_POST, RECEIVE_POSTS, RECEIVE_POST_COMMENTS, RECEIVE_CATEGORIES, RECEIVE_POST, GET_POSTS_BY_CATEGORY, REORDER_POSTS, UPDATE_POST_SCORE, UPDATE_COMMENT_SCORE, UPDATE_COMMENT_TEXT, ADD_COMMENT, REMOVE_COMMENT, UPDATE_POST, REMOVE_POST
} from '../actions';

const initialState = {
    categoryFilter: '',
    postOrder: 'newest'
};

function posts(state = initialState, action) {
    switch (action.type) {

        case RECEIVE_POST:
            console.log('RECEIVE_POST', action.post);

            return {
                ...state,
                post: action.post
            }
            
        case ADD_POST:
            console.log('ADD_POST', action.post);
            return {
                ...state,
                posts: [...state.posts, action.post]
            }
        
        case UPDATE_POST:
            console.log('UPDATE_POST', action.post);
            return {
                ...state,
                post: action.post
            }

        case RECEIVE_POSTS:
            const { posts } = action
            console.log('RECEIVE_POSTS', posts);

            return {
                ...state,
                posts            
            }
        
        case GET_POSTS_BY_CATEGORY:
            const { category } = action
            console.log('GET_POSTS_BY_CATEGORY', category);

            return {
                ...state,
                categoryFilter: category
            }
        
        case REORDER_POSTS:
            const { order } = action
            console.log('ORDER_POSTS', order);

            return {
                ...state,
                postOrder: order
            }
        
        case RECEIVE_POST_COMMENTS:
            const { comments } = action
            console.log('RECEIVE_POST_COMMENTS', comments);

            return {
                ...state,
                comments
            }

        case UPDATE_POST_SCORE:
            console.log('UPDATE_POST_SCORE', action.post.id, action.post.voteScore);
            console.log('state,',JSON.stringify(state));
            return {
                ...state,
                posts: state.posts.filter((p) => p.id !== action.post.id).concat(action.post)
            }

        case REMOVE_POST:
            console.log('REMOVE_POST', action.post.id);
            return {
                ...state,
                posts: state.posts.filter((p) => p.id !== action.post.id),
                post: ''
            }

        case UPDATE_COMMENT_SCORE:
            console.log('UPDATE_COMMENT_SCORE', action.comment.id, action.comment.voteScore);
            console.log('state,', JSON.stringify(state));
            return {
                ...state,
                comments: state.comments.filter((c) => c.id !== action.comment.id).concat(action.comment)
            }
        
        case UPDATE_COMMENT_TEXT:
            console.log('UPDATE_COMMENT_TEXT', action.comment.id);
            return {
                ...state,
                comments: state.comments.filter((c) => c.id !== action.comment.id).concat(action.comment)
            }

        case ADD_COMMENT:
            console.log('ADD_COMMENT', action.comment);
            return {
                ...state,
                comments: [...state.comments, action.comment]
            }

        case REMOVE_COMMENT:
            console.log('REMOVE_COMMENT', action.comment.id);
            return {
                ...state,
                comments: state.comments.filter((c) => c.id !== action.comment.id)
            }
                       
        case RECEIVE_CATEGORIES:
            const { categories } = action.categories
            console.log('RECEIVE_CATEGORIES', categories);

            return {
                ...state,
                categories
            }       
        default:
            return state
    }
}

export default posts;