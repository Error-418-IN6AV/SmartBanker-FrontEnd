import React from 'react'
import { useState, useEffect } from 'react'
import { Paper, Typography, Grid, Table, TableHead, TableBody, TableCell, TableRow } from '@mui/material';
import { DepositTable } from './DepositTable';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './Deposit.css'
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import logo from '../../assets/Logo.jpg'

export const BillDeposit = ({ _id, noCuenta, amount, date }) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }
  const [deposit, setDeposit] = useState([{}]);
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  const getPdf = () => {

    const input = document.querySelector(`.body-wrap${deposit._id}`)
    setLoader(true)
    html2canvas(input).then((canvas) => {
      const imgWith = 208;
      const imgHeight = canvas.height * imgWith / canvas.width
      const imgData = canvas.toDataURL('img/png')
      var doc = new jsPDF('p', 'mm', 'a4');
      doc.addImage(imgData, 'PNG', 0, 0, imgWith, imgHeight);
      setLoader(false);
      doc.save('depositDoc.pdf');
    })
  }

  const getDepositId = async () => {
    try {
      const { data } = await axios(`http://localhost:3000/deposit/getDeposit/${id}`, { headers: headers })
      setDeposit(data.deposit)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => { getDepositId() }, [])

  return (
    <>
      <div className='deposit'>
        <div className='parent'>
          <br /><br /><br /><br />
          <table className="bodyde" >
            <tbody className={`body-wrap${deposit._id}`}>
              <tr>
                <td />
                <td className="containerde" width={600}>
                  <div className="content2">
                    <table className="main2" width="100%" cellPadding={0} cellSpacing={0}>
                      <tbody>
                        <tr>
                          <td className="content-wrap aligncenter2">
                            <table width="100%" cellPadding={0} cellSpacing={0}>
                              <tbody>
                                <tr>
                                  <td className="content-block">
                                    <h2>We are Smart banke</h2>
                                    <img src={logo} alheight="50" width="130" />
                                  </td>
                                </tr>
                                <tr>
                                  <td className="content-block">
                                    <table className="invoice2">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <table
                                              className="invoice2-items"
                                              cellPadding={0}
                                              cellSpacing={0}
                                            >
                                              <tbody>
                                                <tr>
                                                  <td>noCuenta</td>
                                                  <td className="alignright2">{deposit.noCuenta}</td>
                                                </tr>
                                                <tr>
                                                  <td>Date</td>
                                                  <td className="alignright2">{new Date(deposit.date).toLocaleString()}</td>
                                                </tr>
                                                <tr>
                                                  <td>Amount</td>
                                                  <td className="alignright2">${deposit.amount}</td>
                                                </tr>
                                                <tr className="total">
                                                  <td className="alignright2" width="80%">
                                                    Total
                                                  </td>
                                                  <td className="alignright2">${deposit.amount}</td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="content-block">
                                    SMART BANKE
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="footer2">
                      <table width="100%">
                        <tbody>
                          <tr>
                            <td className="aligncenter content-block">
                              Questions? Email <a href="mailto:">smartbanke@gmail.com</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </td>
                <td />
              </tr>
            </tbody>
          </table>
          <br />
        </div>
      </div>
      <div className='text-center'>
        <button onClick={getPdf} disabled={!(loader === false)} className='btn btn-success' style={{ marginRight: '10px' }} type="submit">Print</button>
        <Link to="/dashboard/deposito">
          <button className='btn btn-danger'>Cancelar</button>
        </Link>
      </div>
    </>

  )
}
