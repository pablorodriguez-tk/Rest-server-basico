const { response } = require("express");
const jwt = require("jsonwebtoken");
const usuario = require("../models/usuario");

const Usuario = require("../models/usuario");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    //Leer el usuario que corresponde al uid
    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res
        .status(401)
        .json({ msg: "Token no valido - Usuario no existe en DB" });
    }
    if (!usuario.estado) {
      //Verificar si el uid tiene estado true
      return res
        .status(401)
        .json({ msg: "Token no valido - Usuario estado: False" });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no valido",
    });
  }
};

module.exports = { validarJWT };
