import React, { useEffect, useContext, useState } from 'react'
import './DashboardStyle.css'
import { Outlet, useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../index'

export const DashboardPage = ({ _id }) => {

    const { setLoggedIn, dataUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [isAdmin, setIsAdmin] = useState(true)


    const logOut = () => {
        localStorage.clear()
        setLoggedIn(false)
        navigate('/login')
    }

    return (
        <>
            <div >
                <div id="body">
                    <section id='sidebar'>
                        <div className='text-center'>
                            <a className='brand'>
                                <span className='text mt-2'>Smart Banke</span>
                            </a>
                            <ul className='side-menu top'>
                                {
                                    dataUser.role == 'ADMIN' ? (
                                        <li>
                                            <Link to='estadistic'>
                                                <button>
                                                    <span className='text'>Estadistic Client</span>
                                                </button>
                                            </Link>
                                        </li>
                                    ) : <></>
                                }
                                {
                                    dataUser.role == 'WORKER' ? (
                                        <li>
                                            <Link to='estadistic'>
                                                <button>
                                                    <span className='text'>Estadistic Client</span>
                                                </button>
                                            </Link>
                                        </li>
                                    ) : <></>
                                }
                                {
                                    dataUser.role == 'ADMIN' ? (
                                        <li>
                                            <Link to='worker'>
                                                <button>
                                                    <span className='text'>Add Workers</span>
                                                </button>
                                            </Link>
                                        </li>
                                    ) : <></>
                                }
                                {
                                    dataUser.role == 'ADMIN' ? (
                                        <li>
                                            <Link to='client'>
                                                <button>
                                                    <span className='text'>Add Client</span>
                                                </button>
                                            </Link>
                                        </li>
                                    ) : <></>
                                }
                                {
                                    dataUser.role == 'WORKER' ? (
                                        <li>
                                            <Link to='client'>
                                                <button>
                                                    <span className='text'>Add Client</span>
                                                </button>
                                            </Link>
                                        </li>
                                    ) : <></>
                                }
                                {
                                    dataUser.role == 'CLIENT' ? (
                                        <li>
                                            <Link to='transfer'>
                                                <button>
                                                    <span className='text'>Transfer</span>
                                                </button>
                                            </Link>
                                        </li>
                                    ) : <></>
                                }
                                {
                                    dataUser.role == 'CLIENT' ? (
                                        <li>
                                            <Link to='favorite'>
                                                <button>
                                                    <span className='text'>Favorites</span>
                                                </button>
                                            </Link>
                                        </li>
                                    ) : <></>
                                }
                                {
                                    dataUser.role == 'ADMIN' ? (
                                        <li>
                                            <Link to='product'>
                                                <button>
                                                    <span className='text'>product</span>
                                                </button>
                                            </Link>
                                        </li>
                                    ) : <></>
                                }
                                {
                                    dataUser.role == 'WORKER' ? (
                                        <li>
                                            <Link to='product'>
                                                <button>
                                                    <span className='text'>product</span>
                                                </button>
                                            </Link>
                                        </li>
                                    ) : <></>
                                }
                                {
                                    dataUser.role == 'CLIENT' ? (
                                        <li>
                                            <Link to='products'>
                                                <button>
                                                    <span className='text'>Product and services</span>
                                                </button>
                                            </Link>
                                        </li>
                                    ) : <></>
                                }
                                {
                                    dataUser.role == 'CLIENT' ? (
                                        <li>
                                            <Link to='compra'>
                                                <button>
                                                    <span className='text'>Factura</span>
                                                </button>
                                            </Link>
                                        </li>
                                    ) : <></>
                                }
                                {
                                    dataUser.role == 'WORKER' ? (
                                        <li>
                                            <Link to='deposito'>
                                                <button>
                                                    <span className='text'>Deposit</span>
                                                </button>
                                            </Link>
                                        </li>
                                    ) : <></>
                                }
                                {
                                    dataUser.role == 'ADMIN' ? (
                                        <li>
                                            <Link to='deposito'>
                                                <button>
                                                    <span className='text'>Deposit</span>
                                                </button>
                                            </Link>
                                        </li>
                                    ) : <></>
                                }
                            </ul>
                            <ul className='side-menu top'>
                                <li>
                                    <Link to='setting'>

                                        <button>
                                            <span className='text'>Welcome: {dataUser.username}, {dataUser.role}</span>
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={logOut}>
                                        <span className='text'>Sign off</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </section>
                    <section id='content'>
                        <Outlet></Outlet>
                    </section>
                </div>
            </div>
        </>
    )
}