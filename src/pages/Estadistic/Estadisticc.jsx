import React, { useEffect, useContext, PureComponent, useState } from 'react'
import { AuthContext } from '../../index'
import { Clients } from './Clients'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from "axios";
import { Link } from 'react-router-dom';

export const Estadisticc = () => {
    const [client, setclient] = useState([{}])
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const getClient = async () => {
        try {
            const { data } = await axios('http://localhost:3000/user/getClientss', { headers: headers })
            if (data.client) {
                setclient(data.client)
                console.log(data.client)
            }
        } catch (err) {
            console.log(err);
            throw new Error(err.response.message || 'Error getting Client')
        }
    }

    useEffect(() => getClient, [])


    return (
        <>
        <h1 className='text-center'>Descending Statistic</h1>
        <br/>
            <BarChart width={1220} height={600} data={client}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="movements" fill="#8884d8" />
                <Bar dataKey="balance" fill="#82ca9d" />
            </BarChart>
            <div className="row g-0 justify-content-center">
                {
                    client.map(({ _id, name, movements, balance }, i) => {
                        return (
                            <Clients
                                _id={_id}
                                key={i}
                                name={name}
                                movements={movements}
                                balance={'$' + balance + 'USD'}
                            ></Clients>
                        )
                    })
                }
            </div>
            <div className='text-center'>
            <Link to='/dashboard/estadistic' type="button" className="btn btn-dark">Growing</Link>
            </div>
            <Link></Link>
        </>
    )
}
