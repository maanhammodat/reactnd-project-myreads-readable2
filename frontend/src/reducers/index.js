import { combineReducers } from 'redux';

import {
    ADD_POST
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
        default:
            return state
    }
}

export default posts;