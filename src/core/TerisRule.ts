import { Shape, Point, MoveDirection } from "./types";
import GameConfig from "./GameConfig";
import { SquareGroup } from "./SquareGroup";
import { Square } from "./Square";
import { exists } from "fs";

function isPoint(obj: any): obj is Point {
    if (typeof obj.x === "undefined") {
        return false
    }
    return true
}


export class TerisRule {
    static canIMove(shape: Shape, targetPoint: Point, exists: Square[]): boolean {
        const targetSuarePoints: Point[] = shape.map(it => {
            return {
                x: it.x + targetPoint.x,
                y: it.y + targetPoint.y
            }
        })

        if (targetSuarePoints.some(p => {
            return p.x < 0 || p.x > GameConfig.panelSize.width - 1 ||
                p.y < 0 || p.y > GameConfig.panelSize.height - 1

        })) { 
            return false
        }
        if(targetSuarePoints.some(p => exists.some(sq => sq.point.x === p.x && sq.point.y === p.y))){
            return false
        }
        return true
    }

    static move(teris: SquareGroup, targetPoint: Point, exists: Square[]): boolean;
    static move(teris: SquareGroup, direction: MoveDirection, exists: Square[]): boolean;

    static move(teris: SquareGroup, targetPointOrDirection: Point | MoveDirection, exists: Square[]): boolean {
        if (isPoint(targetPointOrDirection)) {
            if (this.canIMove(teris.shape, targetPointOrDirection, exists)) {

                teris.centerPoint = targetPointOrDirection
                return true
            }
            return false
        }else{
            const direction = targetPointOrDirection;
            let targetPoint: Point;
            if(direction === MoveDirection.down){
                targetPoint = {
                    x: teris.centerPoint.x,
                    y: teris.centerPoint.y + 1,
                }
            }else if(direction === MoveDirection.left){
                targetPoint = {
                    x: teris.centerPoint.x - 1,
                    y: teris.centerPoint.y,
                }
            }else {
                targetPoint = {
                    x: teris.centerPoint.x + 1,
                    y: teris.centerPoint.y,
                }
            }
            return this.move(teris, targetPoint ,exists)
        }

    }


    /**
     * 将当前的方块儿，移动到目标方向的终点
     * @param teris 
     * @param direction 
     */
    static moveDirection(teris: SquareGroup, direction: MoveDirection, exists: Square[]){
        while(this.move(teris, direction, exists)){
        }
    }

    static rotate(teris: SquareGroup, exists: Square[]): boolean{
        const newShape = teris.afterRotateshape();
        if(this.canIMove(newShape, teris.centerPoint, exists)){
            teris.rotate();
            return true
        }else{
            return false
        }
    }


    /**
     * 从已存在的方块儿中进行消除，并返回消除的行数
     * @param exists 
     */
    static deleteSquares(exists: Square[]): number {
        const ys = exists.map(sq => sq.point.y);
        const maxY = Math.max(...ys)

        const minY = Math.min(...ys);

        let num = 0;
        for (let y = minY; y <= maxY; y++) {
            if(this.deleteLine(exists, y)){
                num++;
            }
        }
        return num;
    }



    /**
     * 消除行
     * @param exists 
     * @param y 
     */
    private static deleteLine(exists: Square[], y: number): boolean{
        const Squares = exists.filter(sq => sq.point.y === y);
        if(Squares.length === GameConfig.panelSize.width){
            Squares.forEach(sq => {
                if(sq.viewer){
                    sq.viewer.remove()
                }
                exists.filter(s => s.point.y < y).forEach(sq => {
                    sq.point = {
                        x: sq.point.x,
                        y: sq.point.y + 1
                    }
                })
                const index = exists.indexOf(sq)
                exists.splice(index, 1)
            })
            return true
        }
        return false
    }
}