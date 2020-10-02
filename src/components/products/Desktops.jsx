import React from 'react';
import './Desktops.css';

import Products from '../templates/Products'

export default function Desktops() {

    return (
        <Products
            sidebarTitle="Desktops"
            baseUrl='http://localhost:5000/products'
        />
    )
}