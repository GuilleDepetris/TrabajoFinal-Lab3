import axios from "axios";

const apiClient = axios.create({
  baseURL: `https://laboratorio3-5fc7.restdb.io/rest/`,
  headers: { "x-apikey": "64bdbc3386d8c5613ded91e7" },
});
const apiCryptoYa = axios.create({
  baseURL: `https://criptoya.com/api`,
  headers: { "Content-Type": "application/json" },
});
export default {
  getTransactions() {
    const usuario = localStorage.getItem("usuario");
    return apiClient.get(`/transactions?q={"user_id":"${usuario}"}`);
  },
  getTransaction(id) {
    return apiClient.get(`/transactions/${id}`);
  },
  deleteTransaction(id) {
    return apiClient.delete(`/transactions/${id}`);
  },
  editarTransaction(id, datos) {
    return apiClient.patch(`/transactions/${id}`, datos);
  },
  postTransactions(datos) {
    return apiClient.post(`/transactions`, datos);
  },
  getPrecios() {
    return apiCryptoYa;
  },
};
