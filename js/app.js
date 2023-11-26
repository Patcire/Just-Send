// Just Send

// Objetos - Variables

// Con autoincremento generaremos el id para cada correo

let  autoincremento = -1

const objeto_email = {
    id_correo:autoincremento,
    email:'',
    asunto:'',
    mensaje:'',
    fecha: 'Por determinar',
    adjuntos: []
}

// Selectores

const campo_email = document.querySelector('#email')
const campo_asunto = document.querySelector('#asunto')
const  campo_mensaje = document.querySelector('#mensaje')
const formulario = document.querySelector('#formulario')
const info_campos = []
const boton_submit = document.querySelector('#formulario button[type="submit"]')
const boton_reset = document.querySelector('#formulario button[type="reset"]')
const spinner = document.querySelector('#spinner')
const zona_arrastre = document.querySelector('#drop_zone')
const frase_arrastre = document.querySelector('.frase_arrastre')

// Funciones

// Nuevas Funcionalidades implementadas

const recuperar_id_historial = () => {

    if ((localStorage.getItem('historial')) !== null) {
        const almacen =JSON.parse(localStorage.getItem('historial'))
        autoincremento = (almacen[almacen.length-1]).id_correo
    }
    else {
        autoincremento = -1
    }

}

const almacenar_campos = () =>{
     JSON.stringify(info_campos)
}

const recuperar_localStorage = (clave) =>{
    let almacen

    if (localStorage.getItem(clave)===null){
        almacen =[]
    }
    else {
        almacen =JSON.parse(localStorage.getItem(clave))
    }
    return almacen
}

const almacenar_localStorage = (clave, objeto_email) => {
    let almacen = recuperar_localStorage(clave)

    if (almacen=== null){
        almacen= []
        return almacen
    }

    almacen.push(objeto_email)
    console.log(almacen)
    localStorage.setItem('historial', JSON.stringify(almacen))
}

const mostrar_historial = ()  => {
    const tabla_historial = document.querySelector('table')
    const historial = recuperar_localStorage('historial')
    for (const correo of historial){
        const fila  =document.createElement('tr')
        const destinatario = document.createElement('td')
        const asunto = document.createElement('td')
        const fecha = document.createElement('td')
        const boton_eliminar_correo = document.createElement('button')

        boton_eliminar_correo.id = correo.id_correo
        fila.classList.add('fila_boton')
        destinatario.textContent = correo.email
        asunto.textContent = correo.asunto
        boton_eliminar_correo.textContent = 'Eliminar'
        boton_eliminar_correo.classList.add('funciones')
        fecha.textContent = correo.fecha

        tabla_historial.appendChild(fila)
        fila.appendChild(destinatario)
        fila.appendChild(asunto)
        fila.appendChild(fecha)
        fila.appendChild(boton_eliminar_correo)

        fila.addEventListener('click', (e) => {
            e.preventDefault()
            e.stopPropagation()
            lanzar_modal_email(correo)
        })
        boton_eliminar_correo.addEventListener('click', (e) => {
            e.stopPropagation();
            const id_boton = e.target.id
            eliminar_correo( id_boton, 'historial')
            limpiar_html(tabla_historial)
            mostrar_historial()
        })
    }
}

const lanzar_modal_email = (correo) => {
    console.log('entra en lanzar_modal')
    const modal = document.createElement('section');
    const contenido_modal = document.createElement('section')
    const boton_cerrar_modal = document.createElement('button');
    const cuerpo_mensaje = document.createElement('p')
    const destinatario_h3 = document.createElement('h3')
    const asunto_h3 = document.createElement('h3')
    const fecha_h3 = document.createElement('h3')
    const adjuntos_h3 = document.createElement('h3')

    destinatario_h3.classList.add('modal-encabezados')
    asunto_h3.classList.add('modal-encabezados')
    fecha_h3.classList.add('modal-encabezados')
    adjuntos_h3.classList.add('modal-encabezados')
    cuerpo_mensaje.classList.add('cuerpo_mensaje_modal')

    destinatario_h3.textContent = `Destinatario: ${correo.email}`
    asunto_h3.textContent = `Asunto: ${correo.asunto}`
    fecha_h3.textContent = `Fecha: ${correo.fecha}`
    adjuntos_h3.textContent = `Archivos adjuntos: ${correo.adjuntos}`
    cuerpo_mensaje.textContent = `Mensaje: ${correo.mensaje}`
    boton_cerrar_modal.textContent = 'Cerrar'


    modal.appendChild(contenido_modal)
    contenido_modal.appendChild(destinatario_h3)
    contenido_modal.appendChild(asunto_h3)
    contenido_modal.appendChild(fecha_h3)
    contenido_modal.appendChild(cuerpo_mensaje)
    contenido_modal.appendChild(adjuntos_h3)
    contenido_modal.appendChild(boton_cerrar_modal)

    modal.id = 'modal_email'
    contenido_modal.id = 'contenido_modal'
    boton_cerrar_modal.id = 'boton_cerrar_modal'

    document.body.appendChild(modal)

    boton_cerrar_modal.addEventListener('click', (e) => {
        e.preventDefault()
        modal.style.display = 'none';
    });

    // Para que también cierre al hacer click fuera del modal
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Página hace referencia a si estamos en index/historial
const eliminar_correo = (id_correo, pagina) => {
    console.log('entra en eliminar')
    const lista_correos = JSON.parse(localStorage.getItem(pagina))
    console.log(lista_correos)
    const lista_correo_actualizada = lista_correos.filter(function(correo) {
        console.log(typeof correo.id_correo)
        console.log(typeof id_correo)
        return correo.id_correo !== parseInt(id_correo)
    } )
    console.log(lista_correo_actualizada)
    localStorage.setItem(pagina, JSON.stringify(lista_correo_actualizada))
}

const soltar = (e) => {
    e.preventDefault();
    if (e.dataTransfer.items) {
        for (let i = 0 ; i < e.dataTransfer.items.length; i++) {
            if (e.dataTransfer.items[i].kind === 'file') {
                const file = e.dataTransfer.items[i].getAsFile()
                const nombre_archivo = document.createElement('p')
                nombre_archivo.textContent = file.name
                nombre_archivo.classList.add('nombre_archivo')
                e.target.appendChild(nombre_archivo)
                console.log(file.name)
                objeto_email.adjuntos.push(file.name)
            }
        }
    }
    eliminar_arrastrado(e)
}

const  prevenir_default_arrastrar = (e) => {
    // por defecto las páginas de los navegadores
    // si arrastras y sueltas algo lo muestran / carga en la misma ventana
    e.preventDefault()
}

const eliminar_arrastrado = (e) => {
    if (e.dataTransfer.items) {
        e.dataTransfer.items.clear()
    }
    else  {
        e.dataTransfer.clearData()
    }
}

const cambiar_color = () => {
    zona_arrastre.style.backgroundColor = 'darkseagreen'
}

const restaurar_color_original = () => {
    zona_arrastre.style.backgroundColor = ''
}

const enviar_email_emailjs = ( ) => {
    let params = {
        destinatario: campo_email.value,
        asunto: campo_asunto.value,
        mensaje: campo_mensaje.value
    }
    emailjs.send("service_6v2caxk","template_4g7o4xh", params)
}

// Funcionalidades antiguas (de la 1º entrega)

const activar_spinner=(e)=>{
    e.preventDefault()
    spinner.classList.remove('hidden')
    setTimeout(()=>{
        spinner.classList.add('hidden')
        resetear_formulario()

        // creamos un mensaje de toodo se ha enviado ok
        const mensaje_ok = document.createElement('p')
        mensaje_ok.classList.add('ok','bg-green-500', 'text-white', 'text-center', 'rounded-lg', 'mt-10', 'text-sm')
        mensaje_ok.textContent='Enviado con exito'
        formulario.appendChild(mensaje_ok)

        setTimeout(()=>{
            mensaje_ok.remove()
        }, 1500)

    }, 1500)

}

const resetear_formulario=()=>{
    objeto_email.email=''
    objeto_email.asunto=''
    objeto_email.mensaje=''
    formulario.reset()
}
const comprobar_objeto=() =>{
    const values = Object.values(objeto_email)
    if (values.includes('')){
        boton_submit.classList.add('opacity-50')
        boton_submit.disabled= true
        return
    }
    boton_submit.classList.remove('opacity-50')
    boton_submit.disabled= false

}
const limpiar_alerta = (referencia) => {
    const alerta = referencia.querySelector('.alerta')
    if (alerta) {
        alerta.remove()
    }
}
const mostrar_error=(error, referencia)=>{

    limpiar_alerta(referencia)
    const parrafo_error = document.createElement('p')
    parrafo_error.textContent = error
    //le añadimos estas clases ya creadas en css menos alerta que la añado yo
    parrafo_error.classList.add('alerta','bg-red-600', 'text-center', 'text-white', 'p-2')
    referencia.appendChild(parrafo_error)
}
const validar_email = (email) =>{
    const regex_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return email.match(regex_email)
}
const limpiar_html=(elemento)=>{
    while (elemento.firstElementChild){
        elemento.firstElementChild.remove()
    }
}
const validar = (e) =>{
    if (e.target.value.trim()===''){
        mostrar_error(`Campo ${e.target.id} es obligatorio`, e.target.parentElement)
        objeto_email[e.target.id] = ''
        return
    }
    if (e.target.id==='email' && !validar_email(e.target.value)) {
        mostrar_error('Email no válido', e.target.parentElement)
        objeto_email[e.target.id] = ''
        return
    }

    limpiar_alerta(e.target.parentElement)
    objeto_email[e.target.id] = e.target.value.trim().toLowerCase()
    comprobar_objeto(objeto_email)
}

// Eventos - Listeners

// Eventos de Index

if (window.location.pathname.includes('index.html')) {

    window.addEventListener('DOMContentLoaded', () =>{
        recuperar_id_historial()
    })

    campo_email.addEventListener('input', validar)
    campo_asunto.addEventListener('input', validar)
    campo_mensaje.addEventListener('input', validar)

    window.addEventListener('beforeunload', ()=>{
        almacenar_campos()
    })

    boton_submit.addEventListener('click', (e)=>{
        autoincremento++
        objeto_email.id_correo = autoincremento
        objeto_email.fecha = moment().format('Do MMM Y h:mm a')
        almacenar_localStorage('historial', objeto_email)
        activar_spinner(e)
        enviar_email_emailjs()

    })



    boton_reset.addEventListener('click', (e)=>{
        e.preventDefault()
        resetear_formulario()
        comprobar_objeto() //deshabilita el botoón enviar
        console.log(objeto_email)
        const alertas_mostradas=document.querySelectorAll('.alerta')

        for (let i=0; i<alertas_mostradas.length;i++){
            alertas_mostradas[i].remove()
        }

    })

    zona_arrastre.addEventListener('drop', (e) => {
        soltar(e)
    })

    zona_arrastre.addEventListener('dragover', (e) => {
        prevenir_default_arrastrar(e)
        frase_arrastre.style.display = 'none'
    })

    zona_arrastre.addEventListener('dragenter', cambiar_color)
    zona_arrastre.addEventListener('dragleave', (e) => {
        restaurar_color_original()
    })

}

// Eventos de Historial

if (window.location.pathname.includes('historial.html')) {
    mostrar_historial()
}
