import axios from 'axios';

const API_URL = 'http://localhost:8080/api/productos';

const obtenerProductos = () => {
    return axios.get(API_URL);
};

const obtenerProducto = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const crearProducto = (producto) => {
    return axios.post(API_URL, producto);
};

const actualizarProducto = (id, producto) => {
    return axios.put(`${API_URL}/${id}`, producto);
};

const eliminarProducto = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

const crearPago = (productoId, cantidad) => {
  return axios.post(`${API_URL_PAGOS}/crear`, {
    productoId,
    cantidad
  });
};

const API_URL_PAGOS = "http://localhost:8080/api/pagos";

export default {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};