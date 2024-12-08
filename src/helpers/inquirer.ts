import colors from 'colors';
import inquirer, { Answers } from 'inquirer';
import { ListadoItem } from '../models/tareas';


const menuOptions: Answers = [
    {
        type: 'list',
        name: 'opt',
        message: " ¿Qué deseas hacer?\n",
        choices: [
            { value: "1", name: `${colors.blue("1")}. Crear una tarea` },
            { value: "2", name: `${colors.blue("2")}. Listar tareas` },
            { value: "3", name: `${colors.blue("3")}. Listar tareas completadas` },
            { value: "4", name: `${colors.blue("4")}. Listar tareas pendientes` },
            { value: "5", name: `${colors.blue("5")}. Completar tarea(s)` },
            { value: "6", name: `${colors.blue("6")}. Borrar tarea` },
            { value: "0", name: `${colors.blue("0")}. Salir` }
        ]
    }
]


export const inquirerMenu = async () => {

    console.clear();

    console.log(colors.dim("================================================="));
    console.log(colors.dim("============= Seleccione una opción ============="));
    console.log(colors.dim("=================================================\n"));

    const { opt } = await inquirer.prompt(menuOptions);

    return opt;
}

export const inquirerPause = async () => {

    console.log('\n');

    await inquirer.prompt([{
        type: 'input',
        name: 'enter',
        message: `Presione ${colors.red('ENTER')} para continuar ...`
    }])
}


export const leerInput = async (message: string) => {
    const question: Answers = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value: string) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question)
    return desc
}

export const listadoTareasBorrar = async (tareas: ListadoItem[] = []) => {
    const choices = tareas.map((t, i) => {
        return {
            value: t.id,
            name: `${colors.blue(i + 1 + '.')} ${t.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: `${colors.blue('0.')} Cancelar`
    });

    
    const menuOptions: Answers = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    const { id } = await inquirer.prompt(menuOptions);
    return id;
}

export const confirmar = async (menssage = '') => {
    const question: Answers = [
        {
            type: 'confirm',
            name: 'ok',
            menssage
        }
    ]
    const { ok } = await inquirer.prompt(question)
    return ok;
}



export const listadoTareasCompletar = async (tareas: ListadoItem[] = []) => {
    const choices = tareas.map((t, i) => {
        return {
            value: t.id,
            name: `${colors.blue(i + 1 + '.')} ${t.desc}`,
            checked: t.completed ? true : false
        }
    });

    // choices.unshift({
    //     value: '0',
    //     name: `${colors.blue('0.')} Cancelar`
    // });

    
    const menuOptions: Answers = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleciones',
            choices
        }
    ]
    const { ids } = await inquirer.prompt(menuOptions);
    return ids;
}


