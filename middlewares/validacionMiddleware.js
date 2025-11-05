import { validarUsuario } from "../utils/usuario_validador.js";

// Middleware de Validación (para POST y PUT)
export const validarUsuarioMdw = (req, res, next) => {
    validarUsuario(req.body);    
    // Si la validación es exitosa, pasar al siguiente middleware (o al handler de la ruta)
    next();
};