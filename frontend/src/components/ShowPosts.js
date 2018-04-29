import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts, reorderPosts, getPostsByCategory, votePost, editPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';
import moment from 'moment';

class ShowPosts extends Component {

    constructor() {
        super();
        this.state = { editing: false, deleted: false };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.props.getPosts();
        const { categoryFilter } = this.props;
        categoryFilter && this.props.getPostsByCategory(categoryFilter);
    }

    organisePosts(posts){

        let { categoryFilter, postOrder } = this.props;

        posts = categoryFilter ? posts.filter((post) => post.category === categoryFilter) : posts;

        switch (postOrder) {
            case 'newest':
                posts.sort((a, b) => b.timestamp - a.timestamp);
                break;

            case 'oldest':
                posts.sort((a, b) => a.timestamp - b.timestamp);
                break;

            case 'highest':
                posts.sort((a, b) => b.voteScore - a.voteScore);
                break;

            case 'lowest':
                posts.sort((a, b) => a.voteScore - b.voteScore);
                break;

            default:
                return false;
        }
        return posts;
    }

    handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const data = {}
        for (let element of form.elements) {
            if (element.tagName === 'BUTTON') { continue; }
            data[element.name] = element.value;
        }
        this.submitPostUpdate(data);

        form.reset();
    }

    submitPostUpdate(post) {
        this.props.editPost(post);
        this.setState({ editing: false });
    }

    render() {

        let { posts, votePost, deletePost } = this.props;

        posts = posts ? this.organisePosts(posts) : '';

        let empty = posts.length === 0 ?
            <div className="list-group-item list-group-item-action flex-column align-items-start">
                <h3 className="text-center">No posts found</h3>
            </div>
         : '';

        const editing = this.state.editing;

        return (

            <div className="row">
                <div className="col">
                    <div className="list-group">

                        {empty}

                        {posts && posts.map((post) => (
                        <div className="list-group-item list-group-item-action flex-column align-items-start" key={post.id}>

                            {editing && editing === post.id ? (

                            <form id="editPost" onSubmit={this.handleSubmit}>

                                <div className="form-group">
                                    <label htmlFor="commentUser">Title</label>
                                    <input type="text" className="form-control" name="title" defaultValue={post.title} placeholder="Enter Title" />
                                </div>

                                <div className="form-group">

                                    <label htmlFor="text">Text</label>
                                    <textarea className="form-control" name="body" rows="3" defaultValue={post.body} placeholder="Enter Text"></textarea>
                                </div>

                                <input value={post.id} type="hidden" name="id" />

                                <button type="submit" className="btn btn-primary">Submit</button>
                                <button type="button" className="ml-3 btn btn-primary" onClick={() => this.setState({ editing: false })}>Close</button>

                            </form>

                            ) : (

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
                                        <small className="text-right">
                                            <span className="control" onClick={() => this.setState({ editing: post.id })}>Edit</span>
                                            <span> | </span>
                                            <span className="control" onClick={() => {
                                                deletePost(post.id);
                                            }}>Delete</span>
                                        </small>
                                    </p>
                                </div>

                            </div>

                            )}

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
        votePost: (id, post) => dispatch(votePost(id, post)),
        editPost: (post) => dispatch(editPost(post)),
        deletePost: (id) => dispatch(deletePost(id))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShowPosts)