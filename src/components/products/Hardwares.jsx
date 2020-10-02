import React, { useState, useEffect } from 'react';
import './Hardwares.css';

import Products from '../templates/Products'

let baseUrl = ''
if (process.env.NODE_ENV === 'development') {
    baseUrl = process.env.REACT_APP_BASE_URL_DEV
    console.log(baseUrl)
} else if (process.env.NODE_ENV === 'production') {
    baseUrl = process.env.REACT_APP_BASE_URL_PRODUCTION
    console.log(baseUrl)
}

export default function Hardwares() {
    return (
        <Products
            sidebarTitle="Hardware"
            baseUrl={baseUrl}
        />
    )
}