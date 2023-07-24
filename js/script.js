// game constatns && variabals
let direction = { x: 0, y: 0 };
let foodsound = new Audio('1.mp3');
let gameOverSound = new Audio('2.mp3');
let moveSound = new Audio("3.mp3");
let musicSound = new Audio("4.mp3");
let speed = 10;
let lastPaintTime = 0;
let snackArr = [{ x: 13, y: 15 }];
let food = { x: 12, y: 15 };
let score = 0;
let inputDir = { x: 0, y: 0 };
let hiscoreval = 0;
let abc1 = 0;
let abc2 = 0;
//game function
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) { return; }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(sarr) {
    //if you bump in your self
    for (let i = 1; i < snackArr.length; i++) { if (snackArr[i].x === snackArr[0].x && snackArr[i].y === snackArr[0].y) { return true; } }
    if (snackArr[0].x > 18 || snackArr[0].x < 0 || snackArr[0].y > 18 || snackArr[0].y < 0) { return true; }
}
function gameEngine() {
    // part 1: updating the snack array
    if (isCollide(snackArr)) {
        //gameover sound play
        //musicSound pouse
        alert("game over.press any key to play again!");
        snackArr = [{ x: 13, y: 15 }];
        //musicSound  play
        score = 0; scoreBox.innerHTML = "score: " + score;
    }
    // if you have etten the food ,increment the score and regenret the food
    if (snackArr[0].y == food.y && snackArr[0].x == food.x) {
        score += 1;
        if (score > hiscoreval) { hiscoreval = score; localStorage.setItem("hiscore", JSON.stringify(hiscoreval)); }
        console.log(hiscoreval);
        scoreBox.innerHTML = "score: " + score;
        hiscoreBox.innerHTML = "hiscore: " + hiscoreval;
        snackArr.unshift({ x: snackArr[0].x + inputDir.x, y: snackArr[0].y + inputDir.y });
        let a = 2,b = 16,ttt = 0;
        //logic of a no snack and food is correspond in one block
        while (ttt == 0) {
            ttt = 0;
            abc1 = 2 + Math.round(a + (b - a) * Math.random())
            abc2 = 2 + Math.round(a + (b - a) * Math.random())
            for (let i = 0; i < snackArr.length; i++) {

                if (snackArr[i].x == abc1 && snackArr[i].y == abc2) { break; }
                ttt++;
            }
        }
        food = { x: abc1, y: abc2 };
    }
    //moving the sncke
    for (let i = snackArr.length - 2; i >= 0; i--) { snackArr[i + 1] = { ...snackArr[i] }; }
    snackArr[0].x += inputDir.x; snackArr[0].y += inputDir.y;

    //part 2: Display the snacka and food
    //display the snake
    board.innerHTML = "";
    snackArr.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) { snakeElement.classList.add('head'); }
        else { snakeElement.classList.add('snack'); }
        board.appendChild(snakeElement);
        //display the food
        foodElement = document.createElement("div");
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
    });
    let hiscore = localStorage.getItem("hiscore");
    if (hiscore === null) { localStorage.setItem("hiscore", JSON.stringify(hiscoreval)); } else {
        hiscore = JSON.stringify(hiscoreval);
        hiscore.innerHTML = "hiscore" + hiscore;
    }
}
//main logic
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 3, y: 4 }; //start the game
    // moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0; inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0; inputDir.y = 1; break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0; break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});