import React, { useEffect, useContext, useState } from 'react'
import './DashboardStyle.css'
import { Outlet, useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '..'

export const DashboardPage = () => {
    const style = {
        backgroundColor: '#D6D9D9'
    }
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
            <div style={style}>
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
                                            <Link to='favorites'>
                                                <button>
                                                    <span className='text'> Favorites</span>
                                                </button>
                                            </Link>
                                        </li>
                                    ) : <></>
                                }
                            </ul>
                            <ul className='side-menu top'>
                                <li>
                                    <button>
                                        <span className='text'>Welcome: {dataUser.username}, {dataUser.role}</span>
                                    </button>
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