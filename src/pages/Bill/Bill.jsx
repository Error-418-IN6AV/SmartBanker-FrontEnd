import React, { useEffect, useState } from 'react';
import { Paper, Typography, Grid, Table, TableHead, TableBody, TableCell, TableRow } from '@mui/material';
import Logo from '../../assets/Logo.jpg'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './Bill.css'
export const Bill = ({ _id, user, nit, producto, precioInicial, descuento, total, fecha, name, lastname, ciudad, cantidad }) => {

  const [loader, setLoader] = useState(false)

  const getPdf = () => {
    const input = document.querySelector(`.hola${_id}`)
    setLoader(true)
    html2canvas(input).then((canvas) => {
      const imgWith = 208;
      const imgHeight = canvas.height * imgWith / canvas.width
      const imgData = canvas.toDataURL('img/png')
      const doc = new jsPDF('p', 'mm', 'a4');
      doc.addImage(imgData, 'PNG', 0, 0, imgWith, imgHeight);
      setLoader(false);
      doc.save('receipt.pdf');
    })
  }

  return (
    <>


      <div className="container mt-6 mb-7">
        <div className="row justify-content-center">
          <div className="col-lg-12 col-xl-7">
            <div className="card">
              <div className={`hola${_id}`}>
                <div className="card-body p-5">
                  <h2>Hey {name} !</h2>
                  <p className="fs-sm">
                    This is the receipt for a payment of <strong>{total}</strong> (USD)
                  </p>
                  <div className="border-top border-gray-200 pt-4 mt-4">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="text-muted mb-2">Payment No.</div>
                        <strong>{_id}</strong>
                      </div>
                      <div className="col-md-6 text-md-end">
                        <div className="text-muted mb-2">Payment Date</div>
                        <strong>{new Date(fecha).toLocaleString()}</strong>
                      </div>
                    </div>
                  </div>
                  <div className="border-top border-gray-200 mt-4 py-4">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="text-muted mb-2">Client</div>
                        <strong>{name} {lastname}</strong>
                        <p className="fs-sm">
                          {ciudad}
                          <br />
                          <a href="#!" className="text-purple">
                            {nit}
                          </a>
                        </p>
                      </div>
                      <div className="col-md-6 text-md-end">
                        <div className="text-muted mb-2">Payment To</div>
                        <strong>Smart Banker</strong>
                        <p className="fs-sm">
                          {ciudad}
                          <br />

                        </p>
                      </div>
                    </div>
                  </div>
                  <table className="table border-bottom border-gray-200 mt-3">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="fs-sm text-dark text-uppercase-bold-sm px-0"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          className="fs-sm text-dark text-uppercase-bold-sm text-end px-0"
                        >
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-0">{producto}</td>
                        <td className="text-end px-0">${precioInicial}.00</td>
                      </tr>
                      <tr>
                        <td className="px-0">Descuento</td>
                        <td className="text-end px-0">{descuento}%</td>
                      </tr>
                      <tr>
                        <td className="px-0">Cantidad</td>
                        <td className="text-end px-0">{cantidad}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="mt-5">
                    <div className="d-flex justify-content-end">
                      <p className="text-muted me-3">Subtotal:</p>
                      <span>${precioInicial}.00</span>
                    </div>
                    <div className="d-flex justify-content-end">
                      <p className="text-muted me-3">Discount:</p>
                      <span>{descuento}%</span>
                    </div>
                    <div className="d-flex justify-content-end mt-3">
                      <h5 className="me-3">Total:</h5>
                      <h5 className="text-success">${total} USD</h5>
                    </div>
                  </div>
                </div>
              </div>
              <a
                onClick={getPdf}
                disabled={!(loader === false)}
                className="btn btn-dark btn-lg card-footer-btn justify-content-center text-uppercase-bold-sm hover-lift-light"
              >
                <Typography variant="h6" style={{ fontWeight: 'bolder' }}>
                  Download <i className="fa-solid fa-file-arrow-down"></i>
                </Typography>
                <lord-icon
                  src="https://cdn.lordicon.com/pqxdilfs.json"
                  trigger="hover"
                  colors="outline:#131432,primary:#606874,secondary:#08a88a,tertiary:#ebe6ef"
                  style={{ width: "100px", height: "100px" }}>
                </lord-icon>


              </a>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Bill;
