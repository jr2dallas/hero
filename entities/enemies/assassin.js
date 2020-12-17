class Assassin extends Enemy{

    GROW_HIT_BONUS = 0.1

    img_src = "images/entities/assassin.jpg";

    constructor(name, health, hitStrength, level, xp) {
        super(name, health, hitStrength, level, xp, ENEMY_TYPE_ASSASSIN)
    }
}