export class Question {
    id;
    score;
    type;
    difficulty;
    chapterCovered;
    distinguishingDegree;
    solutionTime;

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