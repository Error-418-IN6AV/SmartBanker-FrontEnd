import React, { useState, useContext } from 'react'
import { Navbar } from '../../components/Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Index'
import Logo from '../../assets/Logo.jpg'

export const LoginPage = () => {
  const { loggedIn, setLoggedIn, setDataUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const logIn = async (e) => {
    try {
      e.preventDefault()
      const { data } = await axios.post('http://localhost:3000/user/login', form)
      console.log(data.user)
      if (data.message) {
        alert(data.message)
        localStorage.setItem('token', data.token)
        setDataUser(data.userLogged)
        setLoggedIn(true)
        localStorage.setItem('ClaveSuperSecreta',JSON.stringify(data.userLogged))
        navigate('/dashboard')
      }
    } catch (err) {
      console.log(err)
      alert(err.response?.data.message)
      throw new Error('Error in login')
    }
  }

  return (
    <>
      <Navbar></Navbar>
      <br />
      <section className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card card-registration my-4">
              <div className="row g-0">
                <div className="col-xl-6 d-none d-xl-block">
                  <img src={Logo} width={'80%'} alt="Sample photo" className="img-fluid" />
                </div>
                <div className="col-xl-6">
                  <div className="card-body p-md-5 text-black">
                    <br />
                    <br />
                    <br />
                    <br />
                    <h3 className="text-center mb-5 text-uppercase">Login</h3>
                    <form className="mx-1 mx-md-4">

                      <div className="form-floating">
                        <input onChange={handleChange} type="username" name='username' className="form-control" placeholder='text' />
                        <label className="form-label" htmlFor="">Username</label>
                      </div>
                      <br />
                      <div className="form-floating">
                        <input onChange={handleChange} type="password" name='password' className="form-control" placeholder='text' />
                        <label className="form-label" htmlFor="">password</label>
                      </div>
                      <br />
                      <br />
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button onClick={logIn} type="button" className="btn btn-success">Login</button>
                      </div>

                    </form>

                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
