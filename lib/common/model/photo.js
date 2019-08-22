
const props = ['id', 'description', 'alt_description', 'urls', 'likes', 'liked_by_user'];

/**
 * @description This method parses photos response
 * 
 * @param {array} photos list containing photo object
 */
export const parsePhotos = (photos) => {
  return photos.reduce((obj, curr) => {
    obj[curr.id] = pullValidProps(curr);
    return obj;
  }, Object.create(null, {}));
}

/**
 * @description This method plucks unwanted properties from photos response
 * 
 * @param {object} photo photo response object
 */
const pullValidProps = (photo = {}) => {
  return props.reduce((modifiedPhoto, curr) => {
    modifiedPhoto[curr] = photo[curr];
    return modifiedPhoto;
  }, {});
}