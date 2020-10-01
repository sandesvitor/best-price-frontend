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
                        src={props.imageUrl ? props.imageUrl : require('../../assets/fail_request_image.png')}
                        alt={props.retailer}
                    />
                </div>

                <div className="product-price">
                    {props.price !== null
                        ? `R$ ${props.price.toFixed(2)
                            .toString()
                            .replace('.', ',')
                            .replace(/[0-9](?=(?:[0-9]{3})+(?![0-9]))/g, '$&.')}`
                        : "Sem preço no momento"
                    }
                </div>

                {/* ainda está estárica! */}
                <div className="product-rating">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>

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