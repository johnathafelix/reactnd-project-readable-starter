import React, { Component } from 'react'
import { getServerComments } from '../utils/apiUtils'

class CommentCount extends Component {

  render() {
    let comentarios = getServerComments(this.props.postId).then((comments) => {
      return comments
    })
    return (
      <div>
        Comentários: {comentarios.length}
      </div>
    )
  }
}

export default CommentCount
