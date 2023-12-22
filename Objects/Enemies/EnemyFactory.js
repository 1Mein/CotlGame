// EnemyFactory.js
import { AntiMage } from './AntiMage.js';
import { Riki } from './Riki.js';
import {Enemy} from './BaseEnemy.js';

export class EnemyFactory {
    createEnemy(enemyType) {
        switch (enemyType) {
            case 'AntiMage':
                return new AntiMage();
            case 'Riki':
                return new Riki();
            case 'Creep':
                return new Enemy();
            default:
                throw new Error(`Unknown enemy type: ${enemyType}`);
        }
    }
}