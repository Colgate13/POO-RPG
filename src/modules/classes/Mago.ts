import { Class, ataqueProps } from "./domain/Class";
import Dices from "../Dices/Dices";

export class Mago extends Class{
 
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

        this.classe = "Mago";
        this.nivel = 3;

        this.vida = Dices.d20(100) + 5;


        this.strength = Dices.d20(strength) - 3;
        this.destreza = Dices.d20(destreza) + 1;
        this.constitution = Dices.d20(constitution) + 1;
        this.inteligencia = Dices.d20(inteligencia) + 5;
        this.sabedoria = Dices.d20(sabedoria) + 5;
        this.carisma = Dices.d20(carisma) - 2;

        this.ataques.push({ 
            name: `Default ${this.classe} Ataque`, 
            dano: (Dices.d20(this.inteligencia) + (this.nivel + this.sabedoria)) 
        })
    }

    public ataqueDefault(): ataqueProps {
        return this.ataques[0]
    }
}