import { Chromosome } from './chromosome.mjs';

// o populatie = o lista de mai multi cromozomi, mai multe teste
export class Population {
    tournamentSize = 3; // compara cate 3 deodata
    crossover;
    elitism; // o valoare sub care se sterge cromozomul, renuntam la el
    mutation;
    population = []; // lista de cromozomi
    maxSize;
    currentSize;
    quiz;

    // o populatie in cazul nostru = 1024 cromozomi
    // elitism = 0.1 - tot ce are fitness mai mic e eliminat
    constructor(quiz, size = 1024, crossover = 0.8, elitism = 0.1, mutation = 0.03) {
        this.quiz = quiz;
        this.crossover = crossover;
        this.elitism = elitism;
        this.mutation = mutation;
        this.maxSize = size;
        this.currentSize = size;

        // se initializeaza cei 1024 de cromozomi RANDOM
        while (size-- > 0) {
            const r = new Chromosome([], this.quiz).genRandom();
            this.population.push(r);
        }
        this.sortPopulation();
    }

    // sorteaza cei 1024 de cromozomi descrescator dupa fitness - cel mai bun este pe pozitia 0 mereu
    sortPopulation() {
        this.population = this.population.sort((a, b) => {
            return a.fitness - b.fitness;
        }).reverse();
    }

    // functia care alege cel mai bun cromozom din lista
    tournamentSelection() {
        const randdd = this.rand(0, this.currentSize - 1);
        let best = this.population[randdd];
        this.range(0, this.tournamentSize).forEach(i => {
            const cont = this.population[this.rand(0, this.currentSize - 1)];
            if (cont.fitness < best.fitness) {
                best = cont;
            }
        });
        return best;
    }

    // alege primii 2 cei mai buni din lista
    selectParents() {
        return [
            this.tournamentSelection(), this.tournamentSelection()
        ]
    }

    should(what) {
        return (this.rand(0, 1000) / 1000) < what;
    }

    // functie evolutie populatie cromozomi
    evolve() {
        let elite = this.maxSize * this.elitism;
        this.population = this.population.slice(0, elite); // selecteaza doar elita cromozomilor, ceilalti sunt stersi
        this.currentSize = this.population.length;
        while (this.currentSize < this.maxSize) { // ca sa inlocuim pe cei stersi, cat timp mai avem loc
            if (this.should(this.crossover)) {
                const [p1, p2] = this.selectParents(); // luam cei mai buni 2 cromozomi
                const children = p1.mate(p2); // ii imperechem
                children.forEach(c => {
                    this.population.push(
                        this.should(this.mutation) ? c.mutate() : c // daca este necesara si mutatia, o efectuam si adaugam noul element
                    );
                    this.currentSize++;
                });
                continue;
            }
            this.population.push(
                this.should(this.mutation) ? 
                    this.population[this.currentSize - 1].mutate() :
                    this.population[this.currentSize - 1]
            );
            this.currentSize++;
        }
        // sorteaza iar descrescator
        this.sortPopulation();
    }

    rand(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    range(size, startAt = 0) {
        return [...Array(size).keys()].map(i => i + startAt);
    }
}