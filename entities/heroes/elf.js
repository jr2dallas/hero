class Elf extends Hero{
    
    ATTACK_BONUS = 0.5
    ATTACK_MALUS = 0.1

    enemiesBonusAttack = [ENEMY_TYPE_DRAGON, ENEMY_TYPE_GRIFFIN]
    enemiesMalusAttack = [ENEMY_TYPE_GOLEM, ENEMY_TYPE_ASSASSIN, ENEMY_TYPE_BERSERKER, ENEMY_TYPE_WEREWOLF]

    img_src = "images/entities/elf.jpg";

    constructor(name, health, hitStrength, level, xp) {
        super(name, health, hitStrength, level, xp, HERO_TYPE_ELF)
    }
}