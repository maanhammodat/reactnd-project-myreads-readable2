import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPost } from '../actions';
import moment from 'moment';

class Post extends Component {

    componentDidMount(){
        //this.props.getPost('8xf0y6ziyjabvozdd253nd');
        console.log('POST DIDMOUNT');
    }

    render() {
        console.log('POST RENDER this props', JSON.stringify(this.props));
        console.log('POST RENDER this state', this.state);

        const post = this.props.post;

        return (
                
            <div className="row">
                <div className="col">
                    <div className="list-group">

                        {post && (
                        
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
                                                <i className="fas fa-thumbs-up mr-1"></i>
                                                <i className="fas fa-thumbs-down"></i>
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

                        )}

                    </div> 
                </div>
            </div>                                
        );
    }
}

function mapStateToProps(state, props) {
    const { posts } = state;
    console.log('POST mapStateToProps state', JSON.stringify(state.posts));
    console.log('POST mapStateToProps props', props);
    //console.log('>>>POST filtered', posts.filter((post) => { return post.id === '8xf0y6ziyjabvozdd253nd' }));
    return {
        post: posts ? posts.filter((post) => { return post.id === props.id })[0] : ''
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getPost: (data) => dispatch(getPost(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post)