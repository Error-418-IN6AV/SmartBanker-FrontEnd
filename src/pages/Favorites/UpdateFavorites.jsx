import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export const UpdateFavorites = () => {
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState({});
  const [favorites, setFavorites] = useState({});
  const { id } = useParams();
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }

  const editar = () => {
    update()
    navigate('/dashboard/favorite')
  }

  const close = () => {
    navigate('/dashboard/favorite')

  }

  /* const getUsers = async()=>{
      try{
          const { data } = await axios('http://localhost:3000/user/get')
          setUsers(data.users)
      }catch(err){
          console.log(err);
      }
  } */

  const gets = async () => {
    try {
      const { data } = await axios('http://localhost:3000/favorites/gets', { headers: headers })
      if (data.favorites) {
        setFavorite(data.favorites)
        console.log(data.favorites)
      }
    } catch (err) {
      console.log(err);
      throw new Error(err.response.message || 'Error getting favorites')
    }
  }


  const get = async () => {
    try {
      const { data } = await axios(`http://localhost:3000/favorites/get/${id}`, { headers: headers })
      setFavorite(data.favorite)
    } catch (err) {
      console.error(err);
    }
  }

  const update = async () => {
    try {
      let updatedFavorite = {
        apodo: document.getElementById('apodo').value
      }
      const { data } = await axios.put(`http://localhost:3000/favorites/update/${id}`, updatedFavorite, { headers: headers })
      alert(data.message)
    } catch (err) {
    }
  }

  useEffect(() => {
    get(); /* getUsers(); */
  }, [])

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5" id="carta">
              <div className="card-body p-4 p-sm-5">
                <h2 className='text-center'>Update Favorte</h2>
                <form>
                  <div className="form-floating mb-3" >
                    <input defaultValue={favorite.apodo} type="text" name="apodo" className="form-control" id="apodo" placeholder="." />
                    <label htmlFor="floatingInput">apodo</label>
                  </div>
                  <div className="d-grid">
                    <button onClick={() => editar()} className="btn btn-primary btn-login text-uppercase fw-bold" type="submit"  >UPDATE</button>
                  </div>

                  <hr className="my-4" />
                  <div className="d-grid mb-2">
                    <button onClick={close} className="btn btn-google btn-login text-uppercase fw-bold" type="submit">
                      <i className="fab  me-2"></i>CANCEL
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <script src="https://kit.fontawesome.com/d40ea9438d.js" crossOrigin="anonymous"></script>
    </>
  )
}