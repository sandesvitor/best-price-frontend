import React from 'react'
import './Product.css'


export default function Product(props) {

    return (
        <div className="product-box">
            <a className="product-link" href={props.link} target="_blank" rel="noopener noreferrer">
                <div className="product-title">
                    {props.title}
                </div>

                <div className="product-img">
                    <img
                        src={props.imageUrl}
                        alt={props.retailer}
                    />
                </div>

                <div className="product-price">
                    {props.price !== null
                        ? `R$ ${props.price}`
                        : "Sem preço no momento"
                    }
                </div>

                <div className="product-retailer">
                    <img
                        src={require(`../../assets/${props.retailer.toLowerCase()}_logo.png`)}
                        alt={props.retailer}
                    />
                </div>
            </a>
        </div>
    )
}