import React from 'react';

import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import PhotosView from '../photosView/PhotosView';

import './Home.css';

export const Home = () => {
  return (
    <React.Fragment>
      <Header />
      <div className="main-content">
        <PhotosView />
      </div>
      {/* <Footer /> */}
    </React.Fragment>
  );
}