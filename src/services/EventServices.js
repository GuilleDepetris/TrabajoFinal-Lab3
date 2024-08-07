import axios from "axios";

const apiClient = axios.create({
  baseURL: ` https://laboratorio-36cf.restdb.io/rest/`,
  headers: { "x-apikey": "64a5ccf686d8c5d256ed8fce" },
});
const apiCryptoYa = axios.create({
  baseURL: `https://criptoya.com/api`,
  headers: { "Content-Type": "application/json" },
});
export default {
  getTransactions() {
    // return apiClient.get(`/transactions?q={"user_id":"${usuario}"}`)
    return apiClient.get(`/transactions?q={"user_id":"guille1"}`);
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
  postTransactions() {
    return apiClient;
  },
  getPrecios() {
    return apiCryptoYa;
  },
};
