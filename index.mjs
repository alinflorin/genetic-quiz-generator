import { Population } from './population.mjs';
import { Quiz } from './quiz.mjs';

// Main

const filename = 'input.txt'; // baza de date cu intrebarile

// initializam obiectul quiz care contine toate intrebarile
const quiz = new Quiz();
quiz.load(filename); // incarcam intrebarile din fisier

quiz.nQuestion = 0;

// Configurare test
quiz.sumScore = 100; // scorul maxim al unui test


// tipurile de intrebari active
quiz.types = [];
quiz.types['multichoice'] = 5;
quiz.types['truefalse'] = 5;
// quiz.types['essay'] = 2;

// total 10 intrebari - 5 t/f 5 multi choice

Object.keys(quiz.types).forEach((key) => {
    const value = quiz.types[key];
    quiz.nQuestion += value; // adauga la nr total de intrebari
});

quiz.avgDiff = 0.5; // diferenta de dificultate maxima intre intrebari


// capitolele active si rata de aparitie
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
quiz.sumTime = 30; // timp maxim de rezolvare a testului - aici 30 minute


const p = new Population(quiz); // initializare populatie cromozomi
for (let x = 1; x <= 512; x++) { // 512 pasi - 512 generatii
    const best = [...p.population][0];
    console.log(`Generation ${x}: ${best.fitness}`); // fitness = cat de bun este un cromozom, adica o solutie
    if (best.fitness === 0) {
        console.error('Unable to find the best match');
        process.exit(-1);
    }
    p.evolve(); // generatia curenta evolueaza / se muteaza
}

console.log(p.population[0].gene); // la final se ia cromozomul de pe pozitia 0, pt ca sunt sortati dupa fitness descrescator
// gena = lista de intrebari din cromozom
// poz 0 = cel mai bun, cel mai fit