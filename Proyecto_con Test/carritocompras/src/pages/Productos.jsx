
import { useEffect, useState } from "react";
import Producto from "../components/Producto";
import productoService from "../services/productoService";

function Productos({ agregarAlCarrito }) {

    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        productoService.obtenerProductos()
            .then((respuesta) => {

                console.log("Productos recibidos desde API:", respuesta.data);

                const productosAPI = respuesta.data.map((producto) => ({
                    ...producto,
                    emoji: producto.categoria === "Bebidas" ? "🥤" : "🍔"
                }));

                setProductos(productosAPI);
            })
            .catch((error) => {
                console.error("Error al consultar productos:", error);
                setError("No se pudieron cargar los productos.");
            })
            .finally(() => {
                setCargando(false);
            });

    }, []);

    if (cargando) {
        return <h3 className="text-center mt-4">Cargando productos...</h3>;
    }

    if (error) {
        return <h3 className="text-danger text-center mt-4">{error}</h3>;
    }

    return (
        <div className="container mt-4">

            <h1 className="text-center mb-4">
                🍔 Productos
            </h1>

            <div className="row">

                {productos.map((producto) => (
                    <div className="col-md-4 mb-4" key={producto.id}>

                        <Producto
                            producto={producto}
                            agregarAlCarrito={agregarAlCarrito}
                        />

                    </div>
                ))}

            </div>

        </div>
    );
}

export default Productos;
