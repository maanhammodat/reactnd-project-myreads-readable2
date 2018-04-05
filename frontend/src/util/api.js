const headers = {
    headers: {
        'Authorization': 'whatever-you-want',
        'Content-Type': 'application/json'
    }
}

export const getCategories = () => {
    return fetch(
        'http://localhost:3001/categories',
        headers
    );
}

export const getPosts = () => {
    return fetch(
        'http://localhost:3001/posts',
        headers
    )
};

export const getPostComments = (id) => {
    return fetch(
        `http://localhost:3001/posts/${id}/comments`,
        headers
    );
}