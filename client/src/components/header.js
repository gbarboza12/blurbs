import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
    <header>
        <div className="App-header">
            <nav>
                <div className="navigation">
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/addNew'>Add</Link></li>
                        <li><Link to='/signUp'>Sign Up</Link></li>
                    </ul>
                </div>
            </nav>
        </div>
    </header>
 )
 
 export default Header