import { makeAutoObservable } from "mobx";

export enum View {
    MENU,
    GAME,
    RESULT
}

class GameStore {
    constructor() {
        makeAutoObservable(this);
    }

    view: number = View.MENU;
    gridSize: number = 3;
    
    player: string = "X";
    winner: null|string = null;
    moves: number = 0;

    rows: Array<number> = [];
    cols: Array<number> = [];
    diagonal: Array<number> = [0, 0];
    

    play(gridSize: number): void {
        this.reset(); // reset values before start
        this.gridSize = gridSize; // update grid size

        this.rows = new Array(gridSize).fill(0); // prepare rows array to calculate the winner
        this.cols = new Array(gridSize).fill(0); // prepare cols array to calculate the winner

        this.view = View.GAME; // enter the game view
    }

    move(row: number, col: number): void {
        // keep track of the moves
        this.moves++;

        // add or subtract depending on the current player
        const amount = this.player === "X" ? 1 : -1;
        
        // keep track of the rows and cols
        this.rows[row]+= amount; 
        this.cols[col]+= amount;

        // if the row is equal to the col, add or subtract to the forward diagonal line
        if (row === col) {
            this.diagonal[0]+= amount;
        }
        
        // if the sum of row + col + 1 equals the grid size, the user clicked on 
        // the backwards diagonal line, add or subtract to the backward diagonal line
        if (row + col + 1 === this.gridSize) {
            this.diagonal[1]+= amount;
        }

        // calculate the winner by looking for a value which is equal to the grid size in the rows, cols or diagonals
        if ([...this.rows, ...this.cols, ...this.diagonal].find(i => Math.abs(i) === this.gridSize)) {
            this.winner = this.player; // set the winner
            this.view = View.RESULT; // show the result screen
        } else if (this.moves === this.gridSize * this.gridSize) { 
            // // No more moves left, so show the result screen
            this.view = View.RESULT;
        }

        this.player = this.player === "X" ? "O" : "X"; // toggle player
    }

    backToMenu(): void {
        this.view = View.MENU;
    }

    reset(): void {
        this.moves = 0;
        this.player = "X";
        this.winner = null;
        this.diagonal = [0,0];
    }

}

// export store as a singleton to be able to import and use it anywhere
export default new GameStore();