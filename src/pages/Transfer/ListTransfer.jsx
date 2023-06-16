import React, { useState, useEffect } from 'react'
import { CardTransfer } from './CardTransfer'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const ListTransfer = () => {
    const [transfer, settransfer] = useState([{}])
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

    const getTransfer = async () => {
        try {
            const { data } = await axios('http://localhost:3000/transfers/getTransfer', { headers: headers })
            if (data.transfer) {
                settransfer(data.transfer)
                console.log(data.transfer)
            }
        } catch (err) {
            console.log(err);
            throw new Error(err.response.message || 'Error getting Transfer')
        }
    }

    const addtransfer = async () => {
        try {
            let transfer = {
                nocuenta: document.getElementById('inputNoCuenta').value,
                dpi: document.getElementById('inputDPI').value,
                monto: document.getElementById('inputMonto').value
            }
            const { data } = await axios.post('http://localhost:3000/transfers/save', transfer, { headers: headers })
            getTransfer()
            alert(data.message)
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    useEffect(() => {
        getTransfer();
        getClient();
    }, [])
    return (
        <>
            <main>
                <div className="left binding color">
                    <h1 className='text-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-building-fill-up" viewBox="0 0 16 16">
                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.354-5.854 1.5 1.5a.5.5 0 0 1-.708.708L13 11.707V14.5a.5.5 0 0 1-1 0v-2.793l-.646.647a.5.5 0 0 1-.708-.708l1.5-1.5a.5.5 0 0 1 .708 0Z" />
                            <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v7.256A4.493 4.493 0 0 0 12.5 8a4.493 4.493 0 0 0-3.59 1.787A.498.498 0 0 0 9 9.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .39-.187A4.476 4.476 0 0 0 8.027 12H6.5a.5.5 0 0 0-.5.5V16H3a1 1 0 0 1-1-1V1Zm2 1.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5Zm3 0v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM4 5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5ZM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5ZM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z" />
                        </svg>
                        | Transfers</h1>
                    <div className='text-center'>
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Tranfers</button>
                    </div>
                </div>
                <div className="row g-0 justify-content-center">
                    {
                        transfer.map(({ _id, nocuenta, dpi, monto, date }, i) => {
                            return (
                                <CardTransfer
                                    _id={_id}
                                    key={i}
                                    monto={monto}
                                    nocuenta={nocuenta}
                                    dpi={dpi}
                                    date={date}
                                    gettranssfer={getTransfer}
                                ></CardTransfer>
                            )
                        })
                    }
                </div>
            </main>
            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ marginTop: '10vh', marginLeft: '9vw' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <h3 className="text-center modal-title">TRANSFER</h3>

                        <div className='modal-body'>
                            <div className="row">
                                <div className="mb-3">
                                    <label htmlFor="inputNoCuenta" className="form-label">Account Number:</label>
                                    <select className="form-control" id="inputNoCuenta">
                                        {
                                            client && client.map(({ _id, nocuenta }, i) => {
                                                return (
                                                    <option key={i} value={_id}>{nocuenta}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="mb-3">
                                    <label htmlFor="inputDPI" className="form-label">DPI and name:</label>
                                    <select className="form-control" id="inputDPI">
                                        {
                                            client && client.map(({ _id, dpi, name }, i) => {
                                                return (
                                                    <option key={i} value={_id}>{dpi} | {name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="form-floating">
                                <input type="number" id="inputMonto" name='number' className="form-control" placeholder='number' />
                                <label className="form-label" htmlFor="inputMonto">Amount</label>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">CLOSE</button>
                            <Link to='/dashboard/transfer'>
                                <button onClick={addtransfer} type="button" className="btn btn-primary" data-bs-dismiss="modal">ADD TRANSFER</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}