const Columns = 10;
const Rows = 20;
const Block_size = 30;
const Color_mapping = [
  "red",
  "orange",
  "green",
  "purple",
  "blue",
  "cyan",
  "yellow",
  "white",
];
const White_color_id = 7;

const BRICK=[
  [
    [
      [1, 7, 7],
      [1, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 1, 1],
      [7, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [7, 7, 1],
    ],
    [
      [7, 1, 7],
      [7, 1, 7],
      [1, 1, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [7, 1, 7],
      [7, 1, 1],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [1, 7, 7],
    ],
    [
      [1, 1, 7],
      [7, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 7, 1],
      [1, 1, 1],
      [7, 7, 7],
    ],
  ],
  [
    [
      [1, 7, 7],
      [1, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 1, 1],
      [1, 1, 7],
      [7, 7, 7],
    ],
    [
      [7, 1, 7],
      [7, 1, 1],
      [7, 7, 1],
    ],
    [
      [7, 7, 7],
      [7, 1, 1],
      [1, 1, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [1, 1, 7],
      [1, 7, 7],
    ],
    [
      [1, 1, 7],
      [7, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 7, 1],
      [7, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 7],
      [7, 1, 1],
    ],
  ],
  [
    [
      [7, 7, 7, 7],
      [1, 1, 1, 1],
      [7, 7, 7, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 1, 7],
      [7, 7, 1, 7],
      [7, 7, 1, 7],
      [7, 7, 1, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 7, 7, 7],
      [1, 1, 1, 1],
      [7, 7, 7, 7],
    ],
    [
      [7, 1, 7, 7],
      [7, 1, 7, 7],
      [7, 1, 7, 7],
      [7, 1, 7, 7],
    ],
  ],
  [
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [1, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 1, 7],
      [7, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 1, 7],
      [1, 1, 7],
      [7, 1, 7],
    ],
  ],
];

const Key_code ={
  Left: 'ArrowLeft',
  Right: 'ArrowRight',
  Up: 'ArrowUp',
  Down: 'ArrowDown'
}

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
ctx.canvas.width = Columns * Block_size;
ctx.canvas.height = Rows * Block_size;

class Board {
  constructor(ctx) {
    this.ctx = ctx;
    this.grid = this.generateWhiteBoard();
    this.score=0
    this.gameOver = false;
    this.isplay = false;

    this.Sounds = new Audio('../sounds/am-thanh-tra-loi-dung-chinh-xac-www.tiengdong.com.mp3'); 
    this.gameOverSound = new Audio('../sounds/Am-thanh-oh-nooo-www_tiengdong_com.mp3')
  }

  reset(){
    this.score=0;
    this.grid=this.generateWhiteBoard();
    this.gameOver=false;
    this.drawBoard();
    document.getElementById('score').innerHTML = this.score;
  }

  generateWhiteBoard() {
    return Array.from({ length: Rows }, () => Array(Columns).fill(White_color_id) );
  }

  drawCell(xAxis, yAxis, ColorID) {
    this.ctx.fillStyle = Color_mapping[ColorID] || Color_mapping[White_color_id];
    this.ctx.fillRect(xAxis * Block_size,yAxis * Block_size, Block_size,  Block_size);
    this.ctx.fillStyle = 'black';
    this.ctx.strokeRect(xAxis * Block_size,yAxis * Block_size, Block_size,  Block_size);
  }

  drawBoard(){
    for(let row = 0; row < this.grid.length;row++){
      for(let col = 0; col < this.grid.length;col++){
        this.drawCell(col, row, this.grid[row][col]);
      }
    }
  }
  HandleComplete(){
    const lastgrid = board.grid.filter((row) => {
      return row.some(col => col === White_color_id);
    });
    const newScore = Rows - lastgrid.length;
    const newRows = Array.from({ length: newScore }, () => Array(Columns).fill(White_color_id) );

    if(newScore){
      board.grid = [...newRows,...lastgrid];
      this.Scores(newScore * 10);
      this.Sounds.play();
      console.log({lastgrid});
    }
  }

  Scores(newScore){
    this.score+= newScore;
    document.getElementById('score').innerHTML=this.score;

  }
  HandleGameover(){
    this.gameOver=true;
    this.isplay=false;
    this.gameOverSound.play();
    alert('GAME OVER !!!!');
  }


}

class Brick {
  constructor(id){
    this.id = id;
    this.layout = BRICK[id];
    this.active = 0;
    this.colPos = 4;
    this.rowPos = -2;
  }

  draw(){
    for (let row = 0; row < this.layout[this.active].length; row++ ){
      for (let col=0; col< this.layout[this.active][0].length;col++){
        if (this.layout[this.active][row][col] !== White_color_id){
          board.drawCell(col+this.colPos,row+this.rowPos, this.id);
        }
      }
    }
  }
  clear(){
    for (let row = 0; row < this.layout[this.active].length; row++ ){
      for (let col=0; col< this.layout[this.active][0].length;col++){
        if (this.layout[this.active][row][col] !== White_color_id){
          board.drawCell(col+this.colPos,row+this.rowPos, White_color_id);
        }
      }
    }
  }
  moveLeft(){
    if (!this.Check(this.rowPos, this.colPos - 1,this.layout[this.active])){
      this.clear();
      this.colPos--;
      this.draw();
    }
  }
  moveRight(){
    if (!this.Check(this.rowPos, this.colPos + 1,this.layout[this.active])){
      this.clear();
      this.colPos++;
      this.draw();
    }
  }
  moveDown(){
    if (!this.Check(this.rowPos+1, this.colPos,this.layout[this.active])){
      this.clear();
      this.rowPos++;
      this.draw();
      return;
    }
    this.Handle();
    NewBrick();
  }
  Turn(){
    if (!this.Check(this.rowPos, this.colPos, this.layout[(this.active + 1) % 4]  )){
      this.clear();
      this.active=(this.active + 1) % 4;
      this.draw();
    }
  }
  Check(nextRow,nextCol,nextLayout){

    for (let row = 0; row < nextLayout.length; row++ ){
      for (let col=0; col< nextLayout[0].length;col++){
        if (nextLayout[row][col] !== White_color_id && nextRow>=0 ){
          if ( 
            col + nextCol <0 ||
            col + nextCol >= Columns || 
            row + nextRow >= Rows ||
            board.grid[row+nextRow][col + nextCol] !== White_color_id ) return true;
        }
      }
    }
    return false;
  }
  Handle(){
    if(this.rowPos<=0){
      board.HandleGameover();
      return;

    }

    for (let row = 0; row < this.layout[this.active].length; row++ ){
      for (let col=0; col< this.layout[this.active][0].length;col++){
        if (this.layout[this.active][row][col] !== White_color_id){
          board.grid[row + this.rowPos][col + this.colPos] = this.id;
        }
      }
    }

    board.HandleComplete();
    board.drawBoard();
  
  }

}

function NewBrick(){
  brick = new Brick(Math.floor(Math.random()*10)% BRICK.length);
}

board = new Board(ctx);
board.drawBoard();
document.getElementById('play').addEventListener('click', () =>{
  board.reset();
  board.isplay=true;
  NewBrick();
  const refresh = setInterval(() =>{
    if(!board.gameOver){
      brick.moveDown();

    }else{
      clearInterval(refresh);
    }
  },1000);
  
})


document.addEventListener('keydown', (e) => {
  if (!board.gameOver && board.isplay){
    console.log({e});
    switch (e.code){
      case Key_code.Left:
        brick.moveLeft();
        break;
      case Key_code.Right:
        brick.moveRight();
        break;
      case Key_code.Down:
        brick.moveDown();
        break;
      case Key_code.Up:
        brick.Turn();
        break;
      default:
        break;
    }

  }
});

console.table(board.grid);