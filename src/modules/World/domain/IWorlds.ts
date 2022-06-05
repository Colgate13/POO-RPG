import { IPlayerProps } from "../../Player/Player";

export interface IWorlds {
    importMap: boolean;
    mapFile: string;
    loadSave: {
        load: boolean;
        save?: ISaveLoad;
    };
}

export interface IBlocks {
    green: string;
    earth: string;
    water: string;
    lava: string;
    air: string;
    snow: string;
    stone: string;
    sand: string;
    slippery_sand: string;
    playerBlock: string;
    playersBlock: string;
}

export interface ISpawn {
    x: number;
    y: number;
    Block: string;
}

export interface IMovePlayer { 
    playerId: string;
    x: number;
    y: number;
}

export interface IMove { 
    x: number;
    y: number;
    BlockProps: {
        Block: string;
        currentX: number;
        currentY: number;
    }
}

export interface IElement {
    block: string;
    skin: string;
    x: number;
    y: number;
    Actions: any;
}

export interface IPlayersWorld extends IPlayerProps{ }

export interface ILoad {
    elements: IElement[];
    players: IPlayersWorld[];
    world: string[][];
    name: string;
    id: string;
    x: number;
    y: number;
    blocks: IBlocks;
    respawn: ISpawn;
}

export interface ISaveLoad {
    NameSave: string;
    IdSave: string;
    x: number;
    y: number;
}