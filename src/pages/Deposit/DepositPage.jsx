import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { DepositTable } from './DepositTable'
import { Navigate, useNavigate } from 'react-router-dom'

export const DepositPage = () => {
  const [deposit, setDeposiy] = useState([{}])
  const [idDeposit, setIdeDeposit] = useState();
  const navigate = useNavigate();
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }

  const getDeposiy = async () => {
    try {
      const { data } = await axios('http://localhost:3000/deposit/getDeposits', { headers: headers })
      setDeposiy(data.deposit)
    } catch (err) {
      console.log(err)
    }
  }

  const [form, setFormData] = useState(
    {
      noCuenta: '',
      amount: ''
    }
  )

  const handleChage = (e) => {
    setFormData({
      ...form,
      [e.target.name]: e.target.value
    })
  }


  const addDeposit = async (e) => {
    try {
      e.preventDefault()
      const { data } = await axios.post('http://localhost:3000/deposit/add', form, { headers: headers });
      alert(data.message)
      e.target.reset()
      getDeposiy();
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  const cancellDe = async (id) => {
    try {
      let confirmDelete = confirm('Are you sure to cancel this deposit?')
      if (confirmDelete) {
        const { data } = await axios.delete(`http://localhost:3000/deposit/cancel/${id}`, { headers: headers })
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
            <button data-bs-toggle="modal" data-bs-target="#exampleModal1" className='btn btn-success py-3 text-base font-medium transition duration-200 hover:bg-blue-500 active:bg-blue-700 dark:bg-blue-400 dark:text-white dark:hover:bg-blue-300 dark:active:' >Add Deposit</button>
            {/* Empieza el modal */}
            <div className='modal fade' id='exampleModal1' aria-label='exampleModalLabel' aria-hidden='true' style={{ marginTop: '13vh', marginLeft: '9 vw' }}>
              <div className='modal-dialog'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h3 className='modal-title' id='exampleModalLabel'>Deposit</h3>
                  </div>
                  <div className="modal-body">
                    <form id="formAdd" onSubmit={(e) => addDeposit(e)}>

                      <div className="mb-3">
                        <label htmlFor="inputNoCuenta" className="form-label">NoCuenta</label>
                        <input onChange={handleChage} name='noCuenta' type="text" className="form-control" id="inputNoCuenta" required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="inputAmount" className="form-label">Amount</label>
                        <input onChange={handleChage} name='amount' type="text" className="form-control" id="inputAmount" required />
                      </div>
                      <div className='modal-footer'>
                        <button className='btn btn-danger rounded-xl bg-red-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-red-600' data-bs-dismiss='modal'>Close</button>
                        <button className='btn btn-success rounded-xl bg-green-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-green-600' type='submit'>Save</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div >
            <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
              <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                <table >
                  <thead className='background-color: rgb(156 163 175)'>
                    <tr  >
                      <th className='th px-6 py-3 bg-gray-50 dark:bg-gray-800 text-center text-xs font-semibold text-gray-600 uppercase -tracking-wider'>NoCuenta</th>
                      <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 
                  text-center text-xs font-semibold text-gray-600 uppercase tracking-wider'>Amount</th>
                      <th className='px-6 py-3 bg-gray-50 dark:bg-gray-800 
                  text-center text-xs font-semibold text-gray-600 uppercase tracking-wider'>Date</th>
                      <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 
                  text-center text-xs font-semibold text-gray-600 uppercase tracking-wider'>Accions</th>
                    </tr>
                  </thead>
                  <tbody className={`bill${deposit._id}`}>
                    {
                      deposit.map(({ _id, noCuenta, amount, date }, i) => {
                        const update = async (id) => {
                          try {
                            let depoUpdate = {
                              amount: document.getElementById(`inputAmountUp${id}`).value
                            }
                            const { data } = await axios.put(`http://localhost:3000/deposit/updateDeposit/${idDeposit}`, depoUpdate, { headers: headers })
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
                            document.getElementById(`inputAmountUp${idDeposit}`).defaultValue = amount

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
                              amount={'$' + amount + 'USD'}
                              date={date}


                            >
                            </DepositTable>
                            <td>
                              <svg onClick={() => viuwUpdate(_id)} data-bs-toggle="modal" data-bs-target={`#exampleModal2${_id}`} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className=" bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                              </svg>
                              <div className="modal fade" id={`exampleModal2${_id}`} aria-labelledby="exampleModalLabel" aria-hidden="true" >
                                <div className="modal-dialog">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h5 className="modal-title" id="exampleModalLabel">Update Deposit</h5>
                                    </div>
                                    <div className="modal-body">
                                      <form id="formUp">
                                        <div className="mb-3">
                                          <label htmlFor="inputAmountUp" className="form-label">Amount</label>
                                          <input type="text" className="form-control" id={`inputAmountUp${_id}`} required />
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
                              <svg  style={{ marginRight: '100px' }} onClick={() => cancellDe(_id)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                              </svg>
                            </td>
                            <td>
                              <svg  onClick={() => navigate(`/dashboard/billDeposit/${_id}`)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-check-fill" viewBox="0 0 16 16">
                                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm1.354 4.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
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
      </div>

    </>
  )
}
