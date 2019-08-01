import { GameStatus, MoveDirection, GameViewer } from "./types";
import { SquareGroup } from "./SquareGroup";
import { createTeris } from "./Taris";
import { TerisRule } from "./TerisRule";
import GameConfig from "./GameConfig";
import { Square } from "./Square";

export class Game{
    private _gameStatus: GameStatus = GameStatus.init;
    private _curTeris?: SquareGroup;
    private _nextTeris: SquareGroup = createTeris({x: 0, y: 0});
    private _timer?: number;
    private _duration: number = 1000
    private _exists: Square[] = []






constructor(private _viewer: GameViewer){
    this.resetCenterPointer(GameConfig.nextSize.width, this._nextTeris)
    this._viewer.showNext(this._nextTeris)
}

    start(){
        if(this._gameStatus === GameStatus.playing){
            return;
        }
        this._gameStatus = GameStatus.playing;
        if(!this._curTeris){
            this.switchTeris()
        }
        this.autoDrop()
    }

    pause(){
        if(this._gameStatus === GameStatus.playing){
            this._gameStatus = GameStatus.pause;
            clearInterval(this._timer)
            this._timer = undefined
        }
    }


    control_left(){
        if(this._curTeris && this._gameStatus === GameStatus.playing){
            TerisRule.move(this._curTeris, MoveDirection.left, this._exists)
        }
    }
    control_right(){
        if(this._curTeris && this._gameStatus === GameStatus.playing){
            TerisRule.move(this._curTeris, MoveDirection.right, this._exists)
        }
    }
    control_DOWN(){
        if(this._curTeris && this._gameStatus === GameStatus.playing){
            TerisRule.moveDirection(this._curTeris, MoveDirection.down, this._exists)
            this.hitBottom()
        }
    }

    control_Rotate(){
        if(this._curTeris && this._gameStatus === GameStatus.playing){
            TerisRule.rotate(this._curTeris, this._exists)
        }
    }

    private autoDrop(){
        if(this._timer || this._gameStatus !== GameStatus.playing){
            return;
        }
        this._timer = setInterval(() => {
            if(this._curTeris){
                if(!TerisRule.move(this._curTeris, MoveDirection.down, this._exists)){
                    this.hitBottom()
                }
            }
        },this._duration)
    }

    private switchTeris(){
        this._curTeris = this._nextTeris;
        this.resetCenterPointer(GameConfig.panelSize.width, this._curTeris)
            this._nextTeris = createTeris({x: 0, y: 0});
            this.resetCenterPointer(GameConfig.nextSize.width, this._nextTeris)
            this._viewer.switch(this._curTeris)
            this._viewer.showNext(this._nextTeris)
    }
    /**
     * 设置中心点左边，已达到让该方块儿出现在区域的中上方
     * @param width 
     * @param teris 
     */
    private resetCenterPointer(width: number, teris: SquareGroup){
        const x = Math.floor(width / 2);
        const y = 0;
        teris.centerPoint = {x, y};
        while(teris.squares.some(it => it.point.y < 0)){
            teris.squares.forEach(a => a.point = {x: a.point.x, y: a.point.y + 1})
        }
    }

    private hitBottom(){
        this._exists.push(...this._curTeris!.squares);
        const num = TerisRule.deleteSquares(this._exists);
        console.log(num)
        this.switchTeris()
    }
}