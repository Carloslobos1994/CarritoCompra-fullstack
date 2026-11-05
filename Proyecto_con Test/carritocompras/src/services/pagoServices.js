
import axios from "axios";

const API_URL = "http://localhost:8080/api/pagos";

const crearPago = async (productos) => {

    const respuesta = await axios.post(`${API_URL}/crear`, {
        productos: productos.map((producto) => ({
            productoId: producto.id,
            cantidad: producto.cantidad
        }))
    });

    return respuesta.data;
};

const pagoService = {
    crearPago
};

export default pagoService;
