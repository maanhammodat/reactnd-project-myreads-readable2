import React from 'react';
import Menu from './Menu';
import ShowPosts from './ShowPosts';
import Post from './Post';
import AddPost from './AddPost';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => (
  <Router>
    <div className="container">
      <Menu />
      <Switch>
        <Route exact path="/" component={ShowPosts} />
        <Route exact path="/add-post" component={AddPost} />
        <Route exact path="/:category" render={({ match }) => (
          <ShowPosts categoryFilter={match.params.category} />
        )} />
        <Route exact path="/:category/:id" render={({ match }) => (
          <Post id={match.params.id} />
        )} />
      </Switch>
    </div>
  </Router>
);

export default App;