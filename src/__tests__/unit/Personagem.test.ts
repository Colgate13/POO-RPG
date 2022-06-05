import {
  describe,
  test,
  expect,
} from '@jest/globals'
import { TestSimple } from '../_util/Util'
import {  Personagem } from "../../modules/classes/domain/Personagem";

describe('#Test abstract class Personagem', () => {

  describe('-> Create Personagem ', () => {

    test('#Create Simple Personagem', () => {

    const PersonTest: Personagem = new TestSimple('PersonTest') ;

    expect(PersonTest.name).toEqual('PersonTest');
    expect(PersonTest.status.classe).toEqual('Guerreiro');
    expect(PersonTest.status.raca).toEqual('Humano');
    expect(PersonTest.status.vida).toEqual(0);

    expect(PersonTest.ataqueDefault().dano).toEqual(0);
    expect(PersonTest.ataqueDefault().name).toEqual('teste Ataque');

    expect(PersonTest.name = 'Mudado').toEqual('Mudado')
  
    });
    
  })

  describe('-> Get Personagem ', () => {

    const PersonTest: Personagem = new TestSimple('PersonTest') ;

    test('#Get Name', () => {
      expect(PersonTest.name).toEqual('PersonTest');
    });
    test('#Get All Props', () => {
      expect(PersonTest.status).toEqual({ 
        nome: 'PersonTest',
        vida: 0,
        classe: 'Guerreiro',
        raca: 'Humano',
        strength: 0,
        destreza: 0,
        constitution: 0,
        inteligencia: 0,
        sabedoria: 0,
        carisma: 0,
       });

    });

    test('#Get unic Prop', () => {
      expect(PersonTest.status.inteligencia).toEqual(0);
    });

  })

  describe('-> Batalha Personagem ', () => {

    test('#Create batalha', () => {

        const PersonTest1: Personagem = new TestSimple('PersonTest1') ;
        const PersonTest2: Personagem = new TestSimple('PersonTest2') ;
  
        const batalha = PersonTest1.batalha(PersonTest1, PersonTest2);
  
        expect(batalha).toContain('Vitoria PersonTest');
    });

  })

})

