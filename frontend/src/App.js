import React, { Component } from 'react';
import './css/bootstrap.min.css';
import { Navbar } from 'react-bootstrap';
import { Route, Switch, Link } from 'react-router-dom'
import HomePage from './components/HomePage'
import EditPost from './components/EditPost'
import Page404 from './components/Page404'
import NewPost from './components/NewPost'
import EditComment from './components/EditComment'
import NewComment from './components/NewComment'

class App extends Component {

  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to={'/'}>HomePage</Link>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/new' component={NewPost} />
          <Route exact path='/posts/:postId/newComment' component={NewComment} />
          <Route exact path='/comments/:commentId' component={EditComment} />
          <Route exact path='/:category' component={HomePage} />
          <Route exact path='/:category/:postId' component={EditPost} />
          <Route component={Page404} />
        </Switch>
      </div>
    )
  }
}

export default App;
