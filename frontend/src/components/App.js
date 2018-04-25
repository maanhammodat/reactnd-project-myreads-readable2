import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menu from './Menu';
import ShowPosts from './ShowPosts';
import Post from './Post';
import AddPost from './AddPost';
import { getCategories, getPosts } from '../actions';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {

  componentDidMount() {
    this.props.getCategories();
    this.props.getPosts();
  }

  render() {
    console.log('App Component PROPS', this.props.categories);
    return (

        <Router>
          <div className="container">
            <Menu />                 
            <Switch>            
              <Route exact path="/" component={ShowPosts} />
              <Route path="/category/:category" render={({ match }) => (
                <ShowPosts categoryFilter={match.params.category} />
              )} />
              <Route path="/post/:id" render={({ match }) => (
                <Post id={match.params.id} />
              )} />
              <Route exact path="/add-post" component={AddPost} />
            </Switch>
          </div>
        </Router>
        
    );
  }
}


function mapStateToProps(state, props) {
  console.log('App Props state', state);
  //console.log('App Props props', props);
  
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: (data) => dispatch(getCategories(data)),
    getPosts: (data) => dispatch(getPosts(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)