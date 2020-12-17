class Werewolf extends Enemy{

    SHIELD_BONUS  = 0.5
    SHIELD_CHANCE = 1.0

    img_src = "images/entities/werewolf.jpg";

    constructor(name, health, hitStrength, level, xp) {
        super(name, health, hitStrength, level, xp, ENEMY_TYPE_WEREWOLF)
    }
}