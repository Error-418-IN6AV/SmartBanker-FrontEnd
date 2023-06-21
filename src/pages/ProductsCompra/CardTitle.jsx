
import React, { useState, useEffect } from 'react'
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';
import axios from 'axios'
// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);



export const CardTitle = ({ name, description, price, descuento, total, getproducto }) => {

  return (
    <>
      <div className="card m-3 g-0" style={{ maxWidth: '20rem', maxHeight: '30rem' }}>
        <div className="card-body">
        <center>
            <h5 className="card-title">{name}</h5>
            </center>
            <p className="card-text">{description}</p>
        </div>
        <center>

        <ul className="list-group list-group-flush">
          <li className="list-group-item">Descuento del {descuento}%</li>
          <li className="list-group-item">Precio Inicial: {price}</li>
          <li className="list-group-item">Precio Con Descuento: {total}</li>
        </ul>
        <div className="card-body">

          <button type="button" className="btn btn-outline-secondary" onClick={getproducto}>
            
            <lord-icon
              src="https://cdn.lordicon.com/cllunfud.json"
              trigger="hover"
              colors="outline:#121331,primary:#646e78,secondary:#ebe6ef"
              style={{ width: "50px", height: "50px" }}>
            </lord-icon>COMPRAR
          </button>

        </div>
        </center>
      </div>


    </>
  )
}
