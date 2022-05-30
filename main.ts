import Mago from './classes/Mago'
import Guerreiro from './classes/Guerreiro'
import Ladino from './classes/Ladino'
import { Personagem } from './personagem/Personagem';

try {
    const denis: Personagem = new Guerreiro('Denis Soldado', 10, 4, 3, 3, 2, 2) 
    const colgate: Personagem = new Ladino('Colgate Ladino', 3, 10, 2, 5, 2, 2) 

    console.log(denis)
    console.log(colgate)

    console.log(colgate.name)

    console.log(denis.status)
    console.log(colgate.status)

    console.log(`${denis.status.nome} have inteligencia = ` + denis.status.inteligencia)
    console.log(colgate.status.inteligencia)


    console.log(`${colgate.name} Ataque nome: ${colgate.ataqueDefault().name} -> Dano = ${colgate.ataqueDefault().dano}`)

    while(colgate.status.vida > 1 && denis.status.vida > 1){

        console.log("colgate.status.vida = " + colgate.status.vida)
        console.log("denis.status.vida = " + denis.status.vida)
        
        console.log(colgate.batalha(colgate, denis))
        
        console.log("colgate.status.vida = " + colgate.status.vida)
        console.log("denis.status.vida = " + denis.status.vida)
    }

    if(colgate.status.vida < 1) { console.log("Colgate morreu!") }
    if(denis.status.vida < 1) { console.log("Denis morreu!") }

} catch (error) {
    console.log(error);
}
