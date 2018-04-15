import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts, reorderPosts, getPostsByCategory, votePost } from '../actions';
import { Link } from 'react-router-dom';
import moment from 'moment';

class ShowPosts extends Component {

    componentDidMount(){
        const { categoryFilter } = this.props;
        categoryFilter && this.props.getPostsByCategory(categoryFilter);
    }

    organisePosts(posts){

        let { categoryFilter, postOrder } = this.props;
        console.log('7770Org posts',categoryFilter, postOrder);

        posts = categoryFilter ? posts.filter((post) => post.category === categoryFilter) : posts;

        switch (postOrder) {
            case 'newest':
                posts.sort((a, b) => a.timestamp - b.timestamp);
                break;

            case 'oldest':
                posts.sort((a, b) => b.timestamp - a.timestamp);
                break;

            case 'highest':
                posts.sort((a, b) => b.voteScore - a.voteScore);
                break;

            case 'lowest':
                posts.sort((a, b) => a.voteScore - b.voteScore);
                break;
        }
        console.log('7770Org posts', posts);
        return posts;
    }

    render() {
        console.log('123ShowPosts this props', JSON.stringify(this.props));
        console.log('123ShowPosts this state', this.state);

        let { posts, votePost } = this.props;

        posts = posts ? this.organisePosts(posts) : '';
        
        
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
                                            <span onClick={() => votePost(post.id, 'upVote')}><i className="fas fa-thumbs-up mr-1"></i></span>
                                            
                                            <span onClick={() => votePost(post.id, 'downVote')}><i className="fas fa-thumbs-down"></i></span>
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
    const { posts, postOrder } = state;
    console.log('SHOWPOSTS mapStateToProps state', JSON.stringify(state));
    console.log('SHOWPOSTS mapStateToProps props', props);

    return {
        posts,
        postOrder
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getPosts: (data) => dispatch(getPosts(data)),
        reorderPosts: (data) => dispatch(reorderPosts(data)),
        getPostsByCategory: (cat) => dispatch(getPostsByCategory(cat)),
        votePost: (id, post) => dispatch(votePost(id, post))       
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShowPosts)