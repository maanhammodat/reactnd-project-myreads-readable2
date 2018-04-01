const headers = {
    headers: {
        'Authorization': 'whatever-you-want',
        'Content-Type': 'application/json'
    }
}

export const getCategories = () => fetch(
    'http://localhost:3001/categories',
    headers
);

export const getPosts = () => fetch(
    'http://localhost:3001/posts',
    headers
);