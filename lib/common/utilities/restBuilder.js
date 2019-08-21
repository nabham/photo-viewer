

export const buildUrl = (postfix = [], qParams = {}) => {

  const query = Object.keys(qParams).length > 0 ? Object.entries(qParams).map(([key, value]) => `${key}=${value}`).reduce((acc, curr) => `${acc}&${curr}`) : '';

  return postfix.join('/') + '?' + query;
}