// Cromozom = un test, o solutie la problema noastra
// un test = o lista de id-uri de intrebari
export class Chromosome {
    fitness; // gradul de fitness al solutiei, cat de buna este solutia
    gene = []; // lista cu id-urile intrebarilor din acest test
    quiz;

    constructor(gene, quiz) {

        this.quiz = quiz;
        if (gene.length) {
            this.gene = gene;
            this.fitness = this.calculateFitness(gene); // la construirea new Chromosome() se calculeaza automat fitness-ul
        }
    }

    // functie pt imperecherea cu alt cromozom
    mate(mate) {
        const arr1 = this.gene;
        const arr2 = mate.gene;

        const length = mate.gene.length;

        const pivot = this.rand(0, this.gene.length - 2);

        const child1 = [
            ...arr1.slice(0, pivot),
            ...arr2.slice(-length + pivot)
        ];

        const child2 = [
            ...arr2.slice(0, pivot),
            ...arr1.slice(-length + pivot)
        ];
        return [
            new Chromosome(child1, this.quiz),
            new Chromosome(child2, this.quiz)
        ];
    }

    // functie pt mutatia unui cromozom - intrebarile din test se schimba cu unele random
    mutate() {
        const quizIds = this.quiz.question.map(q => q.id);
        const gene = this.gene;
        let unusedGene = this.array_diff(quizIds, gene);
        unusedGene = this.shuffleArray(unusedGene);
        gene[this.rand(0, gene.length - 1)] = unusedGene[0];
        return new Chromosome(gene, this.quiz);
    }

    // functie calculare fitness
    // se calculeaza fitness in functie de scorul, diferenta, timpul si capitolul intrebarilor
    calculateFitness(gene) {
        let tempScore = 0;
        let tempTypes = [];
        let tempDiff = 0;
        let tempChapters = [];
        let tempDist = 0;
        let tempTime = 0;

        // trece prin toate intrebarile si calculaza o medie a valorilor: scor, timp, etc
        gene.forEach((value, key) => {
            tempScore += this.quiz.question[value - 1].score;
            tempDiff += this.quiz.question[value - 1].difficulty;
            tempDist += this.quiz.question[value - 1].distinguishingDegree;
            tempTime += this.quiz.question[value - 1].solutionTime;

            const s = this.quiz.question[value - 1].type;
            if (Object.keys(tempTypes).indexOf(s) > -1) {
                tempTypes[s] += 1;
            } else {
                tempTypes[s] = 1;
            }

            const ss = this.quiz.question[value - 1].chapterCovered;
            if (Object.keys(tempChapters).indexOf(ss) > -1) {
                tempChapters[ss] += 1;
            } else {
                tempChapters[ss] = 1;
            }
        });

      

        tempDiff /= gene.length;
        tempDist /= gene.length;

        // compara mediile obtinute cu valorile cerute la configurarea testului
        let NRE = 0;
        NRE += Math.abs(this.quiz.sumScore - tempScore) / this.quiz.sumScore;
        NRE += Math.abs(this.quiz.avgDiff - tempDiff) / this.quiz.avgDiff;
        NRE += Math.abs(this.quiz.avgDist - tempDist) / this.quiz.avgDist;
        NRE += Math.abs(this.quiz.sumTime - tempTime) / this.quiz.sumTime;


        Object.keys(this.quiz.types).forEach((key) => {
            const value = this.quiz.types[key];
            if (Object.keys(tempTypes).indexOf(key) === -1) {
                tempTypes[key] = 0;
            }
            NRE += Math.abs(value - tempTypes[key]) / value;
        });
        
        Object.keys(this.quiz.chapters).forEach((key) => {
            const value = this.quiz.chapters[key];
            if (Object.keys(tempChapters).indexOf(key) === -1) {
                tempChapters[key] = 0;
            }
            NRE += Math.abs(value - tempChapters[key]) / value;
        });

        return 1 / (1 + NRE);
    }

    // genereaza un cromozom random, la inceput
    genRandom() {
        let quizIds = this.quiz.question.map(q => q.id);
        quizIds = this.shuffleArray(quizIds);
        const newGene = quizIds.slice(0, this.quiz.nQuestion);
        return new Chromosome(newGene, this.quiz);
    }

    toString() {
        return this.fitness + "";
    }

    // nr random intre min si max
    rand(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // returneaza elementele care exista in array1 dar nu si in array2
    array_diff(array1, array2) {
        return array1.filter(function (elm) {
            return array2.indexOf(elm) === -1;
        });
    }

     // amesteca o lista
    shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {

            // Generate random number
            var j = Math.floor(Math.random() * (i + 1));

            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }

        return array;
    }
}