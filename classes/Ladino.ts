import { Personagem, ataqueProps } from "../personagem/Personagem";
import Utils from '../utils/Utils'

export default class Ladino extends Personagem{

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

        this.vida = Utils.random(100) + 10;

        this.strength = Utils.random(strength) + 1;
        this.destreza = Utils.random(destreza) + 5;
        this.constitution = Utils.random(constitution) - 1;
        this.inteligencia = Utils.random(inteligencia) + 2;
        this.sabedoria = Utils.random(sabedoria) + 1;
        this.carisma = Utils.random(carisma) + 1;

        this.ataques.push({ 
            name: "Default Ladino Ataque", 
            dano: (Utils.random(this.destreza) + (this.nivel + this.strength)) 
        })

    }

    public ataqueDefault(): ataqueProps {
        return this.ataques[0]
    }

    
}