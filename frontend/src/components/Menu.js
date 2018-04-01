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
            
            <div className="row">
                <div className="col">
                       
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