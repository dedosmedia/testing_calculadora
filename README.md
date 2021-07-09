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

** Para avanzar al siguiente paso cambiate a la branch llamada  paso4**