import * as fs from 'fs';
import { Question } from './question.mjs';
export class Quiz {
    nQuestion;
    sumScore;
    types = [];
    avgDiff;
    chapters = []
    avgDist;
    sumTime;
    question = []

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