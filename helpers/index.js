const dbValidators = require("./db-validators");
const generarJWT = require("./generar-jwt");
const googleVerify = require("./google-verify");
const subirArchivo = require("./subir-archivo");

// LOS 3 PUNTOS ES PARA EXPORTAR TODO EL CONTENIDO (FUNCION,CONSTANTE,VARIABLE) DE ESTA MANERA TODO ESTARA EN EL MODULO.EXPORTS
module.exports = {
  ...dbValidators,
  ...generarJWT,
  ...googleVerify,
  ...subirArchivo,
};
