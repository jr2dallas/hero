class Golem extends Enemy{

    SHIELD_BONUS  = 1.0
    SHIELD_CHANCE = 0.5
    
    img_src = "images/entities/golem.jpg";

    constructor(name, health, hitStrength, level, xp) {
        super(name, health, hitStrength, level, xp, ENEMY_TYPE_GOLEM)
    }
}