import { v4 as uuidv4 } from 'uuid';

export class Tarea {
    id = '';
    desc = '';
    completed = null;

    constructor(desc: string) {
        this.id = uuidv4();
        this.desc = desc;
    }
}