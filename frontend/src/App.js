import React, { Component } from 'react';
import './css/bootstrap.min.css';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { Navbar, Grid, Row, Col } from 'react-bootstrap';
import { getPostsFromServer, getCategoriesFromServer, getCommentsFromServer } from './actions'
import Categories from './components/Categories'
import Controls from './components/Controls'
import Posts from './components/Posts'

class App extends Component {

  componentDidMount() {
    this.props.atualizaPosts()
    this.props.atualizaComentarios()
    this.props.atualizaCategorias()
  }

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
        <Grid>
          <Row className="container-fluid">
            <Categories categories={this.props.categories}/>
          </Row>
          <Row className="container-fluid">
            <Col>
              <Controls />
              <Posts />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    atualizaPosts: () => dispatch(getPostsFromServer()),
    atualizaComentarios: () => dispatch(getCommentsFromServer()),
    atualizaCategorias: () => dispatch(getCategoriesFromServer()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
