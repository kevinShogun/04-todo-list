
import fs from 'fs'
import { ListadoItem } from '../models/tareas';
const file = "./src/db/data.json";

export const saveDB = (data: ListadoItem[]) => {
    fs.writeFileSync(file, JSON.stringify(data))
}

export const readFile = () => {
    if(!fs.existsSync(file)){
        return null;
    }

    const info = fs.readFileSync(file, { encoding: 'utf-8' });
    const data:ListadoItem[] = JSON.parse(info)
    
    return data;
    
}