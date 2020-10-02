import React, { useState, useEffect } from 'react';
import './Products.css';
import axios from 'axios'
import { Spinner } from 'react-bootstrap'

import Product from './Product'

export default function Products(props) {
    const baseUrl = props.baseUrl

    const [loaded, setLoaded] = useState(false)
    const [products, setProducts] = useState(null)
    const [manufactures, setManufacturers] = useState(null)

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
            const initProducts = await axios(`${baseUrl}?mp=4000&sr=4&pl=30`)

            setMaxPrice(price.data + 1)
            setManufacturers(allManufacturers.data)
            setProducts(initProducts.data)
            setLoaded(true)
        }

        fetchData()

    }, [])

    useEffect(() => {
        console.log(queryString)
        const fetchData = async () => {
            const filteredProducts = await axios(`${baseUrl}${queryString}`)
            setProducts(filteredProducts.data)
        }

        fetchData()
    }, [queryString])

    return (
        <section className="products">

            <div className="sidebar-container">
                <aside className="sidebar">

                    <div className="category">
                        <h1>{props.sidebarTitle}</h1>
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
                    <div className="order-by-price">
                        <h2>Ordenar por preço:</h2>
                        <select name="prices">
                            <option value="desc">Descrescente</option>
                            <option value="asc">Crescente</option>
                        </select>
                    </div>
                    <div className="products-per-page">
                        <h2>Produtos por Página:</h2>
                        <select name="productsInPage">
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
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

                            let selectedValueOrderByPrice = document.querySelector('.order-by-price select').value
                            let qOrderByPrice = selectedValueOrderByPrice === 'desc' ? `&ob_p=0` : `&ob_p=1`

                            let selectedValueProducsPerPage = document.querySelector('.products-per-page select').value
                            let qProductsPerPage = `pl=${selectedValueProducsPerPage}`

                            let qRating = `&sr=${rating}`

                            // IMPLEMENTAR MAIS ESSES DOIS FILTROS >>>
                            // let qRetailer = `&rt=(...)` ---> precisa aplicar array!!! 

                            let query = `?${qProductsPerPage}`
                                + qRange
                                + mChumk
                                + qOrderByPrice
                                + qRating

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