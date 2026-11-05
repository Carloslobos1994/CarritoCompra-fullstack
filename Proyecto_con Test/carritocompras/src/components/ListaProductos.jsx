
import { useEffect, useState } from "react";
import Producto from "./Producto";
import productoService from "../services/productoService";

function ListaProductos({ agregarAlCarrito }) {

    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        console.log("Consultando API Spring Boot...");

        productoService.obtenerProductos()
            .then(response => {

                console.log("Respuesta de la API:", response.data);
                console.table(response.data);

                setProductos(response.data);

            })
            .catch(error => {

                console.error("Error al consultar API:", error);
                console.error("Detalle:", error.response?.data);

                setError(
                    error.response?.data?.message ||
                    error.message ||
                    "No se pudieron cargar los productos."
                );

            })
            .finally(() => {
                setCargando(false);
            });

    }, []);

    if (cargando) {
        return <p>Cargando productos...</p>;
    }

    if (error) {
        return <p className="text-danger">{error}</p>;
    }

    if (productos.length === 0) {
        return <p>No hay productos disponibles.</p>;
    }

    return (
        <div className="row">

            {productos.map(item => (

                <Producto
                    key={item.id}
                    producto={item}
                    agregarAlCarrito={agregarAlCarrito}
                />

            ))}

        </div>
    );
}

export default ListaProductos;
