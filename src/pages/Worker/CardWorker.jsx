import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";

export const CardWorker = ({ _id, name, surname, username, phone, email, role, getWoorker }) => {
  const [worker, setworker] = useState([{}])
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }

  const getWorker = async () => {
    try {
      const { data } = await axios('http://localhost:3000/user/getWorker', { headers: headers })
      if (data.worker) {
        setworker(data.worker)
        console.log(data.worker)
      }
    } catch (err) {
      console.log(err);
      throw new Error(err.response.message || 'Error getting Worker')
    }
  }

  const deleteWorker = async (id) => {
    try {
      let confirmDelete = confirm('Are you sure to delete this Worker?')
      if (confirmDelete) {
        const { data } = await axios.delete(`http://localhost:3000/user/delete/${id}`, { headers: headers })
        getWorker()
        alert(`${data.message}`)
        getWoorker()
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => getWorker, [])


  return (
    <>
      <div className="card m-3 g-0" style={{ maxWidth: '16rem', maxHeight: '30rem' }}>
        <div className="card-body" style={{backgroundColor: '#E6F4DE'}}>
          <h5 className="card-title">Name:</h5>
          <p className="card-title">{name}</p>
          <h5 className="card-title">Surname:</h5>
          <p className="card-title">{surname}</p>
          <h5 className="card-title">Username:</h5>
          <p className="card-title">{username}</p>
          <h5 className="card-title">Email:</h5>
          <p className="card-title">{email}</p>
          <h5 className="card-title">Phone:</h5>
          <p className="card-title">{phone}</p>
          <h5 className="card-title">Role:</h5>
          <p className="card-title">{role}</p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end footer">
            <Link to={`UpdateWorker/${_id}`} type="button" className="btn btn-success">Update</Link>
            <a onClick={() => deleteWorker(_id)} type="button" className="btn btn-danger">Delete</a>
          </div>
        </div>
      </div>
    </>
  )
}