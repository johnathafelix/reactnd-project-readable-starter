import React, { Component } from 'react'
import { Button, ButtonToolbar } from 'react-bootstrap'
import { connect } from 'react-redux'


class Controls extends Component {
  render() {
    return (
      <div>
        <h3>Ações</h3>
        <ButtonToolbar>
          <Button bsSize="small" bsStyle="primary" onClick={this.addPost}>Criar publicação</Button>
          <Button bsSize="small" onClick={() => ordena(this.props.posts)}>Ordenar por título</Button>
          <Button bsSize="small" onClick={() => this.props.sortPosts('timestamp', 'desc')}>Ordenar pelas mais recentes</Button>
          <Button bsSize="small" onClick={() => this.props.sortPosts('timestamp', 'asc')}>Ordenas pelas mais antigas</Button>
          <Button bsSize="small" onClick={() => this.props.sortPosts('voteScore', 'asc')}>Ordenas pelas menos votadas</Button>
          <Button bsSize="small" onClick={() => this.props.sortPosts('voteScore', 'desc')}>Ordenas pelas mais votadas</Button>
        </ButtonToolbar>
      </div>
    )
  }
}

function ordena(posts) {
  let o = posts.sort(compare)
  console.log('o', o)
  return o
}

function compare(a, b) {
  return (a.title < b.title ? -1 : a.title > b.title ? 1 : 0)
  // if (a.title < b.title) return -1
  // if (a.title > b.title) return 1
  // return 0
}

function mapStateToProps({ posts }) {
  return { posts }
}

export default connect(mapStateToProps)(Controls)
