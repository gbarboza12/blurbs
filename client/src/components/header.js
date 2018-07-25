import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

class Header extends Component {

    getLinks() {
        const {loggedIn} = this.props;
        if(loggedIn) {
            return (
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/addBlurb'>Add</Link></li>
                    <li><Link to='/login'>Logout</Link></li>
                </ul>
            );
        } else {
            return (
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/register'>Register</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                </ul>
            );
        }
    }
    render() {
        return (
            <header>
                <div className="App-header">
                    <nav>
                        <div className="navigation">
                            {this.getLinks()}
                        </div>
                    </nav>
                </div>
            </header>
        );
    }
}

function mapStateToProps(state) {
    const { loggedIn } = state.authentication;
    return {
      loggedIn
    };
  }
 
 export default connect(mapStateToProps)(Header);