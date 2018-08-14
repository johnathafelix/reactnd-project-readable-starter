import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/bootstrap.min.css'
import { withRouter } from 'react-router-dom'
import { upVotePostOnServer, downVotePostOnServer } from '../actions'
import { Button, ButtonGroup, Row, Col, Grid, PageHeader, Form, FormGroup, ControlLabel, FormControl, Panel, Badge } from 'react-bootstrap'
import { getPostFromServer } from '../actions'

class EditPost extends Component {

  componentWillMount() {
    this.props.pegaPost(this.props.match.params.postId)
  }

  goToHomePage() {
    this.props.history.push('/')
  }

  render() {
    let post = this.props.posts[0]
    let author = ''
    let body = ''
    let category = ''
    let commentCount = 0
    let deleted = false
    let id = ''
    let timestamp = 0
    let title = ''
    let voteScore = ''

    if (post) {
      author = post.author
      body = post.body
      category = post.category
      commentCount = post.commentCount
      deleted = post.deleted
      id = post.id
      timestamp = post.timestamp
      title = post.title
      voteScore = post.voteScore
    }

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
                    value={title} onChange={(e) => { }}
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Publicação</ControlLabel>
                  <FormControl componentClass="textarea" placeholder="Conteúdo da publicação"
                    value={body} onChange={(e) => { }}
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Autor</ControlLabel>
                  <FormControl type="text" placeholder="Nome do autor"
                    value={author} onChange={(e) => { }}
                  />
                </FormGroup>
              </Form>
              <Panel header="Votação">
                Pontuação <Badge>{voteScore}</Badge>
                <Button bsSize="small" onClick={() => { this.props.upVote(post) }}><i className="glyphicon glyphicon-thumbs-up"></i></Button>
                <Button bsSize="small" onClick={() => { this.props.downVote(post) }}><i className="glyphicon glyphicon-thumbs-down"></i></Button>
              </Panel>
              <ButtonGroup>
                <Button bsSize="small" bsStyle="success" onClick={() => {}}><i className="glyphicon glyphicon-floppy-save"></i> Salvar </Button>
                <Button bsSize="small" bsStyle="warning" onClick={() => { this.goToHomePage() }}><i className="glyphicon glyphicon-remove"></i> Cancelar </Button>
                <Button bsSize="small" bsStyle="danger" onClick={() => {}}><i className="glyphicon glyphicon-trash"></i> Apagar Publicação </Button>
                <Button bsSize="small" bsStyle="primary" onClick={() => {}}><i className="glyphicon glyphicon-plus"></i> Adicionar Comentário </Button>
              </ButtonGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* <Comments /> */}
              Comentários do post: {commentCount}
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
    downVote: (post) => dispatch(downVotePostOnServer(post, 'downVote'))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPost))