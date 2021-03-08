//***************Módulo que va a realizar las diversas funciones del programa***************


//Requiero el módulo autos para tener el listado de los mismos.
let autos = require('./autos.js');


//Creo objeto que tendrá todas las posibles funciones.
let concesionaria = {
    autosConcesionaria: autos.leerJSON(),
    
    //Creo método para grabar información en el archivo de autos que se pueda usar en las funciones siguientes.
    grabarArchivo: function () {
        autos.grabarJSON(autosConcesionaria);
    },

    //Creo método para buscar auto en función de la patente recibida. Devuelve el auto o null.
    buscarAuto: function(patenteBuscada) {

        //Recorro el array de autos buscando coincidencias.
        let autoFiltrado = this.autosConcesionaria.filter((parametro) => {
            return parametro.patente == patenteBuscada;
        });

        //Si encuentro un auto el largo del vector será mayor a cero. En ese caso, lo devuelvo, sino retorno null.
        autoFiltrado = autoFiltrado.length > 0 ? autoFiltrado[0]: null;
        return autoFiltrado;        
    },

    //Creo método para "vender" auto en función de la patente recibida. Si lo encuentra, lo marca como vendido. Sino, avisa que ese auto no existe.
    venderAuto: function(patenteBuscada) {
        let autoALaVenta = this.buscarAuto(patenteBuscada); //Busco el auto a partir de la patente con el método ya hecho.
        
        //Defino qué hacer en función del resultado de la búsqueda de la patente.
        autoALaVenta == null ? 'No existe el auto buscado': autoALaVenta.vendido = true;
        return autoALaVenta;
    },

    //Creo método para saber qué autos están disponibles para la venta.
    autosParaLaVenta: function () {
        let autosDisponibles = autos.filter((parametro) => {
            return parametro.vendido == false;
        });
        return autosDisponibles;
    },

    //Creo método para saber qué autos a la venta son considerados "0 km" (que tengan menos de 100 km).
    autosNuevos: function () {
        
        //Busco los autos disponibles para la venta.
        let autoALaVenta = this.autosParaLaVenta();

        //filtro por los que sean "0 km".
        let autos0Km = autoALaVenta.filter((parametro) => {
            return parametro.km < 100;
        });
        return autos0Km;
    },

    //Creo método para saber el precio de venta de todos los autos vendidos
    listaDeVentas: function () {

        //Primero busco todos los autos vendidos.
        let autosVendidos = autos.filter ((parametro) => {
            return parametro.vendido == true;
        });

        //Luego me quedo solo con los precios de cada uno.
        let importeVentas = autosVendidos.map((parametro) => {
            return parametro.precio;
        });
        return importeVentas;
    },

    //Creo método para saber el total de ventas al momento.
    totalDeVentas: function () {

        //Primero tomo la lista del precio de venta de todos los autos vendidos.
        let importeVentas = this.listaDeVentas();
        if (importeVentas[0] == undefined) {
            return 0;
        }

        //Sobre ese listado, sumo todo.
        let ventasTotales = importeVentas.reduce((acumulador, parametro) => {
            return acumulador + parametro;
        });
        return ventasTotales;        
    },

    //Creo un método para saber si un cliente puede comprar un auto o no a partir de información cargada por pantalla.
    puedeComprar: function (auto, persona) {

        //Busco el auto solicitado
        let autoSolicitado = this.buscarAuto(auto);

        //El precio debe ser menor la capacidad de pago de la persona, y el precio de la cuota debe ser menor a la capacidad de pago en cuotas.
        let resultado = (autoSolicitado.precio <= persona.capacidadDePagoTotal && (autoSolicitado.precio/autoSolicitado.cuotas) <= persona.capacidadDePagoEnCuotas) ? true: false;
        return resultado;        
    },

    //Creo un método para saber qué autos puede comprar una persona a partir de información cargada por pantalla.
    autosQuePuedeComprar: function (persona) {

        //Busco los autos a la venta.
        let autoALaVenta = this.autosParaLaVenta();        
        let autosComprables = [];

        //Entre los autos a la venta, veo cuáles puede comprar la persona indicada.
        for (i=0; i<autoALaVenta.length; i++) {
            if (this.puedeComprar(autoALaVenta[i], persona) == true) {
                autosComprables.push(autoALaVenta[i]);
            }
        }
        return autosComprables;
    },
}


let persona = {
    nombre: 'Juan',
    capacidadDePagoEnCuotas: 21000,
    capacidadDePagoTotal: 200000,
    }


//console.log(concesionaria.autos);
//console.log(concesionaria.buscarAuto('AAA111'));
//console.log(concesionaria.venderAuto('GGG444'));
//console.log(concesionaria.puedeComprar('GGG444',persona));
console.log(concesionaria.autosQuePuedeComprar(persona));
