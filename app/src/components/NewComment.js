import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getCommentFromServer } from '../actions/comments'
import { addServerComment } from '../utils/serverapi'
import Uuid from 'uuid-lib'
import { Button, Grid, Row, Col, PageHeader, Form, FormGroup, ControlLabel, FormControl, ButtonGroup } from 'react-bootstrap'

class NewComment extends Component {

  state = {
    author: '',
    body: '',
  }

  onAddClick() {
    const newComment = {
      id: Uuid.raw(),
      parentId: this.props.post.id,
      author: this.state.author,
      body: this.state.body,
      voteScore: 1,
      deleted: false
    }

    addServerComment(newComment)
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
            <Col><PageHeader>Adicionar Comentário</PageHeader></Col>
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
                  <FormControl componentClass="textarea" placeholder="Texto do comentário"
                    value={this.state.body} onChange={(e) => this.onBodyChange(e)} />
                </FormGroup>
                <ButtonGroup>
                  <Button bsSize="small" bsStyle="success" onClick={this.onAddClick.bind(this)}><i className="glyphicon glyphicon-floppy-save"></i> Salvar </Button>
                  <Button bsSize="small" bsStyle="warning" onClick={this.onCancelClick.bind(this)}><i className="glyphicon glyphicon-remove"></i> Cancelar </Button>
                </ButtonGroup>
              </Form>
            </Col>
          </Row>
        </Grid>
      </div>

    )
  }
}

const mapStateToProps = ({ post, comment }) => ({ post, comment })
const mapDispatchToProps = { getCommentFromServer }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewComment))
