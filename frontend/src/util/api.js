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
    console.log('getPostComments id:',id);
    return fetch(
        `http://localhost:3001/posts/${id}/comments`,
        headers
    );
}

export const votePost = (id, vote) => {
    console.log(`votePost post: ${id} vote: ${vote}`);
    return fetch(
        `http://localhost:3001/posts/${id}`,
        {
            ...headers,
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify({option: vote}) // must match 'Content-Type' header
        }
    )
}