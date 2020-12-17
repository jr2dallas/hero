class Berserker extends Enemy{

    SHIELD_BONUS  = 0.3
    SHIELD_CHANCE = 1.0

    ATTACK_BONUS = 0.3
    ATTACK_MALUS = 0.3

    enemiesMalusAttack = [HERO_TYPE_ELF]
    enemiesBonusAttack = [HERO_TYPE_HUMAN]
    
    img_src = "images/entities/berserker.jpg";

    constructor(name, health, hitStrength, level, xp) {
        super(name, health, hitStrength, level, xp, ENEMY_TYPE_BERSERKER)
    }
}