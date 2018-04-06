import { combineReducers } from 'redux';

import {
    ADD_POST, RECEIVE_POSTS, RECEIVE_POST_COMMENTS, RECEIVE_CATEGORIES, GET_POST, GET_POSTS_BY_CATEGORY
} from '../actions';

const initialState = {
    categoryFilter: ''
};

function posts(state = initialState, action) {
    switch (action.type) {

        case GET_POST:
            const { id } = action
            console.log('RECEIVE_POSTS', JSON.stringify(state.posts));

            return {
                ...state
            }
            
        case ADD_POST:
            const { title, pid } = action

            return [
                ...state,
                {
                    title,
                    pid
                }
            ]

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
        
        case RECEIVE_POST_COMMENTS:
            const { comments } = action
            console.log('RECEIVE_POST_COMMENTS', comments);

            return {
                ...state,
                comments
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