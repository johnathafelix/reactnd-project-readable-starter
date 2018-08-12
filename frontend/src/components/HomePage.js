import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import {getServerCategories, getServerPosts, getServerComments} from '../services';

class HomePage extends Component {

    state = {
        posts: null
    }

    componentDidMount() {

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

export default HomePage;