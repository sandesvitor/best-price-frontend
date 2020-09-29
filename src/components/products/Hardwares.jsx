import React, { useState, useEffect } from 'react';
import './Hardwares.css';
import axios from 'axios'
import { Spinner } from 'react-bootstrap'

import Product from '../templates/Product'

export default function Hardwares() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        try {
            await axios
                .get('https://api-bestprice.herokuapp.com/products')
                .then(res => res.data)
                .then(data => setProducts(data))

            setLoading(true)

        } catch (err) {
            console.log(err)
        }
    }

    const renderProduct = () => {
        return products.map((product, index) => {
            return (
                <Product key={index}
                    title={product.name}
                    price={(product.price)}
                    retailer={product.retailer}
                    imageUrl={product.imageUrl}
                    link={product.link}
                />
            )
        })
    }

    useEffect(() => {
        fetchData()
    }, [])



    return (
        <section className="hardwares">
            {loading
                ? renderProduct()
                : <Spinner className="loading-spinner" animation="border" variant="danger" />
            }
        </section>
    )
}