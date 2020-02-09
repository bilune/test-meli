# Test práctico - Frontend
La aplicación consta de tres componentes principales: la caja de búsqueda, la visualización de resultados y la descripción del detalle del producto. Dos de estas vistas consumen una API Rest que se alimenta de la API de MercadoLibre.

[Ver demo](https://meli-test-bilune.herokuapp.com/)

## Ejecutar el proyecto

1. Clonar el respositorio
```sh
git clone https://github.com/bilune/test-mercadolibre.git
```

2. Instalar las dependencias

**Yarn**
```sh
yarn install
```

**npm**
```sh
npm install
```

3. Ejecutar los siguientes comandos según si se quiere ejecutar en modo desarrollador o en producción:

### Desarrollador

**Yarn**
```sh
yarn run dev
```

**npm**
```sh
npm run dev
```

### Producción

**Yarn**
```sh
yarn run build
yarn start
```

**npm**
```sh
npm run build
npm start
```

4. Acceder a [http://localhost:3000/](http://localhost:3000/)

## Stack tecnológico
- Cliente:
  - React v16.7.0
  - Sass (SCSS)
  - Bootstrap (grid, reboot) v4.2.1

- Servidor:
  - Node v10.10.0
  - Express

- Ambos:
  - Next.js


## Descripción del proyecto
El desarrollo de la aplicación se centró en cuatro ejes que justifican el uso de determinadas tecnologías en el proyecto.

### Usabilidad
Si bien el desarrollo estuvo centrado en el modo desktop, ya que las especificaciones así lo determinaban, utilicé las herramientas de Bootstrap para asegurarme que la aplicación se veía correctamente en todo tipo de dispositivos.

Además, me pareció importante tener en cuenta algunos aspectos que beneficiarían la experiencia de usuario como:
- Definir distintos títulos para cada página en la etiqueta *title* de forma que el usuario pueda ubicarse fácilmente dentro de la aplicación.
- Implementar páginas de error que inviten al usuario a volver a la aplicación.

<p align='center'>
<img src='https://raw.githubusercontent.com/bilune/test-mercadolibre/master/static/readme/error_page.png' width='600' alt='error page'>
</p>

- Colaborar con el usuario para evitar errores en la navegación, por ejemplo en el caso de la página inicial de búsqueda, si envía el formulario cuando el campo de texto está vacío, la aplicación no lo redirecciona a la visualización de resultados sino que vuelve a hacer foco en dicho *input*, dando a entender de un modo no invasivo que debe asegurarse de completarlo.
- Al ser una Single Page App, me parece muy importante para la usabilidad la presencia de loaders que indiquen al usuario que la petición que realizó se está procesando en ese momento. En el caso de la presente aplicación, este loader fue colocado entre las páginas (pages) y no en los componentes hijos, aunque el estado loading de la aplicación era accesible desde todo punto con el Higher-Order Component [withLoading](https://github.com/bilune/test-mercadolibre/blob/master/utilities/withLoading.js).

### SEO
Optimizar la presencia en buscadores fue una de las razones determinantes por las que utilicé el framework Next.js, dado que quería asegurarme que los tags responsables del SEO sean reconocibles por los diferentes crawlers presentes en la web. Por ejemplo, los rastreadores de Facebook y Twitter no reconocían los tags de Open Graph agregados dinámicamente en el lado del cliente.

Básicamente, para optimizar este aspecto, utilicé algunos componentes creados a la medida de las necesidades de la aplicación:
- Uno de los componentes agrega OpenGraph a cada página según las propiedades que se le asignan.
- El resto de los componentes agregan JSON-LD según se trate de un producto o de una lista de categorías.

También tuve en cuenta la presencia en el head de un título y una descripción acorde al contenido actual del sitio.

### Performance
Otra de las principales razones por las que decidí usar una herramienta como Next.js fue el deseo de crear un sitio performante en todo tipo de dispositivos. Esa tecnología facilitó la tarea de crear una aplicación isomórfica que permite que terminales con pocos recursos puedan acceder al contenido más rápido y además que usuarios puedan ver contenido significativo y comenzar a interactuar con el sitio en menos tiempo.

<p align='center'>
<img src='https://raw.githubusercontent.com/bilune/test-mercadolibre/master/static/readme/performance_test.jpg' width='100%' alt='performance test'>
<small>Auditoría de Google Lighthouse</small>
</p>

### Escalabilidad
La facilidad de escalar una aplicación basada en componentes fue determinante a la hora de elegir React y Sass para el desarrollo. Esas herramientas permiten reutilizar funcionalidades, a la vez que se conserva un control a lo largo de toda la aplicación.

---
Developed with :green_heart: by Gonzalo Bilune
