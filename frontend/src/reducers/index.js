import { combineReducers } from 'redux';

import {
    ADD_POST, RECEIVE_POSTS, RECEIVE_CATEGORIES
} from '../actions';

function posts(state = {}, action) {
    switch (action.type) {
        case ADD_POST:
            const { title, id } = action

            return [
                ...state,
                {
                    title,
                    id
                }
            ]
        case RECEIVE_POSTS:
            const { posts } = action
            console.log('RECEIVE_POSTS', posts);

            return {
                ...state,
                posts            
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