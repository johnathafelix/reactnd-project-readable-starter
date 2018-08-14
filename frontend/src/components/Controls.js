import React, { Component } from 'react'
import { Button, ButtonToolbar } from 'react-bootstrap'
import { connect } from 'react-redux'
import { orderPostsByTitle, orderPostsByScore, orderPostsByTimeStamp } from '../actions'
import { withRouter } from 'react-router-dom'

class Controls extends Component {

  createPost() {
    this.props.history.push('/new')
  }

  render() {
    return (
      <div>
        <h3>Ações</h3>
        <ButtonToolbar>
          <Button bsSize="small" bsStyle="primary" onClick={() => this.createPost()}>Criar publicação</Button>
          <Button bsSize="small" onClick={() => this.props.ordernaTitulo(this.props.posts, 'asc')}>Ordenar por título</Button>
          <Button bsSize="small" onClick={() => this.props.ordenaDataDecrescente(this.props.posts, 'desc')}>Ordenar pelas mais recentes</Button>
          <Button bsSize="small" onClick={() => this.props.odernaDataCrescente(this.props.posts, 'asc')}>Ordenas pelas mais antigas</Button>
          <Button bsSize="small" onClick={() => this.props.ordenaPontuacaoDecrescente(this.props.posts, 'desc')}>Ordenas pelas mais votadas</Button>
          <Button bsSize="small" onClick={() => this.props.ordenaPontuacaoCrescente(this.props.posts, 'asc')}>Ordenas pelas menos votadas</Button>
        </ButtonToolbar>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ordernaTitulo: (posts, option) => dispatch(orderPostsByTitle(posts, option)),
    odernaDataCrescente: (posts, option) => dispatch(orderPostsByTimeStamp(posts, option)),
    ordenaDataDecrescente: (posts, option) => dispatch(orderPostsByTimeStamp(posts, option)),
    ordenaPontuacaoCrescente: (posts, option) => dispatch(orderPostsByScore(posts, option)),
    ordenaPontuacaoDecrescente: (posts, option) => dispatch(orderPostsByScore(posts, option)),
  }
}

function mapStateToProps({ posts }) {
  return { posts }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Controls))
