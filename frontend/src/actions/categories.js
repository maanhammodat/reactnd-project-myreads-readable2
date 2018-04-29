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