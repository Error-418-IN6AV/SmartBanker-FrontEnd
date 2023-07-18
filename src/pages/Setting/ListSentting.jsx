import React, { useContext } from 'react'
import { AuthContext } from '../../index'

export const ListSentting = () => {
  const { setLoggedIn, dataUser } = useContext(AuthContext);

  return (
    <>
      <h1 className='text-center'>Welcome {dataUser.name}</h1>
      <table className="table">
        <tbody>
          <tr>
            <th className='text-center' scope="row">Name</th>
            <td className='text-center'>{dataUser.name}</td>
          </tr>
          <tr>
            <th className='text-center' scope="row">Surname</th>
            <td className='text-center'>{dataUser.surname}</td>
          </tr>
          <tr>
            <th className='text-center' scope="row">Username</th>
            <td className='text-center'>{dataUser.username}</td>
          </tr>
          <tr>
            <th className='text-center' scope="row">Phone</th>
            <td className='text-center'>+502 {dataUser.phone}</td>
          </tr>
          <tr>
            <th className='text-center' scope="row">DPI</th>
            <td className='text-center'>{dataUser.dpi}</td>
          </tr>
          <tr>
            <th className='text-center' scope="row">Balance</th>
            <td className='text-center'>${dataUser.balance}USD</td>
          </tr>
          <tr>
            <th className='text-center' scope="row">Account Number</th>
            <td className='text-center'>{dataUser.nocuenta}</td>
          </tr>
          <tr>
            <th className='text-center' scope="row">Location</th>
            <td className='text-center'>{dataUser.location}</td>
          </tr>
          <tr>
            <th className='text-center' scope="row">Name Work</th>
            <td className='text-center'>{dataUser.namework}</td>
          </tr>
          <tr>
            <th className='text-center' scope="row">Movements</th>
            <td className='text-center'>{dataUser.movements}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
