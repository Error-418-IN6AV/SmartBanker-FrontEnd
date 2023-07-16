import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios';

export const UpdateTransfer = () => {
    const [transfers, settransfers] = useState([{}])
    const [loading, setLoading] = useState(true)
    const { id } = useParams();
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }


    const getTransferss = async () => {
        try {
            const { data } = await axios(`http://localhost:3000/transfers/getTransfers/${id}`, { headers: headers })
            settransfers(data.transfers)
            setLoading(false)
        } catch (err) {
            console.error(err);
        }
    }

    const UpdateTransfer = async () => {
        try {
            let updatedTransfer = {
                monto: document.getElementById('inputMonto').value,
            }
            const { data } = await axios.put(`http://localhost:3000/transfers/update/${id}`, updatedTransfer, { headers: headers })
            alert(`${data.message}`)
            console.log(data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => getTransferss, [])


    return (
        <>
            <h1 className='text-center'>UPDATE TRANSFER</h1>
            <div className='col-md-4 offset-md-4 mb-5 bt-5'>
                <div className='tab-content'>
                    <div className="tab-pane fade show active" id="pills-update" role="tabpanel" aria-labelledby="tab-update">
                        <form>
                            <br />
                            <div className='form-group text-center'>
                            </div>
                            <br />
                            <div className="form-floating">
                                <input defaultValue={transfers.monto} type="text" id="inputMonto" name='monto' className="form-control" placeholder='Number' />
                                <label className="form-label" htmlFor="inputMonto">Monto</label>
                            </div>
                            <br />
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <Link to="/dashboard/transfer">
                                    <button onClick={() => UpdateTransfer()} className="btn btn-success">UPDATE</button>
                                </Link>
                                <Link to="/dashboard/transfer">
                                    <button className="btn btn-danger">Cancel</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}