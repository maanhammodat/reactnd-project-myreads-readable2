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