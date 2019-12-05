/*--------------------------------------------------------------------------
-------------------Code and design by TranDuyBa-----------------------------
--------------------------------------------------------------------------*/
var widthViewGame = 700;
var viewGame = document.getElementsByClassName("view-game")[0];
var scoreNow = document.getElementsByClassName("scoreNow")[0];
var scoreMax = document.getElementsByClassName("scoreMax")[0];
var valueScoreNow = 0;
var hinderLast;

viewGame.style.width = widthViewGame + "px";
scoreNow.innerHTML = "Điểm: " + valueScoreNow;
scoreMax.innerHTML = "Điểm lớn nhất: 0";

function wheel(){
    this.wheel;
    this.width = 50;
    this.height = 50;
    this.position = "absolute";
    this.bottom = 0;
    this.left = 50;
    this.intervalUp ;
    this.intervalDown ;
    this.src = "wheel.png";
    this.y = 110;
    this.aX = 4.5;
    this.audioUp = true;

    this.createWheel = function(){
        this.wheel = document.createElement("img");
        this.wheel.style.width = this.width + "px";
        this.wheel.style.height = this.height + "px";
        this.wheel.style.position = this.position;
        this.wheel.style.left = this.left + "px";
        this.wheel.style.bottom = this.bottom + "px";
        this.wheel.src = this.src;
        this.wheel.style.zIndex = "9";
        viewGame.appendChild(this.wheel);
    };

    this.actionUp = function(){
        if(this.audioUp == true){
            var audio = new Audio('actionUp-Mp3.mp3');
            audio.play();
        }
        if(this.bottom == 0) {
            var animationUp;
            var changePositionUp = ()=>{
                if(this.bottom < this.y){
                    this.bottom += this.aX;
                    this.wheel.style.bottom = this.bottom + "px";
                    animationUp = window.requestAnimationFrame(changePositionUp);
                } else {
                    cancelAnimationFrame(animationUp);
                    this.actionDown();
                }
            };
            changePositionUp();
        }
    };

    this.actionDown = function(){
        var animationDown;
        var changePositionDown = ()=>{
            if(this.bottom > 0){
                this.bottom -= this.aX;
                this.wheel.style.bottom = this.bottom + "px";
                animationDown = window.requestAnimationFrame(changePositionDown);
            } else {
               cancelAnimationFrame(animationDown);
            }
        };
        changePositionDown();
    };

    this.actionWheel = function(){
        this.createWheel();
        window.onclick = this.actionUp.bind(this);
        window.onkeydown = (event)=>{
          if(event.key == " ") {
            this.actionUp();
          }
        };
    };
}
function hinder() {
    this.hinder;
    this.width = 20;
    this.height;
    this.position = "absolute";
    this.bottom;
    this.left;
    this.backgroundColor = "blue";
    this.aX = 4.5; // Gia tốc vật cản
    this.maxHeight = 3; // Chiều cao của vật cản
    this.numberXxX = 1/3; // Hệ số khoảng cách giữa các vật cản ( mẫu số == số lượng vật cản)
    this.animationRun;
    this.src = "dinh.png";

    this.createHinder = function(){
        var create = ()=>{
            hinderLast = this;
            this.left = widthViewGame;
            this.bottom = 0;
            this.height = Math.ceil(Math.random()*this.maxHeight + 2) * 10;
            this.hinder = document.createElement("img");
            this.hinder.src = this.src;
            this.hinder.style.width = this.width + "px";
            this.hinder.style.height = this.height + "px";
            this.hinder.style.position = this.position;
            this.hinder.style.left = this.left + "px";
            this.hinder.style.bottom = this.bottom + "px";
            viewGame.appendChild(this.hinder);
            this.actionHinder();
        };
        if(hinderLast != undefined){
            var interval = setInterval(()=>{
                if(hinderLast.left < widthViewGame*this.numberXxX) {
                    create();
                    clearInterval(interval);
                }
            }, 17);
        } else {
            create();
        }
    };

    this.actionHinder = function(){
        var changePosition = ()=>{
            if(this.left > -this.width){
                this.left -= this.aX;
                this.hinder.style.left = this.left + "px";
                this.animationRun = window.requestAnimationFrame(changePosition);
            } else {
                cancelAnimationFrame(this.animationRun);
                viewGame.removeChild(this.hinder);
                this.createHinder();
            }
        };
        changePosition();
    }
    this.actionHinderDown = function(){
        var changeDown;
        var changePositionDown = ()=>{
            if(this.bottom > -this.height){
                this.bottom -= 1;
                this.hinder.style.bottom = this.bottom + "px";
                changeDown = window.requestAnimationFrame(changePositionDown);
            } else {
                cancelAnimationFrame(changeDown);
            }
        };
        changePositionDown();
    }
}

function score(){
    this.intervalCheckScore;
    this.getScore = function(){
        if(navigator.cookieEnabled == true ){
            var cookie = document.cookie;
            if(cookie != ""){
                cookie = document.cookie.split(";");
                for(var i = 0; i < cookie.length; i++){
                    if(cookie[i].indexOf("scoreGame") != -1) {
                        var score = cookie[i].split("=");
                        return score[1];
                    }
                }
            } else
                return 0;
        } else {
            alert("Hãy bật cookie lên để lưu điểm nhé !");
            return 0;
        }
    };

    this.saveScore = function(value){
        var dateNow = new Date();
        var expires = new Date(dateNow.getTime() + 7*24*60*60*1000);
        if(value > this.getScore())
            document.cookie = "scoreGame="+value+";expires="+expires.toUTCString();
    };

    this.checkScore = function(){
        scoreMax.innerHTML = "Điểm cao nhất: " + this.getScore();
        this.intervalCheckScore = setInterval(()=>{
            valueScoreNow += 1;
            scoreNow.innerHTML = "Điểm: " + valueScoreNow;
        }, 100);
    };
}

function animationLevelUp(){
    this.checkLevelUp = 0;
    this.imgLevelUp;
    this.widthImgLevelUp = 300;
    this.heightImgLevelUp  = 100;
    this.createImgLevelUp = function(){
        this.imgLevelUp = document.createElement("img");
        this.imgLevelUp.src = "levelup.png";
        this.imgLevelUp.style.position = "absolute";
        this.imgLevelUp.style.width = this.widthImgLevelUp  + "px";
        this.imgLevelUp.style.height = this.heightImgLevelUp  + "px";
        this.imgLevelUp.style.left = "25%";
        this.imgLevelUp.style.bottom = -this.heightImgLevelUp + "px";
        this.imgLevelUp.style.transition = "1s";
        this.imgLevelUp.style.opacity = "0";
        viewGame.appendChild(this.imgLevelUp);
    };
    this.runAnimationLevelUp = function(){
        this.createImgLevelUp();
        setTimeout(()=>{
            this.imgLevelUp.style.bottom = "150px";
            this.imgLevelUp.style.opacity = "1";
        },50);
        setTimeout(()=>{
            this.imgLevelUp.style.transition = "0.5s";
            this.imgLevelUp.style.opacity = "0";
            this.imgLevelUp.style.bottom = "100%";
            setTimeout(function(){
                viewGame.removeChild(this.imgLevelUp);
            }, 1000);
        }, 1100);
    };
}

function level() {
    this.changeLevel = function(maxHeight, aX, y, secondsAnimation){
        if(this.checkLevelUp == 0){
            var audio = new Audio("levelUp-Mp3.mp3");
            audio.play();
            ++this.checkLevelUp;
            this.runAnimationLevelUp();
            setTimeout(()=>{
                this.checkLevelUp = 0;
            }, 1000);
        }
        this.arrayobjHinder.forEach((value)=>{
            value.actionHinderDown();
        });
        this.arrayobjHinder.forEach((value)=>{
            value.maxHeight = maxHeight;
            value.aX = aX;
        });
        this.objwheel.y = y;
        this.objwheel.wheel.style.animation = "rotateWheel "+ secondsAnimation +"s linear infinite";
    };

    this.updateLevel = function(){
        switch(valueScoreNow){
            case 50:
                this.changeLevel(4, 5, 112, 0.8);
            break;
            case 250:
                this.changeLevel(5, 5.5, 114, 0.6);
            break;
            case 400:
                this.changeLevel(6, 6.5, 120, 0.4);
            break;
            case 650:
                this.changeLevel(7, 7.5, 130, 0.2);
            break;
            case 950:
                this.changeLevel(8, 8.5, 135, 0.1);
            break;
            case 1300:
                this.changeLevel(8, 10.5, 135, 0.1);
            break;
        }
    }
}
level.prototype = new animationLevelUp();

function game() {
    this.objwheel;
    this.arrayobjHinder = [];

    this.playGame = function(){
        var wellcome = document.getElementsByClassName("wellcome")[0];
        var play = document.querySelector(".view-game .wellcome input");
        wellcome.style.transform = "scale(1,1)";
        play.onclick = ()=>{
            play.style.display = "none";
            wellcome.style.transition = "0.5s";
            wellcome.style.transform = "scale(0.001,0.001)";
            this.objwheel = new wheel();
            this.objwheel.actionWheel();
            for(var i = 0; i < 2; i++){
                this.arrayobjHinder[i] = new hinder();
                this.arrayobjHinder[i].createHinder();
            };

            var intervalCheckGameOver = setInterval(()=>{
                for(i=0; i < this.arrayobjHinder.length; i++){
                    if(this.objwheel.bottom >= 0 && this.objwheel.bottom <= (this.arrayobjHinder[i].height) && this.arrayobjHinder[i].bottom >= 0){
                        if(this.objwheel.left >= this.arrayobjHinder[i].left && this.objwheel.left <= (this.arrayobjHinder[i].left + this.arrayobjHinder[i].width) || (this.objwheel.left + this.objwheel.width)>=this.arrayobjHinder[i].left && (this.objwheel.left + this.objwheel.width) <= (this.arrayobjHinder[i].left + this.arrayobjHinder[i].width)){
                            clearInterval(intervalCheckGameOver);   
                            this.gameOver();
                        }
                    }
                    this.updateLevel();
                }
            },17);
            this.checkScore();
            console.log(this);
        }
    }

    this.gameOver = function(){
        var audio = new Audio("gameOver-Mp3.mp3");
        audio.play();
        this.objwheel.wheel.src = "wheelError.png";
        document.querySelector(".view-game .game-over p:nth-child(1)").innerHTML = "Điểm: " + valueScoreNow;
        document.querySelector(".view-game .game-over p:nth-child(2)").innerHTML = "Điểm cao nhất: " + this.getScore();
        this.saveScore(valueScoreNow);
        this.arrayobjHinder.forEach((value)=>{
            cancelAnimationFrame(value.animationRun);
        });
        clearInterval(this.intervalCheckScore);
        this.objwheel.wheel.style.animation = "none";
        document.querySelector(".view-game .game-over").style.transform = "scale(1,1)";
        document.querySelector(".view-game .game-over input").onclick = function(){
            document.querySelector(".view-game .game-over").style.transform = "scale(0.001,0.001)";
            location.reload();
        };
    }
}
score.prototype = new level();
game.prototype = new score();

var newGame = new game();
newGame.playGame();



