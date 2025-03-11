// set up canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
    this.symbol = ['✕', '○', '□', '△'][random(0, 3)];
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.font = `${this.size * 3}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.symbol, this.x, this.y);
  }

  update() {
    if (this.x + this.size >= width) {
      this.velX = -Math.abs(this.velX);
    }

    if (this.x - this.size <= 0) {
      this.velX = Math.abs(this.velX);
    }

    if (this.y + this.size >= height) {
      this.velY = -Math.abs(this.velY);
    }

    if (this.y - this.size <= 0) {
      this.velY = Math.abs(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball)) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

const balls = [];

// Evento para agregar símbolos en PC con Ctrl + Y
document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key === 'y') {
    agregarSimbolo();
  }
});

// Función para agregar un nuevo símbolo
function agregarSimbolo() {
  const size = random(20, 40);
  const ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );
  balls.push(ball);
  parpadearTexto(); // Activar efecto visual al agregar un símbolo
}

// Función para hacer parpadear el texto al tocarlo en móvil
function parpadearTexto() {
  let flash = true;
  let interval = setInterval(() => {
    flash = !flash;
    ctx.fillStyle = flash ? 'white' : 'black';
    drawCounter();
  }, 100);

  setTimeout(() => {
    clearInterval(interval);
    ctx.fillStyle = 'white';
    drawCounter();
  }, 500);
}

// Detectamos si el usuario toca la parte del contador para agregar un símbolo en móvil
canvas.addEventListener('touchstart', (event) => {
  const touchX = event.touches[0].clientX;
  const touchY = event.touches[0].clientY;

  // Verificar si tocó dentro del área del contador
  if (touchY >= 10 && touchY <= 70 && touchX >= width / 4 && touchX <= (width / 4) * 3) {
    agregarSimbolo();
  }
});

// Función para mostrar el contador de símbolos
function drawCounter() {
  ctx.fillStyle = 'white';
  ctx.font = '24px Arial';
  ctx.textAlign = 'center';
  
  // Contador centrado en la parte superior
  ctx.fillText(`Símbolos: ${balls.length}`, width / 2, 30);
  
  // Mensaje de instrucciones
  ctx.font = '20px Arial';
  ctx.fillText('Presiona Control + Y (PC) o toca aquí (Móvil)', width / 2, 60);
}

// Bucle de animación
function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  drawCounter();
  requestAnimationFrame(loop);
}

loop();
