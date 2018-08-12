import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { getPostsFromServer, getCategoriesFromServer, getCommentsFromServer } from './actions'

function mapStateToProps(state) {
    return state
}

class App extends Component {
    state = {
        posts: [],
        comments: [],
        categories: []
    }

    componentDidMount() {
        let posts = this.getPosts()
        let comments = this.getComments()
        let categories = this.getCategories()

        this.setState({posts, comments, categories})
    }

    getPosts = () => {
        this.props.dispatch(getPostsFromServer())
    }

    getComments = () => {
        this.props.dispatch(getCommentsFromServer())
    }

    getCategories = () => {
        this.props.dispatch(getCategoriesFromServer())
    }

    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to={'/'}>HomePage</Link>
                        </Navbar.Brand>
                    </Navbar.Header>
                </Navbar>
            </div>
        )
    }
}

export default connect(mapStateToProps)(App);
