import { ataqueProps, Class } from "./domain/Class";
import Dices from "../Dices/Dices";

export class Guerreiro extends Class{

    constructor(nome: string, 
        strength: number,
        destreza: number, 
        constitution: number, 
        inteligencia: number, 
        sabedoria: number, 
        carisma: number){
        super(nome);
        
        const result = strength + destreza + constitution + inteligencia + sabedoria + carisma;
        if(result > 24){
            throw Error(`Voce pode distribuir apenas 24 pontos entre os atributos, voce distribuiu = S${result}`)
        }

        this.classe = "Guerreiro";
        this.nivel = 3;

        this.vida = Dices.d20(100) + 15;

        this.strength = Dices.d20(strength) + 5;
        this.destreza = Dices.d20(destreza) + 1;
        this.constitution = Dices.d20(constitution) + 1;
        this.inteligencia = Dices.d20(inteligencia) + 1;
        this.sabedoria = Dices.d20(sabedoria) - 1;
        this.carisma = Dices.d20(carisma) + 2;

        this.ataques.push({ 
            name: `Default ${this.classe} Ataque`, 
            dano: (Dices.d20(this.strength) + (this.nivel + this.destreza)) 
        })
    }


    public ataqueDefault(): ataqueProps {
        return this.ataques[0]
    }
}