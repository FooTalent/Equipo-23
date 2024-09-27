<h1><img src="https://cdn.iconscout.com/icon/free/png-256/free-cart-374-444556.png" alt="Cart Icon" style="width: 32px; height: 32px; vertical-align: middle;"> TodoTecno E-commerce</h1>

Aplicación de E-commerce basada en los contenidos vistos en la Carrera de desarrollo Full Stack de CoderHouse.

## Deploy del proyecto
Link: [TodoTecno E-commerce](https://cursobackend-production-680d.up.railway.app/)

## Tabla de Contenidos

1. [Descripción](#descripción)
2. [Características](#características)
3. [Tecnologías](#tecnologías)
4. [APIs](#apis)
5. [Instalación](#instalación)
6. [Contacto](#contacto)

## Descripción
Dentro de la aplicacion cuando no se esta logueado solo se puede visualizar las vistas /home /products /products/:id (detalle del producto) y /login.
Al registrarse se envia un codigo de confirmacion al email del usuario para corrobar que el correo electronico ingresado le pertenezca. 
Una vez ingresado el codigo se crea el usuario en la base de datos y puede tener acceso a su vista de carrito /cart y a los botones de "agregar producto al carrito". 
Solo si se tiene productos en el carrito se puede hacer la compra, al realizarla se recibe un mensaje de "Compra realizada" y se descuenta el stock de los productos que compro el usuario con la cantidad de la compra.


## Características

- Gestión de usuarios
- Autenticación y autorización con passport-jwt
- Manejo de MongoDB usando el ODM mongoose
- Documentación de la API con Swagger
- Envío de correos electrónicos con nodemailer
- Renderizado de vistas con el motor de plantillas Handlebars

## Tecnologías

- **Frontend**: Handlebars (motor de plantillas)
- **Backend**: Node.js, Express
- **Base de Datos**: MongoDB
- **Otros**: Git

## APIs

- **Carts**: Gestión de carritos de compra
- **Products**: Gestión de productos
- **Users**: Gestión de usuarios
- **Sessions**: Gestión de sesiones de usuario
- **Tickets**: Gestión de tickets de compra

## Instalación

Instrucciones para instalar y configurar el proyecto localmente.

```bash
# Clonar el repositorio
git clone https://github.com/lucianorodriguez1/CursoBackend.git

# Instalar las dependencias
npm install

# Iniciar el servidor local con nodemon
npm run dev
```

## Contacto
Luciano Ezequiel Rodriguez - lucianoezerodriguez14@gmail.com
