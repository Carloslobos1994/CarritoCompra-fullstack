
import { useEffect, useState } from "react";
import productoService from "../services/productoService";
import {
  Table,
  Button,
  Form,
  Modal,
  Alert,
  Card
} from "react-bootstrap";


function AdministrarProductos() {

  const [productos, setProductos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const formularioInicial = {
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoria: ""
  };

  const [formulario, setFormulario] = useState(formularioInicial);

  // ==================================
  // READ: CONSULTAR PRODUCTOS
  // ==================================

  const cargarProductos = async () => {

    try {
      const response = await productoService.obtenerProductos();

      console.log("Productos recibidos desde Spring Boot:");
      console.table(response.data);

      setProductos(response.data);

    } catch (error) {
      console.error("Error al consultar productos:", error);
      setError("No fue posible cargar los productos.");
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // ==================================
  // MANEJAR CAMPOS DEL FORMULARIO
  // ==================================

  const manejarCambio = (e) => {

    const { name, value } = e.target;

    setFormulario({
      ...formulario,
      [name]: value
    });
  };

  // ==================================
  // ABRIR FORMULARIO NUEVO
  // ==================================

  const nuevoProducto = () => {

    setProductoEditando(null);
    setFormulario(formularioInicial);
    setError("");
    setMostrarFormulario(true);
  };

  // ==================================
  // ABRIR FORMULARIO EDICION
  // ==================================

  const editarProducto = (producto) => {

    setProductoEditando(producto);

    setFormulario({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
      categoria: producto.categoria
    });

    setError("");
    setMostrarFormulario(true);
  };

  // ==================================
  // CREATE / UPDATE
  // ==================================

  const guardarProducto = async (e) => {

    e.preventDefault();
    setError("");
    setMensaje("");

    const producto = {
      nombre: formulario.nombre,
      descripcion: formulario.descripcion,
      precio: Number(formulario.precio),
      stock: Number(formulario.stock),
      categoria: formulario.categoria
    };

    try {

      if (productoEditando) {

        await productoService.actualizarProducto(
          productoEditando.id,
          producto
        );

        setMensaje("Producto actualizado correctamente.");

      } else {

        await productoService.crearProducto(producto);

        setMensaje("Producto creado correctamente.");
      }

      setMostrarFormulario(false);
      setFormulario(formularioInicial);
      setProductoEditando(null);

      await cargarProductos();

    } catch (error) {

      console.error("Error al guardar producto:", error);

      setError(
        error.response?.data?.message ||
        "No fue posible guardar el producto."
      );
    }
  };

  // ==================================
  // DELETE: ELIMINAR PRODUCTO
  // ==================================

  const eliminarProducto = async (id) => {

    const confirmar = window.confirm(
      "¿Estás seguro de eliminar este producto?"
    );

    if (!confirmar) return;

    try {

      await productoService.eliminarProducto(id);

      setMensaje("Producto eliminado correctamente.");

      await cargarProductos();

    } catch (error) {

      console.error("Error al eliminar producto:", error);

      setError("No fue posible eliminar el producto.");
    }
  };

  // ==================================
  // INTERFAZ
  // ==================================

  return (

    <div className="container mt-4 mb-5">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>Administración de productos</h2>

        <Button variant="success" onClick={nuevoProducto}>
          + Nuevo producto
        </Button>

      </div>

      {mensaje && (
        <Alert variant="success" dismissible onClose={() => setMensaje("")}>
          {mensaje}
        </Alert>
      )}

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      <Card className="shadow-sm">

        <Card.Body>

          <Table striped bordered hover responsive>

            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>

              {productos.map((producto) => (

                <tr key={producto.id}>

                  <td>{producto.id}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.descripcion}</td>
                  <td>${Number(producto.precio).toLocaleString("es-CL")}</td>
                  <td>{producto.stock}</td>
                  <td>{producto.categoria}</td>

                  <td>
                    <div className="d-flex gap-2">

                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => editarProducto(producto)}
                      >
                        Editar
                      </Button>

                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => eliminarProducto(producto.id)}
                      >
                        Eliminar
                      </Button>

                    </div>
                  </td>

                </tr>

              ))}

              {productos.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center">
                    No existen productos registrados.
                  </td>
                </tr>
              )}

            </tbody>

          </Table>

        </Card.Body>

      </Card>

      {/* FORMULARIO CREAR / EDITAR */}

      <Modal
        show={mostrarFormulario}
        onHide={() => setMostrarFormulario(false)}
        centered
      >

        <Modal.Header closeButton>

          <Modal.Title>
            {productoEditando ? "Editar producto" : "Nuevo producto"}
          </Modal.Title>

        </Modal.Header>

        <Form onSubmit={guardarProducto}>

          <Modal.Body>

            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                name="nombre"
                value={formulario.nombre}
                onChange={manejarCambio}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="descripcion"
                value={formulario.descripcion}
                onChange={manejarCambio}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                min="0"
                name="precio"
                value={formulario.precio}
                onChange={manejarCambio}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                min="0"
                name="stock"
                value={formulario.stock}
                onChange={manejarCambio}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Select
                name="categoria"
                value={formulario.categoria}
                onChange={manejarCambio}
                required
              >
                <option value="">Seleccionar categoría</option>
                <option value="Comida">Comida</option>
                <option value="Bebidas">Bebidas</option>
              </Form.Select>
            </Form.Group>

          </Modal.Body>

          <Modal.Footer>

            <Button
              variant="secondary"
              onClick={() => setMostrarFormulario(false)}
            >
              Cancelar
            </Button>

            <Button variant="primary" type="submit">
              {productoEditando ? "Actualizar" : "Guardar"}
            </Button>

          </Modal.Footer>

        </Form>

      </Modal>

    </div>
  );
}

export default AdministrarProductos;
