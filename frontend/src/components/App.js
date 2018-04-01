import React, { Component } from 'react';
import { connect } from 'react-redux';
import ShowPosts from './ShowPosts';
import Post from './Post';
import AddPost from './AddPost';
import { getCategories } from '../actions';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {
  componentDidMount() {
    this.props.getCategories();
  }
  render() {
    console.log('App Component PROPS', this.props.categories);
    return (
      
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={ShowPosts} />            
            <Route path="/post/:id" render={({ match }) => (
              <Post id={match.params.id} />
            )} />

          </Switch>
        </Router>
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