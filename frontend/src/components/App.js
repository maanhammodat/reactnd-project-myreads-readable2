import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../actions';
import AddPost from './AddPost';

class App extends Component {
  render() {
    return (
      <div className="container">
        <AddPost/>
      </div>
    );
  }
}

export default App