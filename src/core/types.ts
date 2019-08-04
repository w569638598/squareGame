import { SquareGroup } from "./SquareGroup";
import { inherits } from "util";
import { Game } from "./Game";

export interface Point {
    readonly x: number,
    readonly y: number
}


export interface IViewer {
    /**
     * 显示
     */
    show(): void;
    /**
     * 移除
     */
    remove(): void;
}

/**
 * 形状
 */
export type Shape = Point[]


export enum MoveDirection {
    left,
    right,
    down
}


export enum GameStatus {
    init,
    playing,
    pause,
    over
}


export interface GameViewer {
    /**
     * 
     * @param teris     下一个方块儿对象
     */
    showNext(teris: SquareGroup): void

    /**
     * 
     * @param teris     切换的方块儿对象
     */
    switch(teris: SquareGroup): void


    init(game: Game): void;

    showScore(score: number): void;


    onGamePause(): void;

    onGameStart(): void;
    
    onGameOver(): void;
}