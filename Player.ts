import { uuid } from 'uuidv4';

class Player {
    private id: string;
    private _name: string;
    private hp: number;
    private classe: 'Mago' | 'Guerreiro' | 'Ladino';
    private power: number;
    private agility: number;


    constructor(name: string, 
        classe: 'Mago' | 'Guerreiro' | 'Ladino', 
        power: number,
        agility: number,
        ){
        this.id = uuid();

        this._name = name;
        this.classe = classe;

        if(power > 15 || power < 5){
            throw new Error('Power muito alto ou muito baixo');
        }
        if(agility > 15 || agility < 5){
            throw new Error('agility muito alto ou muito baixo');
        }

        switch(this.classe){
            case 'Mago':
                this.hp = 25;
                this.power = power * 2;
                this.agility = agility * 0.9;

            break;

            case 'Guerreiro':
                this.hp = 100;
                this.power = power * 2;
                this.agility = agility * 1.2;

            break;

            case "Ladino": 
                this.hp = 50;
                this.power = power * 1.3;
                this.agility = agility * 2;


            break;
        }
    }

    //Se colocarmos um get, quer dizer que não precisamos colocar obj.status()
    //Sem o get precisamos passar como uma função normal
    public get status(): string {
    return `
Personagem Status
Nome: ${this._name},
Hp: ${this.hp},
Classe: ${this.classe},
Power: ${this.power},
Agility: ${this.agility}
`    
}
    public get name(): string{
        return this._name;
    }

    public set name(nome: string){
        this._name = nome;
    }



    public batalha(Player1: Player, Player2: Player): string {
        let pontosPlayer1 = 0; 
        let pontosPlayer2 = 0;

        if(Player1.power > Player2.power){
            pontosPlayer1 += (Player1.power - Player2.power) * Math.random() * 30;
        }else{
            pontosPlayer2 += (Player2.power - Player1.power) * Math.random() * 30;

        }
        
        if(Player1.agility > Player2.agility){
            pontosPlayer1 += (Player1.agility - Player2.agility) * Math.random() * 30;
        }else{
            pontosPlayer2 += (Player2.agility - Player1.agility) * Math.random() * 30;

        }
        
        if(pontosPlayer1 > pontosPlayer2) return `Player 1 venceu > Pontos = ${pontosPlayer1}\n Player 2 pontos = ${pontosPlayer2}`;
        if(pontosPlayer2 > pontosPlayer1) return `Player 2 venceu > Pontos = ${pontosPlayer2}\n Player 1 pontos = ${pontosPlayer1}`;
        if(pontosPlayer1 == pontosPlayer2) return `Empate\n Pontos Player1 = ${pontosPlayer1} | Player2 = ${pontosPlayer2}`;

        return 'Batalha encerrada\n';
    }

    
}

export default Player;