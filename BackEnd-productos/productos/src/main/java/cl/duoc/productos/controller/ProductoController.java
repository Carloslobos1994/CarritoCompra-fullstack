
package cl.duoc.productos.controller;

import cl.duoc.productos.model.Producto;
import cl.duoc.productos.service.ProductoService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    // GET: Obtener todos los productos
    @GetMapping
    public List<Producto> obtenerTodos() {
        return productoService.obtenerTodos();
    }

    // GET: Obtener producto por ID
    @GetMapping("/{id}")
    public Producto obtenerPorId(@PathVariable Long id) {
        return productoService.obtenerPorId(id)
                .orElseThrow(() ->
                    new RuntimeException("Producto no encontrado"));
    }

    // POST: Crear producto
    @PostMapping
    public Producto crear(@RequestBody Producto producto) {
        return productoService.guardar(producto);
    }

    // PUT: Actualizar producto
    @PutMapping("/{id}")
    public Producto actualizar(
            @PathVariable Long id,
            @RequestBody Producto producto) {

        return productoService.actualizar(id, producto);
    }

    // DELETE: Eliminar producto
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        productoService.eliminar(id);
    }
}
