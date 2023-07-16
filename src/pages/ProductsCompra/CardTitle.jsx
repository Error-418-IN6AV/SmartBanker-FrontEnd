
import React, { useState, useEffect } from 'react'
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';
import axios from 'axios'
import './ProductsAndServices.css'
// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);



export const CardTitle = ({ name, description, price, descuento, total, getproducto, image, stock }) => {

  return (
    <>

      <div className="card2">
        <div className="card__title">
          <div className="icon">
            <a href="#">

            </a>
          </div>
          <h3>Discounted products</h3>
        </div>
        <div className="card__body">
          <div className="half">
            <div className="featured_text">
              <h1>{name} with {descuento}%</h1>
              <p className="sub">${price}.00</p>
              <p className="price">${total}.00</p>
            </div>

          </div>

          <div className="half">
            <div className="description text-wrap lh-sm">
              <p className='lh-base'>
                {description}
              </p>
            </div>
            <span className="stock">
              "{stock}" In stock
            </span>
            <div className="reviews">
              <ul className="stars">
                <li>
                  <i className="fa fa-star" />
                </li>
                <li>
                  <i className="fa fa-star" />
                </li>
                <li>
                  <i className="fa fa-star" />
                </li>
                <li>
                  <i className="fa fa-star" />
                </li>
              </ul>

            </div>
          </div>
        </div>
        <div className="card__footer">
        <div className="col-sm-11 col-md-4 col-lg-4 mx-auto">
        <div className="image-fluid">
              <img
                crossOrigin="anonymous"
                src={image ? `http://localhost:3000/product/getImage/${image}` : '/Cesta.jpg'}
                onError={(e) => {
                  e.target.src = '/Cesta.jpg'; // Ruta a la imagen predeterminada en el directorio public
                }}
                className="card-img-top"
                alt="..."
                style={{width:'400px'}}
              />
            </div>
            </div>
        </div>
        <div className="card__footer">
          <div className="recommend">
            <p>Recommended by</p>
            <h3>Smart Banker</h3>
          </div>
          <div className="action">
            <button type="button" onClick={getproducto} >
              <lord-icon
                src="https://cdn.lordicon.com/cllunfud.json"
                trigger="hover"
                colors="outline:#121331,primary:#646e78,secondary:#ebe6ef"
                style={{ width: "50px", height: "50px" }}>
              </lord-icon>
            </button>
          </div>
        </div>
      </div>




    </>
  )
} 