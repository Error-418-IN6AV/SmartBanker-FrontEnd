import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";

export const CardClient = ({ _id, name, surname, username, dpi, nocuenta, location, movements, phone, email, namework, monthlyincome, balance, role, getCliients }) => {
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
      throw new Error(err.response.message || 'Error getting Client')
    }
  }

  const deleteClient = async (id) => {
    try {
      let confirmDelete = confirm('Are you sure to delete this Client?')
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
      <div className="card m-3 g-0" style={{ maxWidth: '20rem', maxHeight: '30rem' }}>
        <div className="card-body" style={{ backgroundColor: '#E3DAC9' }}>
          <div className='text-center'>
            <h5 className="card-title">Name</h5>
            <p className="card-title">{name}</p>
            <h5 className="card-title">Surname</h5>
            <p className="card-title">{surname}</p>
            <h5 className="card-title">Username</h5>
            <p className="card-title">{username}</p>
            <h5 className="card-title">DPI</h5>
            <p className="card-title">{dpi}</p>
            <h5 className="card-title">Account Number</h5>
            <p className="card-title">{nocuenta}</p>
            <h5 className="card-title">Balance</h5>
            <p className="card-title">{balance}</p>
            <h5 className='card-title'>Movements</h5>
            <p className='card-title'>{movements}</p>
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target={`#info${_id}`} style={{ color: "#FFF" }}>User Info</button>
            <Link to={`updateClient/${_id}`} type="button" className="btn btn-success">Update</Link>
            <button onClick={() => deleteClient(_id)} type="button" className="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
      <div className="modal fade" id={`info${_id}`} aria-labelledby="infoLabel" aria-hidden="true" style={{ marginTop: '12vh', marginLeft: '9vw' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <h1 className="text-center modal-title">Info {name}</h1>
            <div className=' modal-body text-center'>
              <h5 className="card-title">Phone</h5>
              <p className="card-title">+502 {phone}</p>
              <h5 className="card-title">Email</h5>
              <p className="card-title">{email}</p>
              <h5 className="card-title">Location</h5>
              <p className="card-title">{location}</p>
              <h5 className="card-title">Name Work</h5>
              <p className="card-title">{namework}</p>
              <h5 className="card-title">Monthly Income</h5>
              <p className="card-title">{monthlyincome}</p>
              <h5 className="card-title">Role</h5>
              <p className="card-title">{role}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}