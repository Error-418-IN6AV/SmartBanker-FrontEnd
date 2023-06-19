import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { Product } from "./Products";

export const ProductsTable = () => {
    const [products, setProducts] = useState([{}]);
    const [idProduct, setIdProduct] = useState();
    const navigate = useNavigate();

    const get = async () => {
        try {
          const { data } = await axios('http://localhost:3000/product/get')
          if (data.products) {
            setProducts(data.products)
            console.log(data.products)
          }
        } catch (err) {
          console.log(err);
 
        }
      }
    

    const addProduct = async () => {
        try {
            let product = {
                name: document.getElementById('inputName').value,
                description: document.getElementById('inputDescription').value,
                price: document.getElementById('inputPrice').value,
                descuento: document.getElementById('inputDescuento').value,
                stock: document.getElementById('inputStock').value
            }
            const { data } = await axios.post('http://localhost:3000/product/add', product)
            alert(data.message)
            get()
            resetAdd()
        } catch (err) {
            console.log(err);
        }
    }

    const resetAdd = async () => {
        try {
            document.getElementById('inputName').value = '',
                document.getElementById('inputDescription').value = '',
                document.getElementById('inputPrice').value = '',
                document.getElementById('inputDescuento').value = '',
                document.getElementById('inputStock').value=''
        } catch (error) {
            console.log(error)
        }
    }

    const deleteProduct = async (id) => {
        try {
            let confirmDelete = confirm('Are you sure to delete this account?')
            if (confirmDelete) {
                const { data } = await axios.delete(`http://localhost:3000/product/delete/${id}`)
                get()
                alert('Deleted Sucessfully')
            }
        } catch (err) {
            console.error(err)
        }
    }


    useEffect(() => get, [])

    return (
        <>
            <h1 className="text-center">Products <i className="fa-solid fa-shop"></i>
            </h1>
            <br />
            <div className="button-container text-center">
                <button type="button" className="btn  btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Add Product <i className="fa-solid fa-cart-plus"></i>
                </button>
        
                <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add Product</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                            <div className="mb-3">
                            <lord-icon
                                src="https://cdn.lordicon.com/pqxdilfs.json"
                                trigger="loop"
                                delay="4000"
                                colors="outline:#131432,primary:#606874,secondary:#08a88a,tertiary:#ebe6ef"
                                style={{width:"150px",height:"150px"}}>
                            </lord-icon>
                            </div>
                                <form id="formAdd">
       
                                    <div className="mb-3">
                                        <label htmlFor="inputName" defaultValue="." className="form-label">Name</label>
                                        <input type="text" className="form-control" id="inputName" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="inputDescription" defaultValue="." className="form-label">Description</label>
                                        <input type="text" className="form-control" id="inputDescription" required />
                                    </div>
                                    <div>
                                        <label htmlFor="inputPrice" defaultValue="." className="form-label">Price</label>
                                        <input type="Number" className="form-control" id="inputPrice" required />
                                    </div>
                                    <div>
                                        <label htmlFor="inputDescuento" defaultValue="0" className="form-label">Descuento</label>
                                        <input type="Number" className="form-control" id="inputDescuento" required />
                                    </div>
                                    <div>
                                        <label htmlFor="inputStock" defaultValue="0" className="form-label">Stock</label>
                                        <input type="Number" className="form-control" id="inputStock" required />
                                    </div>
                                    

                                </form>
                            </div>
                            <div className="modal-footer">
                                <button onClick={()=> resetAdd()} type="button" className="btn btn-success" data-bs-dismiss="modal">Close</button>
                                <button onClick={addProduct} type="button" className="btn btn-primary" data-bs-dismiss="modal">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                <br /><br />
            </div>
            <table className="table table-striped table-hover table-primary">
                <thead>
                    <tr className="text-center">
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>descuento</th>
                        <th>total</th>
                        <th>Stock</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(({ _id, name, description, price,descuento,total,stock }, index) => {

                            return (
                                <tr className="text-center" key={index}>
                                    <Product
                                        name={name}
                                        description={description}
                                        price={price}
                                        descuento={descuento}
                                        total={total}
                                        stock={stock}
                                    
                                    ></Product>
                                    <td>
                                        <svg onClick={() =>navigate(`/dashboard/updateProduct/${_id}`)
                                                 } type="button" className="bi bi-pencil-square" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                        {/* Empieza el modal */}
                                        
                                        <br /><br/>
                                    </td>
                                    <td>

                                    <svg onClick={() => deleteProduct(_id)} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                    </svg>

                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>    )
}