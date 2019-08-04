import { GameStatus, MoveDirection, GameViewer } from "./types";
import { SquareGroup } from "./SquareGroup";
import { createTeris } from "./Taris";
import { TerisRule } from "./TerisRule";
import GameConfig from "./GameConfig";
import { Square } from "./Square";

export class Game {
    private _gameStatus: GameStatus = GameStatus.init;
    private _curTeris?: SquareGroup;
    private _nextTeris: SquareGroup;
    private _timer?: number;
    private _duration: number = 1000
    private _exists: Square[] = []

    private _score: number = 0;

    public get gameStatus(){
        return this._gameStatus
    }

    public get Score(){
        return this._score;
    }
    public set Score(v){
        this._score = v;
        this._viewer.showScore(v);
        const level = GameConfig.levels.filter(it => it.score  < v).pop()!;
        if(level.duration === this._duration){
            return;
        }
        this._duration = level.duration;
        if(this._timer){
            clearInterval(this._timer)
        this._timer = undefined;
        this.autoDrop();
    }
        
    }

    constructor(private _viewer: GameViewer) {
        this._duration = GameConfig.levels[0].duration;
        this._nextTeris = createTeris({ x: 0, y: 0 })
        this.createNext();
        this._viewer.init(this);
        this._viewer.showScore(this._score)
    }


    private createNext() {
        this._nextTeris = createTeris({ x: 0, y: 0 });
        this.resetCenterPointer(GameConfig.nextSize.width, this._nextTeris)
        this._viewer.showNext(this._nextTeris);
    }

    private init() {
        this._exists.forEach(sq => {
            if (sq.viewer) {
                sq.viewer.remove()
            }
        })
        this._exists = [];
        this.createNext();
        this._curTeris = undefined;
        this.Score = 0
    }



    start() {
        if (this._gameStatus === GameStatus.playing) {
            return;
        }

        //游戏重新开始
        if (this._gameStatus === GameStatus.over) {
            this.init()
        }
        this._gameStatus = GameStatus.playing;
        if (!this._curTeris) {
            this.switchTeris()
        }
        this.autoDrop();
        this._viewer.onGameStart();
    }

    pause() {
        if (this._gameStatus === GameStatus.playing) {
            this._gameStatus = GameStatus.pause;
            clearInterval(this._timer)
            this._timer = undefined;
            this._viewer.onGamePause();
        }
    }


    control_left() {
        if (this._curTeris && this._gameStatus === GameStatus.playing) {
            TerisRule.move(this._curTeris, MoveDirection.left, this._exists)
        }
    }
    control_right() {
        if (this._curTeris && this._gameStatus === GameStatus.playing) {
            TerisRule.move(this._curTeris, MoveDirection.right, this._exists)
        }
    }
    control_DOWN() {
        if (this._curTeris && this._gameStatus === GameStatus.playing) {
            TerisRule.moveDirection(this._curTeris, MoveDirection.down, this._exists)
            this.hitBottom()
        }
    }

    control_Rotate() {
        if (this._curTeris && this._gameStatus === GameStatus.playing) {
            TerisRule.rotate(this._curTeris, this._exists)
        }
    }

    private autoDrop() {
        if (this._timer || this._gameStatus !== GameStatus.playing) {
            return;
        }
        this._timer = setInterval(() => {
            if (this._curTeris) {
                if (!TerisRule.move(this._curTeris, MoveDirection.down, this._exists)) {
                    this.hitBottom()
                }
            }
        }, this._duration)
    }

    private switchTeris() {
        this._curTeris = this._nextTeris;
        this.resetCenterPointer(GameConfig.panelSize.width, this._curTeris)

        //判断游戏是否结束
        if (!TerisRule.canIMove(this._curTeris.shape, this._curTeris.centerPoint, this._exists)) {
            this._curTeris.squares.forEach(q => {
                if (q.viewer) {
                    q.viewer.remove();
                }
            })
            this._gameStatus = GameStatus.over;
            clearInterval(this._timer)
            this._timer = undefined;
            this._viewer.onGameOver();
            return;
        }
        this.createNext()
        this._viewer.switch(this._curTeris)

    }
    /**
     * 设置中心点左边，已达到让该方块儿出现在区域的中上方
     * @param width 
     * @param teris 
     */
    private resetCenterPointer(width: number, teris: SquareGroup) {
        const x = Math.floor(width / 2);
        const y = 0;
        teris.centerPoint = { x, y };
        while (teris.squares.some(it => it.point.y < 0)) {
            teris.squares.forEach(a => teris.centerPoint = { x: teris.centerPoint.x, y: teris.centerPoint.y + 1 })
        }
    }

    private hitBottom() {
        this._exists.push(...this._curTeris!.squares);
        const num = TerisRule.deleteSquares(this._exists);

        this.addScore(num)
        this.switchTeris()

    }

    private addScore(lineNum: number) {
        if (lineNum === 0) {
            return;
        } else if (lineNum === 1) {
            this.Score += 10;
        } else if (lineNum === 2) {
            this.Score += 25
        } else if (lineNum === 3) {
            this.Score += 50
        } else if (lineNum === 4) {
            this.Score += 100
        }
        // this._viewer.showScore(this._score)
    }
}