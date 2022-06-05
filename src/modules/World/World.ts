import { World } from './domain/World';
import { Player, IPlayerProps } from '../Player/Player';
import { IBlocks, IMove, IMovePlayer, ISpawn, ISaveLoad } from './domain/IWorlds';

/**
 * @class World
 * @description class Abstract World
 * @author Gabriel Barros github.com/Colgate13x
 * 
 * @property {string} name name of the world
 * @property {number} x x position of the world
 * @property {number} y y position of the world
 * @property {IBlocks} blocks blocks of the world
 * 
 * @IBlocks {IBlocks} {} blocks of the world
 */
export class DefaultWord extends World { 

    protected respawnX: number = 0;
    protected respawnY: number = 0;

    constructor(name: string, x: number, y: number, blocks: IBlocks, importMap: boolean = false, mapFile: string = "") {
        super(name, x, y, blocks, {
            importMap,
            mapFile,
            loadSave: {
                load: false
            }
        });
    }

    public spawnPlayer(Player: IPlayerProps): ISpawn { 
        this._spawnPlayer(this.respawnX, this.respawnY, Player);

        return {
            x: this.respawnX,
            y: this.respawnY,
            Block: Player.name
        }
    }

    public spawnPlayers(Player: Player[]) { 
        Player.forEach(player => {
            const spawning = this.spawnPlayer({
                id: player.id,
                name: player.PlayerName,
                x: player.x,
                y: player.y,
                skin: player.skin
            });
            player.x = spawning.x;
            player.y = spawning.y;
        });
    }

    public get World() {
        return this.world;
    }

    public get WorldGraph(): any {
        return this.__worldGraph;
    }

    public setRespawn(x: number, y: number) {
        this.respawnX = x;
        this.respawnY = y;
    }

    public movePlayer(Move: IMovePlayer): ISpawn {
        const moved = this._movePlayer(Move);
        return {
            Block: moved.skin,
            x: Move.x,
            y: Move.y
        };
    }
    
    public movePlayers(Player: Player[], x: number, y: number) { 
        Player.forEach(player => {
            const move = this.movePlayer({
                x: x,
                y: y,
                playerId: player.id
            });
            player.x = move.x;
            player.y = move.y;
        });
    }

    public async save() { 
        return await this._save();
    }

    public listSave() { 
        return this._ListSave();
    }

    public loadSave(save: ISaveLoad) { 
        return this._loadSave(save);
    }
}
