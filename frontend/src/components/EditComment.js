import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, ButtonGroup, Row, Col, Grid, PageHeader, Form, FormGroup, ControlLabel, FormControl, Panel, Badge } from 'react-bootstrap'
import { upvoteCommentOnServer, downvoteCommentOnServer, getCommentFromServer, editCommentOnServer, deleteCommentOnServer } from '../actions'

class EditComment extends Component {

  state = {
    id: '',
    parentId: '',
    timestamp: '',
    body: '',
    author: '',
    voteScore: 0,
    deleted: false,
    parentDeleted: false,
  }

  componentDidUpdate() {
    if (this.state.id === '') {
      this.pegaComentario()
    }
  }

  componentDidMount() {
    this.props.pegaComentario(this.props.match.params.commentId).then(() => this.pegaComentario())
  }

  pegaComentario() {
    if(this.props.comments[0]) {
      this.setState({
        id: this.props.comments[0].id,
        parentId: this.props.comments[0].parentId,
        timestamp: this.props.comments[0].timestamp,
        body: this.props.comments[0].body,
        author: this.props.comments[0].author,
        voteScore: this.props.comments[0].voteScore,
        deleted: this.props.comments[0].deleted,
        parentDeleted: this.props.comments[0].parentDeleted
      })
    }
  }

  goBackToPost() {
    this.props.history.goBack()
  }

  onChangeAuthor(e) {
    this.setState({author: e.target.value})
  }

  onChangeBody(e) {
    this.setState({body: e.target.value})
  }

  onUpvoteComment(comment) {
    this.setState({
      voteScore: this.state.voteScore + 1
    })
    this.props.upvote(comment)
  }

  onDownvoteComment(comment) {
    this.setState({
      voteScore: this.state.voteScore -1
    })
    this.props.downvote(comment)
  }

  onUpdateComment() {
    this.props.update(this.state)
    this.goBackToPost()
  }

  onDeleteComment() {
    this.props.delete(this.state)
    this.goBackToPost()
  }

  render() {
    return (
      <div>
        <Grid>
          <Row className="container-fluid">
            <Col><PageHeader>Editar Comentário</PageHeader></Col>
          </Row>
          <Row className="container-fluid">
            <Col>
              <Form>
                <FormGroup>
                  <ControlLabel>Autor</ControlLabel>
                  <FormControl type="text" placeholder="Nome do autor"
                    value={this.state.author} onChange={(e) => this.onChangeAuthor(e)}
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Comentário</ControlLabel>
                  <FormControl componentClass="textarea" placeholder="Conteúdo do comentário"
                    value={this.state.body} onChange={(e) => this.onChangeBody(e)} />
                </FormGroup>
              </Form>
              <Panel header="Votação">
                Pontuação <Badge>{this.state.voteScore}</Badge>
                <Button bsSize="small" onClick={() => this.onUpvoteComment(this.state)}><i className="glyphicon glyphicon-thumbs-up"></i></Button>
                <Button bsSize="small" onClick={() => this.onDownvoteComment(this.state)}><i className="glyphicon glyphicon-thumbs-down"></i></Button>
              </Panel>
              <ButtonGroup>
                <Button bsSize="small" bsStyle="success" onClick={() => this.onUpdateComment()}><i className="glyphicon glyphicon-floppy-save"></i> Salvar </Button>
                <Button bsSize="small" bsStyle="warning" onClick={() => this.goBackToPost()}><i className="glyphicon glyphicon-remove"></i> Cancelar </Button>
                <Button bsSize="small" bsStyle="danger" onClick={() => this.onDeleteComment()}><i className="glyphicon glyphicon-trash"></i> Apagar Comentário </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps({comments}) {
  return {comments}
}

function mapDispatchToProps(dispatch) {
  return {
    upvote: (comment) => dispatch(upvoteCommentOnServer(comment, 'upVote')),
    downvote: (comment) => dispatch(downvoteCommentOnServer(comment, 'downVote')),
    pegaComentario: (commentId) => dispatch(getCommentFromServer(commentId)),
    update: (comment) => dispatch(editCommentOnServer(comment.id, comment)),
    delete: (comment) => dispatch(deleteCommentOnServer(comment.id)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditComment))
