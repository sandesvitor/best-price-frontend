import React, { useState, useEffect } from 'react';
import './Mobiles.css';

import Products from '../templates/Products'

export default function Mobiles() {
    return (
        <Products
            sidebarTitle="Mobile"
            baseUrl='http://localhost:5000/products'
        />
    )
}