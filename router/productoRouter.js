const router = require("express").Router();
const productoController = require("../controller/productosController");

router.get("/", productoController.list);

router.get("/create", productoController.create);
router.post("/create", productoController.stock);

router.delete('/productos/:id', productoController.delete);
router.get('/productos/:id', productoController.detalle);

router.get('/:id/edit', productoController.editarAutos);
router.post('/editar', productoController.actualizar);


module.exports = router;