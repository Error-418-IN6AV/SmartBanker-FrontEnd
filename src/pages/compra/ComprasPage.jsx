import React from "react";
import axios from "axios";
import { useEffect, useState } from "react"; 
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './Compra.css'
export const ComprasPage = () => {

    const navigate = useNavigate();

    const [compra, setCompra,existProducto] = useState({});
    const [products, setproducts] = useState({});
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    }
  

    const { id } = useParams();

    const logOut = ()=>{
      add()
      navigate('/dashboard/products')
   
  
  }

  
  const close = ()=>{

    navigate('/dashboard/products')
 

}
  
      const getProduct = async()=>{
        try{
          const { data } = await axios(`http://localhost:3000/product/getProduct/${id}`,{ headers: headers })
          setproducts(data.products)
        }catch(err){
          console.error(err);
        }
      }

      const add = async () => {
        try {
    
          let compra = {
            name: document.getElementById('name').value,
            lastname: document.getElementById('lastname').value,
            nit: document.getElementById('nit').value,  
            ciudad: document.getElementById('ciudad').value,  
            product:products._id
          }
          const { data } = await axios.post('http://localhost:3000/compra/add', compra, { headers: headers })
          alert(data.message)
        } catch (err) {
          alert(err.response.data.message)
        }
      }

      

      useEffect(() => {getProduct();},[])

  return (
<main className="page payment-page">
    <section className="payment-form dark">
      <div className="container">
        <div className="block-heading">
          <h2>Payment</h2>

        </div>
        <form>
          <div className="products">
            <h3 className="title">{products.name}</h3>
            <div className="item">
              <span className="price">${products.price}</span>
              <p className="item-name">Precio Inicial</p>
              <p className="item-description">{products.description}</p>
            </div>
            <div className="item">
              <span className="price">{products.descuento}%</span>
              <p className="item-name">Descuento</p>
            </div>
            <div className="total">Total<span className="price">${products.total}</span></div>
          </div>
          <div className="card-details">
            <h3 className="title">Bill Details</h3>
            <div className="row">
            <div className="form-group col-sm-8">
            <div className="form-floating mb-3">
            <input id="name" type="text" className="form-control" placeholder="." aria-label="Card Holder" aria-describedby="basic-addon1"></input>
                  <label htmlFor="floatingInput">Name</label>
                </div>
           </div>
              <div className="form-group col-sm-8">
              <div className="form-floating mb-3">
                <input id="lastname" type="text" className="form-control" placeholder="." aria-label="Card Holder" aria-describedby="basic-addon1"></input>
                <label htmlFor="floatingInput">LastName</label>
              </div>
              </div>
              <div className="form-group col-sm-8">
              <div className="form-floating mb-3">
                <input id="ciudad" type="text" className="form-control"  placeholder="." aria-label="Card Holder" aria-describedby="basic-addon1"></input>
                <label htmlFor="floatingInput">Ciudad</label>
              </div>
              </div>
              <div className="form-group col-sm-4">
              <div className="form-floating mb-3">
                <input id="nit" type="number" defaultValue = '        ' className="form-control" maxLength="8" placeholder="." aria-label="Card Holder" aria-describedby="basic-addon1"></input>
                <label htmlFor="floatingInput">Nit</label>
              </div>
              </div>
              <div className="d-grid">
                  <button onClick={() =>logOut()} className="btn btn-outline-primary" type="submit"  ><i className="fa-solid fa-money-check-dollar"></i> Comprar</button>
                </div>

                <div className="d-grid mb-2">
                  <button onClick={close} className="btn btn-outline-danger" type="submit"><i className="fa-solid fa-ban"></i> CANCEL</button>
                </div>

            </div>
          </div>
        </form>
      </div>
    </section>
  </main>
  )
}
