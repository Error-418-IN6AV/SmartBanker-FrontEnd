import React, { useEffect, useState } from 'react';
import { Paper, Typography, Grid, Table, TableHead, TableBody, TableCell, TableRow } from '@mui/material';
import Logo from '../../assets/Logo.jpg'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const Bill = ({ _id, user, nit,ciudad, producto, precioInicial, descuento, total, fecha,name,lastname }) => {

 const [loader,setLoader] = useState(false)

 const getPdf = ()=>{
  const input = document.querySelector('.pdf')
  setLoader(true)
  html2canvas(input).then((canvas)=>{
    const imgWith = 208;
    const imgHeight = canvas.height* imgWith/canvas.width
    const imgData = canvas.toDataURL('img/png')
    const doc = new jsPDF('p', 'mm','a4');
    doc.addImage(imgData, 'PNG', 0, 0, imgWith, imgHeight);
    setLoader(false);
    doc.save('receipt.pdf');
  })
 }

  return (
    <>
  
    <Paper className='pdf'style={{ padding: '42px' }}>
      <Grid container spacing={2}>
        <img src={Logo} alt="Logo" style={{ position: 'absolute', top: '50px', right: '50px', width: '110px', height: '110px' }} />
        <Grid item xs={12}>
          <Typography variant="h4" style={{ fontSize: '18px', fontWeight: 'bold' }}>NO. {_id}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" style={{ fontSize: '18px' }}>Name: {name} {lastname}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" style={{ fontSize: '18px' }}>NIT: {nit}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" style={{ fontSize: '18px' }}>CITY: {ciudad}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" style={{ fontSize: '18px' }}>DATE: {fecha}</Typography>
        </Grid>

        <Grid item xs={12}>
          <Table>
            <TableHead>
              <TableRow style={{ fontWeight: 'bolder', backgroundColor: '#898381' }}>
                <TableCell style={{ fontWeight: 'bolder', background: '#898381' }}>Producto</TableCell>
                <TableCell style={{ fontWeight: 'bolder', background: '#898381' }}>Precio</TableCell>
                <TableCell style={{ fontWeight: 'bolder', background: '#898381' }}>Descuento</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{producto}</TableCell>
                <TableCell>Q.{precioInicial}.00</TableCell>
                <TableCell>{descuento}%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" style={{ fontWeight: 'bolder' }}>Total Amount: Q. {total}.00</Typography>
        </Grid>


      </Grid>

    </Paper>
    <div className="d-grid col-2 mx-auto">
           <button onClick={getPdf} 
           disabled={!(loader===false)}
           className="btn btn-info" type="submit">
            <Typography variant="h6" style={{ fontWeight: 'bolder' }}>
            Download <i className="fa-solid fa-file-arrow-down"></i>
            </Typography>                       
             <lord-icon                  
             src="https://cdn.lordicon.com/pqxdilfs.json"
             trigger="hover"
            colors="outline:#131432,primary:#606874,secondary:#08a88a,tertiary:#ebe6ef"
            style={{width:"100px",height:"100px"}}>                   
             </lord-icon> 
           </button>
        </div> 
    </>
  );
};

export default Bill;

