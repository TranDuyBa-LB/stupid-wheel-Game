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

    this.createObj = function(){
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
        if(this.bottom == 0) {
            this.intervalUp = setInterval(()=>{
                if(this.bottom < this.y){
                    this.bottom += 2.5;
                    this.wheel.style.bottom = this.bottom + "px";
                } else {
                    clearInterval(this.intervalUp);
                    this.actionDown();
                }
            }, 8);
        }
    };

    this.actionDown = function(){
        this.intervalDown = setInterval(()=>{
            if(this.bottom > 0){
                this.bottom -= 2.5;
                this.wheel.style.bottom = this.bottom + "px";
            } else {
                clearInterval(this.intervalDown);
            }
        }, 8);
    };

    this.actionWheel = function(){
        this.createObj();
        window.onclick = this.actionUp.bind(this);
        window.onkeydown = (event)=>{
          if(event.keyCode == 32) {
            console.log(event.keyCode);
            this.actionUp();
          }
        };
    }
}
function hinder() {
    this.hinder;
    this.width = 20;
    this.height;
    this.position = "absolute";
    this.bottom;
    this.left;
    this.backgroundColor = "blue";
    this.aX = 1.5; // Gia tốc vật cản
    this.maxHeight = 3; // Chiều cao của vật cản
    this.numberXxX = 1/3; // Hệ số khoảng cách giữa các vật cản ( mẫu số == số lượng vật cản)
    this.intervalAction;
    this.src = "dinh.png";

    this.createHinder = function(){
        var that = this;
        function create(){
            hinderLast = that;
            that.left = widthViewGame;
            that.bottom = 0;
            that.height = Math.ceil(Math.random()*that.maxHeight + 2) * 10;
            that.hinder = document.createElement("img");
            that.hinder.src = that.src;
            that.hinder.style.width = that.width + "px";
            that.hinder.style.height = that.height + "px";
            that.hinder.style.position = that.position;
            that.hinder.style.left = that.left + "px";
            that.hinder.style.bottom = that.bottom + "px";
            viewGame.appendChild(that.hinder);
            that.actionHinder();
        }
        if(hinderLast != undefined){
            var interval = setInterval(function(){
                if(hinderLast.left < widthViewGame*that.numberXxX) {
                    create();
                    clearInterval(interval);
                }
            }, 5);
        } else {
            create();
        }
    };

    this.actionHinder = function(){
        this.intervalAction = setInterval(()=>{
            if(this.left > -this.width){
                this.left -= this.aX;
                this.hinder.style.left = this.left + "px";
            } else {
                clearInterval(this.intervalAction);
                viewGame.removeChild(this.hinder);
                this.createHinder();
            }
        }, 5);
    }
}

function game() {
    this.intervalCheckScore;
    this.objwheel;
    this.arrayobjHinder = [];
    
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
    }

    this.changeLevel = function(maxHeight, aX, y, secondsAnimation){
        this.arrayobjHinder.forEach((value)=>{
                value.maxHeight = maxHeight;
                value.aX = aX;
                this.objwheel.y = y;
                this.objwheel.wheel.style.animation = "rotateWheel "+ secondsAnimation +"s linear infinite";
            });
    }
    this.updateLevel = function(){
        switch(valueScoreNow){
            case 150:
                this.changeLevel(4, 1.7, 112, 0.8);
            break;
            case 250:
                this.changeLevel(5, 2, 114, 0.6);
            break;
            case 350:
                this.changeLevel(6, 2.3, 120, 0.4);
            break;
            case 450:
                this.changeLevel(7, 2.6, 130, 0.2);
            break;
            case 550:
                this.changeLevel(8, 2.9, 135, 0.1);
            break;
        }
    }
    this.checkScore = function(){
        scoreMax.innerHTML = "Điểm cao nhất: " + this.getScore();
        this.intervalCheckScore = setInterval(()=>{
            valueScoreNow += 1;
            scoreNow.innerHTML = "Điểm: " + valueScoreNow;
        }, 100);
    }

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
                    if(this.objwheel.bottom >= 0 && this.objwheel.bottom <= (this.arrayobjHinder[i].height)){
                        if(this.objwheel.left >= this.arrayobjHinder[i].left && this.objwheel.left <= (this.arrayobjHinder[i].left + this.arrayobjHinder[i].width) || (this.objwheel.left + this.objwheel.width)>=this.arrayobjHinder[i].left && (this.objwheel.left + this.objwheel.width) <= (this.arrayobjHinder[i].left + this.arrayobjHinder[i].width)){
                            clearInterval(intervalCheckGameOver);   
                            this.gameOver();
                        }
                    }
                    this.updateLevel();  
                }
            },10);
            this.checkScore();
        }
    }

    this.gameOver = function(){
        this.objwheel.wheel.src = "wheelError.png";
        document.querySelector(".view-game .game-over p:nth-child(1)").innerHTML = "Điểm: " + valueScoreNow;
        document.querySelector(".view-game .game-over p:nth-child(2)").innerHTML = "Điểm cao nhất: " + this.getScore();
        this.saveScore(valueScoreNow);
        this.arrayobjHinder.forEach((value)=>{
            clearInterval(value.intervalAction);
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

var newGame = new game();
newGame.playGame();



