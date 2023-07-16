import React, { useState, useEffect } from 'react'
import { CardTitle } from './CardTitle'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export const ProductAndServices = () => {
  const [products, setProducts] = useState([{}])
  const [idProduct, setIdProdcut] = useState();
  const navigate = useNavigate();
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }

  const getProducts = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/product/get', { headers: headers })
      if (data.products) {
        setProducts(data.products)
        console.log(data.products)
      }
    } catch (err) {
      console.log(err);
      throw new Error(err.response.message || 'Error getting Products')
    }
  }




  const logOut = (_id) => {

    navigate(`/dashboard/compras/${_id}`)

  }




  useEffect(() => { getProducts() }, [])

  return (
    <>
      <main>
        <div className="left binding color">
          <lord-icon
            src="https://cdn.lordicon.com/qzwudxpy.json"
            trigger="loop"
            delay="8000"
            colors="outline:#121331,primary:#ebe6ef,secondary:#ffc738,tertiary:#f24c00"
            style={{ width: '100px', height: '100px' }}>
          </lord-icon> | Products

        </div>



        {
          products.map(({ _id, name, description, price, descuento, total, stock, image }, i) => {
            return (

              <CardTitle
                key={i}
                name={name}
                description={description}
                price={price}
                descuento={descuento}
                total={total}
                stock={stock}
                image={image}
                getproducto={() => logOut(_id)}

              ></CardTitle>

            )

          })


        }



      </main>
    </>
  )
}