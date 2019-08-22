import React from 'react';

import './PhotosView.css';

import { Thumbnail } from '../thumbnail/Thumbnail';
import Modal from 'common/components/modal/Modal';
import Pagination from 'common/components/pagination/Pagination';
import { Image } from './Image';
import { SearchView } from './SearchView';

import { fetchPhotos, likeImage, searchPhotos } from 'common/services/photo';

export default class PhotosView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      photos: {},
      likes: {},
      currentPage: 1,
      searchText: ''
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    fetchPhotos()
      .then(photos => {
        const likes = {};
        Object.keys(photos).forEach(photoId => {
          likes[photoId] = photos[photoId].liked_by_user;
        });
        this.setState({ photos, likes });
      }, () => {
        this.setState({ photos: {}, likes: {} });
      });
  }

  onPageChange(page) {
    const newPage = this.state.currentPage + page;

    if(this.state.searchText) {
      return this.createPhotosStateObj(searchPhotos(this.state.searchText, newPage), newPage, this.state.searchText);
    }
    
    this.createPhotosStateObj(fetchPhotos(newPage), newPage, '');
  }

  handleSearch(value) {
    // make a API call
    if(!value) {
      return this.createPhotosStateObj(fetchPhotos(1), 1, '');
    }
    this.createPhotosStateObj(searchPhotos(value), 1, value);
  }

  createPhotosStateObj(dataPromise, page, value) {
    dataPromise
      .then(photos => {
      const likes = {};
      Object.keys(photos).forEach(photoId => {
        likes[photoId] = photos[photoId].liked_by_user;
      });
      this.setState({ photos, likes, currentPage: page, searchText: value });
    }, () => {
      this.setState({ photos: {}, likes: {}, searchText: value });
    });
  }

  openModal(id) {
    this.setState({ visible: true, image_url: this.state.photos[id].urls.regular });
  }

  closeModal() {
    this.setState({ visible: false, image_url: '' });
  }

  handleLike(id) {
    likeImage(id, this.state.likes[id])
      .then(() => {
        this.setState((currState) => ({
          likes: Object.assign(currState, { [id]: !currState.likes[id] })
        }));
      }, () => {
        // Like failed
      });
  }

  render() {
    return (
      <React.Fragment>
        <Modal visible={this.state.visible} image={this.state.image_url} onClose={this.closeModal} />
        <SearchView handleSearch={this.handleSearch} />
        <div className="photos-view">
          {Object.keys(this.state.photos).length > 0 ?
            Object.keys(this.state.photos).map((photoId) => {
              const photo = this.state.photos[photoId];
              return <Thumbnail key={photoId} image={photo.urls.thumb} name={photoId} openModal={this.openModal}
                render={props => (<Image {...props} liked={this.state.likes[photoId]} handleLike={this.handleLike} alt={photo.alt_description} />)} />
            })
            : <div className="no-data">No data</div>
          }
        </div>
        <Pagination onPageChange={this.onPageChange} number={this.state.currentPage} visible={Object.keys(this.state.photos).length > 0} />
      </React.Fragment>
    )
  }
}