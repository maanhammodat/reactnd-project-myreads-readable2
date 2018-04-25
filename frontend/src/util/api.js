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

export const getPost = (id) => {
    console.log('getPost id:', id);
    return fetch(
        `http://localhost:3001/posts/${id}`,
        headers
    );
}

export const getPostComments = (id) => {
    console.log('getPostComments id:',id);
    return fetch(
        `http://localhost:3001/posts/${id}/comments`,
        headers
    );
}

export const createPost = (post) => {
    console.log(`createPost post: ${post}`);
    return fetch(
        `http://localhost:3001/posts`,
        {
            ...headers,
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            body: post // must match 'Content-Type' header
        }
    )
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

export const editPost = (post) => {
    console.log(`editPost post: ${post.id}`);
    return fetch(
        `http://localhost:3001/posts/${post.id}`,
        {
            ...headers,
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify(post) // must match 'Content-Type' header
        }
    )
}

export const deletePost = (id) => {
    console.log(`deletePost post: ${id}`);
    return fetch(
        `http://localhost:3001/posts/${id}`,
        {
            ...headers,
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            body: ''
        }
    )
}

export const postComment = (comment) => {
    console.log(`postComment comment: ${comment}`);
    return fetch(
        `http://localhost:3001/comments`,
        {
            ...headers,
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            body: comment // must match 'Content-Type' header
        }
    )
}

export const updateComment = (comment) => {
    console.log(`updateComment comment: ${comment.id}`);
    return fetch(
        `http://localhost:3001/comments/${comment.id}`,
        {
            ...headers,
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify(comment) // must match 'Content-Type' header
        }
    )
}

export const voteComment = (id, vote) => {
    console.log(`voteComment comment: ${id} vote: ${vote}`);
    return fetch(
        `http://localhost:3001/comments/${id}`,
        {
            ...headers,
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify({ option: vote }) // must match 'Content-Type' header
        }
    )
}


export const deleteComment = (id) => {
    console.log(`deleteComment comment: ${id}`);
    return fetch(
        `http://localhost:3001/comments/${id}`,
        {
            ...headers,
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            body: ''
        }
    )
}