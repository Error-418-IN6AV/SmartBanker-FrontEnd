import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";

export const CardUsers = ({ _id, name, surname, username, phone, email, role }) => {
  const [user, setuser] = useState([{}])
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }

  const getUsers = async () => {
    try {
      const { data } = await axios('http://localhost:3000/user/get', { headers: headers })
      if (data.user) {
        setuser(data.user)
        console.log(data.user)
      }
    } catch (err) {
      console.log(err);
      throw new Error(err.response.message || 'Error getting User')
    }
  }

  const deleteUsers = async (id) => {
    try {
      let confirmDelete = confirm('Are you sure to delete this User?')
      if (confirmDelete) {
        const { data } = await axios.delete(`http://localhost:3000/user/delete/${id}`, { headers: headers })
        getUsers()
        alert(`${data.message}`)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => getUsers, [])


  return (
    <>
      <div className="card m-3 g-0" style={{ maxWidth: '18rem', maxHeight: '30rem' }}>
        <div className="card-body">
          <h5 className="card-title">Name:</h5>
          <p className="card-title">{name}</p>
          <h5 className="card-title">Surname:</h5>
          <p className="card-title">{surname}</p>
          <h5 className="card-title">Username:</h5>
          <p className="card-title">{username}</p>
          <h5 className="card-title">Phone:</h5>
          <p className="card-title">{phone}</p>
          <h5 className="card-title">Email:</h5>
          <p className="card-title">{email}</p>
          <h5 className="card-title">Role:</h5>
          <p className="card-title">{role}</p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <Link to={`UpdateUsers/${_id}`} type="button" className="btn btn-success">Update</Link>
            <a onClick={() => deleteUsers(_id)} type="button" className="btn btn-danger">Delete</a>
          </div>
        </div>
      </div>
    </>
  )
}