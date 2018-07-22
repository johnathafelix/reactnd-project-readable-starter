import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../css/bootstrap.min.css'

class Page404 extends Component {

  render() {
    return (
      <div>
        <Link to={'/'}>Página não encontrada! Voltar para a página principal</Link>
      </div>
    )
  }
}

export default Page404
