import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../actions';

class AddPost extends Component {
    
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault();
        
        fetch(
            'http://localhost:3001/posts',
            {
                headers: { 
                    'Authorization': 'whatever-you-want'
                }
            }
        ).then((resp) => resp) // Transform the data into json
        .then(function (data) {
            console.log('data',data);
        });
        
        
        // const form = event.target;
        // const data = {}
        // for (let element of form.elements) {
        //     console.log('element.tagName', element.tagName);
        //     console.log('element.name', element.name);
        //     if (element.tagName === 'BUTTON') { continue; }
        //     data[element.name] = element.value;
        // }
        // console.log('data',data);
    }

    render() {
        console.log('this props', this.props);
        console.log('this state', this.state);
        return (
            
            <div className="row">
                <div className="col">
                    <h3>Add Post</h3>
                    <hr />
                        <form onSubmit={this.handleSubmit}>
                            
                            <div className="form-group">
                                <label>Title
                                <input type="text" className="form-control" id="postTitle" name="postTitle" aria-describedby="titleHelp" placeholder="Enter Title"/>
                                </label>
                            </div>

                            <div className="form-group">
                                <label>User
                                <input type="text" className="form-control" id="postUser" name="postUser" aria-describedby="UserHelp" placeholder="Enter User"/>
                                </label>
                            </div>

                            <div className="form-group">
                                <label>Select Category
                                <select className="form-control" id="categorySelect" name="categorySelect">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                                </label>
                            </div>

                            <div className="form-group">
                                <label>Enter Text
                                <textarea className="form-control" id="postText" name="postText" rows="3"></textarea>
                                </label>
                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>
                        
                    </form>
    
                </div>
    
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    console.log('mapStateToProps state', JSON.stringify(state));
    console.log('mapStateToProps props', props);

    return { pawsts: state }
}

function mapDispatchToProps(dispatch) {
    return {
        addPost: (data) => dispatch(addPost(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPost)