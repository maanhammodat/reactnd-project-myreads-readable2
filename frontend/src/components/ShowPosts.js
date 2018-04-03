import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../actions';
import { Link } from 'react-router-dom';
import moment from 'moment';

class ShowPosts extends Component {

    componentDidMount(){
        //this.props.getPosts();
    }

    render() {
        console.log('this props', JSON.stringify(this.props.posts));
        console.log('this state', this.state);

        const posts = this.props.posts;

        return (
            
            <div className="row">
                <div className="col">
                    <div className="list-group">

                        {posts && posts.map((post) => (
                            <div className="list-group-item list-group-item-action flex-column align-items-start" key={post.id}>
                            <div className="row">
                                
                                <div className="col-10">
                                    <h3 className="mb-1">
                                        <strong><Link to={`/post/${post.id}`}>{post.title}</Link></strong>
                                    </h3>
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
                        </div>                           
                        ))}

                    </div>    
                </div>
            </div>                                
        );
    }
}

function mapStateToProps(state, props) {
    const { posts } = state;
    console.log('mapStateToProps state', JSON.stringify(state));
    console.log('mapStateToProps props', props);

    return {
        posts: posts ? posts : ''
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getPosts: (data) => dispatch(getPosts(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShowPosts)