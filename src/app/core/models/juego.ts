export class Juego {
    public id: number;
    public nombre: string;
    public fecha: number;
    public resumen: string;
    public url: string;
    public portada: string;
    public favorito: boolean;

    constructor(
        id: number,
        nombre: string,
        fecha: number,
        resumen: string,
        url: string,
        portada: string
    ) {
        if (
            id == null ||
            nombre == null || nombre === "" ||
            fecha == null ||
            resumen == null || resumen === "" ||
            url == null || url === "" ||
            portada == null || portada === ""
        ) {
            throw new Error("Parametros invalidos");
        }
        this.id = id;
        this.nombre = nombre;
        this.fecha = fecha;
        this.resumen = resumen;
        this.url = url;
        this.portada = portada;
        this.favorito = false;
    }
    
}