
class EventType{
    EVENT_NEW_BATTLE  = "EVENT_NEW_BATTLE"
    EVENT_NEW_TURN    = "EVENT_NEW_TURN"
    EVENT_END_BATTLE  = "EVENT_END_BATTLE"
}

class EventLogType{
    TYPE_HIT            = "TYPE_HIT"
    TYPE_HEALTH         = "TYPE_HEALTH"
    TYPE_ATTACK_BONUS   = "TYPE_ATTACK_BONUS"
    TYPE_ATTACK_MALUS   = "TYPE_ATTACK_MALUS"
    TYPE_SHIELD_BONUS   = "TYPE_SHIELD_BONUS"
    TYPE_HEALTH_GAIN    = "TYPE_HEALTH_GAIN"
    TYPE_GROW_HIT_BONUS = "TYPE_GROW_HIT_BONUS"
    TYPE_XP             = "TYPE_XP"
    TYPE_LEVEL          = "TYPE_LEVEL"
}

class EventLog{



    constructor(ruleType, value){
        this.ruleType = ruleType
        this.value = value
        this.eventLogType = new EventLogType()
    }

    getType(){
        return this.ruleType
    }

    getValue(){
        return this.value
    }

    getEventLog(value){
        switch(this.ruleType){
            case this.eventLogType.TYPE_HIT:
                return this.hit(value)
            case this.eventLogType.TYPE_HEALTH:
                return this.getHealth(value)
            case this.eventLogType.TYPE_ATTACK_BONUS:
                return this.bonusAttack(value)
            case this.eventLogType.TYPE_ATTACK_MALUS:
                return this.malusAttack(value)
            case this.eventLogType.TYPE_SHIELD_BONUS:
                return this.shieldBonus(value)
            case this.eventLogType.TYPE_HEALTH_GAIN:
                return this.health_gain(value)
            case this.eventLogType.TYPE_GROW_HIT_BONUS:
                return this.grow_hit_bonus(value)
            case this.eventLogType.TYPE_XP:
                return this.XP(value)
            case this.eventLogType.TYPE_LEVEL:
                return this.levelUp(value)
        }
        return "undefined getEventLog value: '" + this.ruleType + "'"
    }

    hit(value){
        return value + " Dégats sur l'ennemi "
    }

    getHealth(value){
        return value + " Santé de l'ennemi"
    }

    bonusAttack(value){
        return value + " Bonus d'attaque "
    }

    malusAttack(value){
        return value + " Malus d'attaque "
    }

    shieldBonus(value){
        return value + " Bouclier de défense "
    }

    health_gain(value){
        return value + " Gain de points de vie"
    }

    grow_hit_bonus(value){
        return value + " Gain de Hit"
    }

    XP(value){
        return value + " Gain d'XP"
    }

    levelUp(value){
        return value + " Nouveau Level"
    }
}