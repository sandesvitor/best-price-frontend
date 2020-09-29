import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

export default props =>
    <header>
        <div className="top-menu">
            <Link to="/">
                <img className="logo" src={require('../../assets/logo_template.png')} alt="Brand Logo" />
            </Link>
            <div className="search-bar">
                <input type="text" placeholder="Search..." />
            </div>
        </div>
        <div className="bottom-menu">
        </div>
    </header>