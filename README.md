# GameMatch - CRUD con Angular

Este es un proyecto web desarrollado en **Angular** que permite realizar operaciones **CRUD (Crear, Leer, Actualizar y Eliminar)** sobre usuarios conectados a una **API externa**. Permite crear usuario, entrar con un usuario valido a su homepage, modificar el usuario y eliminar el usuario. El proyecto esta enfocado para que cada usuario tenga su lista de juegos personalizada extraídos de la API IGDB (falta finalizar esa funcionalidad).

## 📌 Funcionalidades

- ✅ Registro de nuevos usuarios mediante formulario que crea el usuario directamente en la API
- ✅ Inicio de sesión por correo electrónico
- ✅ Visualización del perfil del usuario
- ✅ Edición del nombre y correo mediante formulario editable
- ✅ Eliminación de la cuenta
- ✅ Estilos modernos con experiencia de usuario mejorada

## 🚀 Tecnologías utilizadas

- Angular 20+
- TypeScript
- HTML & CSS
- Bootstrap (clases personalizadas)
- API REST externa (con `fetch`)
- Señales reactivas (`signal`)
- Forms reactivos (`ReactiveFormsModule`)
- Enrutamiento (`RouterModule`)

## 🛠️ Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/tu-usuario/tu-repo.git
   ```

2. Entra en la carpeta del proyecto:

   ```bash
   cd tu-repo
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Ejecuta la aplicación:

   ```bash
   ng serve
   ```

5. Abre tu navegador en [http://localhost:4200](http://localhost:4200)

## 📄 Estructura principal

```
src/
│
├── app/
│   ├── core/                # Modelos y servicios globales
│   ├── modules/
│   │   ├── auth/            # Login y registro de usuarios
│   │   └── user-home/       # Perfil y gestión de cuenta
│   └── services/            # Servicios compartidos como sesión
```

## 👤 Inicio de sesión/Leer usuario

Para iniciar sesión, solo necesitas un **correo ya registrado** en la API.Si no estás registrado, puedes hacerlo desde la misma web mediante el formulario de registro.

## 🆕 Crear usuario

Desde la pantalla de registro, puedes introducir un nombre y un correo válido. Si el correo no existe ya en la API, se crea un nuevo usuario directamente. Tras el registro exitoso, el usuario es redirigido automáticamente a su página personal.

## ❌ Eliminar usuario

Desde la sección de perfil, puedes eliminar completamente tu usuario de la API.

## ✏️ Editar usuario

Al hacer clic en "Modificar datos" se despliega un formulario para editar tu nombre y correo. Al guardar, los cambios se actualizan directamente en la API. También puedes cancelar la edición sin aplicar cambios.

## 📬 Contacto

Proyecto creado como práctica de Angular y CRUD en equipo para NTTData.Desarrollado por: 

Javier García: [europons@gmail.com](mailto:europons@gmail.com)
Eloy Rico: [000elrp@gmail.com](mailto:000elrp@gmail.com)
Daniel Chaves: [dchavescarou@gmail.com](mailto:dchavescarou@gmail.com)
