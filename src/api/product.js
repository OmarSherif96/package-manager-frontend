import axios from 'axios';

const productApiUrl = process.env.REACT_APP_BACKEND_API;
const auth = {
  username: process.env.REACT_APP_PRODUCT_API_USER,
  password: process.env.REACT_APP_PRODUCT_API_PASSWORD,
};

export const getProducts = () =>
  axios.get(productApiUrl + '/product').then((res) => res.data);

export const getProductById = (id) =>
  axios
    .get(productApiUrl + `/product/${id}`, {
      auth: auth,
    })
    .then((res) => res.data);
