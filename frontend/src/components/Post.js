import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPost, getPostComments, votePost, voteComment, postComment } from '../actions';
import moment from 'moment';
import * as uuid from '../util/uuid';

class Post extends Component {
    
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount(){        
        console.log('POST DIDMOUNT, ID:',this.props.id);
        this.props.getPostComments(this.props.id);
    }

    handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const data = {}
        for (let element of form.elements) {
            if (element.tagName === 'BUTTON') { continue; }
            data[element.name] = element.value;
        }
        console.log('778 data',data);
        this.submitComment(data);

        // let comment = JSON.stringify({ "author": "blahhh", "body": "haaa", "id": "76a-4971-4ba-96ef-7ac6545a9137", "parentId": "8xf0y6ziyjabvozdd253nd", "timestamp": 1523788914591 })

        // fetch(
        //     `http://localhost:3001/comments`,
        //     {
        //         headers: {
        //             'Authorization': 'whatever-you-want',
        //             'Content-Type': 'application/json'
        //         },
        //         method: 'POST', // *GET, POST, PUT, DELETE, etc.
        //         body: comment // must match 'Content-Type' header
        //     }
        // ).then((resp) => {
        //     console.log('778r',resp);
        // })

    }

    submitComment(comment){
        comment.id = uuid.generate();
        comment.parentId = this.props.id;
        comment.timestamp = Date.now();
        console.log('778 COMMENT is ',JSON.stringify(comment));
        
        this.props.postComment(JSON.stringify(comment));        
    }

    render() {
        console.log('POST RENDER this props', JSON.stringify(this.props));
        console.log('POST RENDER this state', this.state);

        const { post, comments, votePost, voteComment } = this.props;
        console.log('778 coments',comments);

        if(comments){
            //comments.map((comment) => { 
                console.log('778comments',JSON.stringify(comments));
            //})
        }

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
                                    <h5 className="mb-1">By {post.author} | {moment(post.timestamp).fromNow()} | {post.commentCount} comments</h5>
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
                                        <small className="text-right">Edit | Delete</small>
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

                    {/* {comments && comments.map((comment) => (

                        <div className="list-group-item list-group-item-light" key={comment.id}>

                            <div className="row">

                                <div className="col-10">
                                    <span>{comment.body}</span>
                                    <p className="mb-0">
                                        <small>By {comment.author} | {moment(comment.timestamp).fromNow()}</small>
                                    </p>
                                </div>


                                <div className="col-2">
                                    <p className="mb-0" className="text-right">
                                        <span className="h3">{comment.voteScore}</span>
                                        <br />
                                        <span className="h5">
                                            <span onClick={() => voteComment(comment.id, 'upVote')}><i className="fas fa-thumbs-up mr-1"></i></span>
                                            
                                            <span onClick={() => voteComment(comment.id, 'downVote')}><i className="fas fa-thumbs-down"></i></span>
                                        </span>
                                        <br />
                                        <small className="text-right">Edit | Delete</small>
                                    </p>
                                </div>
                                
                            </div>
                            
                        </div>

                    ))} */}
                        
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
                                <form onSubmit={this.handleSubmit}>

                                    <div className="form-group">
                                        <label htmlFor="commentUser">Author</label>
                                        <input type="text" className="form-control" id="author" name="author" placeholder="Enter Author Name" />                    
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="text">Text</label>
                                        <textarea className="form-control" name="body" id="body" rows="3"></textarea>
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
    const { posts, comments } = state;
    console.log('POST mapStateToProps state', JSON.stringify(state));
    console.log('POST mapStateToProps props', props);
    //console.log('>>>POST filtered', posts.filter((post) => { return post.id === '8xf0y6ziyjabvozdd253nd' }));
    return {
        post: posts ? posts.filter((post) => { return post.id === props.id })[0] : '',
        comments: comments ? comments.sort((a, b) => a.timestamp - b.timestamp) : ''
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getPostComments: (data) => dispatch(getPostComments(data)),
        votePost: (id, post) => dispatch(votePost(id, post)),
        voteComment: (id, comment) => dispatch(voteComment(id, comment)),
        postComment: (comment) => dispatch(postComment(comment))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post)