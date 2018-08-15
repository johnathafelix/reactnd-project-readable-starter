import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Panel, Grid, Row, Col, Well, Badge } from 'react-bootstrap'
import { upVotePostOnServer, downVotePostOnServer, deletePostOnServer, getPostFromServer } from '../actions'
import { withRouter } from 'react-router-dom'

class Posts extends Component {
  state = null

  componentDidUpdate() {
    if (!this.state) {
      this.setState({...this.state, posts: [this.props.posts]})
    }
  }

  editPost(post) {
    this.props.history.push(`/${post.category}/${post.id}`)
  }

  goToHomePage() {
    this.props.history.push('/')
  }

  onDeletePost(deletedPost) {
    this.props.delete(deletedPost)
  }

  render() {
    let posts = this.props.posts.filter((post) => {
      return !post.deleted
    })
    return (
      <div>
        <h3>Publicações: {posts.length}</h3>
        <div>
          {posts.map(post => (
            <Panel key={post.id} header={post.title}>
              <Grid>
                <Row className="container-fluid">
                  <Col> <Well>{post.body}</Well></Col>
                </Row>
                <Row className="container-fluid">
                  <Col>Autor: {post.author}</Col>
                  <Col>Data: {new Date(post.timestamp).toLocaleString('pt-BR')}</Col>
                  <Col>Categoria: {post.category}</Col>
                  <Col>Pontuação <Badge>{post.voteScore}</Badge></Col>
                </Row>
                <Row className="container-fluid">
                  Número de comentários: {post.commentCount}
                </Row>
                <Row className="container-fluid">
                  <Col>
                    <Button bsSize="small" onClick={() => { this.props.upVote(post) }}><i className="glyphicon glyphicon-thumbs-up"></i></Button>
                    <Button bsSize="small" onClick={() => { this.props.downVote(post) }}><i className="glyphicon glyphicon-thumbs-down"></i></Button>
                  </Col>
                  <Col>
                    <Button bsSize="small" bsStyle="primary" onClick={() => { this.editPost(post) }}><i className="glyphicon glyphicon-pencil"></i> Editar </Button>
                    <Button bsSize="small" bsStyle="danger" onClick={() => { this.onDeletePost(post) }}><i className="glyphicon glyphicon-trash"></i> Apagar Publicação </Button>
                  </Col>
                </Row>
              </Grid>
            </Panel>
          )
          )}
        </div>
      </div >
    )
  }
}

function mapStateToProps({ posts }) {
  return { posts }
}

function mapDispatchToProps(dispatch) {
  return {
    upVote: (post) => dispatch(upVotePostOnServer(post, 'upVote')),
    downVote: (post) => dispatch(downVotePostOnServer(post, 'downVote')),
    delete: (post) => dispatch(deletePostOnServer(post.id)),
    atualizaPosts: () => dispatch(getPostFromServer())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts))
