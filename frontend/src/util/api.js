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
    return fetch(
        `http://localhost:3001/posts/${id}`,
        headers
    );
}

export const getPostComments = (id) => {
    return fetch(
        `http://localhost:3001/posts/${id}/comments`,
        headers
    );
}

export const createPost = (post) => {
    return fetch(
        `http://localhost:3001/posts`,
        {
            ...headers,
            method: 'POST',
            body: post
        }
    )
}

export const votePost = (id, vote) => {
    return fetch(
        `http://localhost:3001/posts/${id}`,
        {
            ...headers,
            method: 'POST',
            body: JSON.stringify({option: vote})
        }
    )
}

export const editPost = (post) => {
    return fetch(
        `http://localhost:3001/posts/${post.id}`,
        {
            ...headers,
            method: 'PUT',
            body: JSON.stringify(post)
        }
    )
}

export const deletePost = (id) => {
    return fetch(
        `http://localhost:3001/posts/${id}`,
        {
            ...headers,
            method: 'DELETE',
            body: ''
        }
    )
}

export const postComment = (comment) => {
    return fetch(
        `http://localhost:3001/comments`,
        {
            ...headers,
            method: 'POST',
            body: comment
        }
    )
}

export const updateComment = (comment) => {
    return fetch(
        `http://localhost:3001/comments/${comment.id}`,
        {
            ...headers,
            method: 'PUT',
            body: JSON.stringify(comment)
        }
    )
}

export const voteComment = (id, vote) => {
    return fetch(
        `http://localhost:3001/comments/${id}`,
        {
            ...headers,
            method: 'POST',
            body: JSON.stringify({ option: vote })
        }
    )
}


export const deleteComment = (id) => {
    return fetch(
        `http://localhost:3001/comments/${id}`,
        {
            ...headers,
            method: 'DELETE',
            body: ''
        }
    )
}