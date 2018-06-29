import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import '../css/bootstrap.min.css'
import { Button, Panel, Grid, Row, Col, Well, Badge } from 'react-bootstrap'
import formatTimestamp from '../utils/formatTimestamp'
import CommentCount from './CommentCount'

class Posts extends Component {

  navigate = post => {
    this.props.history.push(`/${post.category}/${post.id}`)
  }

  render() {
    return (
      <div>
        <h3>Publicações: {this.props.posts.length}</h3>
        <div>
          {this.props.posts.map(post => (
            <Panel header={post.title}>
              <Grid>
                <Row className="container-fluid">
                  <Col> <Well>{post.body}</Well></Col>
                </Row>
                <Row className="container-fluid">
                  <Col>Autor: {post.author}</Col>
                  <Col>Data: {formatTimestamp(post.timestamp)}</Col>
                  <Col>Categoria: {post.category}</Col>
                  <Col>Pontuação <Badge>{post.voteScore}</Badge></Col>
                </Row>
                <Row className="container-fluid">
                  <Col><CommentCount postId={post.id} /></Col>
                </Row>
                <Row className="container-fluid">
                  <Col><Button bsSize="small" bsStyle="primary" onClick={() => this.navigate(post)}><i className="glyphicon glyphicon-pencil"></i> Editar </Button></Col>
                </Row>
              </Grid>
            </Panel>
          )
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ posts }) => ({ posts })

export default withRouter(connect(mapStateToProps)(Posts))