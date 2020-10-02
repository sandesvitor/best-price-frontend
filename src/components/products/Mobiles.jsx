import React, { useState, useEffect } from 'react';
import './Mobiles.css';
import axios from 'axios'
import { Spinner } from 'react-bootstrap'

import Product from '../templates/Product'

const baseUrl = 'http://localhost:5000/products'

export default function Hardwares() {

    const [loaded, setLoaded] = useState(false)
    const [products, setProducts] = useState([])

    const [maxPrice, setMaxPrice] = useState(0)
    const [range, setRange] = useState(0.00)


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

        const fetchData = async () => {
            const price = await axios(`${baseUrl}/max/`)
            const initProducts = await axios(`${baseUrl}?mn=AMD&mp=4000&rt=Kabum&rt=Amazon&ob_d=0&pl=100`)

            setMaxPrice(price.data + 1)
            setProducts(initProducts.data)
            setLoaded(true)
        }

        fetchData()

    }, [])

    return (
        <section className="mobiles">

            <div className="sidebar-container">
                <aside className="sidebar">

                    <div className="category">
                        <h1>Mobile</h1>
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

                </aside>
            </div>

            <div className="products-container">
                {loaded
                    ? renderProduct()
                    : <Spinner className="loading-spinner" animation="border" variant="danger" />
                }
            </div>


        </section>
    )
}