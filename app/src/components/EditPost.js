import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { getPostFromServer, votePostOnServer, deletePostOnServer } from "../actions/posts"
import { getCommentsFromServer } from "../actions/comments"
import { getCategoriesFromServer } from "../actions"
import { editServerPost } from "../utils/serverapi"
import Comments from "../components/Comments"
import { Button, ButtonGroup, Row, Col, Grid, PageHeader, Form, FormGroup, ControlLabel, FormControl, Panel, Badge } from "react-bootstrap"

class EditPost extends Component {

  state = {}

  componentDidMount() {
    this.getPost()
    this.props.getCategoriesFromServer()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params !== this.props.match.params) {
      this.getPost()
    }
  }

  getPost = () => {
    const { postId } = this.props.match.params
    if (postId != null) {
      this.props.getPostFromServer(postId).then(data => {
        this.setState({
          id: data.post.id,
          timestamp: data.post.timestamp,
          title: data.post.title,
          body: data.post.body,
          author: data.post.author,
          category: data.post.category,
          voteScore: data.post.voteScore,
          deleted: data.post.deleted
        })
      })
      this.props.getCommentsFromServer(postId)
    }
  }

  deletePost = () => {
    this.props.deletePostOnServer(this.state.id).then(() => this.props.history.push("/"))
  }

  onUpdateClick() {
    const newPost = {
      id: this.state.id,
      timestamp: this.state.timestamp,
      title: this.state.title,
      category: this.state.category,
      author: this.state.author,
      body: this.state.body,
      voteScore: this.state.voteScore,
      deleted: false
    }
    editServerPost(this.state.id, newPost)
    this.props.history.push("/")
  }

  onCancelClick() {
    this.props.history.push("/")
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

  newComment = () => {
    this.props.history.push("/newComment")
  }

  render() {
    return (
      <div>
        {this.state.id === undefined ? (
          <Grid>
            <Row className="container-fluid">
              <Col><PageHeader>Editar Publicação</PageHeader></Col>
            </Row>
            <Row >
              <h1>Publicação não encontrada!</h1><br /><Button bsSize="small" bsStyle="primary" onClick={this.onCancelClick.bind(this)}>Go Back</Button>
            </Row>
          </Grid>
        ) : (
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
                        value={this.state.body} onChange={(e) => this.onBodyChange(e)} />
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
                    <Button bsSize="small" onClick={() => { this.props.votePostOnServer(this.state.id, "upVote"); const d = this.state.voteScore + 1; this.setState({ voteScore: d }) }}><i className="glyphicon glyphicon-thumbs-up"></i></Button>
                    <Button bsSize="small" onClick={() => { this.props.votePostOnServer(this.state.id, "downVote"); const d = this.state.voteScore - 1; this.setState({ voteScore: d }) }}><i className="glyphicon glyphicon-thumbs-down"></i></Button>
                  </Panel>
                  <ButtonGroup>
                    <Button bsSize="small" bsStyle="success" onClick={this.onUpdateClick.bind(this)}><i className="glyphicon glyphicon-floppy-save"></i> Salvar </Button>
                    <Button bsSize="small" bsStyle="warning" onClick={this.onCancelClick.bind(this)}><i className="glyphicon glyphicon-remove"></i> Cancelar </Button>
                    <Button bsSize="small" bsStyle="danger" onClick={this.deletePost}><i className="glyphicon glyphicon-trash"></i> Apagar Publicação </Button>
                    <Button bsSize="small" bsStyle="primary" onClick={this.newComment}><i className="glyphicon glyphicon-plus"></i> Adicionar Comentário </Button>
                  </ButtonGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Comments />
                </Col>
              </Row>
            </Grid>
          )}
      </div>
    )
  }
}

const mapStateToProps = ({ post, categories, comments }) => ({ post, categories, comments })
const mapDispatchToProps = { getPostFromServer, getCommentsFromServer, deletePostOnServer, votePostOnServer, getCategoriesFromServer }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPost))
