export class Juego {
    public id: number;
    public nombre: string;
    public fecha: number;
    public resumen: string;
    public url: string;
    public portada: string;

    constructor(
        id: number,
        nombre: string,
        fecha: number,
        resumen: string,
        url: string,
        portada: string
    ) {
        this.id = id;
        this.nombre = nombre;
        this.fecha = fecha;
        this.resumen = resumen;
        this.url = url;
        this.portada = portada;
    }
    
}