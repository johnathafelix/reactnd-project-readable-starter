import React, { Component } from 'react'
import { Button, ButtonToolbar } from 'react-bootstrap'


class Controls extends Component {
    render() {
        return (
            <div>
              <h3>Ações</h3>
              <ButtonToolbar>
                  <Button bsSize="small" bsStyle="primary" onClick={this.addPost}>Criar publicação</Button>
                  <Button bsSize="small" onClick={() => this.props.sortPosts('title', 'asc')}>Ordenar por título</Button>
                  <Button bsSize="small" onClick={() => this.props.sortPosts('timestamp', 'desc')}>Ordenar pelas mais recentes</Button>
                  <Button bsSize="small" onClick={() => this.props.sortPosts('timestamp', 'asc')}>Ordenas pelas mais antigas</Button>
                  <Button bsSize="small" onClick={() => this.props.sortPosts('voteScore', 'asc')}>Ordenas pelas menos votadas</Button>
                  <Button bsSize="small" onClick={() => this.props.sortPosts('voteScore', 'desc')}>Ordenas pelas mais votadas</Button>
              </ButtonToolbar>
          </div>
        )
      }
    }

export default Controls