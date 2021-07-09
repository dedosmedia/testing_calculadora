**Paso 0.**
Para poder iniciar con el proyecto es necesario haber instalado NodeJS es nuestra máquina. Al haber hecho la instalación además del Node se nos debió instalar una herramiento llamada Node Package Manager y que podemos acceder desde la línea de comandos con la abreviatura **npm**

**Paso 1.**
En este paso vamos a convertir este proyecto en un proyecto de NodeJS.
Para ello necesitamos crear el archivo *package.json*  archivo que no lo creamos manualmente sino que lo creamos ejecutando en la línea de comandos con la utilidad **npm** (en la línea de comandos debes estar al mismo nivel del archivo *funcionalidades.js*):
>npm init -y

El comando **npm init** con el modificador **-y**  evita que se nos hagan algunas preguntas al ejecutarlo y creará el *package.json* con valores por defecto (recomendable).

Si se desea contestar dichas preguntas sobre el proyecto para una configuración más personalizada, basta con que invoques el comando sin el modificador **-y**. En dicho caso al ejecutar el comando se nos harán una serie de preguntas y lo que respondamos a esas preguntas se guardará dentro del *package.json*

**Paso 2.**
En este paso ya con el proyecto de NodeJS inicializado (ya tenemos un *package.json*), podemos empezar a instalar las librearias de NodeJS que sean necesarias. En nuestro caso solo se hace necesario instalar la librería llamada **jest** que es la que se usará para hacer pruebas unitarias.
Para instalar una librería se ejecuta el siguiente comando:
>npm install --save-dev jest

Hay librerías que se requieren para que el proyecto funcione una vez se publica al usuario final, pero hay otras librerias que son requeridas unicamente por el desarrollador al momento del desarrollo y que no necesitamos incluir en nuestro proyecto final. Jest es una de las librerias que solo nos sirven durante desarrollo, para indicarle a NodeJS que es una librería de desarrollo y que no es necesario que la exporte en el proyecto final usamos el modificador **--save-dev**, en dicho caso esa librería quedará incluida en el *package.json*  bajo la clave **devDependencies**, así:
```json
"devDependencies": {
    "jest": "^27.0.6"
}
```
Si por el contrario es una librería que sabemos que se requiere en el proyecto final (no solamente durante desarrollo), lo que hacemos es usar el modificador **--save**. Por ejemplo:

**[NO EJECUTAR EL SIGUIENTE COMANDO, SOLO ES PARTE DE LA EXPLICACIÓN]**
>npm install --save express
En dicho caso esa librería quedará incluida en el *package.json*  bajo la clave **dependencies**, así:
```json
"dependencies": {
    "express": "^4.17.1"
}
```

Una vez que hayamos instalado el jest, el npm se encargará de crearnos una carpeta llamada **node_modules**, es dentro de esta carpeta donde quedarán almacenadas todas las librerías que utiliza nuestro proyecto (incluidas las necesarias solo durante desarrollo). También se nos crea un archivo *package-lock.json* que por el momento no nos interesa.