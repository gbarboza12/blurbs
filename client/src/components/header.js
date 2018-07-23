import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };    
    }

    render() {
        return (
            <header>
                <div className="App-header">
                    <nav>
                        <div className="navigation">
                            <ul>
                                <li><Link to='/'>Home</Link></li>
                                <li><Link to='/addNew'>Add</Link></li>
                                <li><Link to='/register'>Register</Link></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
        )
    }

}
 
 export default Header