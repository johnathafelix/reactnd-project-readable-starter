import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import HomePage from './components/HomePage'
import NewPost from './components/NewPost'
import NewComment from './components/NewComment'
import EditPost from './components/EditPost'
import EditComment from './components/EditComment'
import Page404 from './components/Page404'
import { Navbar } from 'react-bootstrap'

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
          <Route exact path='/newComment' component={NewComment} />
          <Route exact path='/comments/:commentId' component={EditComment} />
          <Route exact path='/:category' component={HomePage} />
          <Route exact path='/:category/:postId' component={EditPost} />
          <Route component={Page404} />
        </Switch>
      </div>
    )
  }
}

export default App
