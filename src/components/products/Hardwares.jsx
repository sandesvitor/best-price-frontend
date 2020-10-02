import React, { useState, useEffect } from 'react';
import './Hardwares.css';
import axios from 'axios'
import { Spinner } from 'react-bootstrap'

import Product from '../templates/Product'

// const baseUrl = 'https://api-bestprice.herokuapp.com/products'
const baseUrl = 'http://localhost:3000/products'

export default function Hardwares() {
    const [initialProducts, setInitialProducts] = useState([])
    const [products, setProducts] = useState([])
    const [maxPrice, setMaxPrice] = useState(0)
    const [range, setRange] = useState(0.00)
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        try {
            await axios
                .get(baseUrl)
                .then(res => res.data)
                .then(data => {
                    const maxValue = Math.max.apply(Math, data.map(product => product.price))
                    setMaxPrice(parseInt(maxValue) + 1)
                    setRange(parseInt(maxValue) + 1)
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
                    price={product.price}
                    stars={product.stars}
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


    function renderManufacturers() {
        let uniqueManufacturers = []
        initialProducts.filter(product => uniqueManufacturers.push(product.manufacturer))
        uniqueManufacturers = [...new Set(uniqueManufacturers)]
        return uniqueManufacturers.map((manufacturer, index) => {
            return (
                <span key={index}>
                    <input type="checkbox"
                        name={manufacturer}
                        value={manufacturer}
                    /> {manufacturer}
                </span>
            )
        })
    }


    function applyFilters(e) {
        e.preventDefault()

        const inputs = document.querySelectorAll('.sidebar .manufacturers input')
        const manufacturers = Array.from(inputs)
            .filter(f => f.checked === true)
            .map(m => m.value)

        const priceLimiter = range

        const limitedData = initialProducts.filter(product => product.price < priceLimiter && manufacturers.includes(product.manufacturer))

        setProducts(limitedData)
    }


    return (
        <section className="hardwares">

            <div className="sidebar-container">
                <aside className="sidebar">

                    <div className="category">
                        <h1>Hadwares</h1>
                    </div>
                    <hr />
                    <div className="price-range">
                        <h2>Maximum Price</h2>
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
                    <hr />
                    <div className="manufacturers">
                        <h2>Manufacturers</h2>
                        {renderManufacturers()}
                    </div>
                    <hr />
                    <div className="sidebar-btn"
                        onClick={e => applyFilters(e)}>
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