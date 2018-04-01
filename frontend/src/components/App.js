import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddPost from './AddPost';
import ShowPosts from './ShowPosts';
import { getCategories } from '../actions';

class App extends Component {
  componentDidMount() {
    this.props.getCategories();
  }
  render() {
    console.log('App Component PROPS', this.props.categories);
    return (
      
      <div className="container">
        <ShowPosts/>
      </div>
    );
  }
}


function mapStateToProps(state, props) {
  console.log('App Props state', JSON.stringify(state.categories));
  console.log('App Props props', props);
  
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
)(App)