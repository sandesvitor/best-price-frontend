import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Header.css'

export default function () {
    const [product, setProduct] = useState([{}])

    useEffect(() => {

        axios.get('https://api-bestprice.herokuapp.com/products')
            .then(res => res.data)
            .then(data => console.log(data))
            .catch(console.log)

    }, [])


    return (
        < header className="top-menu" >
            <form action="">
                <input type="text" />
                <button>Search</button>
            </form>
        </header >

    )
}