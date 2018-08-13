import React, { Component } from 'react';
import {PageHeader,Button, ButtonToolbar } from 'react-bootstrap';

class Categories extends Component {

  render() {
    let categories = this.props.categories
    return (
      <div>
        <PageHeader>Leitura</PageHeader>
        <h3>Filtro de Categorias</h3>
        <div>
          <ButtonToolbar>
            <Button
              bsSize="small"
              onClick={() => this.selectCategory('/')}>
              Todas
            </Button>
            {
              categories.map(category => (
                <Button
                  key={category.name}
                  bsSize="small"
                  onClick={() => this.selectCategory(`/${category.path}`)}>
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

export default Categories;