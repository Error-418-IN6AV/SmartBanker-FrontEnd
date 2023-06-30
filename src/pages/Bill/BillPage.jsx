import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Bill} from './Bill';

export const BillPage = () => {
    const [compra, setBill] = useState([{}]);

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }
  const getBill = async()=>{
    try{
      const { data } = await axios.get('http://localhost:3000/compra/getBill', {headers: headers})
      if(data.compra){
        setBill(data.compra)
        console.log(data.compra)
      }
    }catch(err){
      console.log(err);
      throw new Error(err.response.message ||'Error getting Bill')
    }
  } 

  useEffect(() => {/* getProducts(); */ getBill();}, []);

  return (
    <>
     {
       compra.map(({_id ,user, nit, producto, precioInicial,descuento,total,name,lastname, fecha,ciudad,cantidad}, i)=>{
        return(
        <Bill
          key={i}
          _id={_id}
          user={user} 
          nit={nit}
          name={name}
          lastname={lastname}
          ciudad={ciudad}
          fecha={fecha}
          producto={producto}
          precioInicial={precioInicial}
          descuento={descuento}
          cantidad= {cantidad}
          getPdf={()=>getBill()}
          total={total} 
        
        />
        
        )
        
      }
      
      ) 
      } 

    </>
  );
};

