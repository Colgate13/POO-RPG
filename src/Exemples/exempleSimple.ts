import { Key, createTerminalGameIo } from 'terminal-io-flufflys'
import { DefaultWord } from "../modules/World/World";
import { Player } from '../modules/Player/Player';
import { Guerreiro } from '../modules/classes/Guerreiro';
import { Ladino } from '../modules/classes/Ladino';

console.clear();

const FPS = 5;
const BOARD_WIDTH_X = 32;
const BOARD_HEIGHT_Y = 16;

let SafeX = (BOARD_WIDTH_X);
let SafeY = (BOARD_HEIGHT_Y);

const worldSettings = {
  green: "X",
  earth: "E",
  water: "~",
  lava: "!",
  air: "*",
  snow: "^",
  stone: ",",
  sand: ";",
  slippery_sand: ":",
  playerBlock: "P",
  playersBlock: "U",
};
const fileImportMap = "../../builds/map.txt";

const World = new DefaultWord("Default", BOARD_WIDTH_X, BOARD_HEIGHT_Y, worldSettings, true, fileImportMap);

const ClasseGuerreiro = new Guerreiro('G', 10, 4, 3, 3, 2, 2);
const ClasseLadino = new Ladino('L', 10, 4, 3, 3, 2, 2);

const player1 = new Player(ClasseGuerreiro, '☯');
const player2 = new Player(ClasseLadino, '☯');

World.setRespawn(9, 5);
World.spawnPlayers([player1, player2]);

const keypressHandler = (instance: any, keyName: any) => {

  console.log(`Key pressed: ${keyName}`);
  console.log(`Press 'M' to save`);

  switch (keyName) {
    case Key.ArrowDown:
      if (player1.y == (SafeY - 1)) {
        break;
      }
      player1.y = player1.y + 1;
      World.movePlayers([player1], player1.x, player1.y);
      break;
    case Key.ArrowUp:
      if (player1.y <= 0) {
        break;
      }
      player1.y = player1.y - 1;
      World.movePlayers([player1], player1.x, player1.y);
      break;
    case Key.ArrowLeft:
      if (player1.x - 1 <= 0) {
        break;
      }
      player1.x = player1.x - 1;
      World.movePlayers([player1], player1.x, player1.y);
      break;
    case Key.ArrowRight:
      if (player1.x == (SafeX - 1)) {
        break;
      }
      player1.x = player1.x + 1;
      World.movePlayers([player1], player1.x, player1.y);
      break;
    case "a" || "A":
      player2.x = player2.x - 1;
      World.movePlayers([player2], player2.x, player2.y);
      break;
    case "d" || "D":
      player2.x = player2.x + 1;
      World.movePlayers([player2], player2.x, player2.y);
      break;
    case "s" || "S":
      player2.y = player2.y + 1;
      World.movePlayers([player2], player2.x, player2.y);
      break;
    case "w" || "W":
      player2.y = player2.y - 1;
      World.movePlayers([player2], player2.x, player2.y);
      break;
    case "m" || "M":
      World.save();
      break;
    case Key.Escape:
      instance.exit();
      break;
  }

  frameHandler(instance);
};


const frameHandler = (instance: any) => {
  let frameData = "";

  World.World.forEach((Line) => {
    Line.forEach((char) => {
      frameData += char;
    });
    frameData += '\n';
  })

  SafeX = World.WorldX;
  SafeY = World.WorldY;

  instance.drawFrame(frameData, World.WorldX, World.WorldY);
};


createTerminalGameIo({
  fps: FPS,
  frameHandler,
  keypressHandler
});


