# Just Send

###### DWEC T4 - P3 AMPLIACIÓN DE FUNCIONALIDADES

##### *Por Patricio Cifredo*

![miweb](/recursos/Captura.JPG)

******
***
0 - PROBAR LA WEB
=

> Web desplegada --> https://frabjous-banoffee-655cb5.netlify.app/ (no funciona bien)


> * **Probar en local**: ¡IMPORTANTE! Manuel, para
> no exponer mi token de manera pública 
> usé un archivo .js que luego
> metí en el gitignore. En el 
> comentario de la entrega te he dejado el
> lo que debes copiar y pegar en el archivo js "*token_emailjs.js*" que tienes que crear y que
> debe ir en la carpeta principal
> del proyecto.

***
1- Just Send: Introducción
=

En este proyecto debíamos ampliar las funcionalidades de 
uno de los proyectos con los que habíamos trabajado en la unidad.
En mi caso, he escogido el proyecto mail, ya que era
el que más me llamaba la atención, pues las funcionalidades
que se le podían añadir eran bastante distintas al resto
de proyectos.
![historial](/recursos/Captura.JPG)
***
2 - Nuevas funcionalidades implementadas
=
***
> ### 1. Historial
> Ahora, cuando enviamos un email con nuestro formulario,
> si vamos a la nueva pestaña de 'Historial', podremos
> ver una lista de todos los correos que hemos enviado.
> ![historial](/recursos/2.jpg)
> Esto nos muestra el destinatario, el asunto, la fecha
> a la que se envió y se añade un botón por si queremos
> eliminar el correo del historial.
> Para poder mostrar esta información usamos localStorage y un objeto
> con el que guardamos la info de los campos al hacer click en enviar.
> ![historial](/recursos/3.JPG)
> ![historial](/recursos/4.JPG)
> Para capturar la fecha del envio usamos la
> biblioteca *momentJS*
> El historial tiene función de hover en cada fila
> de la tabla, que tras hacer click se despliega un modal
> que se puede cerrar en su correspondiente botón
> o haciendo click fuera de cualquier parte del modal
> ![historial](/recursos/13.JPG)
> ![historial](/recursos/14.JPG)

> ### 2. Drag & Drop
> Para el formulario de envío he añadido una zona
> en la que podemos *arrastrar y soltar* (drag&drop)
> archivos. Para ello he usado la API nativa
> *HTML Drag and Drop API*, para cuyo uso me he documentado
> en https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
> ![mi_zona_d&d](/recursos/5.JPG)
> Para ello creé 3 funciones:
> ![mi_zona_d&d](/recursos/6.JPG)
> ![mi_zona_d&d](/recursos/7.JPG)
> ![mi_zona_d&d](/recursos/8.JPG)
> Y los siguientes eventos fueron capturados
> para el correspondiente uso de la zona
> ![mi_zona_d&d](/recursos/9.JPG)
> La funcionalidad de esta zona de arrastrar y soltar
> muestra tanto en el formulario como en el historial
> los nombres y extensiones de los archivos soltados, aunque
> no su contenido.


> ### 3. Enviar realmente el email
> Para implementar esta funcionalidad
> usé la API *EmailJS* de fácil uso y localizada
> en https://www.emailjs.com/.
> Me regsitré y me dieron un token público y 200 envíos de emails
> de uso gratuito. Para este registro, usé un correo específico
> para este proyecto: *dwecpruebas@gmail.com*.
> Esta API permite mandar: el código de nuestro servicio,
> el código de nuestra plantilla (ambos
> nos los proporciona la API) y un objeto params
> con los campos deseados como atributos:
> ![mi_zona_d&d](/recursos/10.JPG)
> Para que luego podamos usar esa información
> en la plantilla que nos proporciona la API
> debemos usar el nombre de cada atributo en la misma:
> ![mi_zona_d&d](/recursos/11.JPG)
> Para implementar su funcionalidad en nuestro código debemos:
> 1. Usar el objeto emailjs y su funcion *.send* y pasarle
> 2. los 3 parámetros indicados: id del servicio, id de la plantilla
> 3. y objeto con la información.
> 
> A su ez debemos incluir el siguiente script en
> el HTML:
> ![mi_zona_d&d](/recursos/12.JPG)
> Donde pone token_emailjs.token
> deberíamos usar nuestro token.
> En este caso para no exponer mi token
> de forma pública he utilizado un archivo
> que importo y que luego añado al .gitignore.
>
***

3 - Conclusiones
=
***

He acabado muy contento con el resultado
de este proyecto, ya que he implementado
funciones y APIs nuevas cuyo manejo
y uso he tenido que aprender por mi cuenta,
mejorando mis conocimientos y mi confianza
respecto a la asignatura. De haber podido tener más tiempo,
me hubiera gustado añadir también: un servicio de borradores,
de deshacer el envío en los primeros 30 segundos
y almacenar el el localStorage los archivos arrastrados.
***
4 - Recursos y bibliografía utilizada
=
***

HTML Drag and Drop API - Web APIs | MDN. (2023, 21 octubre). MDN Web Docs. 
https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API

Documentation | EmailJS. (s.f.). EmailJS. 
https://www.emailjs.com/docs/
