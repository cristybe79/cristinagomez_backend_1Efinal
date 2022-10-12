const Carrito = require('../models/modelscarrito');
const modelsProductos = require('../models/modelsproductos')
const carrito = new Carrito()




const creaCarrito = (req, res) => {
    const { body:{} } = req
    const data =  carrito.nuevoCarrito();
    if (data?.error) return res.status(data.error.status).json(data.error.message);
    res.status(201).json(data)
}


const eliminaCarrito= async (req, res) => {
    const idProd = Number(req.body.idProd);
    const data = await carrito.eliminaCarritoPorId(idProd)
    if (!data.length) return res.status(404).json({ error: "el id no existe" })
    res.status(204).json(data)
    
    
    
}

const traeCarrito = async (req, res) => {
    const idCarrito = Number(req.params.id);
    const data = await carrito.traeCarritoPorId(idCarrito);
    if (data?.error) return res.status(data.error.status).json(data.error.message);
    res.status(200).json(data)
}
const agregaProductos = async (req, res) =>{
    const idCarrito = Number(req.params.id);
    const idProd = Number(req.body.idProd);
    const producto = await carrito.agregaProdoductosAlCarro(idCarrito)
    if (producto?.error) return res.status(producto.error.status).json(producto.error.message);
    
    const productoEnCarrito = await modelsProductos.traeUnProducto(idProd);
    const itmes = productoEnCarrito[0]
    if (!idCarrito) return res.json({ error: "el nro de carrito no existe" }) 
    if (!idProd || productoEnCarrito.length == 0) return res.json({ error: "el producto no existe" })
    res.json(await carrito.agregaProdoductosAlCarro(idCarrito,itmes))
}


const eliminaItmesId = async (req, res) =>{
    const idCarrito = Number(req.params.id);
    const idProd = Number(req.body.idProd);
    const producto = await modelsProductos.traeTodo(idProd)
    if (producto?.error) return res.status(producto.error.status).json(producto.error.message);
    const data = await carrito.eliminaProductosCarritoPorId(idCarrito, idProd);
    if (!data.error) return res.status(404).json({ error: 'el items que desa eliminar no existe' })
    res.status(204).send(data)
}










module.exports = {
    creaCarrito,
    traeCarrito,
    agregaProductos,
    eliminaCarrito,
    eliminaItmesId
}
