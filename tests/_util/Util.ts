import { ataqueProps, Personagem } from "../../personagem/Personagem";

export class TestSimple extends Personagem{

  constructor(name: string){
      super(name);
  }

  
  public ataqueDefault(): ataqueProps {
    return {
      dano: 0,
      name: 'teste Ataque'
    }
  }
}