import { DefaultWord } from "../modules/World/World";

console.clear();

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

const fileImportMap = "../../../../../builds/map.txt";

const World = new DefaultWord("Default", BOARD_WIDTH_X, BOARD_HEIGHT_Y, worldSettings, true, fileImportMap);

const [a] = World.listSave();

World.loadSave(a);

console.log(World.WorldGraph);
console.log(World._ListElements);
console.log(World._ListPlayers);