import React, { useState, useEffect } from 'react'
import { CardClient } from './CardClient'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const ListClient = () => {
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

  const addClient = async () => {
    try {
      let client = {
        name: document.getElementById('inputName').value,
        surname: document.getElementById('inputSurname').value,
        username: document.getElementById('inputUsername').value,
        dpi: document.getElementById('inputDPI').value,
        location: document.getElementById('inputLocation').value,
        phone: document.getElementById('inputPhone').value,
        email: document.getElementById('inputEmail').value,
        password: document.getElementById('inputPassword').value,
        namework: document.getElementById('inputNamework').value,
        monthlyincome: document.getElementById('inputMonthlyincome').value,
        balance: document.getElementById('inputBalance').value,

      }
      const { data } = await axios.post('http://localhost:3000/user/save', client, { headers: headers })
      alert(data.message)
      getClient()
      resetaddClient()
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  const resetaddClient = async () => {
    try {
      document.getElementById('inputName').value = '',
        document.getElementById('inputSurname').value = '',
        document.getElementById('inputUsername').value = '',
        document.getElementById('inputDPI').value = '',
        document.getElementById('inputLocation').value = '',
        document.getElementById('inputPhone').value = '',
        document.getElementById('inputEmail').value = '',
        document.getElementById('inputPassword').value = '',
        document.getElementById('inputNamework').value = '',
        document.getElementById('inputMonthlyincome').value = '',
        document.getElementById('inputBalance').value = ''
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => getClient, [])

  return (
    <>
      <main>
        <div className="left binding color">
          <h1 className='text-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-person-vcard-fill" viewBox="0 0 16 16">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5ZM9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8Zm1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5Zm-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96c.026-.163.04-.33.04-.5ZM7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" />
            </svg>
            | Client</h1>
          <div className='text-center'>
            <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Client</button>
          </div>
        </div>
        <div className="row g-0 justify-content-center">
          {
            client.map(({ _id, name, surname, username, nocuenta, dpi, location, movements, phone, email, namework, monthlyincome, balance, background, role }, i) => {
              return (
                <CardClient
                  _id={_id}
                  key={i}
                  name={name}
                  username={username}
                  surname={surname}
                  nocuenta={nocuenta}
                  dpi={dpi}
                  location={location}
                  movements={movements}
                  phone={phone}
                  email={email}
                  namework={namework}
                  monthlyincome={'$' + monthlyincome + 'USD'}
                  balance={'$' + balance + 'USD'}
                  role={role}
                  background={background}
                  getCliients={getClient}
                ></CardClient>
              )
            })
          }
        </div>
      </main>
      <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ marginLeft: '6vw' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <h3 className="text-center modal-title">CLIENT</h3>

            <div className='modal-body'>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="form-floating">
                    <input type="text" id="inputName" name='text' className="form-control" placeholder='text' />
                    <label className="form-label" htmlFor="inputName">Name</label>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="form-floating">
                    <input type="text" id="inputSurname" name='text' className="form-control" placeholder='text' />
                    <label className="form-label" htmlFor="inputSurname">Surname</label>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="form-floating">
                    <input type="text" id="inputUsername" name='text' className="form-control" placeholder='text' />
                    <label className="form-label" htmlFor="inputUsername">Username</label>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="form-floating">
                    <input type="number" id="inputDPI" name='number' className="form-control" placeholder='number' />
                    <label className="form-label" htmlFor="inputDPI">DPI</label>
                  </div>
                </div>
              </div>

              <div className="form-floating">
                <input type="text" id="inputEmail" name='text' className="form-control" placeholder='text' />
                <label className="form-label" htmlFor="inputEmail">Email</label>
              </div>
              <br />
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="form-floating">
                    <input type="number" id="inputPhone" name='number' className="form-control" placeholder='number' />
                    <label className="form-label" htmlFor="inputPhone">Phone</label>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="form-floating">
                    <input type="text" id="inputNamework" name='text' className="form-control" placeholder='text' />
                    <label className="form-label" htmlFor="inputNamework">Name Work</label>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="form-floating">
                    <input type="number" id="inputMonthlyincome" name='number' className="form-control" placeholder='number' />
                    <label className="form-label" htmlFor="inputMonthlyincome">Monthly Income</label>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="form-floating">
                    <input type="number" id="inputBalance" name='number' className="form-control" placeholder='number' />
                    <label className="form-label" htmlFor="inputBalance">Balance</label>
                  </div>
                </div>
              </div>

              <div className="form-floating">
                <input type="text" id="inputLocation" name='text' className="form-control" placeholder='text' />
                <label className="form-label" htmlFor="inputLocation">Location</label>
              </div>
              <br />
              <div className="form-floating">
                <input type="password" id="inputPassword" name='password' className="form-control" placeholder='password' />
                <label className="form-label" htmlFor="inputPassword">Password</label>
              </div>
              <br />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">CLOSE</button>
              <Link to='/dashboard/client'>
                <button onClick={addClient} type="button" className="btn btn-primary" data-bs-dismiss="modal">ADD CLIENT</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}