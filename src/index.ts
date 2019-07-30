import { Game } from "./core/Game";
import { GamePageViewer } from "./core/viewer/GamePageViewer";
import $ from 'jquery'

// import { Square } from "./core/Square";
// import { SquarePageViewer } from "./core/viewer/squarePageViewer";
// import $ from 'jquery'
// import { copyFileSync } from "fs";
// import { SquareGroup } from "./core/SquareGroup";
// import { LShape, SquareShape, SMirrorShape, LineShape, SShape, createTeris } from "./core/Taris";
// import { TerisRule } from "./core/TerisRule";
// import { MoveDirection } from "./core/types";


// const Taris = createTeris({ x: 3, y: 2 })



// Taris.squares.forEach(sq => {
//     sq.viewer = new SquarePageViewer(sq, $("#root"))
// })

// const sq = new Square();
// sq.viewer = new SquarePageViewer(sq, $("#root"))

// sq.color = "red"
// sq.point = {
//     x: 0,
//     y: 0
// }


// $("#down").click(function () {
//     // TerisRule.move(Taris, MoveDirection.down);
//     TerisRule.moveDirection(Taris, MoveDirection.down)
// // TerisRule.move(Taris, {x: Taris.centerPoint.x, y: Taris.centerPoint.y + 1})
//     console.log(Taris.centerPoint)
// })

// $("#left").click(function () {
//     TerisRule.move(Taris, MoveDirection.left)
//     console.log(Taris.centerPoint)
// })

// $("#right").click(function () {
//     TerisRule.move(Taris, {
//         x: Taris.centerPoint.x + 1,
//         y: Taris.centerPoint.y
//     })
//     console.log(Taris.centerPoint)
// })

// $("#top").click(function () {
//     TerisRule.move(Taris, {
//         x: Taris.centerPoint.x,
//         y: Taris.centerPoint.y - 1
//     })
//     console.log(Taris.centerPoint)
// })


// $("#rotate").click(function () {
//     TerisRule.rotate(Taris)
//     // console.log(Taris.shape, newShape)
// })



var g = new Game(new GamePageViewer);
g.start();


$("#start").click(function(){
g.start()
})

$("#pause").click(function(){
    g.pause()
})

$("#down").click(function(){
    g.control_DOWN()
})


$("#left").click(function(){
    g.control_left()
})

$("#right").click(function(){
    g.control_right()
})

$("#rotate").click(function(){
    g.control_Rotate()
})