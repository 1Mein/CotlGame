// EnemyFactory.js
import { AntiMage } from './AntiMage.js';
import { Riki } from './Riki.js';

export class EnemyFactory {
    createEnemy(enemyType, gameWidth, gameHeight) {
        switch (enemyType) {
            case 'AntiMage':
                return new AntiMage(gameWidth, gameHeight);
            case 'Riki':
                return new Riki(gameWidth, gameHeight);
            // Add more cases for other enemy types as needed
            default:
                throw new Error(`Unknown enemy type: ${enemyType}`);
        }
    }
}