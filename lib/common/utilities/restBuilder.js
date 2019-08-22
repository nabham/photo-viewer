const base_url = "https://api.unsplash.com/";

/**
 * @description This utility method constructs url based on query params and post fixes
 * For ex. postfix = ['a', 'b'] , qParams = { c : 12 }
 *        Outputs => base_url + a/b?c=12
 * 
 * @param {array} postfix list containing postfixes
 * @param {object} qParams object containing query params
 */
export const buildUrl = (postfix = [], qParams = {}) => {

  const query = Object.keys(qParams).length > 0 ? Object.entries(qParams).map(([key, value]) => `${key}=${value}`).reduce((acc, curr) => `${acc}&${curr}`) : '';

  return base_url + postfix.join('/') + '?' + query;
}