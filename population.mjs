import { Chromosome } from './chromosome.mjs';

export class Population {
    tournamentSize = 3;
    crossover;
    elitism;
    mutation;
    population = [];
    maxSize;
    currentSize;
    quiz;

    constructor(quiz, size = 1024, crossover = 0.8, elitism = 0.1, mutation = 0.03) {
        this.quiz = quiz;
        this.crossover = crossover;
        this.elitism = elitism;
        this.mutation = mutation;
        this.maxSize = size;
        this.currentSize = size;

        while (size-- > 0) {
            const r = new Chromosome([], this.quiz).genRandom();
            this.population.push(r);
        }
        this.sortPopulation();
    }

    sortPopulation() {
        this.population = this.population.sort((a, b) => {
            return a.fitness - b.fitness;
        }).reverse();
    }

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

    selectParents() {
        return [
            this.tournamentSelection(), this.tournamentSelection()
        ]
    }

    should(what) {
        return (this.rand(0, 1000) / 1000) < what;
    }

    evolve() {
        let elite = this.maxSize * this.elitism;
        this.population = this.population.slice(0, elite);
        this.currentSize = this.population.length;
        while (this.currentSize < this.maxSize) {
            if (this.should(this.crossover)) {
                const [p1, p2] = this.selectParents();
                const children = p1.mate(p2);
                children.forEach(c => {
                    this.population.push(
                        this.should(this.mutation) ? c.mutate() : c
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