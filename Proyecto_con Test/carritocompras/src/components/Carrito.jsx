
import { Button } from "react-bootstrap";

function Carrito({
  carrito,
  aumentarCantidad,
  disminuirCantidad,
  eliminarDelCarrito,
  pagarConWebpay
}) {

  const total = carrito.reduce(
    (acumulado, producto) =>
      acumulado + producto.precio * producto.cantidad,
    0
  );

  return (
    <div>

      <h2>🛒 Mi carrito</h2>

      {carrito.length === 0 ? (

        <p>Tu carrito está vacío.</p>

      ) : (

        carrito.map((producto) => (

          <div key={producto.id}>

            <p>
              {producto.emoji} {producto.nombre}
            </p>

            <p>
              ${producto.precio}
            </p>

            <button
              type="button"
              onClick={() => disminuirCantidad(producto.id)}
            >
              -
            </button>

            <span> {producto.cantidad} </span>

            <button
              type="button"
              onClick={() => aumentarCantidad(producto.id)}
            >
              +
            </button>

            <button
              type="button"
              onClick={() => eliminarDelCarrito(producto.id)}
            >
              🗑️ Eliminar
            </button>

            <hr />

          </div>

        ))

      )}

      <h3>Total: ${total}</h3>

      {carrito.length > 0 && (

        <Button
          variant="success"
          size="lg"
          onClick={pagarConWebpay}
        >
          💳 Pagar con Webpay
        </Button>

      )}

    </div>
  );
}

export default Carrito;
