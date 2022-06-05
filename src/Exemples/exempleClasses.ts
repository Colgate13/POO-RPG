import { Guerreiro } from '../modules/classes/Guerreiro'
import { Ladino } from '../modules/classes/Ladino'
import { Class } from '../modules/classes/domain/Class'

try {
  const denis: Class = new Guerreiro('Denis Soldado', 10, 4, 3, 3, 2, 2)
  const colgate: Class = new Ladino('Colgate Ladino', 3, 10, 2, 5, 2, 2)

  console.log(denis)
  console.log(colgate)

  console.log(colgate.name)

  console.log(denis.status)
  console.log(colgate.status)

  console.log(`${denis.status.nome} have inteligencia = ` + denis.status.inteligencia)
  console.log(colgate.status.inteligencia)

  console.log(`${colgate.name} Ataque nome: ${colgate.ataqueDefault().name} -> Dano = ${colgate.ataqueDefault().dano}`)

  if (colgate.status.vida < 1) { console.log("Colgate morreu!") }
  if (denis.status.vida < 1) { console.log("Denis morreu!") }

} catch (error) {
  console.log(error);
}
