import { Point, IViewer } from "./types";

/**
 * 小方格
 */
export class Square {
    private _point: Point = {
        x: 4,
        y: 6
    };
    private _color: string = ""
    private _viewer?: IViewer;
    public get viewer() {
        return this._viewer
    }
    public set viewer(v) {
        this._viewer = v;
        if (v) {
            v.show()
        }
    }

    public get point() {
        return this._point
    }
    public set point(val) {
        this._point = val;
        //完成显示
        if (this._viewer) {
            this._viewer.show();
        }
    }

    public get color() {
        return this._color
    }

    public set color(v) {
        this._color = v
    }

    constructor() { }
}
