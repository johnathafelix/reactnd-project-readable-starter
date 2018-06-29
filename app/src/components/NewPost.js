import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getPostFromServer } from '../actions/posts'
import { getCategoriesFromServer } from '../actions'
import { addServerPost } from '../utils/serverapi'
import SmallHeader from './SmallHeader'
import Uuid from 'uuid-lib'
import { Button, ButtonGroup, Row, Col, Grid, PageHeader, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'


class NewPost extends Component {

  state = {
    title: '',
    category: 'react',
    author: '',
    body: '',
  }

  onAddClick() {
    const newPost = {
      id: Uuid.raw(),
      timestamp: Date.now(),
      title: this.state.title,
      category: this.state.category,
      author: this.state.author,
      body: this.state.body,
      voteScore: 1,
      deleted: false
    }
    addServerPost(newPost)
    this.props.history.push('/')
  }

  onCancelClick() {
    this.props.history.push('/')
  }

  onTitleChange(e) {
    this.setState({ title: e.target.value })
  }

  onAuthorChange(e) {
    this.setState({ author: e.target.value })
  }

  onBodyChange(e) {
    this.setState({ body: e.target.value })
  }

  onCategoryChange = (e) => {
    this.setState({
      category: e.target.value
    })
  }

  render() {
    const optionList = this.props.categories.map(category => (<option key={category.name} value={category.name}>{category.name}</option>))
    return (
      <div>
        <Grid>
          <Row className="container-fluid">
            <Col><PageHeader>Criar publicação</PageHeader></Col>
          </Row>
          <Row>
            <Col><SmallHeader shouldShow={false} /></Col>
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
                  <ControlLabel>Categoria</ControlLabel>
                  <FormControl componentClass="select" placeholder="Categoria da publicação"
                    value={this.state.category} onChange={this.onCategoryChange}>
                    {optionList}
                  </FormControl>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Publicação</ControlLabel>
                  <FormControl componentClass="textarea" placeholder="Texto da publicação"
                    value={this.state.body} onChange={(e) => this.onBodyChange(e)} />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Autor</ControlLabel>
                  <FormControl type="text" placeholder="Nome do autor"
                    value={this.state.author} onChange={(e) => this.onAuthorChange(e)}
                  />
                </FormGroup>
              </Form>
              <ButtonGroup>
                <Button bsSize="small" bsStyle="success" onClick={this.onAddClick.bind(this)}><i className="glyphicon glyphicon-floppy-save"></i> Salvar </Button>
                <Button bsSize="small" bsStyle="warning" onClick={this.onCancelClick.bind(this)}><i className="glyphicon glyphicon-remove"></i> Cancelar </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = ({ post, categories }) => ({ post, categories })
const mapDispatchToProps = { getPostFromServer, getCategoriesFromServer }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewPost))
