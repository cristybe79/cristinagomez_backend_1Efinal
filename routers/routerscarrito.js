const express = require('express')
const router = express.Router()
const controladorCarrito = require('../controlers/controlers.carrito')

router.post('/', controladorCarrito.creaCarrito)
router.get('/:id/productos', controladorCarrito.traeCarrito)

router.post('/:id/productos', controladorCarrito.agregaProductos)

router.delete('/:id', controladorCarrito.eliminaCarrito)
router.delete('/:id/productos/:id_prod', controladorCarrito.eliminaItmesId)

module.exports = router




