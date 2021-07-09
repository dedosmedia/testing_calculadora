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


** Para avanzar al siguiente paso cambiate a la branch llamada  paso2**