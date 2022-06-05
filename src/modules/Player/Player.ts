import { ataqueProps, statusProps, Class } from "../classes/domain/Class";

export interface IPlayerProps {
    id: string;
    name: string;
    x: number;
    y: number;
    skin: string;
}

export class Player {

    protected Class: Class; 
    protected _id: string;
    protected _skin: string;
    private _x: number = 0;
    private _y: number = 0;


    constructor(Class: Class, skin = '') {
        this.Class = Class;
        this._id = `${this.Class.name}-${Date.now()}`;
        this._skin = skin || `${this.Class.name}-${this._id}`;
    }

    public get status(): statusProps {
        return this.Class.status;
    }

    public get PlayerName() {
        return this.Class.name;
    }

    set x(x: number) {
        this._x = x;
    }

    set y(y: number) {
        this._y= y;
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    get id(): string {
        return this._id;
    }

    set skin(skin: string) {
        this._skin = String(skin || this.PlayerName);
    }

    get skin(): string {
        return this._skin;
    }

}