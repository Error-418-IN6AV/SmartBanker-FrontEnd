import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios';

export const UpdateWorker = () => {
    const [worker, setworker] = useState([{}])
    const [loading, setLoading] = useState(true)
    const { id } = useParams();
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }


    const getWorker = async () => {
        try {
            const { data } = await axios(`http://localhost:3000/user/getW/${id}`, { headers: headers })
            setworker(data.worker)
            setLoading(false)
        } catch (err) {
            console.error(err);
        }
    }

    const updateWorker = async () => {
        try {
            let updateWorker = {
                name: document.getElementById('inputName').value,
                surname: document.getElementById('inputSurname').value,
                username: document.getElementById('inputUsername').value,
                phone: document.getElementById('inputPhone').value,
                email: document.getElementById('inputEmail').value
            }
            const { data } = await axios.put(`http://localhost:3000/user/update/${id}`, updateWorker, { headers: headers })
            console.log(data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => getWorker, [])


    return (
        <>
            <h1 className='text-center'>UPDATE WORKER</h1>
            <div className='col-md-4 offset-md-4 mb-5 bt-5'>
                <div className='tab-content'>
                    <div className="tab-pane fade show active" id="pills-update" role="tabpanel" aria-labelledby="tab-update">
                        <form>
                            <br />
                            <div className='form-group text-center'>
                            </div>
                            <br />
                            <div className="form-floating">
                                <input defaultValue={worker.name} type="text" id="inputName" name='name' className="form-control" placeholder='text' />
                                <label className="form-label" htmlFor="inputName">Name</label>
                            </div>
                            <br />
                            <div className="form-floating">
                                <input defaultValue={worker.surname} type="text" id="inputSurname" name='surname' className="form-control" placeholder='text' />
                                <label className="form-label" htmlFor="inputSurname">Surname</label>
                            </div>
                            <br />
                            <div className="form-floating">
                                <input defaultValue={worker.username} type="text" id="inputUsername" name='username' className="form-control" placeholder='text' />
                                <label className="form-label" htmlFor="inputUsername">Username</label>
                            </div>
                            <br />
                            <div className="form-floating">
                                <input defaultValue={worker.phone} type="number" id="inputPhone" name='phone' className="form-control" placeholder='number' />
                                <label className="form-label" htmlFor="inputPhone">Phone</label>
                            </div>
                            <br />
                            <div className="form-floating">
                                <input defaultValue={worker.email} type="text" id="inputEmail" name='email' className="form-control" placeholder='text' />
                                <label className="form-label" htmlFor="inputEmail">Email</label>
                            </div>
                            <br />
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <Link to="/dashboard/worker">
                                    <button onClick={() => updateWorker()} className="btn btn-success">UPDATE</button>
                                </Link>
                                <Link to="/dashboard/worker">
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
