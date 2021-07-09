**Paso 0.**

Para poder iniciar con el proyecto es necesario haber instalado NodeJS en nuestra máquina. Al haber hecho la instalación además del Node se nos debió instalar una herramienta llamada **Node Package Manager** y que podemos acceder desde la línea de comandos a través del comando **npm**

En este momento tenemos un proyecto web muy sencillo que es una calculadora y basicamente está conformada por un html, css y js.
>calculadora.html

>estilo.css

>funcionalidad.js


**Paso 1.**

En este paso vamos a convertir esta carpeta en un proyecto de NodeJS.
Para ello necesitamos crear el archivo *package.json*  
**Nota:** este archivo no lo creamos manualmente sino que lo creamos en la línea de comandos con la utilidad **npm** (en la línea de comandos debes estar al mismo nivel del archivo **funcionalidades.js**) para ello ejecutamos:

>npm init -y

El comando **npm init** con el modificador **-y**  evita que se nos hagan algunas preguntas al ejecutarlo y creará el *package.json* con valores por defecto (recomendable).

Si se desea contestar dichas preguntas sobre el proyecto para crear una configuración más personalizada, basta con que invoques el comando sin el modificador **-y**. En dicho caso al ejecutar el comando se nos harán una serie de preguntas y lo que respondamos se guardará dentro del *package.json*


**Paso 2.**

En este paso ya con el proyecto de NodeJS inicializado (es decir ya tenemos un *package.json*), podemos empezar a instalar las librearias de NodeJS que sean necesarias. En nuestro caso solo se hace necesario instalar la librería llamada **jest** que es la que se usará para hacer pruebas unitarias.
Para instalar una librería se ejecuta el siguiente comando:

>npm install --save-dev jest

Hay librerías que se requieren para que el proyecto funcione una vez se publica al usuario final, pero hay otras librerias que son requeridas unicamente por el desarrollador al momento del desarrollo y que no necesitamos incluir en nuestro proyecto final. Jest es una de las librerias que solo nos sirven durante desarrollo, para indicarle a NodeJS que es una librería de desarrollo y que no es necesario que la exporte en el proyecto final usamos el modificador **--save-dev** al momento de instalarla, en dicho caso esa librería quedará incluida en el *package.json*  bajo la clave **devDependencies**, así:
```json
"devDependencies": {
    "jest": "^27.0.6"
}
```

**[NO EJECUTAR EL SIGUIENTE COMANDO, SOLO ES PARTE DE UNA EXPLICACIÓN GENERAL]**

Si por el contrario es una librería que sabemos que se requiere en el proyecto final (no solamente durante desarrollo), al momento de instalar la librería lo que hacemos es usar el modificador **--save**. Por ejemplo:

>npm install --save express

En dicho caso esa librería quedará incluida en el *package.json*  bajo la clave **dependencies**, así:
```json
"dependencies": {
    "express": "^4.17.1"
}
```
**[FIN]**



Una vez que hayamos instalado el **jest**, el npm se encargará de crearnos una carpeta llamada **node_modules**, es dentro de esta carpeta donde quedarán almacenadas todas las librerías que utiliza nuestro proyecto (incluidas las necesarias solo durante desarrollo). También se nos crea un archivo *package-lock.json* que por el momento no nos interesa.

En este punto también es posible crear los **scripts** que no son más que comandos que podemos ejecutar con:

>npm run [NOMBRE_SCRIPT]

Nosotros vamos a crear dos scripts:  **test** y **test:coverage**   (Vale mencionar que son nombres que ponemos a nuestro antojo, pueden modificarse)

Para crearlos es necesario editar el *package.json* justo dentro de la sección de scripts escribimos lo siguiente:

```json
"scripts": {
    "test": "jest --env=jsdom",
    "test:covergae": "jest --coverage --env=jsdom"
  },
```

El primer script llamado **test** se puede ejecutar desde la línea de comando escribiendo lo siguiente:
>npm run test

Este script lo que hace es ejecutar todas las pruebas que configuraremos más adelante.

El segundo script llamado **test:coverage** se puede ejecutar desde la línea de comando escribiendo lo siguiente:
>npm run test:coverage

Este script hace lo mismo que el primero pero además nos creará un reporte donde nos muestra el nivel de cobertura de pruebas que tenemos dentro de nuestro proyecto.

La parte del **--env=jsdom** que pusimos dentro de nuestros script es necesaria dado que las pruebas se ejecutan dentro del entorno NodeJS donde no hay un navegador que pueda interpretar el DOM (En NodeJS no existen variables globales como window o document). Para solventar ese problema existe una librería llamada **jsdom** que se instala por defecto al momento de instalar **jest**.

**jsdom** es una implementación del DOM y de las APIs del navegador escrita enteramente en JavaScript y que corre dentro de NodeJS. En pocas palabras le estamos indicando a **jest** que utilice la librería **jsdom** para emular el comportamiento del navegador. De esta forma ahora tenemos acceso a variables globales como **document** donde podremos cargar el contenido de nuestro HTML.


**Paso 3.**

Con el proyecto convertido a un proyecto NodeJS, con la librería **jest** instalada y con los scripts que permitirán ejecutar nuestras pruebas (y habiendo configurado ya la variable de entorno **jsdom** para emular un navegador). Ahora podemos empezar a crear nuestros test.

La primer parte consiste en crear una carpeta llamada **\_\_test\_\_**
Dentro de dicha carpeta crearemos cada uno de los archivos que contienen los test, la particularidad de estos archivos es que deben tener el mismo nombre del archivo que queremos testear pero con la extensión **.test.js**  por ejemplo en nuestro caso queremos hacer testing a **funcionalidad.js** por lo que crearemos dentro de **\_\_test\_\_** un archivo llamado **funcionalidad.test.js**

Lo primero que debemos hacer dentro de ese archivo va a ser implementar la funcionalidad de emular el navegador. Gracias a **jsdom** ya tenemos acceso a una variable llamada **document** que sería equivalente a la que nos provee un navegador real. Lo que tenemos que hacer es leer desde el disco el archivo html que queremos interpretar (para ello usaremos el método readFileSync de la librería fs que nos propociona nativamente NodeJS), y luego ese html que acabamos de leer lo escribiremos dentro de la propiedad document.body.innerHTML, así:

```js
const fs = require('fs');
document.body.innerHTML = fs.readFileSync('./calculadora.html');
```

Después de modificar el document.body.innerHTML **jsdom** se encarga automágicamente de crearnos variables con los mismos nombres de todos los elementos que tengan un **id** asociado en el HTML. Por lo tanto desde nuestro archivo **funcionalidad.test.js** ya tenemos acceso a todos los elementos del DOM de nuestro HTML. Por ejemplo se crea la variable **resultado** (que corresponde al elemento \<span id="resultado"\>\</span\>) y que nos permite acceder al **\<span\>** que visualiza las operaciones aritméticas. Se crea la variable **uno** (que corresponde al elemento \<button id="uno"\>1\</button\>) y que nos permite acceder al **\<button\>** que contiene el número '1'. Y lo mismo aplica para el resto de elementos identificados con un 'id' en el HTML.


**Paso  4.**

Recapitulando hemos hecho lo siguiente:
- [x] Convertimos nuestra carpeta a un proyecto NodeJS ejecutando: npm init -y
- [x] Instalamos la librería de desarrollo **jest** ejecutando: npm install --save-dev jest
- [x] Creamos los scripts **test** y **test:coverage** editando el archivo package.json
- [x] Incluimos dentro de los scripts la variable de entorno jsdom para permitirnos emular el navegador, agregando --env=jsdom
- [x] Creamos la carpeta \_\_test\_\_ y dentro de ella el archivo funcionalidad.test.js
- [x] Dentro de funcionalidad.test.js empezamos leyendo el archivo calculadora.html y escribiendolo en document.body.innerHTML
- [x] Se nos crearon automágicamente variables con los mismos nombres de los elementos del DOM que tenían un 'id'  (ej: resultado, uno, dos, reset, suma, resta, etc) y que podemos utilizar dentro de nuestro archivo **funcionalidad.test.js**

Ahora para poder testear funciones de nuestro **funcionalidad.js** dentro de los **funcionalidad.test.js**, es necesario que importemos todas las funciones que queremos testear, pero antes de importarlas es necesario que las exportemos desde **funcionalidad.js** por lo tanto se modifica el archivo para incluir lo siguiente en la última línea:

funcionalidad.js
```js
module.exports = { limpiar, resetear, resolver, init, getVariables }
```

Y luego debemos importar estas funciones en **funcionalidad.test.js**

funcionalidad.test.js
```js
const { limpiar, resetear, resolver, init, getVariables } = require('../funcionalidad')
```

Habiendo importado esas funciones, ya las podemos utilizar dentro de nuestras pruebas. Sin embargo en este momento dentro de nuestras pruebas no tenemos acceso a variables declaradas en **funcionalidad.js** (como operandoa, operandob y operacion) y es por eso que además exportamos una función llamada **getVariables** que haremos a continuación.  **getVariables** es una especie de getter que nos permitirá leer dichas variables desde el archivo de **funcionalidad.test.js**. Por lo tanto creamos la siguiente función antes del module.exports

funcionalidad.js
```js
function getVariables(){
    return { operandoa, operandob, operacion }
}
```

Ahora finalmente tenemos todo listo para empezar a escribir nuestras suites y los casos de prueba dentro de ellas.


**Paso 5.**

Lo primero que hacemos es escribir nuestra suite, que agrupará varios test relacionados. Para ello se usa una estructura similar a la que se muestra a continuación:

```js
describe('Nombre del grupo de pruebas (suite)', ()=>{
    test('Nombre de la prueba individual',()=>{
        // Aquí la lógica de prueba
    })
})
```

el **describe** nos permite agrupar varias pruebas relacionadas bajo un mismo nombre, y **test** nos permite ir creando una a una las pruebas que conforman dicho grupo o suite.

Crearemos las pruebas del init(), resolver(), limpiar() y resetear(), los comentarios respecto a estas pruebas los encuentras en **funcionalidad.test.js**
Basicamente probamos

Suite: Prueba del método init()
- [X] Que los botones del 0 al 9 tengan todos el evento onClick, esto es que muestren en la pantalla el valor de la tecla clickeada.
- [X] Que los botones de las operaciones suma, resta, multiplicación y división funcionen 
- [X] Que los botones de igual y reset ('c') funcionen

Suite: Probar funcionalidad de resetear()
- [X] Que el método resetear() inicialice las variables

Suite: Pruebas de función limpiar()
- [X] Que el método limpiar() limpie el contenido de la pantalla (resultado.textContent)

Suite: Pruebas de función resolver()
- [X] Que el método resolver() funcione correctamente para las cuatro operaciones matemáticas.


En este punto con todas las pruebas ya escritas, podemos pedirle a **jest** que ejecute nuestras pruebas.
Para ello vamos a la línea de comandos y escribimos:

>npm run test:coverage

Esto nos debería ejecutar las prueebas, y al mismo tiempo crear una carpeta con información detallada sobre la cobertura de nuestro proyecto.
Al abrir el html de coverage, se podrá observar que casi el 100% del código está siendo cubierto por estos casos de prueba.


Esperamos que este paso a paso les ayude a entender un poco mejor el proceso desde el principio hasta el fin.

[FIN]