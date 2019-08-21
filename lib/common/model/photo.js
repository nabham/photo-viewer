
const props = ['id', 'description', 'alt_description', 
  'urls', 'likes', 'liked_by_user'];

// TODO: create proxy
export const parsePhotos = (photos) => {
  return photos.reduce((obj, curr) => {
    obj[curr.id] = pullValidProps(curr);
    return obj;
  }, Object.create(null, {}));
}

const pullValidProps = (photo = {}) => {
  return props.reduce((modifiedPhoto, curr) => {
    modifiedPhoto[curr] = photo[curr];
    return modifiedPhoto;
  }, {});
}