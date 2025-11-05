import { ErrorValidacion, ErrorValidacionEspecial } from "./errors.js";

export function validarUsuario (dataUsuario) {
    // Verificar si se ha ingresado informacion de usuario existe
    if (!dataUsuario || typeof dataUsuario !== 'object') {
        throw new ErrorValidacionEspecial("No se ha ingresado información de usuario en el body de la solicitud");
    }

    // Verificar propiedad 'nombre' existe y es string
    if (!dataUsuario.nombre || typeof dataUsuario.nombre !== 'string' || dataUsuario.nombre.trim().length === 0) {
        throw new ErrorValidacion("El nombre del usuario es obligatorio o no es un string.");
    }

    // Verificar propiedad 'email' existe y es string
    if (!dataUsuario.correo || typeof dataUsuario.correo !== 'string' || dataUsuario.correo.trim().length === 0) {
        throw new ErrorValidacion("El correo del usuario es obligatorio o no es un string.");
    }

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if(!regexCorreo.test(dataUsuario.correo)){
        throw new ErrorValidacion("El correo del ingresado no tiene un formato válido");
    }
}