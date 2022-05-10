import * as fs from 'fs';
import { Question } from './question.mjs';
export class Quiz {
    nQuestion; //nr total de intrebari
    sumScore; // scor maxim
    types = []; // tipuri active de intrebari
    avgDiff; // diferenta medie de dificultate intre intrebari
    chapters = [] // capitole active
    avgDist;
    sumTime; // timp maxim al testului
    question = [] // lista completa de intrebari din fisier

    // functie care incarca intrebarile din fisier
    load(filename) {
        const allFileContents = fs.readFileSync(filename, 'utf-8');
        allFileContents.split(/\r?\n/).forEach(line => {
            const a = line.split(' ');
            this.question.push(new Question(
                +a[0],
                +a[1],
                a[2],
                +a[3],
                a[4],
                +a[5],
                +a[6]
            ));
        });
    }
}