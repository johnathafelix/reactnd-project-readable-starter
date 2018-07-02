import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import '../css/bootstrap.min.css'
import { Button, Panel, Grid, Row, Col, Badge } from 'react-bootstrap'

class Comments extends Component {

  goToComment = comment => {
    this.props.history.push(`/comments/${comment.id}`)
  }

  render() {
    return (
      <div>
        <h3>Comentários: {this.props.comments.length} </h3>
        <div>
          {this.props.comments.map(comment => (
            <Panel header={comment.author}>
              <Grid>
                <Row className="container-fluid">
                  <Col> {comment.body}</Col>
                </Row>
                <Row className="container-fluid">
                  <Col>Pontuação <Badge>{comment.voteScore}</Badge></Col>
                </Row>
                <Row className="container-fluid">
                  <Col><Button bsSize="small" bsStyle="primary" onClick={() => this.goToComment(comment)}><i className="glyphicon glyphicon-pencil"></i> Editar </Button></Col>
                </Row>
              </Grid>
            </Panel>
          )
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ comments }) => ({ comments })

export default withRouter(connect(mapStateToProps)(Comments))
