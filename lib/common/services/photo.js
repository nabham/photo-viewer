
const client_id = "881c8931da6725fc97dd94a2678312aa49b58b5dfaf7376c2f0209a8826715ba";
const client_secret = "4b4c748070787d6b661b4b2b4133c2a7fcb9d49b9095d591553077de93132a4d";
const access_token = "1d5b5a988f6ef91923e09ed43ed656c90a6fa3c47da9f483cb0fccdb910baead";
const base_url = "https://api.unsplash.com/";

import { buildUrl } from '../utilities/restBuilder';
import { parsePhotos } from '../model/photo';

import data from './dummy';

// access token fetch logic
(() => {
  const url_1 = "https://unsplash.com/" + buildUrl(['oauth', 'token'], {});
  // const url_2 = "https://unsplash.com/" + buildUrl(['oauth', 'authorize'], {});

  // fetch(url_2, {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     client_id,
  //     scope: 'public+read_user+write_likes',
  //     redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
  //     response_type: 200
  //   }),
  //   headers: new Headers({
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json'
  //   })
  // })
  // .then(() => {
  //   return fetch(url_1, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       client_id,
  //       client_secret,
  //       code: access_token,
  //       redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
  //       grant_type: 'authorization_code'
  //     }),
  //     headers: new Headers({
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     })
  //   }).then((resp) => {
  //     console.log(resp);
  //     return resp.json().then(tokenResp => {
  //       access_token = tokenResp.access_token;
  //     });
  //   })
  // .catch(error => {
  //   console.error(error);
  // })
})();

/**
 * @description This method is used to fetch photos using API call
 * 
 * @param {number} offset page number
 */
export const fetchPhotos = (offset = 0) => {

  const url = base_url + buildUrl(['photos'], { client_id, per_page: 30, page: offset });

  // return Promise.resolve(parsePhotos(data));
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

  const url = base_url + buildUrl(['search', 'photos'], { client_id, per_page: 30, page: offset, query: searchTerm });

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
 * @description This method is used to like a photo using API call
 * 
 * @param {string} id photo id
 */
export const likeImage = (id, isUnlike = false) => {

  const url = base_url + buildUrl(['photos', id, 'like'], { client_id });

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