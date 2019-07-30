import { GameStatus } from "./types";
import { SquareGroup } from "./SquareGroup";
import { createTeris } from "./Taris";

export class Game{
    gameStatus: GameStatus = GameStatus.init;
    curTeris?: SquareGroup;
    nextTeris?: SquareGroup = createTeris({x: 0, y: 0});
    start(){
        if(this.gameStatus === GameStatus.playing){
            return;
        }
        this.gameStatus = GameStatus.playing
    }
}