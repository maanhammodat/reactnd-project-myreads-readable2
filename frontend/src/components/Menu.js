import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class Menu extends Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault(); 
        //console.log('props', this.props);         
    }

    componentDidMount(){
        //this.props.getCategories();
    }

    render() {
        console.log('this props', JSON.stringify(this.props.posts));
        console.log('this state', this.state);

        const posts = this.props.posts;

        return (
            
            <div className="row pb-2">
                <div className="col">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                        <span className="navbar-brand">Readable</span>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01"
                            aria-expanded="false" aria-label="Toggle navigation" style="">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarColor01">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <a className="nav-link">All</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                        Categories
                                </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item">Action</a>
                                        <a className="dropdown-item">Another action</a>
                                        <a className="dropdown-item">Something else here</a>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link">Add Post</a>
                                </li>
                            </ul>


                        </div>

                        <div className="dropdown">
                            <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                Sort Posts By
                        </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item">Date</a>
                                <a className="dropdown-item">Score</a>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>                             
        );
    }
}

function mapStateToProps(state, props) {
    console.log('mapStateToProps state', JSON.stringify(state));
    console.log('mapStateToProps props', props);

    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        getCategories: (data) => dispatch(getCategories(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu)