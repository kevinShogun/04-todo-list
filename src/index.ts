import { confirmar, inquirerMenu, inquirerPause, leerInput, listadoTareasBorrar, listadoTareasCompletar } from "./helpers/inquirer";
import { readFile, saveDB } from "./helpers/saveFile";
import { Tareas } from "./models/tareas";

async function Main() {
    console.clear();

    let opt = ''
    const tareas = new Tareas();
    const tareasDB = readFile();
    await inquirerPause();

    if (tareasDB) {
        tareas.cargatTareasFromArray(tareasDB);
    }

    do {
        opt = await inquirerMenu()

        switch (opt) {
            case '1':
                // crear opcion
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
                break;

            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletadas()
                break;

            case '4':
                tareas.listarPendientesCompletadas(false)
                break;

            case '5':
                const ids = await listadoTareasCompletar(tareas.listadoArr);

                tareas.toggleCompletadas(ids);
                break;

            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const ok = await confirmar('¿Éstas seguro?')
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('\nTarea Borrada!')
                    }
                }
                break;
        }

        saveDB(tareas.listadoArr);

        await inquirerPause();

    } while (opt !== '0');
}

Main();