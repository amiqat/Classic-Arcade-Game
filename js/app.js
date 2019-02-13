// Enemies our player must avoid
class Enemy {
    constructor({ x = -80, y, speed = Math.floor(Math.random() * 5 + 1) * 60 }) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        this.x = x;
        this.y = y;
        this.speed = speed;
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        if (collides(player, this)) {
            player.reset();
        }
        if (this.x < 500) {
            this.x += this.speed * dt;
        } else {
            this.speed = Math.floor(Math.random() * 5 + 1) * 60;
            this.x = -80;
        }

    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}
var isWin = false;

// sprite width and height 
const sprite_w = 101;
const sprite_h = 83;

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.x = sprite_w * 2;
        this.y = (sprite_h * 5) - 10;

        // This is the image of the player
        this.sprite = 'images/char-horn-girl.png';
    }
    update(dt) {
        if (this.y < 70) {
            victory();
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    // handleInput()
    // handle keyboard input to move the player x or y
    // @param {string} dir - Direction to travel
    handleInput(dir) {
        switch (dir) {
            case 'left': this.x -= (this.x > 0) ? sprite_w : 0;
                break;
            case 'up': this.y -= (this.y > 0) ? sprite_h : 0;
                break;
            case 'right': this.x += (this.x < sprite_w * 4) ? sprite_w : 0;
                break;
            case 'down': this.y += (this.y < sprite_h * 4) ? sprite_h : 0;
                break;

        }
        console.log(`Player x: ${this.x} | y: ${this.y}`);
    }

    reset() {
        this.x = sprite_w * 2;
        this.y = (sprite_h * 5) - 10;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player();
const allEnemies = [];
const enemy1 = new Enemy({ y: 60 + sprite_h * 0 });
const enemy2 = new Enemy({ y: 60 + sprite_h * 1 });
const enemy3 = new Enemy({ y: 60 + sprite_h * 2 });
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', ({ keyCode }) => {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[keyCode]);
});

//https://stackoverflow.com/questions/13916966/adding-collision-detection-to-images-drawn-on-canvas
function collides(a, b) {

    if (a.x < b.x + 70 && a.x + 70 > b.x && a.y < b.y + sprite_h && a.y + sprite_h > b.y)
        return true;
    return false;
}

function victory() {
    isWin = true;
    Swal.fire({
        type: 'success',
        title: 'Congratulations! You Won!',
        confirmButtonText: 'Play Again',
        confirmButtonColor: '#47deb5'
    }).then(function () {
        init();
    });
}