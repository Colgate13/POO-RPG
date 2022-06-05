import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';
import { IPlayerProps } from '../../Player/Player';
import { IBlocks, IElement, IMove, IMovePlayer, IPlayersWorld, ISpawn, ISaveLoad, IWorlds, ILoad } from './IWorlds';

/**
 * @class World
 * @description class Abstract World
 * @author Gabriel Barros - github.com/Colgate13x
 * 
 * @property {string} name name of the world
 * @property {number} x x position of the world
 * @property {number} y y position of the world
 * @property {IBlocks} blocks blocks of the world
 * 
 * @method {string} getName() get the name of the world
 * @method {string} getId() get the id of the world
 * @method {number} getX() get the x position of the world
 * @method {number} getY() get the y position of the world
 * @method {IBlocks} getBlocks() get the blocks of the world
 * 
 * @method {Array} getWorld() get the world array ASCII
 */
export abstract class World {
    protected name: string;
    protected id: string;
    protected x: number;
    protected y: number;
    protected blocks: IBlocks;
    protected worldElements: IElement[] = [];
    protected PlayersWorld: IPlayersWorld[] = [];
    protected world: string[][] = [];
    private respawn: ISpawn = { x: 0, y: 0, Block: "RESPAWN" };

    constructor(name: string, x: number, y: number, blocks: IBlocks, { importMap, mapFile, loadSave }: IWorlds) {

        if (loadSave.load) {
            const load = this._loadSave(loadSave.save || {} as ISaveLoad);

            this.name = load.name;
            this.id = load.id;
            this.x = load.x;
            this.y = load.y;
            this.blocks = load.blocks;
            this.worldElements = load.elements;
            this.PlayersWorld = load.players;
            this.world = load.world;
            this.respawn = load.respawn;


        } else {
            this.id = `${name}-${x}-${y}-${Date.now()}`;
            this.name = name;
            this.x = x;
            this.y = y;
            this.blocks = blocks;

            importMap ? (async () => this.importWorld(mapFile))() : this.createWorld();
        }

    }

    private createWorld() {
        for (let y = 0; y < this.y; y++) {

            this.world[y] = [];

            for (let x = 0; x < this.x; x++) {
                this.world[y][x] = this.blocks.earth;

                if (x > 10 && y > 10) {
                    this.world[y][x] = this.blocks.green;
                }

                if (x > 15 && y > 15) {
                    this.world[y][x] = this.blocks.sand;
                }

                this.worldElements.push({
                    block: this.blocks.earth,
                    skin: this.blocks.earth,
                    x: x,
                    y: y,
                    Actions: null,
                })
            }
        }
    };

    protected importWorld(mapFile: string) {
        let file = readFileSync(join(mapFile), 'utf8');

        if (!file || file.length === 0) throw new Error('Map file not found');

        let lines = file.split('\n');
        console.log(lines);
        let linesFormatater: any = [];
        lines.forEach((line, index) => {
            linesFormatater.push([...line]);
        });

        for (let y = 0; y < this.y; y++) {
            this.world[y] = [];
            for (let x = 0; x < this.x; x++) {
                this.world[y][x] = linesFormatater[y][x] || '';

                this.worldElements.push({
                    block: String(linesFormatater[y][x]),
                    skin: String(linesFormatater[y][x]),
                    x: x,
                    y: y,
                    Actions: null,
                })
            }
        }
    }

    public get _ListPlayers() {
        return this.PlayersWorld;
    }

    public get _ListElements() {
        return this.worldElements;
    }

    public get World() {
        return this.world;
    }

    public get Name() {
        return this.name;
    }

    public get Id() {
        return this.id;
    }

    public get X() {
        return this.x;
    }

    public get Y() {
        return this.y;
    }

    public get Blocks() {
        return this.blocks;
    }

    public get WorldY() {
        return this.world.length;
    }

    public get WorldX() {
        let swap = 0;

        this.world.forEach((line) => {
            line.length > swap ? swap = line.length : null;
        })

        return swap;
    }

    public get __worldGraph() {
        let worldGraph: string = '';

        this.world.forEach((line) => {
            line.forEach((char) => {
                worldGraph += char;
            });
            worldGraph += '\n';
        })

        return worldGraph;
    }

    protected _spawnPlayer(x: number, y: number, Player: IPlayerProps) {
        if (this.worldElements.length === 0) throw new Error('worldElements not found');

        this.worldElements.forEach((element) => {
            if (element.x === x && element.y === y) {
                this.PlayersWorld.push({
                    id: Player.id,
                    x: x,
                    y: y,
                    skin: Player.skin || '🛃',
                    name: Player.name
                });
            }
        });

        const Players = this.PlayersWorld.filter((Player) => Player.x === x && Player.y === y);

        if (!Players || Players.length == 0) throw new Error('Player not found');

        if (Players.length > 1) {
            this.world[y][x] = this.Blocks.playersBlock;
        } else {
            this.world[y][x] = Players[0].skin;
        }

        return this.world;
    }

    protected _movePlayer(Move: IMovePlayer): IPlayersWorld {
        const PlayerMoving = this.PlayersWorld.find((Player) => {
            if (Player.id === Move.playerId) {
                return Player;
            }
        });

        if (!PlayerMoving) throw new Error('Player not found');

        const element = this.worldElements.find((element) => {
            if (element.x === PlayerMoving.x && element.y === PlayerMoving.y) {
                return element;
            }
        });

        if (!element) throw new Error('Element not found');

        PlayerMoving.x = Move.x;
        PlayerMoving.y = Move.y;

        const Players = this.PlayersWorld.filter((Player) => {
            if (Player.x === element.x && Player.y === element.y) {
                return Player;
            }
        });

        if (!Players) throw new Error('Players not found');

        if (Players.length > 1) {
            this.world[element.y][element.x] = this.Blocks.playersBlock;
        } else if (Players.length == 1) {
            this.world[element.y][element.x] = Players[0].skin;
        } else {
            this.world[element.y][element.x] = element.block || this.Blocks.earth;
        }

        if (!PlayerMoving) throw new Error('Player not found');

        const PlayersCurrent = this.PlayersWorld.filter((Player) => {
            return Player.x === Move.x && Player.y === Move.y;
        });

        if (PlayersCurrent.length > 1) {
            this.world[Move.y][Move.x] = this.Blocks.playersBlock;
        } else if (PlayersCurrent.length == 1) {
            this.world[Move.y][Move.x] = PlayerMoving.skin;
        } else {
            this.world[Move.y][Move.x] = element.block || this.Blocks.earth;
        }

        return PlayerMoving;
    }

    protected _save() {

        const settings = {
            x: this.x,
            y: this.y,
            blocks: this.blocks,
            name: this.name,
            id: this.id,
            respawn: this.respawn
        }

        const folderSaves = join(__dirname, "..", "..", "..", "..", "..", `saves`);
        const currentFolderSave = `${folderSaves}/${this.Id}`;

        try {
            if (!existsSync(folderSaves)) {
                mkdirSync(folderSaves);
            }

            if (!existsSync(currentFolderSave)) {
                mkdirSync(currentFolderSave);
            }

        } catch (error) {
            console.log(error);
        }

        try {
            writeFileSync(join(currentFolderSave, `world-world.txt`), JSON.stringify(this.world));
            writeFileSync(join(currentFolderSave, `settings-world.json`), JSON.stringify(settings));
            writeFileSync(join(currentFolderSave, `elemnts-world.json`), JSON.stringify(this.worldElements));
            writeFileSync(join(currentFolderSave, `players-world.json`), JSON.stringify(this.PlayersWorld));
        } catch (error) {
            console.log(error);
        }
    }

    protected _ListSave(): ISaveLoad[] {
        const folderSaves = join(__dirname, "..", "..", "..", "..", "..", `saves`);

        return readdirSync(folderSaves).map(folders => {

            const NameSave = folders.split('-')[0];
            const XSave = folders.split('-')[1];
            const YSave = folders.split('-')[2];
            const IdSave = folders.split('-')[3];

            return {
                NameSave,
                IdSave,
                x: Number(XSave),
                y: Number(YSave),
            }
        });
    }

    protected _loadSave(save: ISaveLoad): ILoad {
        const folderSaves = join(__dirname, "..", "..", "..", "..", "..", `saves`);

        const folder = readdirSync(folderSaves).map(folders => {

            const IdSave = folders.split('-')[3];

            if (save.IdSave === IdSave) {
                return folders;
            }
        })[0];

        if (!folder) throw new Error('Save not found');

        const currentFolderSave = `${folderSaves}/${folder}`;

        const settings = JSON.parse(readFileSync(join(currentFolderSave, `settings-world.json`), 'utf8'));
        const elemntsFile = JSON.parse(readFileSync(join(currentFolderSave, `elemnts-world.json`), 'utf8'));
        const playersWorld = JSON.parse(readFileSync(join(currentFolderSave, `players-world.json`), 'utf8'));
        const worldFile = JSON.parse(readFileSync(join(currentFolderSave, `world-world.json`), 'utf8'));

        if (!settings) throw new Error('Settings not found');
        if (!elemntsFile) throw new Error('Elemnts not found');
        if (!playersWorld) throw new Error('Players not found');
        if (!worldFile) throw new Error('World not found');

        const x: number = Number(settings.x) || 0;
        const y: number = Number(settings.y) || 0;
        const blocks: IBlocks = settings.blocks;
        const name: string = String(settings.name);
        const id: string = String(settings.id);
        const respawn: ISpawn = {
            Block: settings.respawn.Block,
            x: Number(settings.respawn.x) || 0,
            y: Number(settings.respawn.y) || 0,
        };

        const elements: IElement[] = elemntsFile;
        const players: IPlayersWorld[] = playersWorld;
        const world: string[][] = worldFile;

        return {
            elements,
            players,
            world,
            x,
            y,
            blocks,
            name,
            id,
            respawn,
        }
    }
}