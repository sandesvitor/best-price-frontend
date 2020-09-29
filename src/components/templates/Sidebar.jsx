import React from 'react'
import './Sidebar.css'


export default function Sidebar(props) {

    return (
        <aside className="sidebar">
            <h1>Sidebar</h1>
            <div className="product-category">
                {props.category}
            </div>
        </aside>
    )
}