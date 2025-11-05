import path from "path";
import { fileURLToPath } from "url";
import { UsuariosAdmin } from "../models/UsuariosAdmin.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.dirname(__filename));

const jsonDatabase = path.join(__dirname, 'database', 'usuarios.json');

const usuariosAdmin = new UsuariosAdmin(jsonDatabase)

export const listarUsuarios = async(req, res) => {
    const usuarios = await usuariosAdmin.getUsuarios();
    
    return res.status(200).json(usuarios);
}

export const buscarUsuario = async(req, res) => {
    const usuario = await usuariosAdmin.getUsuario(req.params.id);

    return res.status(200).json(usuario);
}

export const crearUsuario = async(req, res) => {
    const nuevoUsuario = await usuariosAdmin.addUsuario(req.body);

    return res.status(201).json({
        message : `Usuario con id ${nuevoUsuario.id} creado exitosamente`
    }); 
}

export const actualizarUsuario = async(req, res) => {
    await usuariosAdmin.editUsuario(req.params.id, req.body);
    
    return res.status(200).json({
        message : `Usuario con id ${req.params.id} actualizado exitosamente`
    }); 
}

export const eliminarUsuario = async(req, res) => {
    await usuariosAdmin.deleteUsuario(req.params.id);
    
    return res.status(200).json({
        message : `Usuario con id ${req.params.id} eliminado exitosamente`
    });
}