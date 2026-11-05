
import Carrito from "../components/Carrito";
import pagoService from "../services/pagoServices";

function CarritoPage({
  carrito,
  aumentarCantidad,
  disminuirCantidad,
  eliminarDelCarrito
}) {

  
const pagarConWebpay = async () => {

    try {

        console.log("Enviando carrito a Transbank:", carrito);

        const respuesta = await pagoService.crearPago(carrito);

        console.log("Respuesta de Transbank:", respuesta);

        const { token, url } = respuesta;

        if (!token || !url) {
            throw new Error("Transbank no devolvió el token o la URL");
        }

        // Crear formulario para enviar al checkout de Webpay
        const formulario = document.createElement("form");

        formulario.method = "POST";
        formulario.action = url;

        const inputToken = document.createElement("input");

        inputToken.type = "hidden";
        inputToken.name = "token_ws";
        inputToken.value = token;

        formulario.appendChild(inputToken);

        document.body.appendChild(formulario);

        formulario.submit();

    } catch (error) {

        console.error("Error al iniciar el pago:", error);

        alert("No fue posible iniciar el pago con Webpay.");
    }
};

  return (
    <div>
      <h1>🛒 Mi carrito</h1>

      <Carrito
        carrito={carrito}
        aumentarCantidad={aumentarCantidad}
        disminuirCantidad={disminuirCantidad}
        eliminarDelCarrito={eliminarDelCarrito}
        pagarConWebpay={pagarConWebpay}
      />

    </div>
  );
}

export default CarritoPage;
