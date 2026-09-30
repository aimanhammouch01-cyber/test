/*
 * script for chat page controller
 */
import { Mensaje } from './Mensaje.js';

/** array de mensajes */
var mensajes = new Array();

/**
 * esta funcion muestra todos los mensajes del parametro
 * en una página en forma de texto dentro de un Contenedor DIV
 * @param {Array} mensajes La coleccion de mensajes a mostrar
 * @returns {undefined} Undefined
 */
function actualizarMensajes() {
    // Ordenamos una copia por fecha, de más reciente a más antiguo
    // (usamos slice() para no mutar el array original en cada llamada)
    mensajes.reverse();
    const listMsgs = document.getElementById("msgsList");
    while(listMsgs.firstChild){
        listMsgs.removeChild(listMsgs.firstChild);
    }
    let ordenados = mensajes.slice().sort((a, b) => b.fecha - a.fecha);

    let lista = document.getElementById("msgList");
    lista.innerHTML = ""; // limpiamos antes de repintar

    // Recorremos la coleccion de mensajes
    for (let i = 0; i < ordenados.length; i++) {
        // En cada iteración añadimos al elemento <UL> contenido
        // consistente en el texto del mensaje, dentro de un elemento <LI>
        const newLi = document.createElement("li");
        const newContent = document.createTextNode(mensajes[i].text);
        newLi.appendChild(newContent);
        
        listMsgs.body.insertBefore(newLi, null);
        
       
    }
}

/**
 * Esta es la funcion que recoge el mensaje que quiere enviar el usuario
 * y lo envia a la lista de mensajes
 * @returns {undefined}
 */
function enviarMensaje() {
    // Obtenemos el mensaje
    let textoMensaje = document.getElementById('msgText').value;
    // Lo metemos en la coleccion de mensajes
    mensajes.push(new Mensaje(textoMensaje, new Date()));
    document.getElementById("msgText").value = "";
    document.getElementById("msgText").focus();
    actualizarMensajes(mensajes);
}

// Asocio la funcion actualizarMensajes como manejadora del evento de carga del
// DOM de la pagina
document.addEventListener('DOMContentLoaded', () => actualizarMensajes(mensajes));

// Asocio la funcion enviarMensaje como manejadora del evento click del
// elemento sendButton
document.getElementById('sendButton').addEventListener('click', enviarMensaje);