import { combineReducers } from 'redux';

import {
    ADD_POST, RECEIVE_POSTS, RECEIVE_CATEGORIES, GET_POST
} from '../actions';

function posts(state = {}, action) {
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