import React, { useState, useEffect } from 'react'
import { CardUsers } from './CardUsers'
import axios from 'axios'

export const ListUsers = () => {
  const [users, setuser] = useState([{}])
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }

  const getUsers = async () => {
    try {
      const { data } = await axios('http://localhost:3000/user/get', { headers: headers })
      if (data.users) {
        setuser(data.users)
        console.log(data.users)
      }
    } catch (err) {
      console.log(err);
      throw new Error(err.response.message || 'Error getting Users')
    }
  }


  useEffect(() => getUsers, [])

  return (
    <>
      <main>
        <div className="left binding color">
          <h1 className='text-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
              <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
            </svg>
            | Users</h1>
        </div>
        <div className="row g-0 justify-content-center">
          {
            users.map(({ _id, name, username, surname, phone, email, password, role }, i) => {
              return (
                <CardUsers
                  _id={_id}
                  key={i}
                  name={name}
                  username={username}
                  surname={surname}
                  phone={phone}
                  email={email}
                  password={password}
                  role={role}
                ></CardUsers>
              )
            })
          }
        </div>
      </main>
    </>
  )
}