import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

class Header extends Component {

    getLinks() {
        const {loggedIn} = this.props;
        if(loggedIn) {
            return (
                <ul className="navigation__list">
                    <li><Link className="navigation__link" to='/'>Home</Link></li>
                    <li  ><Link className="navigation__link" to='/addBlurb'>Add</Link></li>
                    <li  ><Link className="navigation__link" to='/landingpage'>Logout</Link></li>
                </ul>
            );
        } else {
            return (
                <ul className="navigation__list">
                    <li><Link className="navigation__link" to='/'>Home</Link></li>
                    <li><Link className="navigation__link" to='/register'>Register</Link></li>
                    <li><Link className="navigation__link" to='/landingpage'>Login</Link></li>
                </ul>
            );
        }
    }
    render() {
        return (
            <header>
                <div className="App-header ">
                    <nav className="navigation">
                        <div>
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