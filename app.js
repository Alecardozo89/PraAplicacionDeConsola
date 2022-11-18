const { guardarArchi, leerBD } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerImput, listadoTareasABorrar, confirmar, listadoCompletoCheckList } = require('./helpers/segInque');
const Tareas = require('./modelos/tareas');
require('colors');


console.clear();

const main = async() =>{

    let opt = ''; //Creo una variale llamada opcion
    const tareas = new Tareas(); //Luego la llamare para crear la tarea
    
    const tareasBD = leerBD()
        if ( tareasBD ){
            tareas.cargarTareasFromArray(tareasBD);
        }
        
    
    do {
        opt = await inquirerMenu(); //Imprimo el menu y retorno una opcion

        switch ( opt ) {
            case '1':
                const desc = await leerImput('Descripción:');
                tareas.crearTarea(desc); // Creo la tarea, para luego listarla
            break;
        
            case '2':
                tareas.listadoCompleto();
                //console.log(tareas.listadoArr); //Listando las tareas
            break;

            case '3':
                tareas.listarPendientesCompletadas(true);
            break; 
            
            case '4':
                tareas.listarPendientesCompletadas(false);
            break;
            
            case '5':
                const ids = await listadoCompletoCheckList(tareas.listadoArr);
                tareas.toogleCompletadas(ids);
            break;
            
            case '6':
                const id = await listadoTareasABorrar(tareas.listadoArr);
                if( id !== '0' ){
                    const ok = await confirmar('Esta seguro que desea borrar');
                    if( ok ){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada correctamente');
                    }
                }
                
            break;
        }

        guardarArchi(tareas.listadoArr);

        console.log('\n');
        await pausa();
        

    }while (opt !== '0');


}

main();











