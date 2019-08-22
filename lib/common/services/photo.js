
const client_id = "881c8931da6725fc97dd94a2678312aa49b58b5dfaf7376c2f0209a8826715ba";
const access_token = "1d5b5a988f6ef91923e09ed43ed656c90a6fa3c47da9f483cb0fccdb910baead";


import { buildUrl } from '../utilities/restBuilder';
import { parsePhotos } from '../model/photo';

/**
 * @description This method is used to fetch photos using API call
 * 
 * @param {number} offset page number
 */
export const fetchPhotos = (offset = 0) => {

  const url = buildUrl(['photos'], { client_id, per_page: 30, page: offset });

  return fetch(url)
    .then(resp => {
      if (resp.status !== 200) {
        console.error('Error while fetching photos. Status Code: ', resp.status);
        return Promise.reject('Unable to fetch data');
      }
      return resp.json().then(photos => parsePhotos(photos));
    })
    .catch(error => {
      console.error('Error occurred while fetching photos', error);
      return Promise.reject('Unable to fetch data');
    });
}

/**
 * @description This method is used to search photos using API call
 * 
 * @param {string} searchTerm text for photo search
 * @param {number} offset page number
 */
export const searchPhotos = (searchTerm = '', offset = 1) => {

  const url = buildUrl(['search', 'photos'], { client_id, per_page: 30, page: offset, query: searchTerm });

  return fetch(url)
    .then(resp => {
      if (resp.status !== 200) {
        console.error('Error while searching photos. Status Code: ', resp.status);
        return Promise.reject('Unable to fetch data');
      }
      return resp.json().then(photos => parsePhotos(photos.results));
    })
    .catch(error => {
      console.error('Error occurred while searching photos', error);
      return Promise.reject('Unable to fetch data');
    });
}

/**
 * @description This method is used to like|unlike a photo using API call
 * 
 * @param {string} id photo id
 * @param {boolean} isUnlike denotes whether to unlike or like
 */
export const likeImage = (id, isUnlike = false) => {

  const url = buildUrl(['photos', id, 'like'], { client_id });

  return fetch(url, {
    method: !isUnlike ? 'POST' : 'DELETE',
    headers: new Headers({
      Authorization: `Bearer ${access_token}`
    })
  }).then(resp => {
    console.log(resp);
    return Promise.resolve('Successfully Liked');
  }).catch(error => {
    console.error('Error occurred while liking a photo', error);
    return Promise.reject('Failed to like a photo');
  });
}