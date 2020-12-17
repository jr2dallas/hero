class Dwarf extends Hero{

    SHIELD_CHANCE = 0.2
    SHIELD_BONUS  = 0.5

    ATTACK_BONUS = 0.1
    ATTACK_MALUS = 0.1

    enemiesMalusAttack = [ENEMY_TYPE_DRAGON, ENEMY_TYPE_GRIFFIN]
    enemiesBonusAttack = [ENEMY_TYPE_GOLEM, ENEMY_TYPE_ASSASSIN, ENEMY_TYPE_BERSERKER, ENEMY_TYPE_WEREWOLF]

    img_src = "images/entities/dwarf.jpg";

    constructor(name, health, hitStrength, level, xp) {
        super(name, health, hitStrength, level, xp, HERO_TYPE_DWARF)
    }
}