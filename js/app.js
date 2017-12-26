// 这是我们的玩家要躲避的敌人
var Enemy = function (x, y, speed) {
  // 要应用到每个敌人的实例的变量写在这里
  // 我们已经提供了一个来帮助你实现更多
  this.x = x;
  this.y = y;
  this.speed = speed;

  // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件

  this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function (dt) {
  // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
  // 都是以同样的速度运行的
  if (this.x < 550) {
    this.x += this.speed * dt;
  } else {
    this.x = -100;
    this.speed = 100 + Math.floor(Math.random() * 415);
  }

  if (player.x < this.x + 60 && player.x + 37 > this.x && player.y < this.y + 25 && 30 + player.y > this.y) {
    player.x = 200;
    player.y = 380;
  }

  // this.x = this.speed * dt;
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function (x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.playerSprite = ['images/char-princess-girl.png', 'images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png'];
  this.sprite = this.playerSprite[Math.floor(Math.random() * 5)];
};

Player.prototype.update = function () {
  // 防止玩家移出画布
  if (this.y > 380) {
    this.y = 380;
  }

  if (this.x > 400) {
    this.x = 400;
  }

  if (this.x < 0) {
    this.x = 0;
  }

  // 玩家到达终点后自动回到原点
  if (this.y < 0) {
    this.x = 200;
    this.y = 380;
  }
};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (keyPress) {
  switch (keyPress) {
    case 'left':
      this.x -= this.speed + 50;
      break;
    case 'up':
      this.y -= this.speed + 30;
      break;
    case 'right':
      this.x += this.speed + 50;
      break;
    case 'down':
      this.y += this.speed + 30;
      break;
  }
};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
var allEnemies = [];
var enemy;
var enemyPosition = [65, 145, 225];
enemyPosition.forEach(Y => {
  enemy = new Enemy(0, Y, 100 + Math.floor(Math.random() * 415));
  allEnemies.push(enemy);
});

// 把玩家对象放进一个叫 player 的变量里面
var player = new Player(200, 380, 50);

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
