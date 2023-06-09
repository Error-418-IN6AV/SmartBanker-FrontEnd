import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.jpg";
import "./HomeStyle.css";
import { Navbar } from "../components/Navbar";

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
              <div class="card" style={{width: '18rem'}}>
              <img src={Logo} class="card-img-top" width={"40%"}/>
              <div class="card-body">
                <p class="card-text">Un texto de ejemplo rápido para colocal cerca del título de la tarjeta y componer la mayor parte del contenido de la tarjeta.</p>
              </div>
            </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
