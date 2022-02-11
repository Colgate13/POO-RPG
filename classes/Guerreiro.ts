import { ataqueProps, Personagem } from "../personagem/Personagem";
import Utils from '../utils/Utils'
export default class Guerreiro extends Personagem{

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

        this.vida = Utils.random(100) + 15;


        this.strength = Utils.random(strength) + 5;
        this.destreza = Utils.random(destreza) + 1;
        this.constitution = Utils.random(constitution) + 1;
        this.inteligencia = Utils.random(inteligencia) + 1;
        this.sabedoria = Utils.random(sabedoria) - 1;
        this.carisma = Utils.random(carisma) + 2;

        this.ataques.push({ 
            name: `Default ${this.classe} Ataque`, 
            dano: (Utils.random(this.strength) + (this.nivel + this.destreza)) 
        })
    }


    public ataqueDefault(): ataqueProps {
        return this.ataques[0]
    }
}