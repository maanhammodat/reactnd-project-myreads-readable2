import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getPost, getPostComments, votePost, editPost, deletePost, voteComment, postComment } from '../actions';
import Comment from './Comment';
import moment from 'moment';
import * as uuid from '../util/uuid';

class Post extends Component {
    
    constructor() {
        super();
        this.state = { editing: false, deleted: false };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount(){        
        console.log('POST DIDMOUNT, ID:',this.props.id);
        this.props.getPost(this.props.id);
        this.props.getPostComments(this.props.id);
    }

    handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formID = form.getAttribute('id');
        console.log('778 form ID',form);
        const data = {}
        for (let element of form.elements) {
            if (element.tagName === 'BUTTON') { continue; }
            data[element.name] = element.value;
        }
        console.log('778 data',data);

        switch (formID) {
            case 'addComment':
                this.submitComment(data);
                break;

            case 'editPost':
                this.submitPostUpdate(data);
                break;
        }

        form.reset();
    }

    submitComment(comment){
        comment.id = uuid.generate();
        comment.parentId = this.props.id;
        comment.timestamp = Date.now();
        console.log('778 COMMENT is ',JSON.stringify(comment));        
        this.props.postComment(JSON.stringify(comment));
        //this.props.getPosts();
    }

    submitPostUpdate(post) {
        console.log('7778 POST is ', JSON.stringify(post));
        this.props.editPost(post);
        this.setState({ editing: false });
    }

    render() {

        console.log('POST RENDER this props', JSON.stringify(this.props));
        console.log('POST RENDER this state', this.state);

        const { post, comments, votePost, voteComment, commentCount, deletePost } = this.props;

        if(this.state.deleted === true){
            return <Redirect to='/' />;
        }

        // if(post && post.deleted === true){
        //     console.log('77801',post.deleted);
        //     return <Redirect to='/' />;
        // }

        if(comments){
            console.log('778comments',JSON.stringify(comments));
        }

        const editing = this.state.editing;

        return (
            
            <div>    
                <div className="row">

                    <div className="col">

                    {post && (

                        <div className="list-group">

                            <div className="list-group-item" key={post.id}>

                                <div className="row">

                                    <div className="col-10">
                                        <h3 className="mb-1"><strong>{post.title}</strong></h3>
                                        <h5 className="mb-1">By {post.author} | {moment(post.timestamp).fromNow()} | {commentCount} comments</h5>
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
                                                <span onClick={() => this.setState({ editing: true })}>Edit</span>
                                                <span> | </span>
                                                <span onClick={() => {
                                                    this.setState({ deleted: true })
                                                    deletePost(post.id);                                                    
                                                }}>Delete</span>
                                            </small>
                                        </p>
                                    </div>

                                </div> 

                                <hr />

                                <div className="row">
                                    <div className="col">

                                        {editing ? (
                                            <div className="col-10">
                                                <form id="editPost" onSubmit={this.handleSubmit}>

                                                    <div className="form-group">
                                                        <label htmlFor="commentUser">Title</label>
                                                        <input type="text" className="form-control" name="title" defaultValue={post.title} placeholder="Enter Title" />
                                                    </div>

                                                    <div className="form-group">

                                                        <label htmlFor="text">Enter Text</label>
                                                        <textarea className="form-control" name="body" rows="3" defaultValue={post.body} placeholder="Enter Text"></textarea>
                                                    </div>

                                                    <input value={post.id} type="hidden" name="id" />

                                                    <button type="submit" className="btn btn-primary">Submit</button>
                                                    <button type="button" className="ml-3 btn btn-primary" onClick={() => this.setState({ editing: false })}>Close</button>

                                                </form>
                                            </div>
                                        ) : (
                                            post.body
                                        )}
                                        
                                    </div>
                                </div>

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

                    )}

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
                                        <input type="text" className="form-control" name="author" placeholder="Enter Author Name" />                    
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="text">Text</label>
                                        <textarea className="form-control" name="body" rows="3" placeholder="Enter Text"></textarea>
                                    </div>

                                    <button type="submit" className="btn btn-primary">Submit</button>
                                    
                                </form>                    
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state, props) {
    const { post, comments } = state;
    console.log('POST mapStateToProps state', JSON.stringify(post));
    console.log('POST mapStateToProps props', props);
    //console.log('>>>POST filtered', posts.filter((post) => { return post.id === '8xf0y6ziyjabvozdd253nd' }));
    return {
        post,
        comments: comments ? comments.sort((a, b) => a.timestamp - b.timestamp) : '',
        commentCount: comments ? comments.length : 0
    };
}

function mapDispatchToProps(dispatch) {
    return {        
        getPost: (id) => dispatch(getPost(id)),
        votePost: (id, post) => dispatch(votePost(id, post)),
        editPost: (post) => dispatch(editPost(post)),
        deletePost: (id) => dispatch(deletePost(id)),
        getPostComments: (data) => dispatch(getPostComments(data)),
        voteComment: (id, comment) => dispatch(voteComment(id, comment)),
        postComment: (comment) => dispatch(postComment(comment))      
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post)