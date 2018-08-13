import React, { Component } from 'react';
import Categories from './Categories'
import Controls from './Controls'
import Posts from './Posts'
import { connect } from 'react-redux'
import '../css/bootstrap.min.css';
import { Grid, Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { getPostsFromServer, getCategoriesFromServer, getCommentsFromServer, getPostsByCategoryFromServer } from '../actions'


class HomePage extends Component {

  componentDidMount() {
    this.props.atualizaPosts()
    this.props.atualizaComentarios()
    this.props.atualizaCategorias()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params !== this.props.match.params) {
      const { category } = this.props.match.params
      if (category) {
        this.props.atualizaPostsCategoria(category)
      } else {
        this.props.atualizaPosts()
      }
    }
  }

  render() {
    return (
      <div>
        <Grid>
          <Row className="container-fluid">
            <Categories />
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
    atualizaPostsCategoria: (category) => dispatch(getPostsByCategoryFromServer(category)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
