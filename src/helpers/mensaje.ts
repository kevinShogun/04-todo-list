import colors from 'colors';
import * as readline from 'readline';

export const mostrarMenu = () => {
    return new Promise<string>(resolve => {
        console.clear();
        console.log(colors.dim("================================================="));
        console.log(colors.dim("============= Seleccione una opción ============="));
        console.log(colors.dim("=================================================\n"));

        console.log(`${colors.yellow('1.')} Crear una tarea`);
        console.log(`${colors.yellow('2.')} Listar tareas`);
        console.log(`${colors.yellow('3.')} Listar tareas completadas`);
        console.log(`${colors.yellow('4.')} Listar tareas pendientes`);
        console.log(`${colors.yellow('5.')} Completar tarea(s)`);
        console.log(`${colors.yellow('6.')} Borrar tarea`);
        console.log(`${colors.yellow('0.')} Salir \n`);


        const readLine: readline.Interface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readLine.question('Seleccione una opción: ', (opt: string) => {
            readLine.close();
            resolve(opt);
        })
    })
}

export const pausa = () => {
    return new Promise<void>(resolve => {

        const readLine: readline.Interface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readLine.question(`Presione ${colors.red('ENTER')} para continuar ...\n`, (_opt: string) => {
            readLine.close();
            resolve()
        })
    })

}