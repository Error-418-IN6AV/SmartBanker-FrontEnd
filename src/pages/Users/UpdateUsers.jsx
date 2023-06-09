import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios';

export const UpdateUsers = () => {
    const [user, setUser] = useState([{}])
    const [loading, setLoading] = useState(true)
    const { id } = useParams();
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }


    const getUser = async () => {
        try {
            const { data } = await axios(`http://localhost:3000/user/get/${id}`, { headers: headers })
            setUser(data.user)
            setLoading(false)
        } catch (err) {
            console.error(err);
        }
    }

    const updateUser = async () => {
        try {
            let updateUser = {
                name: document.getElementById('inputName').value,
                surname: document.getElementById('inputSurname').value,
                username: document.getElementById('inputUsername').value,
                phone: document.getElementById('inputPhone').value,
                email: document.getElementById('inputEmail').value
            }
            const { data } = await axios.put(`http://localhost:3000/user/update/${id}`, updateUser, { headers: headers })
            console.log(data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => getUser, [])


    return (
        <>
            <h1 className='text-center'>UPDATE USER</h1>
            <div className='col-md-4 offset-md-4 mb-5 bt-5'>
                <div className='tab-content'>
                    <div className="tab-pane fade show active" id="pills-update" role="tabpanel" aria-labelledby="tab-update">
                        <form>
                            <br />
                            <div className='form-group text-center'>
                            </div>
                            <br />
                            <div className="form-floating">
                                <input defaultValue={user.name} type="text" id="inputName" name='name' className="form-control" placeholder='text' />
                                <label className="form-label" htmlFor="inputName">Name</label>
                            </div>
                            <br />
                            <div className="form-floating">
                                <input defaultValue={user.surname} type="text" id="inputSurname" name='surname' className="form-control" placeholder='text' />
                                <label className="form-label" htmlFor="inputSurname">Surname</label>
                            </div>
                            <br />
                            <div className="form-floating">
                                <input defaultValue={user.username} type="text" id="inputUsername" name='username' className="form-control" placeholder='text' />
                                <label className="form-label" htmlFor="inputUsername">Username</label>
                            </div>
                            <br />
                            <div className="form-floating">
                                <input defaultValue={user.phone} type="text" id="inputPhone" name='phone' className="form-control" placeholder='number' />
                                <label className="form-label" htmlFor="inputPhone">Phone</label>
                            </div>
                            <br />
                            <div className="form-floating">
                                <input defaultValue={user.email} type="text" id="inputEmail" name='email' className="form-control" placeholder='text' />
                                <label className="form-label" htmlFor="inputEmail">Email</label>
                            </div>
                            <br />
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <Link to="/dashboard/users">
                                    <button onClick={() => updateUser()} className="btn btn-success">UPDATE</button>
                                </Link>
                                <Link to="/dashboard/users">
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