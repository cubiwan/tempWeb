function juego(){
    const ID = 0;
    const NIVEL = 1;
    const HABILITADA = 1;
    const TEXTO = 3;

    const RESPUESTA1 = 4
    const RESPUESTA2 = 8

    const R1_INHABILITA = 5
    const R1_HABILITA = 6
    const R1_SALTA = 7

    const R2_INHABILITA = 9
    const R2_HABILITA = 10
    const R2_SALTA = 11

    const R1_REPUTACION = 12
    const R1_VISITANTES = 13
    const R1_ATRACCIONES = 14
    const R1_TRABAJADORES = 15
    const R1_SERVICIOS = 16

    const R2_REPUTACION = 17
    const R2_VISITANTES = 18
    const R2_ATRACCIONES = 19
    const R2_TRABAJADORES = 20
    const R2_SERVICIOS = 21

    const PROFESION = 22
    const PERSONAJE = 23

    const INHABILITA = [R1_INHABILITA, R2_INHABILITA];
    const HABILITA = [R1_HABILITA, R2_HABILITA];
    const SALTA = [R1_SALTA, R2_SALTA];

    const REPUTACION = [R1_REPUTACION, R2_REPUTACION];
    const VISITANTES = [R1_VISITANTES, R2_VISITANTES];
    const ATRACCIONES = [R1_ATRACCIONES, R2_ATRACCIONES];
    const TRABAJADORES = [R1_TRABAJADORES, R2_TRABAJADORES];
    const SERVICIOS = [R1_SERVICIOS, R2_SERVICIOS];

    var partida = {};  
    partida.mazo = [];//ids cartas en juego
    partida.descartes = [];//ids cartas en juego ya usadas durante la partida
    partida.reputacion = 0;
    partida.visitantes = 0;
    partida.atracciones = 0;
    partida.trabajadores = 0;
    partida.servicios = 0;
    partida.nivel = 0;

    var mazo = [];//cartas actuales en la partida
    var descartes = [];
    var nivel = 1;

    this.generarMazo = function(){
        for(var id = 0; id < baraja.length; ++id){
            var carta = baraja[id];
            if(carta[HABILITADA] == 0){ //carta deshabilitada
                continue;
            }
            if(carta[nivel].indexOf(nivel) == -1){ //carta en el nivel actual
                continue;
            }
            mazo.push(id);
        }
        console.log(mazo);
    }

    this.sacarCarta = function(){
        var idCarta = mazo[Math.floor(Math.random()*mazo.length)];
        var carta = baraja[idCarta]
        return arrayToCard(carta);
    }

    function arrayToCard(item){
        var card = {
            id: item[ID],
            image: generateImageName(item[PERSONAJE]),
            name: item[PROFESION],
            subname: item[PERSONAJE],
            icon: 'fas fa-wrench',
            message: item[TEXTO],
            buttonLeftText: item[RESPUESTA1],
            buttonRightText: item[RESPUESTA2]
        }

        return card;
    }

    function generateImageName(name){
        return name.trim().replace(" ", "_")+".svg";
    }

    function eliminarDelMazo(id) {
        mazo = mazo.filter(function(idCarta){
            return idCarta != id;
        });
    }

    function habilitarCarta(id) {
        var carta = baraja[id];
        if(carta[HABILITADA] == 1){ //carta ya habilitada
            return;
        }
        
        carta[HABILITADA] = 1; //habilitar carta

        if(carta[nivel].indexOf(nivel) == -1){ //carta en el nivel actual
            return;
        }

        mazo = mazo.push(id); //añadir carta al mazo actual
    }

    function descartar(id){
        if(baraja[id][HABILITADA] == 1){
            descartes.push(id);
        }
        eliminarDelMazo(id)
    }

    function limpiarMazo(){
        var mazoLimpio = [];
        for(var i = 0; i < mazo.length; ++i){
            var carta = baraja[mazo[i]];
            if(carta[HABILITADA] == 0){ //carta deshabilitada
                continue;
            }
            if(carta[nivel].indexOf(nivel) == -1){ //carta en el nivel actual
                continue;
            }
            mazoLimpio.push(carta[ID]);
        }
        mazo = mazoLimpio;
    }

    /*generarMazo();
    elegirCarta();
    jugar();
    descartar();
    limpiarMazo();
    verificarPartida();*/

    this.jugarCarta = function(id, opcion){ //idCarta opcion [0, 1]
        var carta = baraja[id];
        return {
            reputacion: carta[REPUTACION[opcion]],
            visitantes: carta[VISITANTES[opcion]],
            atracciones: carta[ATRACCIONES[opcion]],
            trabajadores: carta[TRABAJADORES[opcion]],
            servicios: carta[SERVICIOS[opcion]]
        }
    //const INHABILITA = [R1_INHABILITA, R2_INHABILITA];
    //const HABILITA = [R1_HABILITA, R2_HABILITA];
    //const SALTA = [R1_SALTA, R2_SALTA];
    }


    var baraja = [
        [1          ,"1,2,3"     ,1            ,"Construir un hotel ayudaría al crecimiento del parque"                                      ,"No es el momento"                    ,0                             ,0                               ,0                           ,"Tienes razón"                                 ,0                             ,0                               ,0                           ,0             ,-20           ,0              ,10              ,0            ,5             ,10            ,0              ,-10             ,20           ,"Jefa Atención al Cliente"  ,"Mary Pioppins"],
        [2          ,"1,2,3"     ,1            ,"Los visitantes se mueren de calor en el parque"                                             ,"Poner fuentes gratuitas"             ,0                             ,0                               ,0                           ,"Regalar sombrillas"                           ,0                             ,0                               ,0                           ,5             ,10            ,0              ,0               ,10           ,0             ,10            ,0              ,-10             ,0            ,"Jefa Atención al Cliente"  ,"Mary Pioppins"],
        [3          ,"1,2,3"     ,1            ,"A los clientes les gustaría que hubiera payasos"                                            ,"Que lo hagan los becarios"           ,115                           ,0                               ,0                           ,"Contratar profesionales"                      ,0                             ,0                               ,0                           ,0             ,10            ,0              ,-10             ,0            ,5             ,10            ,0              ,10              ,0            ,"Jefa Atención al Cliente"  ,"Mary Pioppins"],
        [4          ,"1,2,3"     ,1            ,"La gente se acumula en la fila de las atracciones"                                          ,"Construir más atracciones"           ,0                             ,0                               ,0                           ,"Contratad mas empleados"                      ,0                             ,0                               ,0                           ,5             ,10            ,20             ,-10             ,0            ,5             ,10            ,-20            ,20              ,0            ,"Jefa Atención al Cliente"  ,"Mary Pioppins"],
        [5          ,"1,2,3"     ,1            ,"Los clientes se quejan de la calidad de la comida"                                          ,"Añadid más perro"                    ,0                             ,0                               ,0                           ,"Contratad a un chef"                          ,0                             ,0                               ,0                           ,0             ,-10           ,0              ,0               ,-20          ,5             ,10            ,0              ,10              ,10           ,"Jefa Atención al Cliente"  ,"Mary Pioppins"],
        [6          ,"1,2,3"     ,1            ,"Hay poca gente en temporada baja. Necesitamos poner descuentos"                             ,"No es para tanto"                    ,0                             ,0                               ,0                           ,"Está bien"                                    ,0                             ,0                               ,0                           ,0             ,-20           ,0              ,10              ,0            ,0             ,10            ,0              ,-10             ,0            ,"Jefa Atención al Cliente"  ,"Mary Pioppins"],
        [7          ,"1,2,3"     ,1            ,"¿y si ponemos un hilo musical en todo el parque?"                                           ,"Buena idea"                          ,0                             ,0                               ,0                           ,"Que los empleados canten"                     ,0                             ,0                               ,0                           ,5             ,-10           ,0              ,0               ,0            ,0             ,-10           ,0              ,0               ,0            ,"Jefa Atención al Cliente"  ,"Mary Pioppins"],
        [8          ,"1,2,3"     ,1            ,"Parece que hay pocos baños"                                                                 ,"Hay arboles"                         ,0                             ,0                               ,0                           ,"Construid algunos"                            ,0                             ,0                               ,0                           ,0             ,-10           ,0              ,10              ,-20          ,5             ,10            ,0              ,-10             ,10           ,"Jefa Atención al Cliente"  ,"Mary Pioppins"],
        [9          ,"1,2,3"     ,1            ,"Es verano y no hay hielo para los refrescos"                                                ,"Vended bebidas calientes"            ,0                             ,0                               ,0                           ,"Haced más hielo"                              ,0                             ,0                               ,0                           ,5             ,-20           ,0              ,0               ,0            ,0             ,10            ,0              ,-10             ,0            ,"Jefa Atención al Cliente"  ,"Mary Pioppins"],
        [10         ,"1,2,3"     ,1            ,"Necesitamos mas personal para atender las quejas"                                           ,"Trabajad más horas"                  ,0                             ,0                               ,0                           ,"No hay necesidad"                             ,0                             ,0                               ,0                           ,0             ,0             ,0              ,-10             ,10           ,0             ,-10           ,0              ,10              ,-20          ,"Jefa Atención al Cliente"  ,"Mary Pioppins"],
        [11         ,"1,2,3"     ,1            ,"La entrada al parque parece demasiado cara. "                                               ,"Bajad los precios"                   ,0                             ,0                               ,0                           ,"Así están bien"                               ,0                             ,0                               ,0                           ,0             ,10            ,0              ,-10             ,0            ,0             ,-10           ,0              ,10              ,0            ,"Jefa Atención al Cliente"  ,"Mary Pioppins"],
        [12         ,"1,2,3"     ,1            ,"Deberíamos dedicar más esfuerzo al mantenimiento de las atracciones"                        ,"No veo porqué"                       ,0                             ,0                               ,0                           ,"Tienes razón"                                 ,0                             ,0                               ,0                           ,0             ,0             ,-20            ,10              ,0            ,5             ,0             ,10             ,-10             ,0            ,"Ingeniero Jefe"            ,"Peter Smith"],
        [13         ,"1,2,3"     ,1            ,"Nuestras atracciones necesitan modernizarse"                                                ,"Siempre gastando"                    ,0                             ,0                               ,0                           ,"Adelante"                                     ,0                             ,0                               ,0                           ,0             ,-20           ,-10            ,10              ,0            ,5             ,10            ,20             ,-20             ,0            ,"Ingeniero Jefe"            ,"Peter Smith"],
        [14         ,"1,2,3"     ,1            ,"Creo que el tiovivo va demasiado lento"                                                     ,"Que vaya mas deprisa"                ,0                             ,0                               ,0                           ,"Normal, es para niños"                        ,0                             ,0                               ,0                           ,0             ,0             ,-10            ,0               ,0            ,0             ,20            ,0              ,0               ,0            ,"Ingeniero Jefe"            ,"Peter Smith"],
        [15         ,"1,2,3"     ,1            ,"Cobro lo mismo que los de la limpieza"                                                      ,"La vida es dura"                     ,0                             ,0                               ,0                           ,"Te mereces un aumento"                        ,0                             ,0                               ,0                           ,0             ,0             ,-10            ,0               ,0            ,0             ,0             ,10             ,-20             ,0            ,"Ingeniero Jefe"            ,"Peter Smith"],
        [16         ,"1,2,3"     ,1            ,"Han construido la nueva entrada del parque encima de mi plaza de parking"                   ,"Ven en bus"                          ,0                             ,0                               ,0                           ,"Tu parking es lo primero"                     ,0                             ,0                               ,0                           ,0             ,20            ,-20            ,0               ,0            ,0             ,-30           ,10             ,0               ,0            ,"Ingeniero Jefe"            ,"Peter Smith"],
        [17         ,"1,2,3"     ,1            ,"Los robots no se quejan ¿usamos robots en vez de trabajadores?"                             ,"Buena idea"                          ,0                             ,0                               ,0                           ,"Jamás"                                        ,0                             ,0                               ,0                           ,5             ,0             ,0              ,-20             ,10           ,0             ,0             ,0              ,10              ,-10          ,"Ingeniero Jefe"            ,"Peter Smith"],
        [18         ,"1,2,3"     ,1            ,"Podríamos poner escaleras mecánicas"                                                        ,"Andar es saludable"                  ,0                             ,0                               ,0                           ,"A construir"                                  ,0                             ,0                               ,0                           ,0             ,-10           ,0              ,0               ,-10          ,5             ,10            ,0              ,0               ,20           ,"Ingeniero Jefe"            ,"Peter Smith"],
        [19         ,"1,2,3"     ,1            ,"Tenemos un becario sujetando una pieza rota de la noria"                                    ,"Arreglad la noria"                   ,0                             ,0                               ,0                           ,"Parad la noria"                               ,0                             ,0                               ,0                           ,5             ,10            ,10             ,20              ,0            ,0             ,-10           ,-10            ,0               ,0            ,"Ingeniero Jefe"            ,"Peter Smith"],
        [20         ,"1,2,3"     ,1            ,"Los robots se rompen ¿usamos becarios en vez de robots?"                                    ,"Buena idea"                          ,116                           ,0                               ,0                           ,"Jamás"                                        ,0                             ,0                               ,0                           ,0             ,0             ,0              ,-10             ,10           ,0             ,0             ,0              ,20              ,-10          ,"Ingeniero Jefe"            ,"Peter Smith"]
    ];



}