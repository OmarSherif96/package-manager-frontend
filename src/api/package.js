import axios from 'axios';

const packageBaseUrl = process.env.REACT_APP_BACKEND_API;

export const getPackages = (direction) =>
  axios.get(packageBaseUrl + `/packages/${direction}`).then((res) => res.data);

export const getPackageById = (id) =>
  axios.get(packageBaseUrl + `/package/${id}`).then((res) => res.data);

export const createPackage = (pkg) =>
  axios({ method: 'post', url: packageBaseUrl + '/package', data: pkg }).then(
    (res) => res.data
  );

export const updatePackage = (pkg) =>
  axios({ method: 'put', url: packageBaseUrl + '/package', data: pkg }).then(
    (res) => res.data
  );

export const deletePackage = (id) =>
  axios({ method: 'delete', url: packageBaseUrl + `/package/${id}` }).then(
    (res) => res.data
  );
