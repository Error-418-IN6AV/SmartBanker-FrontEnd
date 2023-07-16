import React from "react";
import './DashboardStyle.css';
import { Navbar } from "../components/Navbar";
import Foto1 from '../assets/Foto1.jpg';
import Foto2 from '../assets/Foto2.jpg';

export const HomePage = () => {
  return (
    <>
      <Navbar></Navbar>
      <div>
        <section className="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="main-heading">Welcome Smart Banker</h1>
                <div className="underline mx-auto">
                  <p className="text">
                    We are a Virtual Banking company that offers transactional
                    services tailored to the needs of our clients. We have
                    modern facilities equipped with state-of-the-art technology
                    to guarantee you the best way to carry out your transactions
                    from the comfort of your home.
                  </p>
                </div>
              </div>
              <div className='container'>
                <div className='row'>
                  <div className='col-md-12 mb-4'>
                    <h3 className='main-heading text-center'>Our services</h3>
                  </div>
                  <div className='col-md-4 '>
                    <div className='card shadow'>
                      <img src={Foto1} className='w-100 border-bottom' alt='Foto1' />
                      <div className='card-body'>
                        <h6>Mobile transfer</h6>
                        <p className='text'>
                          You can make transfers from the comfort of your home or your work.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-4 '>
                    <div className='card shadow'>
                      <img src={Foto2} className='w-100 border-bottom' alt='Foto2' />
                      <div className='card-body'>
                        <h6>Products and services</h6>
                        <p className='text'>
                          We offer products and services on our platform, where you can view any type of products.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-4 '>
                    <div className='card shadow'>
                      <img src={Foto1} className='w-100 border-bottom' alt='Foto1' />
                      <div className='card-body'>
                        <h6>Discounted products</h6>
                        <p className='text'>
                          Only with us we offer product discounts of 10% or more on any product purchased.
                        </p>
                      </div>
                    </div>
                    <div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
