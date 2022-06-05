import { Guerreiro } from '../modules/classes/Guerreiro'
import { Ladino } from '../modules/classes/Ladino'

import { DefaultWord } from "../modules/World/World";

import { Player } from '../modules/Player/Player';

const World = new DefaultWord("Default", 32, 16, {
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
    playersBlock: "Ps",
}, true, "../../../builds/map.txt");

const ClasseGuerreiro = new Guerreiro('✝', 10, 4, 3, 3, 2, 2);
const ClasseLadino = new Ladino('🚹', 10, 4, 3, 3, 2, 2);

const player1 = new Player(ClasseGuerreiro, '☯');
const player2 = new Player(ClasseLadino, '🚹');

World.setRespawn(9, 5);
World.spawnPlayers([player1, player2]);

console.log(player1.status);
console.log(player2.status);
console.log(World.WorldGraph);

World.movePlayers([player1], 1, 5);
console.log(World.WorldGraph);

World.movePlayers([player2], 1, 5);
console.log(World.WorldGraph);

World.movePlayers([player1], 2, 5);
console.log(World.WorldGraph);

World.movePlayers([player1], 10, 5);
console.log(World.WorldGraph);
