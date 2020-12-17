
class Battle{

    constructor(battleId, hero, enemy, displayManager){

        this.battleId = battleId
        this.currentTurn = 0
        this.hero = hero
        this.enemy = enemy
        this.displayManager = displayManager
        this.eventType = new EventType ()
        this.eventLogType = new EventLogType ()


        // creer l'évènement de nouveau combat
        this.displayManager.drawNewRow(
            this.eventType.EVENT_NEW_BATTLE,
            this.battleId, 
            hero.getRace() + " VS " + enemy.getRace(),
            this.currentTurn, 
            hero, 
            enemy, 
            []
        )
    }

    /**
     * Démarrage du combat
     */
    run(){

        var attacker;
        var defender;
        
        do{

            if(this.currentTurn%2 == 0)
            {
                attacker = this.hero
                defender = this.enemy
            }else
            {
                attacker = this.enemy
                defender = this.hero
            }

            this.entityAttack(attacker, defender);

            this.currentTurn ++

        }while(!attacker.isDead() && !defender.isDead())

        this.endOfBattle(attacker, defender)
    }

    /**
     * Entity attack another entity
     * 
     * @param {entity} attacker Entity attacker
     * @param {entity} defender Entity defender
     */
    entityAttack(attacker, defender){
        
        var eventLogs = []
        var hitStrengthAttack = attacker.getHitStrength();
 
        // Bonus d'attaque contre certaines races
        if(attacker.hasBonusAttackWith(defender.getRace())){
            var bonusAttack = Math.round(hitStrengthAttack * attacker.getBonusAttack())
            hitStrengthAttack = hitStrengthAttack + bonusAttack;

            eventLogs.push(new EventLog(this.eventLogType.TYPE_ATTACK_BONUS, (attacker.getBonusAttack()*100)+'% (+'+bonusAttack+' Hit)'))
        }

        // Malus d'attaque contre certaines races
        if(attacker.hasMalusAttackWith(defender.getRace())){
            var malusAttack = Math.round(hitStrengthAttack * attacker.getMalusAttack())
            hitStrengthAttack = hitStrengthAttack - malusAttack;

            eventLogs.push(new EventLog(this.eventLogType.TYPE_ATTACK_MALUS, (attacker.getMalusAttack()*100)+'% (-'+malusAttack+' Hit)'))
        }

        // Bouclier du défenseur
        if(defender.hasShieldBonus()){
            var shieldBonus = Math.round(hitStrengthAttack * defender.getShieldBonus())
            hitStrengthAttack = hitStrengthAttack - shieldBonus;

            eventLogs.push(new EventLog(this.eventLogType.TYPE_SHIELD_BONUS, (defender.getShieldBonus()*100)+'% (-'+shieldBonus+' Hit)'))
        }

        // calcul de l'attaque
        hitStrengthAttack = Math.max(Math.round(hitStrengthAttack), 0)

        // toucher le defenseur
        defender.isHit(hitStrengthAttack)

        // gain de hit ?
        if(attacker.getGrowHitBonus()){
            attacker.growHit() 
        }

        eventLogs.push(new EventLog(this.eventLogType.TYPE_HIT, hitStrengthAttack))
        eventLogs.push(new EventLog(this.eventLogType.TYPE_HEALTH, Math.round(defender.getHealth())))

        if(attacker.getGrowHitBonus()){
            eventLogs.push(new EventLog(this.eventLogType.TYPE_GROW_HIT_BONUS, Math.round(attacker.getGrowHitBonus() * hitStrengthAttack)))
        }

        
        // creer l'évènement de nouveau tour
        this.displayManager.drawNewRow(
            this.eventType.EVENT_NEW_TURN,
            this.battleId, 
            attacker.getName() + " attaque " + defender.getName(),
            this.currentTurn, 
            attacker, 
            defender, 
            eventLogs
        )
    }

    /**
     * 
     */
    endOfBattle(attacker, defender){

        if(!defender.isDead()){
            console.error("Defender is not dead !!! End of battle but defender is not dead ??!")
            return
        }

        var eventTitle = defender.getName() + " is Dead"
        var eventLogs = []

        // Xp à gagner (2 XP tout les 5 tours)
        var xpWin = Math.max(Math.round(this.currentTurn / 5) * 2, 2)

        defender.die()
        attacker.win(xpWin)

        eventLogs.push(new EventLog(this.eventLogType.TYPE_XP, xpWin))

        if(attacker.hasLevelUp){
            eventLogs.push(new EventLog(this.eventLogType.TYPE_LEVEL, attacker.getLevel()))
        }

        eventLogs.push(new EventLog(this.eventLogType.TYPE_HEALTH_GAIN, Math.round(attacker.computeEarnedHealth(defender.getOriginalHealth()))))


        attacker.earnHealth(defender.getOriginalHealth());

        // creer l'évènement de fin du combat
        this.displayManager.drawNewRow(
            this.eventType.EVENT_END_BATTLE,
            this.battleId, 
            eventTitle,
            this.currentTurn-1, 
            attacker, 
            defender, 
            eventLogs
        )
    }
}