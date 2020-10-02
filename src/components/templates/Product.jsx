import React, { useEffect, useState } from 'react'
import './Product.css'


export default function Product(props) {

    const [starClasses, setStarClasses] = useState([])


    useEffect(() => {
        const classArray = []
        const stars = props.stars
        if (stars !== null) {
            let starUnity = parseInt(stars)
            let starDecimal = !parseInt(stars.split('.')[1]) ? 0 : parseInt(stars.split('.')[1])

            for (let i = 0; i < 5; i++) {
                if (i < starUnity) {
                    classArray.push('fas fa-star')
                    continue
                } else if (starDecimal !== 0) {
                    classArray.push('fas fa-star-half-alt')
                    starDecimal = 0
                } else {
                    classArray.push('far fa-star')
                }
            }

            setStarClasses(classArray)
        }

    }, [])


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

                <div className="product-rating">
                    {starClasses.map((classUnity, index) => {
                        return (
                            <i key={index} className={classUnity}></i>
                        )
                    })}
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