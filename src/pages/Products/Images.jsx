import { Link, json, useParams } from 'react-router-dom'
import React, { useState } from 'react';
import axios from 'axios';
import './Image.css'
import { useEffect } from "react";

import { useNavigate } from 'react-router-dom'
export const Images = () => {
	const navigate = useNavigate();

	const [products, setproducts] = useState({});
	const [image, setImage] = useState(null);
	const [nameImage, setNameImage] = useState('')
	const { id } = useParams();
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		let paths = e.target.value.split('\\');
		setNameImage(paths.pop())
		setImage(file);
	};
	const getProduct = async () => {
		try {
			const { data } = await axios(`http://localhost:3000/product/getProduct/${id}`,)
			setproducts(data.products)
		} catch (err) {
			console.error(err);
		}
	}
	const handleUpload = async () => {
		try {
			if (!image) {
				alert('No se ha seleccionado ninguna imagen.');
				return;
			}

			const formData = new FormData();
			formData.append('image', image);

			const response = await axios.put(`http://localhost:3000/product/addImage/${id}`, formData);

			console.log(response.data);
			alert('Imagen cargada exitosamente.');
			getProduct()
		} catch (error) {
			console.error('Error al cargar la imagen:', error);
			alert('Error al cargar la imagen.');
		}
	};

	useEffect(() => { getProduct() }, []);

	return (
		<>
			<div className="modal4-header">
				<div className="modal4-logo">
					<span className="logo-circle">
						<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="512" height="419.116" viewBox="0 0 512 419.116">
							<defs>
								<clipPath id="clip-folder-new">
									<rect width="512" height="419.116" />
								</clipPath>
							</defs>
							<g id="folder-new" clipPath="url(#clip-folder-new)">
								<path id="Union_1" data-name="Union 1" d="M16.991,419.116A16.989,16.989,0,0,1,0,402.125V16.991A16.989,16.989,0,0,1,16.991,0H146.124a17,17,0,0,1,10.342,3.513L227.217,57.77H437.805A16.989,16.989,0,0,1,454.8,74.761v53.244h40.213A16.992,16.992,0,0,1,511.6,148.657L454.966,405.222a17,17,0,0,1-16.6,13.332H410.053v.562ZM63.06,384.573H424.722L473.86,161.988H112.2Z" fill="var(--c-action-primary)" stroke="" strokeWidth="1" />
							</g>
						</svg>
					</span>
				</div>
				<button className="btn3-close">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z" /><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="var(--c-text-secondary)" /></svg>
				</button>
			</div>

			<div className="modal4-body" type='file'>
				<h2 className="modal4-title">Upload a file {products.name}</h2>
				<p className="modal4-description">Attach the file below</p>
				<button className="upload-area" formAction='' onClick={() => document.querySelector(".input-field").click()}>

					<span className="upload-area-icon">
						<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="340.531" height="419.116" viewBox="0 0 340.531 419.116">
							<g id="files-new" clipPath="url(#clip-files-new)">
								<path id="Union_2" data-name="Union 2" d="M-2904.708-8.885A39.292,39.292,0,0,1-2944-48.177V-388.708A39.292,39.292,0,0,1-2904.708-428h209.558a13.1,13.1,0,0,1,9.3,3.8l78.584,78.584a13.1,13.1,0,0,1,3.8,9.3V-48.177a39.292,39.292,0,0,1-39.292,39.292Zm-13.1-379.823V-48.177a13.1,13.1,0,0,0,13.1,13.1h261.947a13.1,13.1,0,0,0,13.1-13.1V-323.221h-52.39a26.2,26.2,0,0,1-26.194-26.195v-52.39h-196.46A13.1,13.1,0,0,0-2917.805-388.708Zm146.5,241.621a14.269,14.269,0,0,1-7.883-12.758v-19.113h-68.841c-7.869,0-7.87-47.619,0-47.619h68.842v-18.8a14.271,14.271,0,0,1,7.882-12.758,14.239,14.239,0,0,1,14.925,1.354l57.019,42.764c.242.185.328.485.555.671a13.9,13.9,0,0,1,2.751,3.292,14.57,14.57,0,0,1,.984,1.454,14.114,14.114,0,0,1,1.411,5.987,14.006,14.006,0,0,1-1.411,5.973,14.653,14.653,0,0,1-.984,1.468,13.9,13.9,0,0,1-2.751,3.293c-.228.2-.313.485-.555.671l-57.019,42.764a14.26,14.26,0,0,1-8.558,2.847A14.326,14.326,0,0,1-2771.3-147.087Z" transform="translate(2944 428)" fill="var(--c-action-primary)" />
							</g>
						</svg>
					</span>

					<span className="upload-area-title">Drag file(s) here to upload.</span>
					<input hidden type="file" accept='image/*' className='input-field' onChange={handleImageChange} />
					<p>
						{
							nameImage
						}
					</p>
					<span className="upload-area-description">
						 you can select a file by <br /><strong>clicking here</strong>
					</span>
				</button>
			</div>
			<div className="modal4-footer">
				<button className="btn3-secondary" onClick={() => navigate('/dashboard/product')}>Back</button>
				<button className="btn3-primary" onClick={handleUpload}>Upload File</button>

			</div>
			<div className="container">
				<div className="row">
					<div className="col-sm-11 col-md-10 col-lg-3 mx-auto">
						<div className="card" style={{ width: "18rem" }}>
							<img
								crossOrigin="anonymous"
								src={products.image ? `http://localhost:3000/product/getImage/${products.image}` : '/Cesta.jpg'}
								onError={(e) => {
									e.target.src = '/Cesta.jpg'; // Ruta a la imagen predeterminada en el directorio public
								}}
								className="card-img-top"
								alt="..."
						
							/>
							<div className="card-body">
								<p className="card-text text-center">
									Actual Image
								</p>
							</div>
						</div>

					</div>
				</div>
			</div>


		</>
	);
};
