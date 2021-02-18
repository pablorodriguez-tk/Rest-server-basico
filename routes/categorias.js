const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers/categorias");
const { existeCategoriaPorId } = require("../helpers/db-validators");
const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");
const router = Router();

// Obtener todas las categorias - publico
router.get("/", [obtenerCategorias]);

// Obtener una categoria por id - publico
router.get(
  "/:id",
  [
    check("id", "No es un ID de Mongo valido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  obtenerCategoria
);

// Crear categoria - privado - cualquier persona con un token valido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es Obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

// Para actualizar un registro por id - privado - cualquier persona con un token valido
router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es Obligatorio").not().isEmpty(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  actualizarCategoria
);

// Borrar una categoria por id - privado - ADMIN
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  borrarCategoria
);

module.exports = router;
