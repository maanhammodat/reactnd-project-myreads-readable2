import React, { Component } from 'react';
import Menu from './Menu';
import ShowPosts from './ShowPosts';
import Post from './Post';
import AddPost from './AddPost';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {

  render() {
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

export default App;