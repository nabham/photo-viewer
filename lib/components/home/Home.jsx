import React from 'react';

import { Header } from '../header/Header';
import PhotosView from '../photosView/PhotosView';

/**
 * @description This components layouts the app structure
 * 
 */
export const Home = () => {
  return (
    <React.Fragment>
      <Header />
      <PhotosView />
    </React.Fragment>
  );
}