import React, { useEffect, useContext, PureComponent, useState } from 'react'
import { AuthContext } from '../../index'
import { Client } from './Client'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from "axios";
import { Link } from 'react-router-dom';

export const ListEstadistic = () => {
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
            throw new Error(err.response.message || 'Error getting Client')
        }
    }

    useEffect(() => getClient, [])


    return (
        <>
            <h1 className='text-center'>Growing Statistic</h1>
            <br />
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
                            <Client
                                _id={_id}
                                key={i}
                                name={name}
                                movements={movements}
                                balance={'$' + balance + 'USD'}
                            ></Client>
                        )
                    })
                }
            </div>
            <div className='text-center'>
                <Link to='/dashboard/estadistic/estadisticc' type="button" className="btn btn-dark">Descending</Link>
            </div>
        </>
    )
}
