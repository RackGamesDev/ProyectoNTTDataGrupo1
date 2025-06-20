# API IGDB
Más información de la API en [IGDB_API](https://api-docs.igdb.com/)
## Conseguir el token de acceso 
Hace falta una cuenta de Twitch con TwoFactorAuthentication, se manda en la URL el client_id y el client_secret generados para recibir el token
`POST: https://id.twitch.tv/oauth2/token?client_id=640yvg5j9tzph66ryr3nflwxqxdcsx&client_secret=5vmjw9o0zsaxv6n01nfx5ma4ds1rg9&grant_type=client_credentials`
## Hacer peticoines
Para todas las peticiones se necesitan autentificación:
- En los Headers, hace falta una propiedad llamada Client-ID con el valor del client_id
- En autorización, hay que usar el modo Bearer Token, y proporcionar el token antes conseguido
- En body se ponen los parámetros para buscar
- Ejemplo: `POST: https://api.igdb.com/v4/games    HEADERS/Client-ID: 640yvg5j9tzph66ryr3nflwxqxdcsx    Authorization/BearerToken: sygoe9vzlmurkfgsxmelj29tsa6d34    Body: "fields *;"`
## Filtrar
Funciona de manera similar a SQL, `fields *;` implica recoger todos los campos del juego, `fields name, release_date` implica recoger solo esos campos. `where id = 1942;` implica filtrar por id (se pueden usar comparadores), `where id = (1,3,634)` implica recoger varios juegos. `search "Persona;"` implica buscar según ese nombre. `sort rating desc;` implica ordenar descendentemente por valoración. `limit 50;` implica recoger hasta x juegos.

# API OMDB IMDB

