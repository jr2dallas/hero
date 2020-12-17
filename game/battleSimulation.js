
class BattleSimulation{
    
    constructor(heroes, enemies, displayManager){
        this.heroes = heroes
        this.enemies = enemies
        this.displayManager = displayManager

        this.displayManager.drawStats(
            this.heroes, 
            this.enemies
        )
    }

    run(){



        var bestScore = 0;
        var bestScoreHero = undefined;

        this.heroes.forEach(hero => {

            var battle;
            var totalBattle = 0;

            for (let i = 0; i < this.enemies.length; i++) {

                const enemy = this.enemies[i];
                enemy.reinitialize()

                var battleId = 'BATTLE_'+hero.getUniqueId(enemy)

                battle = new Battle(battleId, hero, enemy, this.displayManager);
                battle.run()

                /*
                if(hero.isDead()){
                    console.error(hero.getName() + " is Dead")
                    break;
                }*/

                enemy.reinitialize()
                hero.reinitialize()

                totalBattle++;
            }

            if(totalBattle > bestScore){
                bestScore = totalBattle
                bestScoreHero = hero
            }

            console.error(hero.getName() + " totalBattle: " + totalBattle)

        })

        //console.error("Best HERO ! " + bestScoreHero.getName() + " score: " + bestScore)

    }
}