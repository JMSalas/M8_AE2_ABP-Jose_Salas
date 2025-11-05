import { writeLocalFile, readLocalFile} from  '../utils/fileUtils.js';
import { ErrorRecursoNoEncontrado, ErrorValidacion } from '../utils/errors.js';

export class UsuariosAdmin {
    constructor (path) {
        this.path = path;
    }
    
    async getUsuarios() {
        const usuarios = await readLocalFile(this.path);
        
        if (usuarios === null) {
            throw new ErrorRecursoNoEncontrado(`No se pudo leer el archivo de usuarios ${this.path}.`);
        }

        return usuarios;
    }

    async getUsuario(id) {
        const usuarios = await this.getUsuarios();
        const usuario = usuarios.find((usuario) => usuario.id == id);
        
        if (!usuario) {
            throw new ErrorRecursoNoEncontrado(`Usuario ID ${id} no existente`);
        }

        return usuario;       
    }

    async setUsuarios(usuarios) {
        const success = await writeLocalFile(this.path, usuarios);
        if (!success) {
            throw new ErrorRecursoNoEncontrado(`No se pudo escribir el archivo de usuarios ${this.path}.`);
        }
        return success;
    }
    
    async addUsuario(datosUsuario) {
        const usuarios = await this.getUsuarios();
        let nuevaID;

        if(usuarios.length > 0) {
            // Encontrar el ID mas alto en caso que la lista este desordenada.
            const maxID = Math.max(...usuarios.map(usuario => usuario.id));
            // Definir Proximo ID
            nuevaID = maxID + 1;
        } else {
            // Si la lista está vacía, empezar en 1.
            nuevaID = 1;
        }
        
        console.log(usuarios.findIndex((usuario) => usuario.correo == datosUsuario.correo));

        if (usuarios.findIndex((usuario) => usuario.correo == datosUsuario.correo) !== -1){
            throw new ErrorValidacion(`Ya existe un usuario con ese correo ${datosUsuario.correo}.`);
        }

        const nuevoUsuario = {id:nuevaID, ...datosUsuario}
        usuarios.push(nuevoUsuario);

        await this.setUsuarios(usuarios);
        return nuevoUsuario;
    }

    async editUsuario(id, data) {
        const usuarios = await this.getUsuarios();
        const usuario = usuarios.find((usuario) => usuario.id == id);
        
        if (!usuario) {
            throw new ErrorRecursoNoEncontrado(`Usuario ID ${id} no existente`);
        }
        
        const usuarioCorreo = usuarios.find((usuario) => usuario.correo == data.correo)

        if (usuarioCorreo && usuarioCorreo.id !== usuario.id ){
            throw new ErrorValidacion(`Ya existe un usuario con el correo ${data.correo}.`);
        }
    
        Object.assign(usuario, data);
        
        await this.setUsuarios(usuarios);
        return true;
    }

    async deleteUsuario(id) {
        const usuarios = await this.getUsuarios();
        const selectedIndex = usuarios.findIndex((usuario) => usuario.id == id);

        if (selectedIndex === -1)
            throw new ErrorRecursoNoEncontrado(`Usuario ID ${id} no existente`);

        usuarios.splice(selectedIndex, 1);
        await this.setUsuarios(usuarios);
        return true;
    }
}