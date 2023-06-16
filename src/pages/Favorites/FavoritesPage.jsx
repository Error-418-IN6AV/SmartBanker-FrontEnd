import React from 'react'
import axios from 'axios'
import { CardFavorites } from './CardFavorites'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Box, Modal, Typography } from '@mui/material'

export const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([{}])
    const [open, setOpen] = useState(false);
    const Open = () => setOpen(true);
    const OpenUpdate = (id) => setOpenUpdate(true);
    const close = () => setOpen(false);
    const navigate = useNavigate();
    /* const headers = {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    } */

    const form = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
     
      };

    const gets = async()=>{
        try{
          const { data } = await axios('http://localhost:3000/favorites/gets')
          if(data.favorites){
            setFavorites(data.favorites)
            console.log(data.favorites)
          }
        }catch(err){
          console.log(err);
          throw new Error(err.response.message ||'Error getting favorites')
        }
      }

      const add = async () => {
        try {
            let favorites = {
                noCuenta: document.getElementById('inputNoCuenta').value,
                apodo: document.getElementById('inputApodo').value
            }
            const { data } = await axios.post('http://localhost:3000/favorites/add', favorites/* , {headers: headers} */)
            alert(data.message)
            gets()
        } catch (err) {
            alert(err.response.data.message)
        }
      }

      const deleteFavorite= async(_id) => {
        try{
          let confirmDelete = confirm('Are you sure to delete this favorite?')
            if(confirmDelete){
                const { data } = await axios.delete(`http://localhost:3000/favorites/delete/${_id}`/* ,  {headers: headers} */)
                gets()
                alert(`${data.message}: ${data.deletedFavorite}`)
            }
        }catch(err){
          console.error(err)
        }
      }

      const updatePage = (_id)=>{
        navigate(`/dashboard/updateFavorites/${_id}`)
      }

      const addIt = async () => {
        close();
        add();
      }
    
      useEffect(()=> {gets();}, [])

  return (
    <>
    <main>
      <center>
      <div className="left binding color">
       <h1> <svg xmlns="http://www.w3.org/2000/svg" style={{ color: '#E3A91C' }} width="70" height="70" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg> FAVORITES </h1> 
      </div>
      <div>
        <button onClick={Open} className="btn btn-success mb-2 btn-lg"><i className="fa-solid fa-door-closed"></i> ADD FAVORITE</button>
      </div>
      </center>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={form}>
        <div  className="card-body p-4 p-sm-5">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Agregar Favorito
          </Typography>
          <Typography component={'div'} id="modal-modal-description" sx={{ mt: 2 }} >
            <form>
              <div className="form-floating mb-3">
              <input type="text" name="inputNoCuenta" className="form-control" id="inputNoCuenta" placeholder="." />
                <label htmlFor="floatingInput">No Cuenta</label>
              </div>
              <div className="form-floating mb-3">
                <input type="text" name="inputApodo" className="form-control" id="inputApodo" placeholder="." />
                <label htmlFor="floatingInput">apodo</label>
              </div>
              <div className="d-grid">
                <button onClick={() =>addIt()} className="btn btn-primary btn-login text-uppercase fw-bold" type="submit"  >ADD</button>
              </div>
              <hr className="my-4" />
              <div className="d-grid mb-2">
                <button onClick={close} className="btn btn-google btn-login text-uppercase fw-bold" type="submit">
                  <i className="fab  me-2"></i> CANCEL
                </button>
              </div>
            </form>
          </Typography>
          </div>
        </Box>
      </Modal>
   
      <div className="row g-0 justify-content-center">
        {
          favorites.map(({ _id, noCuenta, apodo}, i) => {
            return (
              <CardFavorites
                key={i}
                noCuenta={noCuenta}
                apodo={apodo}
                get={() =>updatePage(_id)}
                deleteFavorite={() => deleteFavorite(_id)}
              ></CardFavorites>
            )
          })
        }
      </div>
    </main>
  </>
  )
}
