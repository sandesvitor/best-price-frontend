import React from 'react'
import './Section.css'

import Sidebar from '../templates/Sidebar'
import Routes from '../../main/Routes'

export default function Section(props) {

    return (
        <section className="main-section">
            {/* <Sidebar /> */}
            <Routes />
        </section>
    )
}