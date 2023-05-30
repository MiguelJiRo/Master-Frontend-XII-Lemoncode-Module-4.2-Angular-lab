# Master Frontend XII Lemoncode 🍋

## Module 4.2 Angular lab

<br>

[Go back - Index](https://github.com/MiguelJiRo/Master-Frontend-XII-Lemoncode)

<br>

<img align="center" src="https://media.giphy.com/media/7j2hfyeVcDtf2/giphy.gif" width="128px">

<br>

### Básico
<ol>
    <li>✅ Crea un nuevo proyecto de Angular con routing y con estilos scss.</li>
    <li>✅ Añade Angular Material.</li>
    <li>✅ Crea los componentes necesarios para crear el layout.</li>
    <li>✅ Configura el routing para asignar una url a cada una de las 7 páginas de los menús.</li>
    <li>✅ Crea un formulario de login con 2 campos: username y password. Pon validaciones y mensajes de error. Al hacer submit del formulario, el componente invocará al método login() del servicio descrito en el siguiente punto.</li>
    <li>✅ Crea un servicio Auth que gestione el estado relacionado con la autenticación del usuario.</li>
    <li>✅ Modifica el componente de login para que si al invocar al servicio de login, éste último devuelve true, el componente redirija al usuario al dashboard.</li>
    <li>✅ Haz que solamente se muestre el menú público si el usuario no está logueado y el menú privado si el usuario sí está logueado.</li>
    <li>✅ Añade un botón de salir en la cabecera de la web que solamente se muestre si el usuario está logueado.</li>
    <li>✅ También en la cabecera, y solamente cuando el usuario esté logueado, muestra el username del usuario.</li>
    <li>✅ RETO. Añade persistencia al estado de autenticación guardando el estado en el localstorage.</li>
</ol>

### Opcional
<ol>
    <li>Galería de fotos.</li>
    <ol>
        <li>✅ Parte básica (Imagen seleccionada, listado de imágenes, botonera).</li>
        <li>✅ Programa la galería con una serie de funcionalidades.</li>
        <li>✅ RETO 1: Remarcar con estilos css la imagen de la lista que corresponda con la imagen actualmente seleccionada.</li>
        <li>✅ RETO 2: Paginar el listado de imágenes. En vez de mostrar todas las imágenes de golpe, mostrarlas de 3 en 3. Añadir un botón Anterior y otro siguiente para avanzar o retroceder de “página” en el listado.</li>
    </ol>
    <li>✅ Uso de RxJs.</li>
    <ol>
        <li>✅ Modifica el método login().</li>
        <li>✅ Adapta el componente de login.</li>
        <li>✅ Simula un delay en la respesta del login.</li>
        <li>✅ Pon un indicador (un gif de loading) en el formulario de login que se muestre al darle al botón de submit y desaparezca cuando el método de login haya emitido su respuesta.</li>
    </ol>
</ol>