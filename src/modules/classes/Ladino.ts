import { Class, ataqueProps } from "./domain/Class";
import Dices from "../Dices/Dices";

export class Ladino extends Class{

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

        this.classe = "Ladino";
        this.nivel = 3;

        this.vida = Dices.d20(100) + 10;

        this.strength = Dices.d20(strength) + 1;
        this.destreza = Dices.d20(destreza) + 5;
        this.constitution = Dices.d20(constitution) - 1;
        this.inteligencia = Dices.d20(inteligencia) + 2;
        this.sabedoria = Dices.d20(sabedoria) + 1;
        this.carisma = Dices.d20(carisma) + 1;

        this.ataques.push({ 
            name: "Default Ladino Ataque", 
            dano: (Dices.d20(this.destreza) + (this.nivel + this.strength)) 
        })

    }

    public ataqueDefault(): ataqueProps {
        return this.ataques[0]
    }

    
}