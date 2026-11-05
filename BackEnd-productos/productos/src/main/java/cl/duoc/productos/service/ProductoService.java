
package cl.duoc.productos.service;

import cl.duoc.productos.model.Producto;
import cl.duoc.productos.repository.ProductoRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;

    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    // Obtener todos los productos
    public List<Producto> obtenerTodos() {
        return productoRepository.findAll();
    }

    // Obtener producto por ID
    public Optional<Producto> obtenerPorId(Long id) {
        return productoRepository.findById(id);
    }

    // Crear producto
    public Producto guardar(Producto producto) {
        return productoRepository.save(producto);
    }

    // Actualizar producto
    public Producto actualizar(Long id, Producto producto) {

        Producto existente = productoRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("Producto no encontrado"));

        existente.setNombre(producto.getNombre());
        existente.setDescripcion(producto.getDescripcion());
        existente.setPrecio(producto.getPrecio());
        existente.setStock(producto.getStock());
        existente.setCategoria(producto.getCategoria());

        return productoRepository.save(existente);
    }

    // Eliminar producto
    public void eliminar(Long id) {

        if (!productoRepository.existsById(id)) {
            throw new RuntimeException("Producto no encontrado");
        }

        productoRepository.deleteById(id);
    }
}
