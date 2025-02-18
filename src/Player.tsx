export class Player {
    id: number;
    nick: string;
    currentAnswer: number;
    money: number;

    constructor(id: number, nick: string, money: number) {
        this.id = id;
        this.nick = nick;
        this.currentAnswer = 0;
        this.money = money;
    }

    randomAnswer(goodAnswer: number): number {
        let variation: number;

        if (goodAnswer > 5000) {
            variation = Math.random() * 1 - 0.5; // 50% variation for large values
        } else if (goodAnswer < 20) {
            variation = Math.random() * 0.4 - 0.2; // 20% variation for small values
        } else {
            variation = Math.random() * 0.6 - 0.3; // 30% variation for medium values
        }

        if (Math.random() < 1 / 15) {
            // 1 in 15 chance to make it correct
            return goodAnswer;
        }

        this.currentAnswer = Math.trunc(goodAnswer * (1 + variation)); // Apply variation to the goodAnswer
        return this.currentAnswer;
    }

    setAnswer(answer: number): Player {
        this.currentAnswer = answer;
        return this;
    }
}
