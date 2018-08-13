import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { PageHeader, Button, ButtonToolbar } from 'react-bootstrap';
import { getPostsByCategory, getPostsFromServer } from '../actions'

class Categories extends Component {

  selectCategory(category) {
    this.props.history.push(`/${category.path}`)
  }

  goToHomePage() {
    this.props.history.push('/')
  }

  render() {
    let categories = this.props.categories
    return (
      <div>
        <PageHeader>Leitura</PageHeader>
        <h3>Filtro de Categorias</h3>
        <div>
          <ButtonToolbar>
            <Button
              key='Todas'
              bsSize="small"
              onClick={() => this.goToHomePage()}>
              Todas
            </Button>
            {
              categories.map(category => (
                <Button
                  key={category.name}
                  bsSize="small"
                  onClick={() => {this.selectCategory(category)}}>
                  {category.name}
                </Button>
              ))
            }
          </ButtonToolbar>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ categories }) {
  return { categories }
}

function mapDispatchToProps(dispatch) {
  return {
    atualizaPostsCategoria: (category) => dispatch(getPostsByCategory(category)),
    atualizaPosts: () => dispatch(getPostsFromServer()),
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Categories));
