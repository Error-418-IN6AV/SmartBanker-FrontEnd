import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";

export const CardClient = ({ _id, name, surname, username, nocuenta, location, phone, email, namework, monthlyincome, balance, role, getCliients }) => {
  const [client, setclient] = useState([{}])
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }

  const getClient = async () => {
    try {
      const { data } = await axios('http://localhost:3000/user/getClient', { headers: headers })
      if (data.client) {
        setclient(data.client)
        console.log(data.client)
      }
    } catch (err) {
      console.log(err);
      throw new Error(err.response.message || 'Error getting User')
    }
  }

  const deleteClient = async (id) => {
    try {
      let confirmDelete = confirm('Are you sure to delete this Collaborator?')
      if (confirmDelete) {
        const { data } = await axios.delete(`http://localhost:3000/user/delete/${id}`, { headers: headers })
        getClient()
        alert(`${data.message}`)
        getCliients()
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => getClient, [])


  return (
    <>
      <div className="card m-3 g-0" style={{ maxWidth: '19rem', maxHeight: '18rem' }}>
        <div className="card-body" style={{backgroundColor: '#E6F4DE'}}>
          <h5 className="card-title">Name:</h5>
          <p className="card-title">{name}</p>
          <h5 className="card-title">Surname:</h5>
          <p className="card-title">{surname}</p>
          <h5 className="card-title">Username:</h5>
          <p className="card-title">{username}</p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button onClick={() => info(_id)} type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#info" style={{color: "#FFF"}}>User Info</button>
            <Link to={`updateClient/${_id}`} type="button" className="btn btn-success">Update</Link>
            <a onClick={() => deleteClient(_id)} type="button" className="btn btn-danger">Delete</a>
          </div>
        </div>
      </div>
      <div className="modal fade" id="info" aria-labelledby="infoLabel" aria-hidden="true" style={{marginTop: '15vh', marginLeft: '9vw'}}>
        <div className="modal-dialog">
          <div className="modal-content">
            <h3 className="text-center modal-title">Info Client</h3>
            <div className=' modal-body'>
              <h5 className="card-title">Account Number: {nocuenta}</h5>
              <h5 className="card-title">Phone: {phone}</h5>
              <h5 className="card-title">Email: {email}</h5>
              <h5 className="card-title">Location: {location}</h5>
              <h5 className="card-title">Name Work: {namework}</h5>
              <h5 className="card-title">Monthly Income: {monthlyincome}</h5>
              <h5 className="card-title">Balance: {balance}</h5>
              <h5 className="card-title">Role: {role}</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}