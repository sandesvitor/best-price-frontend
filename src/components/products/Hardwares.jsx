import React, { useState, useEffect } from 'react';
import './Hardwares.css';
import axios from 'axios'
import { Spinner } from 'react-bootstrap'

import Product from '../templates/Product'

const baseUrl = 'http://localhost:5000/products'

export default function Hardwares() {

    const [loaded, setLoaded] = useState(false)
    const [products, setProducts] = useState(null)
    const [manufactures, setManufacturers] = useState(null)

    const [pagination, setPagination] = useState(30)
    const [rating, setRating] = useState(0)
    const [maxPrice, setMaxPrice] = useState(0)
    const [range, setRange] = useState(0)


    const [queryString, setQueryString] = useState('')



    const renderProduct = () => {
        if (products !== null) {
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
    }

    const renderManufacturersCheckboxes = () => {
        if (manufactures !== null) {
            return manufactures.map((manufacturer, index) => {
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
    }

    useEffect(() => {

        const fetchData = async () => {
            const price = await axios(`${baseUrl}/meta/max`)
            const allManufacturers = await axios(`${baseUrl}/meta/man`)
            const initProducts = await axios(`${baseUrl}?mp=4000`)

            setMaxPrice(price.data + 1)
            setManufacturers(allManufacturers.data)
            setProducts(initProducts.data)
            setLoaded(true)
        }

        fetchData()

    }, [])

    useEffect(() => {
        console.debug(queryString)
        const fetchData = async () => {
            const filteredProducts = await axios(`${baseUrl}${queryString}`)
            setProducts(filteredProducts.data)
        }

        fetchData()
    }, [queryString])

    return (
        <section className="mobiles">

            <div className="sidebar-container">
                <aside className="sidebar">

                    <div className="category">
                        <h1>Hardware</h1>
                    </div>
                    <hr />
                    <div className="price-range">
                        <h2>Limite de Preço</h2>
                        R${
                            range
                                .toString()
                                .replace('.', ',')
                                .replace(/[0-9](?=(?:[0-9]{3})+(?![0-9]))/g, '$&.')
                        }
                        <input
                            type="range"
                            min="0" max={maxPrice}
                            value={range}
                            onChange={e => {
                                setRange(parseFloat(e.target.value).toFixed(2))
                            }}
                            step="1"
                        />
                    </div>
                    <div className="price-rating">
                        <h2>Rating do Produto</h2>
                        <span>☆{rating}</span>
                        <input
                            type="range"
                            min="0" max="5"
                            value={rating}
                            onChange={e => {
                                setRating(e.target.value)
                            }}
                            step="1"
                        />
                    </div>
                    <div className="manufacturers">
                        <h2>Fabricantes</h2>
                        {renderManufacturersCheckboxes()}
                    </div>
                    <div className="sidebar-btn"
                        onClick={e => {
                            let m = Array.from(document.querySelectorAll('.manufacturers input'))
                            let mChecked = m.filter(f => f.checked === true).map(m => m.value)
                            let mChumk = ''
                            mChecked.forEach(e => {
                                mChumk += `&mn=${e}`
                            })
                            let qRange = parseInt(range) === 0 ? '' : `&mp=${parseInt(range)}`

                            // IMPLEMENTAR MAIS ESSES DOIS FILTROS >>>
                            // let qRating = `&sr=${rating}`
                            // let qOrderByPrice = `&ol_d=${priceOrder}`

                            let query = `?pl=${pagination}` + qRange + mChumk


                            setQueryString(query)
                        }}>
                        Aplicar Filtros
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