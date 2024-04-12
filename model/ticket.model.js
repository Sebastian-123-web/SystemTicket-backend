/* 
🏁estado *
✔️Titulo *
🏁fecha credo *
✔️importancia *
✔️descripcion *
✔️anydesk *
✔️dispositivo *
✔️imagen *
✔️correo
🏁fecha cerrado *

ACTIVIDADES
nuevo ticket
    fecha hora
    comentario
*/

const connection = require('../config/database_config')

class Ticket {
    constructor(ticket_status,ticket_title,ticket_description,ticket_important,ticket_anydesk,ticket_device,ticket_creationdate,ticket_closedate) {
        this.ticket_status = ticket_status
        this.ticket_title = ticket_title
        this.ticket_description = ticket_description
        this.ticket_important = ticket_important
        this.ticket_anydesk = ticket_anydesk
        this.ticket_device = ticket_device
        this.ticket_creationdate = ticket_creationdate
        this.ticket_closedate = ticket_closedate
    }

    static getAllTicket(){
        
    }
}