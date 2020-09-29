import React from 'react'
import './Product.css'


export default function Product(props) {

    return (
        <div className="product-box">
            {props.title}
            <img
                src={props.imageUrl}
                alt={props.retailer}
            />
            <img
                src={require(`../../assets/${props.retailer.toLowerCase()}_logo.png`)}
                alt={props.retailer}
            />
        </div>
    )
}