import React from 'react';

import './PhotosView.css';

import { Thumbnail } from '../thumbnail/Thumbnail';
import Modal from 'common/components/modal/Modal';
import Pagination from 'common/components/pagination/Pagination';
import { Image } from './Image';

import { fetchPhotos, likeImage } from 'common/services/photo';

export default class PhotosView extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      photos: {},
      likes: {},
      currentPage: 0
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
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
    fetchPhotos(newPage)
      .then(photos => {
        const likes = {};
        Object.keys(photos).forEach(photoId => {
          likes[photoId] = photos[photoId].liked_by_user;
        });
        this.setState({ photos, likes, currentPage: newPage });
      }, () => {
        this.setState({ photos: {}, likes: {} });
      });
  }

  openModal(id) {
    this.setState({ visible: true, image_url: this.state.photos[id].urls.regular });
  }

  closeModal() {
    this.setState({ visible: false, image_url: '' });
  }

  handleLike(id) {
    likeImage(id, !this.state.likes[id])
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
        <div className="photos-view">
          {Object.keys(this.state.photos).length > 0 ?
            Object.keys(this.state.photos).map((photoId) => {
              return <Thumbnail key={photoId} image={this.state.photos[photoId].urls.thumb} name={photoId} openModal={this.openModal} handleLike={this.handleLike}
                render={props => (<Image {...props} />)} />
            })
            : <div>No data</div>
          }
        </div>
        <Pagination onPageChange={this.onPageChange} number={this.state.currentPage}/>
      </React.Fragment>
    )
  }
}