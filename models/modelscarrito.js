const fs = require('fs')
const { leerCarrito, guardaCarrito } = require('../db/utils')
// const carrito = require('../db/carrito.json')

class Carrito {
    constructor() {
        this.products = [];
        this.date = new Date().toLocaleString()
    }

    async nuevoCarrito() {
        try {
            const carrito = await leerCarrito('carrito.json')

            const nuevoPedido = {
                id: carrito.length + 1,
                timestamp: this.date,
                products: this.products,
                total: 0,
            }
            carrito.push(nuevoPedido);
            await guardaCarrito('carrito.json',carrito)
            return nuevoPedido
        } catch (error) {
            console.log(`Se produjo un error en nuevoProducto:${error}`)
        }
    }
    async eliminaCarritoPorId (idCarrito){
    try {
        const carritoDB = await leerCarrito('carrito.json')
        const carritofiltrado = carritoDB.filter(({ id }) => id != idCarrito)
        const carritoEncontrado = carritoDB.find(({ id }) => id == idCarrito)

        if (carritoEncontrado) {
            guardaCarrito('carrito.json',carritofiltrado)
            return carritoEncontrado
        } else {
            console.log('no se ha encontrado el carrito con id')
        }
        } catch (error) {
        console.log('no se puede eliminar el carrito')
        }}

    async traeCarritoPorId(idCarrito) {
        try {
            const carritoDB = await leerCarrito('carrito.json')
            const carritoEncontrado = carritoDB.find(({ id }) => id == idCarrito)
            if (carritoEncontrado) {
                return carritoEncontrado
            } else {
                return null
            }
        } catch (error) {
            console.log('se produjo un error en traer Carrito por Id')
            }
        }

    async agregaProdoductosAlCarro(idCarrito, objeto) {
        try {
            const carritoDB = await leerCarrito('carrito.json')
            const carritofiltrado = carritoDB.filter(({ id }) => id != idCarrito)
            const carritoEncontrado = carritoDB.find(({ id }) => id == idCarrito)
            if (carritoEncontrado) {
                carritoEncontrado.products.push(objeto);
                carritoEncontrado.products.sort((a, b) => a.id - b.id)
                await guardaCarrito('carrito.json',carritofiltrado)
                console.log(`se ha agregado el producto ${objeto.title} exitosamente`)
                return carritoEncontrado
            } else {
                console.log('no se ha encontrado el carrito')
            }
        } catch (error) {
            console.error(`Se produjo un error en addProductToCart:${error}`);
        }
    }

    async eliminaProductosCarritoPorId(idCarrito, idProd) {
    
        try {
            const carritoDB = await leerCarrito('carrito.json')
        const carritoFiltrado = carritoDB.filter(({ id }) => id != idCarrito)
        const carritoEncontrado = carritoDB.find(({ id }) => id == idCarrito)

        const productosFiltrado = carritoEncontrado.products.filter(({ id }) => id != idProd)
        const productoEncontrado = carritoEncontrado.find(({ id }) => id == idProd)

        carritoEncontrado.products = productosFiltrado;
        carritoEncontrado.products.sort = ((a, b) => a.id - b.id)
        carritoFiltrado.push(carritoEncontrado)
        carritoFiltrado.sort((a, b) => a.id - b.id)
        guardaCarrito(carritoFiltrado)
        return productoEncontrado
    }

     catch(error) {
        console.error(`se produjo un error en eliminar items del carrito${error}`)
    }
    }
}


module.exports = Carrito