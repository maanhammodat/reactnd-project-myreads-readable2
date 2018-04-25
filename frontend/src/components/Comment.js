import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateComment, voteComment, deleteComment } from '../actions';
import moment from 'moment';

class Comment extends Component {

    constructor(props) {
        super(props);
        this.state = { editing: false };
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
        console.log('778 data', data);
        this.updateCommentText(data);
    }

    updateCommentText(comment) {
        comment.timestamp = Date.now();
        console.log('778 COMMENT is ', JSON.stringify(comment));

        this.props.updateComment(comment);
        this.setState({ editing: false });
    }

    render() {

        const { id, body, author, timestamp, voteScore, voteComment, deleteComment } = this.props;
        const { editing } = this.state;
        
        const content = editing ? (
            <div className="col-10">
                <form onSubmit={this.handleSubmit}>

                    <div className="form-group">

                        <input value={id} type="hidden" id="id" name="id" />

                        <label htmlFor="text">Enter Text</label>
                        <textarea className="form-control" name="body" id="body" rows="3" defaultValue={body} placeholder="Enter Text"></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button type="button" className="ml-3 btn btn-primary" onClick={() => this.setState({ editing: false })}>Close</button>

                </form>
            </div>
        ) : (
            <div className="col-10">
                <span>{body}</span>
                <p className="mb-0">
                    <small>By {author} | {moment(timestamp).fromNow()}</small>
                </p>
            </div>
        );

        return (
            <div className="list-group-item list-group-item-light" key={id}>

                <div className="row">

                    {content}

                    <div className="col-2">
                        <p className="mb-0" className="text-right">
                            <span className="h3">{voteScore}</span>
                            <br />
                            <span className="h5">
                                <span onClick={() => voteComment(id, 'upVote')}><i className="fas fa-thumbs-up mr-1"></i></span>

                                <span onClick={() => voteComment(id, 'downVote')}><i className="fas fa-thumbs-down"></i></span>
                            </span>
                            <br />
                            <small className="text-right">
                                <span onClick={() => this.setState({ editing:true })}>Edit</span>
                                <span> | </span>
                                <span onClick={() => deleteComment(id)}>Delete</span>
                            </small>
                        </p>
                    </div>

                </div>

            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        voteComment: (id, comment) => dispatch(voteComment(id, comment)),
        updateComment: (comment) => dispatch(updateComment(comment)),
        deleteComment: (id) => dispatch(deleteComment(id))
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Comment)