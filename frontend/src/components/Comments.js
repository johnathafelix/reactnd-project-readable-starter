import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Panel, Grid, Row, Col, Badge } from 'react-bootstrap'
import { getCommentsFromServer, upvoteCommentOnServer, downvoteCommentOnServer } from '../actions'
import { withRouter } from 'react-router-dom'

class Comments extends Component {

  state = {
    comments: []
  }

  componentDidMount() {
    this.props.getComments(this.props.postId).then(() => {
      this.setState({ comments: this.props.comments })
    })
  }

  onUpvoteComment(c) {
    let newComments = this.state.comments.map((comment) => {
      if (comment.id === c.id) {
        return {
          ...comment,
          voteScore: comment.voteScore + 1,
        }
      } else {
        return comment
      }
    })
    this.setState({ comments: newComments })
    this.props.upvote(c)
  }

  onDownvoteComment(c) {
    let newComments = this.state.comments.map((comment) => {
      if (comment.id === c.id) {
        return {
          ...comment,
          voteScore: comment.voteScore - 1,
        }
      } else {
        return comment
      }
    })
    this.setState({ comments: newComments })
    this.props.downvote(c)
  }

  goToCommentEdit(comment) {
    this.props.history.push(`/comments/${comment.id}`)
  }

  render() {
    return (
      <div>
        <h3>Comentários: {this.state.comments.length} </h3>
        <div>
          {this.state.comments.map(comment => (
            <Panel key={comment.id} header={comment.author}>
              <Grid>
                <Row className="container-fluid">
                  <Col>{comment.body}</Col>
                </Row>
                <Row className="container-fluid">
                  <Col>Pontuação <Badge>{comment.voteScore}</Badge></Col>
                </Row>
                <Row className="container-fluid">
                  <Col>
                    <Button bsSize="small" onClick={() => { this.onUpvoteComment(comment) }}><i className="glyphicon glyphicon-thumbs-up"></i></Button>
                    <Button bsSize="small" onClick={() => { this.onDownvoteComment(comment) }}><i className="glyphicon glyphicon-thumbs-down"></i></Button>
                  </Col>
                  <Col>
                    <Button bsSize="small" bsStyle="primary" onClick={() => this.goToCommentEdit(comment)}><i className="glyphicon glyphicon-pencil"></i> Editar </Button>
                  </Col>
                </Row>
              </Grid>
            </Panel>
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps({ comments }) {
  return ({ comments })
}

function mapDispatchToProps(dispatch) {
  return {
    getComments: (postId) => dispatch(getCommentsFromServer(postId)),
    upvote: (comment) => dispatch(upvoteCommentOnServer(comment, 'upVote')),
    downvote: (comment) => dispatch(downvoteCommentOnServer(comment, 'downVote')),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comments))
