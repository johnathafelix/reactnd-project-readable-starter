import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addCommentOnServer } from '../actions'
import Uuid from 'uuid-lib'
import { Button, Grid, Row, Col, PageHeader, Form, FormGroup, ControlLabel, FormControl, ButtonGroup } from 'react-bootstrap'

class NewComment extends Component {

  state = {
    author: '',
    body: '',
  }

  goBackToPost() {
    this.props.history.goBack()
  }

  onChangeAuthor(e) {
    this.setState({ author: e.target.value })
  }

  onChangeBody(e) {
    this.setState({body: e.target.value})
  }

  adicionaComentario() {
    let newComment = {
      id: Uuid.raw(),
      timestamp: Date.now(),
      body: this.state.body,
      author: this.state.author,
      parentId: this.props.match.params.postId
    }
  
    this.props.criaComentario(newComment)
    this.props.history.goBack()
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
                    value={this.state.author} onChange={(e) => this.onChangeAuthor(e)}
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Comentário</ControlLabel>
                  <FormControl componentClass="textarea" placeholder="Texto do comentário"
                    value={this.state.body} onChange={(e) => this.onChangeBody(e)} />
                </FormGroup>
                <ButtonGroup>
                  <Button bsSize="small" bsStyle="success" onClick={() => this.adicionaComentario()}><i className="glyphicon glyphicon-floppy-save"></i> Salvar </Button>
                  <Button bsSize="small" bsStyle="warning" onClick={() => this.goBackToPost()}><i className="glyphicon glyphicon-remove"></i> Cancelar </Button>
                </ButtonGroup>
              </Form>
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
    criaComentario: (newComment) => dispatch(addCommentOnServer(newComment))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewComment))