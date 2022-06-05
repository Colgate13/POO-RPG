import { ataqueProps, Class } from "../../modules/classes/domain/Class";

export class TestSimple extends Class {

  constructor(name: string) {
    super(name);
  }


  public ataqueDefault(): ataqueProps {
    return {
      dano: 0,
      name: 'teste Ataque'
    }
  }
}