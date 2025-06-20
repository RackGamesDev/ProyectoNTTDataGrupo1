export class Usuario {
    id: number;
    nombre: string;
    email: string;

    constructor(id: number, nombre: string, email: string) {
        if (id == null) {
            throw new Error('id no especificado');
        }
        if (nombre == null || nombre === '') {
            throw new Error('nombre no especificado');
        }
        if (email == null || email === '') {
            throw new Error('email no especificado');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('email invalido');
        }
        this.id = id;
        this.nombre = nombre;
        this.email = email;
    }
}