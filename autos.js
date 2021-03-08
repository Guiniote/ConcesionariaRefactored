//***************Módulo que va a trabajar con el archivo***************

//Primero declaro fs para poder utilizar los métodos de manipulación de archivos
const fs = require('fs');


//Defino un objeto para poder realizar las acciones sobre el archivo.
let autos = {
    //Declaro el nombre del archivo a leer.
    archivo: 'autos.json',

    //Creo un métodoa mi objeto para poder leer el archivo de autos.
    leerJSON: function () { 
        return JSON.parse(fs.readFileSync(this.archivo, 'utf-8'));
    },
    grabarJSON: function (autosConcesionaria) {
        return fs.writeFileSync(this.archivo, JSON.stringify(autosConcesionaria));
    }
}
    

//Exporto el objeto para poder utilizarlo en otros módulos.
module.exports = autos;

