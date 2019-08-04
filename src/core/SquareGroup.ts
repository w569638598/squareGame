import { Square } from "./Square";
import { Shape, Point } from "./types";

export class SquareGroup {
    private _squares: readonly Square[];

    public get squares() {
        return this._squares
    }

    public get shape() {
        return this._shape
    }

    public get centerPoint(): Point {
        return this._centerPoint
    }

    public set centerPoint(v: Point) {
        this._centerPoint = v;
        this.setSquarePoint();
    }

    private setSquarePoint() {
        this._shape.forEach((p, i) => {
            this._squares[i].point = {
                x: this._centerPoint.x + p.x,
                y: this._centerPoint.y + p.y
            }

        })
    }

    constructor(
        private _shape: Shape,
        private _centerPoint: Point,
        private _color: string) {
        const arr: Square[] = [];
        this._shape.forEach(p => {
            const sq = new Square();
            sq.color = this._color;
            arr.push(sq);
        })
        this._squares = arr;
        this.setSquarePoint();
    }


    protected isClock = true;         //旋转方向

    afterRotateshape(): Shape {
        if (this.isClock) {
            return this._shape.map(p => {
                const newP: Point = {
                    x: -p.y,
                    y: p.x
                }
                return newP
            })
        } else {
            return this._shape.map(p => {
                const newP: Point = {
                    x: p.y,
                    y: -p.x
                }
                return newP
            })
        }
    }


    rotate() {
        const newShap = this.afterRotateshape();
        this._shape = newShap;
        this.setSquarePoint();
    }
}