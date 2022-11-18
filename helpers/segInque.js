const inquirer = require('inquirer');
const Tarea = require('../modelos/tarea');
require('colors');

let preguntas = [
    {
        type: 'list',
        name: 'opcion',
        massage: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green}Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.green}Listar tarea`
            },
            {
                value: '3',
                name: `${'3.'.green}Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green}Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green}Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green}Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.'.green}Salir`
            }
        ]
    }
];

const inquirerMenu = async() =>{

    console.clear();
    console.log('======================='.green);
    console.log(' Seleccione una opcion:'.green);
    console.log('=======================\n'.green);

    const {opcion} = await inquirer.prompt(preguntas);
    return opcion;

}

const pausa = async() =>{

    const questions = [
        {
           type: 'input',
           name: 'enter',
           message: `Presione ${'ENTER'.green} para continuar` 
        }
    ]
    await inquirer.prompt(questions);

}

const leerImput = async( message ) =>{

    const questions = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if( value.length === 0 ){
                    return 'Por favor ingrese un valor ';
                }
                return true;
            }
        }
    ]
    const { desc } = await inquirer.prompt(questions);
    return desc;   
}


const listadoTareasABorrar = async( tareas = []) =>{
    const choices = tareas.map((tarea, i) =>{
        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    })
    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'.green
    })
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices 
        }
    ]
    const {id} = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async( message ) =>{
    const questions = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const {ok} = await inquirer.prompt(questions);
    return ok;
}

const listadoCompletoCheckList = async( tareas = []) =>{
    const choices = tareas.map((tarea, i) =>{
        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    })

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecione',
            choices 
        }
    ]
    const {ids} = await inquirer.prompt(pregunta);
    return ids;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerImput,
    listadoTareasABorrar,
    confirmar,
    listadoCompletoCheckList
}







