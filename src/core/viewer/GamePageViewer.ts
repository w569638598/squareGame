import { GameViewer } from "../types";
import { SquarePageViewer } from "./squarePageViewer";
import $ from 'jquery'
import { SquareGroup } from "../SquareGroup";
export class GamePageViewer implements GameViewer{
    showNext(teris: SquareGroup): void {
        teris.squares.forEach(sq => {
            sq.viewer = new SquarePageViewer(sq, $("#next"))
        })
    }    
    switch(teris: SquareGroup): void {
        teris.squares.forEach(sq => {
            sq.viewer!.remove()
            sq.viewer = new SquarePageViewer(sq, $("#panel"))
        })
    }

    
}