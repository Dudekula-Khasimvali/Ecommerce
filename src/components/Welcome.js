import React from 'react';
import LatestProducts from './LatestProducts';
import 'bootstrap/dist/css/bootstrap.min.css';
import Maxdefault from '../images/maxresdefault.jpg';
import Secondimage from '../images/maxresdefault2.jpg';
import Third from '../images/galaxy.jpg';
import './Welcome.css'; // Import custom CSS

const Welcome = () => {
  return (
    <div className="container-fluid p-0">
      <div className="row no-gutters">
        <div className="col-12">
          <div id="carouselExampleRide" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={Maxdefault} className="d-block w-100" alt="Second Slide" />
              </div>
              <div className="carousel-item">
                <img src={Secondimage} className="d-block w-100" alt="First Slide" />
              </div>
              <div className="carousel-item">
                <img src={Third} className="d-block w-100" alt="Third Slide" />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          <br /><br />
          <hr />
          <h1 className="text-center">Top Products in Market</h1>
          <hr />
          <div className="px-5">
            <LatestProducts />
          </div>
          <br /><br />
        </div>
      </div>
      <br /><br />
      <hr />
      <footer className="footer text-white text-center bg-dark py-4">
        <h3>About Us</h3>
        <p><b>This is a sample app to explore Samsung Galaxy products.</b></p>
        <p><b>Contact: Galaxy143@gmail.com</b></p>
      </footer>
    </div>
  );
}

export default Welcome;
