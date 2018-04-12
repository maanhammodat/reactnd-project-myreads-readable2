import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPost, getPostComments, votePost } from '../actions';
import moment from 'moment';

class Post extends Component {

    componentDidMount(){        
        console.log('POST DIDMOUNT, ID:',this.props.id);
        this.props.getPostComments(this.props.id);        
    }

    render() {
        console.log('POST RENDER this props', JSON.stringify(this.props));
        console.log('POST RENDER this state', this.state);

        const { post, comments, votePost } = this.props;

        return (
                
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

                    {comments && comments.map((comment) => (

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
                                            <i className="fas fa-thumbs-up mr-1"></i>
                                            <i className="fas fa-thumbs-down"></i>
                                        </span>
                                        <br />
                                        <small className="text-right">Edit | Delete</small>
                                    </p>
                                </div>
                                
                            </div>
                            
                        </div>

                    ))}
                        
                    </div> 

                )}

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
        comments
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getPostComments: (data) => dispatch(getPostComments(data)),
        votePost: (id, post) => {
            console.log('VOTEPOST',id, post);
            dispatch(votePost(id, post))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post)