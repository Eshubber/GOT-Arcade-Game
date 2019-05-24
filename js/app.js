//Strict Mode
'use strict';
// Enemies our player must avoid
const Enemy = function(x,y,speed,pic) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = pic;
    this.x = x;
    this.y = y;
    this.speed = speed;

    
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;

    if (this.x > 502){
        this.x = 0;
    }

    //This function is used to reset the speeds and game level
    const reset = function(){
        level = 1;
        enemy1.speed = 150;
        enemy2.speed = 200;
        enemy3.speed = 175;
        levCounter.textContent = "Level: " + level;
    }

    //This insures that the game is reset when a collision occurs 
    //45 is used because that is around half the width of the player image
    if (player.x < this.x + 45 && player.x + 45 > this.x && player.y === this.y){
        player.x = 202;
        player.y = 462;

        //The function is invoked to reset the speeds and game level
        reset();
    }

    //If the player reaches the 6th row, the enemy speeds increase
    if (player.y === 37){
        this.speed +=50;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y); 
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function(){
    this.sprite = 'images/jon-snow.png';
    this.x = 202;
    this.y = 462;
    
}

Player.prototype.update = function (dt){

    //This function increases the level and resets the player's position
    const win = function(){
        player.y = 462;
        player.x = 202;
        level++;
        levCounter.textContent = "Level: "+ level;
    }
    //When the player reaches the 6th row, the level text is updated
    if (this.y === 37){
        setTimeout (win, 15);
       
    }

};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(arrow){
    if (arrow === 'down' && this.y < 440){
        this.y += 85;
    }

    if (arrow === 'up' && this.y > 37){
        this.y -= 85;
    }

    if (arrow === 'right' && this.x <410){
        this.x += 104;
    }

    if(arrow === 'left' && this.x > -6){
        this.x -= 104;
    }

}


const player = new Player();
const enemy1 = new Enemy(315, 122, 150, 'images/white-walker2.png');
const enemy2 = new Enemy(450, 207, 200, 'images/night-king2.png');
const enemy3 = new Enemy(200, 292, 175, 'images/white-walker2.png');
const allEnemies = [enemy1, enemy2, enemy3];
const levCounter = document.querySelector('.level')
let level = 1;

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
