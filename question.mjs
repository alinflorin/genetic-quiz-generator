export class Question { // clasa pentru citirea intrebarilor din fisier
    id;
    score;
    type;
    difficulty;
    chapterCovered;
    distinguishingDegree;
    solutionTime; // timp de gandire pt intrebare, procent

    constructor(id, score, type, difficulty, chapterCovered, distinguishingDegree, solutionTime) {
        this.id = id;
        this.score = score;
        this.type = type;
        this.difficulty = difficulty;
        this.chapterCovered = chapterCovered;
        this.distinguishingDegree = distinguishingDegree;
        this.solutionTime = solutionTime;
    }
}