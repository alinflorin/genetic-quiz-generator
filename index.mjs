import { Population } from './population.mjs';
import { Quiz } from './quiz.mjs';

const filename = 'input.txt';
const quiz = new Quiz();
quiz.load(filename);
quiz.nQuestion = 0;
quiz.sumScore = 100;
quiz.types = [];
quiz.types['multichoice'] = 5;
quiz.types['essay'] = 5;
Object.keys(quiz.types).forEach((key) => {
    const value = quiz.types[key];
    quiz.nQuestion += value;
});
quiz.avgDiff = 0.5;

quiz.chapters = [];
quiz.chapters['Induksi'] = 1;
quiz.chapters['Fungsi'] = 1;
quiz.chapters['Kombinatorial'] = 2;
quiz.chapters['Rekurensi'] = 1;
quiz.chapters['Graf'] = 1;
quiz.chapters['Pohon'] = 1;
quiz.chapters['Kompleksitas'] = 2;
quiz.chapters['Boolean'] = 1;

quiz.avgDist = 0.5;
quiz.sumTime = 120;


const p = new Population(quiz);
for (let x = 1; x <= 512; x++) {
    const best = [...p.population][0];
    console.log(`Generation ${x}: ${best.fitness}`);
    if (best.fitness === 0) {
        console.error('Unable to find the best match');
        process.exit(-1);
    }
    p.evolve();
}

console.log(p.population[0].gene);