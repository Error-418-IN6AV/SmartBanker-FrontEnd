import axios from 'axios'
import React from 'react'
import { DepositTable } from './DepositTable'
import { useState, useEffect } from 'react'


export const DepositPage = () => {
  const [deposit, setDeposiy] = useState([{}])
  const [idDeposit, setIdeDeposit] = useState();
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
}
  const getDeposiy = async () => {
    try {
      const { data } = await axios('http://localhost:3000/deposit/getDeposits'/*, { headers: headers }*/)
      setDeposiy(data.deposit)
    } catch (err) {
      console.log(err)
    }
  }

  const addDeposit = async () => {
    try {
      let deposit = {
        noCuenta: document.getElementById('inputNoCuenta').value,
        amount: document.getElementById('inputAmount').value
      }
      console.log(deposit)
      const { data } = await axios.post('http://localhost:3000/deposit/add', deposit /*, { headers: headers }*/)
      alert(data.message)
      getDeposiy()
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  const cancellDe = async (id) => {
    try {
      let confirmDelete = confirm('Are you sure to cancel this deposit?')
      if (confirmDelete) {
        const { data } = await axios.delete(`http://localhost:3000/deposit/cancel/${id}` /*, { headers: headers }*/)
        getDeposiy();
        alert(`${data.message}`)

      }
    } catch (err) {
      console.error(err);
    }
  }


  useEffect(() => getDeposiy, [])

  return (
    <>

      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div>
            <h2 className='text-2xl font-semibold leading-tight'>Deposit</h2>
          </div>
          <div className="flex w-max gap-4">
            <button data-bs-toggle="modal" data-bs-target="#exampleModal1" className='btn btn-primary py-3 text-base font-medium transition duration-200 hover:bg-blue-500 active:bg-blue-700 dark:bg-blue-400 dark:text-white dark:hover:bg-blue-300 dark:active:' >Add Deposit</button>
            {/* Empieza el modal */}
            <div className='modal fade' id='exampleModal1' aria-label='exampleModalLabel' aria-hidden='true'>
              <div className='modal-dialog'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h3 className='modal-title' id='exampleModalLabel'>Deposit</h3>
                  </div>
                  <div className="modal-body">
                    <form id="formAdd">

                      <div className="mb-3">
                        <label htmlFor="inputNoCuenta" className="form-label">NoCuenta</label>
                        <input type="text" className="form-control" id="inputNoCuenta" required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="inputAmount" className="form-label">Amount</label>
                        <input type="text" className="form-control" id="inputAmount" required />
                      </div>
                      <div className='modal-footer'>
                        <button className='btn btn-danger rounded-xl bg-red-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-red-600' data-bs-dismiss='modal'>Close</button>
                        <button className='btn btn-success rounded-xl bg-green-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-green-600' onClick={() => addDeposit()}>Save</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead className='background-color: rgb(156 163 175)'>
                  <tr>
                    <th className='th px-6 py-3 bg-gray-50 dark:bg-gray-800 text-center text-xs font-semibold text-gray-600 uppercase -tracking-wider'>NoCuenta</th>
                    <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 
                  text-center text-xs font-semibold text-gray-600 uppercase tracking-wider'>Amount</th>
                    <th className='px-6 py-3 bg-gray-50 dark:bg-gray-800 
                  text-center text-xs font-semibold text-gray-600 uppercase tracking-wider'>Date</th>
                    <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 
                  text-center text-xs font-semibold text-gray-600 uppercase tracking-wider'>Accions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    deposit.map(({ _id, noCuenta, amount, date }, i) => {
                      const update = async () => {
                        try {
                          let depoUpdate = {
                            amount: document.getElementById('inputAmountUp').value
                          }
                          const { data } = await axios.put(`http://localhost:3000/deposit/updateDeposit/${idDeposit}`, depoUpdate /*, { headers: headers }*/)
                          alert(`${data.message}`)
                          getDeposiy()
                          viuwUpdate()
                          resetUp()
                        } catch (err) {
                          console.error(err)
                        }
                      }

                      const viuwUpdate = async (idDeposit) => {
                        try {
                          setIdeDeposit(idDeposit)
                          document.getElementById('inputAmountUp').defaultValue = amount

                        } catch (err) {
                          console.log(err)
                        }
                      }
                      const resetUp = async () => {
                        try {
                          document.getElementById('inputAmountUp').defaultValue = amount

                        } catch (err) {
                          console.log(err)
                        }
                      }



                      return (
                        <tr key={i}>
                          <DepositTable
                            noCuenta={noCuenta}
                            amount={amount}
                            date={date}

                          >
                          </DepositTable>
                          <td>
                            <svg onClick={() => viuwUpdate(_id)} data-bs-toggle="modal" data-bs-target="#exampleModal2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className=" bi bi-pencil-square" viewBox="0 0 16 16">
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                              <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                            </svg>
                            <div className="modal fade" id="exampleModal2" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                              <div className="modal-dialog">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Update Deposit</h5>
                                  </div>
                                  <div className="modal-body">
                                    <form id="formUp">
                                      <div className="mb-3">
                                        <label htmlFor="inputAmountUp" className="form-label">Amount</label>
                                        <input type="text" className="form-control" id="inputAmountUp" required />
                                      </div>
                                    </form>
                                  </div>
                                  <div className="modal-footer">
                                    <button type="button" className="btn btn-danger rounded-xl bg-red-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-red-600" data-bs-dismiss="modal">Close</button>
                                    <button onClick={() => update(_id)} type="button" className="btn btn-success rounded-xl bg-green-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-green-600" data-bs-dismiss="modal">Save</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <svg onClick={()=> cancellDe(_id)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                            </svg>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
