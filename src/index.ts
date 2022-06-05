// Copyright (c) 2022 Gabriel Barros - https://github.com/Colgate13

export * from './modules/World/World';
export * from './modules/Dices/Dices';

import { Guerreiro } from './modules/classes/Guerreiro';
import { Ladino } from './modules/classes/Ladino';
import { Mago } from './modules/classes/Mago';

export const Classes = {
    Guerreiro,
    Ladino,
    Mago,
}

export * from './modules/Player/Player';
export * from './shared/utils/Utils';
