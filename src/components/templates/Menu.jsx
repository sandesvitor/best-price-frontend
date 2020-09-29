import React from 'react'
import { Link } from 'react-router-dom'
import './Menu.css'

export default props =>
    <div className="main-menu">
        <Link to="/hardwares">
            <div className="icon-button">
                <i className="fas fa-memory fa-3x"></i>
            </div>
        </Link>

        <Link to="/desktops">
            <div className="icon-button">
                <i class="fas fa-desktop fa-3x"></i>
            </div>
        </Link>

        <Link to="/mobiles">
            <div className="icon-button">
                <i className="fas fa-mobile-alt fa-3x"></i>
            </div>
        </Link>
    </div>