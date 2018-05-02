import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getPosts, getPost, getPostComments, votePost, editPost, deletePost, postComment } from '../actions';
import Comment from './Comment';
import { dateFromNow } from '../util/dateFormat';
import * as uuid from '../util/uuid';

class Post extends Component {

    constructor() {
        super();
        this.state = { editing: false, deleted: false };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.props.getPosts();
        this.props.getPost(this.props.id);
        this.props.getPostComments(this.props.id);
    }

    handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formID = form.getAttribute('id');
        const data = {}
        for (let element of form.elements) {
            if (element.tagName === 'BUTTON') { continue; }
            data[element.name] = element.value;
        }

        switch (formID) {
            case 'addComment':
                this.submitComment(data);
                break;

            case 'editPost':
                this.submitPostUpdate(data);
                break;

            default:
                return false;
        }

        form.reset();
    }

    submitComment(comment){
        comment.id = uuid.generate();
        comment.parentId = this.props.id;
        comment.timestamp = Date.now();
        this.props.postComment(JSON.stringify(comment));
    }

    submitPostUpdate(post) {
        this.props.editPost(post);
        this.setState({ editing: false });
    }

    render() {

        const { post, comments, votePost, commentCount, deletePost } = this.props;

        if(this.state.deleted === true){
            return <Redirect to='/' />;
        }

        const editing = this.state.editing;

        return (

            <div>

                {(post && Object.keys(post).length > 0) && (
                <div>
                    <div className="row">

                        <div className="col">

                            <div className="list-group">

                                <div className="list-group-item" key={post.id}>

                                {editing ? (

                                    <form id="editPost" onSubmit={this.handleSubmit}>

                                        <div className="form-group">
                                            <label htmlFor="commentUser">Title</label>
                                            <input type="text" className="form-control" name="title" defaultValue={post.title} placeholder="Enter Title" required />
                                        </div>

                                        <div className="form-group">

                                            <label htmlFor="text">Text</label>
                                            <textarea className="form-control" name="body" rows="3" defaultValue={post.body} placeholder="Enter Text"required></textarea>
                                        </div>

                                        <input value={post.id} type="hidden" name="id" />

                                        <button type="submit" className="btn btn-primary">Submit</button>
                                        <button type="button" className="ml-3 btn btn-primary" onClick={() => this.setState({ editing: false })}>Close</button>

                                    </form>
                                ) : (
                                <div>
                                    <div className="row">

                                        <div className="col-10">
                                            <h3 className="mb-1"><strong>{post.title}</strong></h3>
                                            <h5 className="mb-1">By {post.author} | {dateFromNow(post.timestamp)} | {commentCount} comments</h5>
                                            <h5>
                                                <span className="badge badge-pill badge-primary">{post.category}</span>
                                            </h5>
                                        </div>

                                        <div className="col-2">
                                            <p className="text-right">
                                                <span className="h3">{post.voteScore}</span>
                                                <br />
                                                <span className="h5">
                                                    <span onClick={() => votePost(post.id, 'upVote')}><i className="fas fa-thumbs-up mr-1"></i></span>

                                                    <span onClick={() => votePost(post.id, 'downVote')}><i className="fas fa-thumbs-down"></i></span>
                                                </span>
                                                <br />
                                                <small className="text-right">
                                                    <span className="control" onClick={() => this.setState({ editing: true })}>Edit</span>
                                                    <span> | </span>
                                                    <span className="control" onClick={() => {
                                                        this.setState({ deleted: true });
                                                        deletePost(post.id);
                                                    }}>Delete</span>
                                                </small>
                                            </p>
                                        </div>

                                    </div>

                                    <hr />

                                    <div className="row">
                                        <div className="col">

                                            {post.body}

                                        </div>
                                    </div>

                                </div>
                                )}

                                </div>

                            {comments && comments.map((comment) => (

                                <Comment
                                    key={comment.id}
                                    id={comment.id}
                                    body={comment.body}
                                    author={comment.author}
                                    timestamp={comment.timestamp}
                                    voteScore={comment.voteScore}
                                />

                            ))}

                            </div>

                        </div>

                    </div>

                    <div className="row mt-3">
                        <div className="col">
                            <div className="row">
                                <div className="col">
                                    <h3>Add Comment</h3>
                                    <hr />
                                    <form id="addComment" onSubmit={this.handleSubmit}>

                                        <div className="form-group">
                                            <label htmlFor="commentUser">Author</label>
                                            <input type="text" className="form-control" name="author" placeholder="Enter Author" required />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="text">Text</label>
                                            <textarea className="form-control" name="body" rows="3" placeholder="Enter Text" required ></textarea>
                                        </div>

                                        <button type="submit" className="btn btn-primary">Submit</button>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                )}

                {(post && Object.keys(post).length === 0) && (
                <div className="list-group-item list-group-item-action flex-column align-items-start">
                    <h3 className="text-center">Post not found</h3>
                </div>
                )}

            </div>
        );
    }
}

function mapStateToProps(state, props) {
    const { post, comments, posts } = state;

    return {
        post,
        posts,
        comments: comments ? comments.sort((a, b) => a.timestamp - b.timestamp) : '',
        commentCount: comments ? comments.length : 0
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getPosts: (data) => dispatch(getPosts(data)),
        getPost: (id) => dispatch(getPost(id)),
        votePost: (id, post) => dispatch(votePost(id, post)),
        editPost: (post) => dispatch(editPost(post)),
        deletePost: (id) => dispatch(deletePost(id)),
        getPostComments: (data) => dispatch(getPostComments(data)),
        postComment: (comment) => dispatch(postComment(comment))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post)