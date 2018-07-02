import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getCategoriesFromServer } from '../actions'
import { PageHeader } from 'react-bootstrap'
import Categories from './Categories'

class Header extends Component {
  componentDidMount() {
    this.getCategories()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params !== this.props.params) {
      this.getCategories()
    }
  }

  getCategories = () => {
    this.props.getCategoriesFromServer()
  }

  selectCategory = location => {
    this.props.history.push(location)
  }

  render() {
    return (
      <div>
        <PageHeader>Leitura</PageHeader>
        <h3>Filtro de Categorias</h3>
        <Categories shouldShow={true} />
      </div>
    )
  }
}

const mapStateToProps = ({ categories, posts }) => ({ categories, posts })
const mapDispatchToProps = { getCategoriesFromServer }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
