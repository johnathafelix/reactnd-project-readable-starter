import React, { Component } from 'react'
import { PageHeader, Form, FormGroup, ControlLabel, FormControl, Button, ButtonGroup, Grid, Row, Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCategoriesFromServer, addPostOnServer } from '../actions'
import Uuid from 'uuid-lib'

class NewPost extends Component {

  state = {
    author: '',
    body: '',
    category: 'react',
    title: '',
  }

  componentWillMount() {
    this.props.atualizaCategorias()
  }

  goToHomePage() {
    this.props.history.push('/')
  }

  onChangeTitle(e) {
    this.setState({ title: e.target.value })
  }

  onChangeBody(e) {
    this.setState({body: e.target.value})
  }

  onChangeAuthor(e) {
    this.setState({author: e.target.value})
  }

  onChangeCategory(e) {
    this.setState({category: e.target.value})
  }

  adicionaPost() {
    let novoPost = {
      author: this.state.author,
      body: this.state.body,
      category: this.state.category,
      commentCount: 0,
      deleted: false,
      id: Uuid.raw(),
      timestamp: Date.now(),
      title: this.state.title,
      voteScore: 1,
    }
    this.props.criaPost(novoPost)
    this.goToHomePage()
  }

  render() {

    if (this.props.categories.length === 0) {
      return (<div></div>)
    }

    const optionList = this.props.categories.map(category => (<option key={category.name} value={category.name}>{category.name}</option>))

    return (
      <div>
        <Grid>
          <Row className="container-fluid">
            <Col><PageHeader>Criar publicação</PageHeader></Col>
          </Row>
          <Row className="container-fluid">
            <Col>
              <Form>
                <FormGroup>
                  <ControlLabel>Título</ControlLabel>
                  <FormControl type="text" placeholder="Título da publicação"
                    value={this.state.title} onChange={(e) => this.onChangeTitle(e)}
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Categoria</ControlLabel>
                  <FormControl componentClass="select" placeholder="Categoria da publicação"
                    value={this.state.category} onChange={(e) => this.onChangeCategory(e)}>
                    {optionList}
                  </FormControl>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Publicação</ControlLabel>
                  <FormControl componentClass="textarea" placeholder="Texto da publicação"
                    value={this.state.body} onChange={(e) => this.onChangeBody(e)} />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Autor</ControlLabel>
                  <FormControl type="text" placeholder="Nome do autor"
                    value={this.state.author} onChange={(e) => this.onChangeAuthor(e)}
                  />
                </FormGroup>
              </Form>
              <ButtonGroup>
                <Button bsSize="small" bsStyle="success" onClick={() => this.adicionaPost()}><i className="glyphicon glyphicon-floppy-save"></i> Salvar </Button>
                <Button bsSize="small" bsStyle="warning" onClick={() => this.goToHomePage()}><i className="glyphicon glyphicon-remove"></i> Cancelar </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps({categories}) {
  return ({categories})
}

function mapDispatchToProps(dispatch) {
  return {
    atualizaCategorias: () => dispatch(getCategoriesFromServer()),
    criaPost: (post) => dispatch(addPostOnServer(post)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewPost))
