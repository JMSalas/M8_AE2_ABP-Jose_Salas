import express from "express";
import { listarUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario, buscarUsuario } from "../controlers/usuarios_controller.js";
import { validarUsuarioMdw } from "../middlewares/validacionMiddleware.js";

export const usuariosRouter = express.Router();

usuariosRouter.use(express.json());

//Rutas
usuariosRouter.route('/')
    .get(listarUsuarios)
    .post(validarUsuarioMdw, crearUsuario);

usuariosRouter.route('/:id')
    .get(buscarUsuario)
    .put(validarUsuarioMdw, actualizarUsuario)
    .delete(eliminarUsuario);