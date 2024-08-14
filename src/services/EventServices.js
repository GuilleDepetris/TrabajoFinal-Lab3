import axios from "axios";

const apiClient = axios.create({
  baseURL: `https://laboratorio-afe2.restdb.io/rest/`,
  headers: { "x-apikey": "650b53356888544ec60c00bf" },
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
