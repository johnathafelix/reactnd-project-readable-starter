import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actions from '../actions/comments'
import { editServerComment } from '../utils/serverapi'
import { Button, ButtonGroup, Row, Col, Grid, PageHeader, Form, FormGroup, ControlLabel, FormControl, Panel, Badge } from 'react-bootstrap'


class EditComment extends Component {

  state = {}

  componentDidMount() {
    this.getComment()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params !== this.props.match.params) {
      this.getComment()
    }
  }

  getComment = () => {
    const { commentId } = this.props.match.params
    if (commentId != null) {
      this.props.getCommentFromServer(commentId).then(data => {
        this.setState({
          id: data.comment.id,
          parentId: data.comment.parentId,
          body: data.comment.body,
          author: data.comment.author,
          voteScore: data.comment.voteScore
        })
      })
    }
  }

  deleteComment = () => {
    this.props.deleteCommentOnServer(this.state.id).then(() => this.props.history.push(`/${this.props.post.category}/${this.props.post.id}`))
  }

  onUpdateClick() {
    const newComment = {
      id: this.state.id,
      parentId: this.state.parentId,
      author: this.state.author,
      body: this.state.body,
      voteScore: this.state.voteScore,
      deleted: false
    }
    editServerComment(this.state.id, newComment)
    this.props.history.push(`/${this.props.post.category}/${this.props.post.id}`)
  }

  onCancelClick() {
    this.props.history.push(`/${this.props.post.category}/${this.props.post.id}`)
  }

  onAuthorChange(e) {
    this.setState({ author: e.target.value })
  }

  onBodyChange(e) {
    this.setState({ body: e.target.value })
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
                    value={this.state.author} onChange={(e) => this.onAuthorChange(e)}
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Comentário</ControlLabel>
                  <FormControl componentClass="textarea" placeholder="Conteúdo do comentário"
                    value={this.state.body} onChange={(e) => this.onBodyChange(e)} />
                </FormGroup>
              </Form>
              <Panel header="Votação">
                Pontuação <Badge>{this.state.voteScore}</Badge>
                <Button bsSize="small" onClick={() => { this.props.voteCommentOnServer(this.state.id, 'upVote'); const d = this.state.voteScore + 1; this.setState({ voteScore: d }) }}><i className="glyphicon glyphicon-thumbs-up"></i></Button>
                <Button bsSize="small" onClick={() => { this.props.voteCommentOnServer(this.state.id, 'downVote'); const d = this.state.voteScore - 1; this.setState({ voteScore: d }) }}><i className="glyphicon glyphicon-thumbs-down"></i></Button>
              </Panel>
              <ButtonGroup>
                <Button bsSize="small" bsStyle="success" onClick={this.onUpdateClick.bind(this)}><i className="glyphicon glyphicon-floppy-save"></i> Salvar </Button>
                <Button bsSize="small" bsStyle="warning" onClick={this.onCancelClick.bind(this)}><i className="glyphicon glyphicon-remove"></i> Cancelar </Button>
                <Button bsSize="small" bsStyle="danger" onClick={this.deleteComment}><i className="glyphicon glyphicon-trash"></i> Apagar Comentário </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = ({ comment, post }) => ({ comment, post })

export default withRouter(connect(mapStateToProps, actions)(EditComment))
