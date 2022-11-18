const Tarea = require('./tarea');

class Tareas {
                                                //el get estudiarlo en javascript
    get listadoArr(){                            //Puedo extraer cada unas de las llaves que se
        const listado = [];                      //encuentren en _listado
        Object.keys(this._listado).forEach(key =>{
            const tarea = this._listado[key]
            listado.push(tarea)                  //inserto la tarea en el listado
        })                    
        return listado;                    
    }

    //ADENTRO DE LAS CLASES SON TODOS METODOS (NO FUNCIONES)
    //POR LO TANTO NO PUEDEN SER FUNCIONES FLECHA. LAS LLAMO CON UN PUNTO POR LO GENERAL
    constructor(desc){
        this._listado = {};
    }


    borrarTarea(id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }


    cargarTareasFromArray( tareas = [] ){
        tareas.forEach(tarea  =>{
            this._listado[tarea.id] = tarea
        })
    } 


    crearTarea( desc ){
        const tarea = new Tarea( desc );
        this._listado[tarea.id] = tarea;
    }


    listadoCompleto(){
        console.log();
        this.listadoArr.forEach((tarea, i) =>{
            const idx = i + 1;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)
                                ? 'completada'.green
                                : 'pendiente'.red;
            console.log(`${idx} ${desc} :: ${estado}`)
        })
    }


    listarPendientesCompletadas( completada = true ) {
        console.log();
        let contador = 0;
        this.listadoArr.forEach((tarea) =>{
           
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)
                                ? 'completada'.green
                                : 'pendiente'.red;
            if (completada){
                if(completadoEn){
                    contador += 1;
                    console.log(`${contador.toString().green}. ${desc} :: ${completadoEn.green}.`);
                }
            }else {
                if( !completadoEn ){
                    contador += 1;
                    console.log(`${contador.toString().green}. ${desc} :: ${estado}`);
                }
            }
        })
    }
    
    
    toogleCompletadas( ids = [] ){
        ids.forEach( id =>{
            const tarea = this._listado[id];
            if( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString()
            }
        })
        this.listadoArr.forEach( tarea => {
            if( !ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}


module.exports = Tareas;
