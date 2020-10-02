import React, { useState, useEffect } from 'react';
import './Hardwares.css';

import Products from '../templates/Products'


export default function Hardwares() {
    return (
        <Products
            sidebarTitle="Hardware"
            baseUrl='http://localhost:5000/products'
        />
    )
}