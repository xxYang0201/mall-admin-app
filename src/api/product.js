import axios from '@/axios';

export default {
  list(params) {
    return axios.get('/products/all', { params });
  },
  delProduct(params) {
    return axios.delete(`/products/${params.id}`);
  },
  addProduct(params) {
    return axios.post('/products/add', params);
  },
  edit(id) {
    return axios.get(`/products/${id}`);
  },
  editProduct(params) {
    return axios.put('/products/edit', params);
  },
};
