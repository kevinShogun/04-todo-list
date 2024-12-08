import { Tarea } from "./tarea";
import colors from "colors";

/**
 * _listddo :
 *      { uuid-45154654: { id: maxLength, desc: asd, completed: 56151651 } }
 */

export type ListadoItem = {
    id: string;
    desc: string;
    completed: string | null;
};

type Listado = {
    [x: string]: ListadoItem;
};

export class Tareas {
    _listado: Listado = {};

    get listadoArr() {
        const listado: ListadoItem[] = [];

        Object.keys(this._listado).forEach((key) => {
            listado.push(this._listado[key]);
        });
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    crearTarea(desc = "") {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = { ...tarea };
    }

    cargatTareasFromArray(tareas: ListadoItem[] = []) {
        tareas.forEach((t) => {
            this._listado[t.id] = { ...t };
        });
    }

    borrarTarea(id = '') {

        if (this._listado[id]) {
            delete this._listado[id];

        }

    }


    listadoCompleto() {
        console.log();

        Object.keys(this._listado).forEach((key, index) =>
            console.log(
                `${colors.dim((index + 1).toString())}. ${this._listado[key].desc
                } ${spacesRequired(
                    this._listado[key].desc.length,
                    this.listadoArr,
                    " "
                )} :: ${this._listado[key].completed
                    ? `${colors.green("Completada")}`
                    : `${colors.red("Pendiente")}`
                }`
            )
        );
    }

    listarPendientesCompletadas(completadas = true) {

    

        const filterArray = this.listadoArr.filter((i) =>
            completadas ? i.completed !== null : i.completed === null
        );

        let maxLength = 0;

        filterArray.forEach((item) => {
            if (item.desc.length > maxLength) {
                maxLength = item.desc.length;
            }
        });

        console.log(
            `┌───────────────────${spacesRequired(0, filterArray, "─")}┐`
                .bold
        );
        console.log(
            `│             Tareas${spacesRequired(0, filterArray, " ")}│`
                .bold
        );
        console.log(
            `├───────────────┬───${spacesRequired(0, filterArray, "─")}┤`
                .bold
        );
        console.log(
            `│   ${!completadas ? "Estado" : "Fecha "
                }      │        Descripción${spacesRequired(16, filterArray, " ")}│`.bold
        );
        console.log(
            `├───────────────┼───${spacesRequired(0, filterArray, "─")}┤`
                .bold
        );

        filterArray.forEach((item) => {
            const status = item.completed
                ? `${colors.green(
                    dateFormater(item.completed)
                )} ${dateFormater(item.completed).length >= 11 ? " " : "  "}`
                : `${colors.red("✘  Pendiente ")}`;
            console.log(
                `│ ${status} │  ${item.desc} ${spacesRequired(
                    item.desc.length,
                    filterArray,
                    " "
                )}│`
            );
        });
        console.log(
            `└───────────────┴──${spacesRequired(0, filterArray, "─")}─┘`
                .bold
        );
    }



    toggleCompletadas(ids: string[] = []) {

        ids.forEach(id => {

            const tarea = this._listado[id];
            
            if (!tarea.completed) {

                this._listado[id].completed = new Date().toISOString();
            }

        })

        this.listadoArr.forEach(t => {

            if (!ids.includes(t.id)) {
                this._listado[t.id].completed = null
            }
        })
    }
}

function spacesRequired(
    fieldLength: number,
    listadoArr: ListadoItem[],
    character: string
) {
    let maxLength = 12;

    listadoArr.forEach((item) => {
        if (item.desc.length > maxLength) {
            maxLength = item.desc.length;
        }
    });

    const spaces = maxLength - fieldLength;
    let spCharacter = "";
    Array.from({ length: spaces }, (_) => (spCharacter += character));
    return spCharacter;
}


function dateFormater (date: string = '') {

    const currentDate = new Date(date);

    const datef =
    new Intl.DateTimeFormat('es-US', {
        dateStyle: 'medium'
    })

    return datef.format(currentDate);
}