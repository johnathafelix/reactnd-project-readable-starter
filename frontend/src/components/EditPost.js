import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/bootstrap.min.css'
import { withRouter } from 'react-router-dom'
import { Button, ButtonGroup, Row, Col, Grid, PageHeader, Form, FormGroup, ControlLabel, FormControl, Panel, Badge } from 'react-bootstrap'
import { getPostFromServer, updatePostOnServer, upVotePostOnServer, downVotePostOnServer, deletePostOnServer } from '../actions'
import Comments from './Comments'

class EditPost extends Component {

  state = {
    author: '',
    body: '',
    category: '',
    commentCount: '',
    deleted: '',
    id: '',
    timestamp: '',
    title: '',
    voteScore: ''
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params !== this.props.match.params) {
      this.pegaPost()
    }
  }

  componentDidMount() {
    this.props.pegaPost(this.props.match.params.postId).then(() => this.pegaPost())
  }

  goToHomePage() {
    this.props.history.push('/')
  }

  onAuthorChange(e) {
    this.setState({ author: e.target.value })
  }

  onTitleChange(e) {
    this.setState({ title: e.target.value })
  }

  onBodyChange(e) {
    this.setState({ body: e.target.value })
  }

  onUpvotePost() {
    this.setState({ voteScore: this.state.voteScore + 1 })
    this.props.upVote(this.state)
  }

  onDownvotePost() {
    this.setState({ voteScore: this.state.voteScore - 1 })
    this.props.downVote(this.state)
  }

  onSavePost() {
    this.props.update(this.state)
    this.goToHomePage()
  }

  onDeletePost() {
    let deletedPost = {
      ...this.state,
      deleted: true,
    }
    this.props.delete(deletedPost)
    this.goToHomePage()
  }

  pegaPost() {
    if (this.props.posts[0]) {
      this.setState({
        author: this.props.posts[0].author,
        body: this.props.posts[0].body,
        category: this.props.posts[0].category,
        commentCount: this.props.posts[0].commentCount,
        deleted: this.props.posts[0].deleted,
        id: this.props.posts[0].id,
        timestamp: this.props.posts[0].timestamp,
        title: this.props.posts[0].title,
        voteScore: this.props.posts[0].voteScore
      })
    }
  }

  render() {
    return (
      <div>
        <Grid>
          <Row className="container-fluid">
            <Col><PageHeader>Editar Publicação</PageHeader></Col>
          </Row>
          <Row className="container-fluid">
            <Col>
              <Form>
                <FormGroup>
                  <ControlLabel>Título</ControlLabel>
                  <FormControl type="text" placeholder="Título da publicação"
                    value={this.state.title} onChange={(e) => this.onTitleChange(e)}
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Publicação</ControlLabel>
                  <FormControl componentClass="textarea" placeholder="Conteúdo da publicação"
                    value={this.state.body} onChange={(e) => this.onBodyChange(e)}
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Autor</ControlLabel>
                  <FormControl type="text" placeholder="Nome do autor"
                    value={this.state.author} onChange={(e) => this.onAuthorChange(e)}
                  />
                </FormGroup>
              </Form>
              <Panel header="Votação">
                Pontuação <Badge>{this.state.voteScore}</Badge>
                <Button bsSize="small" onClick={() => { this.onUpvotePost() }}><i className="glyphicon glyphicon-thumbs-up"></i></Button>
                <Button bsSize="small" onClick={() => { this.onDownvotePost() }}><i className="glyphicon glyphicon-thumbs-down"></i></Button>
              </Panel>
              <ButtonGroup>
                <Button bsSize="small" bsStyle="success" onClick={() => { this.onSavePost() }}><i className="glyphicon glyphicon-floppy-save"></i> Salvar </Button>
                <Button bsSize="small" bsStyle="warning" onClick={() => { this.goToHomePage() }}><i className="glyphicon glyphicon-remove"></i> Cancelar </Button>
                <Button bsSize="small" bsStyle="danger" onClick={() => { this.onDeletePost() }}><i className="glyphicon glyphicon-trash"></i> Apagar Publicação </Button>
                <Button bsSize="small" bsStyle="primary" onClick={() => { }}><i className="glyphicon glyphicon-plus"></i> Adicionar Comentário </Button>
              </ButtonGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              {(this.state.id !== '') && <Comments postId={this.state.id}/>}
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps({ posts }) {
  return { posts }
}

function mapDispatchToProps(dispatch) {
  return {
    pegaPost: (postId) => dispatch(getPostFromServer(postId)),
    upVote: (post) => dispatch(upVotePostOnServer(post, 'upVote')),
    downVote: (post) => dispatch(downVotePostOnServer(post, 'downVote')),
    update: (post) => dispatch(updatePostOnServer(post)),
    delete: (post) => dispatch(deletePostOnServer(post.id)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPost))
