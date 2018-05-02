import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createPost } from '../actions';
import * as uuid from '../util/uuid';

class AddPost extends Component {

    constructor() {
        super();
        this.state = { addedPost: false };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const data = {}
        for (let element of form.elements) {
            if (element.tagName === 'BUTTON') { continue; }
            data[element.name] = element.value;
        }
        this.submitPost(data);
        form.reset();
    }

    submitPost(post) {
        post.id = uuid.generate();
        post.parentId = this.props.id;
        post.timestamp = Date.now();

        this.props.createPost(JSON.stringify(post));
    }

    render() {

        if (this.props.addedPost === true) {
            return <Redirect to='/' />;
        }

        const { categories } = this.props;

        let cats = categories && categories.map((cat => {
            return <option key={cat.name}>{cat.name}</option>
        }))

        return (

            <div className="row">
                <div className="col">
                    <h3>Add Post</h3>
                    <hr />
                        <form onSubmit={this.handleSubmit}>

                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" className="form-control" id="title" name="title" placeholder="Enter Title" required />
                            </div>

                            <div className="form-group">
                                <label>Author</label>
                                <input type="text" className="form-control" id="author" name="author" placeholder="Enter Author" required/>
                            </div>

                            <div className="form-group">
                                <label>Select Category</label>
                                <select className="form-control" id="category" name="category">
                                    {cats}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Enter Text</label>
                                <textarea className="form-control" id="body" name="body" rows="3" required></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>

                    </form>

                </div>

            </div>
        );
    }
}

function mapStateToProps(state, props) {

    const { categories, addedPost } = state;

    return {
        categories,
        addedPost
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createPost: (data) => dispatch(createPost(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPost)