import React, { useState, useEffect } from 'react';
import './Hardwares.css';
import axios from 'axios'
import { Spinner } from 'react-bootstrap'

import Product from '../templates/Product'

export default function Hardwares() {
    const [initialProducts, setInitialProducts] = useState([])
    const [products, setProducts] = useState([])
    const [maxPrice, setMaxPrice] = useState(0)
    const [range, setRange] = useState(0.00)
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        try {
            await axios
                .get('https://api-bestprice.herokuapp.com/products')
                .then(res => res.data)
                .then(data => {
                    const maxValue = Math.max.apply(Math, data.map(product => product.price))
                    setMaxPrice(parseInt(maxValue) + 1)
                    setInitialProducts(data)
                    setProducts(data)
                })

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

    function renderByMaxPrice(e) {
        e.preventDefault()
        const limitedData = initialProducts.filter(product => product.price < range)
        setProducts(limitedData)
        console.log(products)
    }


    return (
        <section className="hardwares">

            <div className="sidebar-container">
                <aside className="sidebar">
                    <div className="category">
                        Hadwares
                    </div>

                    <hr />

                    <div className="price-range">
                        R${
                            range
                                .toString()
                                .replace('.', ',')
                                .replace(/[0-9](?=(?:[0-9]{3})+(?![0-9]))/g, '$&.')
                        }
                        <input
                            id="typeinp"
                            type="range"
                            min="0" max={maxPrice}
                            value={range}
                            onChange={e => {
                                setRange(parseFloat(e.target.value).toFixed(2))
                            }}
                            step="1"
                        />
                    </div>
                    <div className="sidebar-btn"
                        onClick={e => renderByMaxPrice(e)}>
                        Apply
                    </div>
                </aside>
            </div>

            <div className="products-container">
                {loading
                    ? renderProduct()
                    : <Spinner className="loading-spinner" animation="border" variant="danger" />
                }
            </div>


        </section>
    )
}