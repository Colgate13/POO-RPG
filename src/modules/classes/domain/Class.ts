import Dices from "../../Dices/Dices";

export interface statusProps {
    nome: string,
    vida: number,
    raca: string,
    classe: 'Mago' | 'Guerreiro' | 'Ladino',
    strength: number,
    destreza: number,
    constitution: number,
    inteligencia: number,
    sabedoria: number,
    carisma: number 
}

export interface ataqueProps {
    name: string;
    dano: number;
}

export abstract class Class{
    protected _nome: string;
    protected classe: 'Mago' | 'Guerreiro' | 'Ladino' = 'Guerreiro';
    protected nivel: number = 0;
    protected raca: string = 'Humano';
    protected vida: number = 0;
    protected strength: number = 0;
    protected destreza: number = 0;
    protected constitution: number = 0;
    protected inteligencia: number = 0;
    protected sabedoria: number = 0;
    protected carisma: number = 0;
    protected ataques: ataqueProps[] = [];

    constructor(nome: string){
        this._nome = nome;
    }

    public get name(): string{
        return this._nome;
    }

    public set name(nome: string){
        this._nome = nome;
    }

    public get status(): statusProps {
        return {
            nome: this._nome,
            vida: this.vida,
            classe: this.classe,
            raca: this.raca,
            strength: this.strength,
            destreza: this.destreza,
            constitution: this.constitution,
            inteligencia: this.inteligencia,
            sabedoria: this.sabedoria,
            carisma: this.carisma
        }
    }

    public abstract ataqueDefault(): ataqueProps;

    public batalha(player1: Class, player2: Class): string{
        const initialAtacante = Dices.d20(0)

        if(initialAtacante >= 10){
            player2.vida = player2.vida - player1.ataqueDefault().dano
            
            if(player2.vida < 1){
                return `Vitoria ${player1._nome}`
            }

            player1.vida = player1.vida - player2.ataqueDefault().dano

            if(player1.vida < 1){
                return `Vitoria ${player2._nome}`
            }

        }else{
            player1.vida = player1.vida - player2.ataqueDefault().dano

            if(player1.vida < 1){
                return `Vitoria ${player2._nome}`
            }

            player2.vida = player2.vida - player1.ataqueDefault().dano

            if(player2.vida < 1){
                return `Vitoria ${player1._nome}`
            }
        }

        return `Empate`
    }
}