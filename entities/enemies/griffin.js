class Griffin extends Enemy{

    img_src = "images/entities/griffin.jpg";
    
    constructor(name, health, hitStrength, level, xp) {
        super(name, health, hitStrength, level, xp, ENEMY_TYPE_GRIFFIN)
    }

    // @todo
    fly(){
    }
    
    attackFromSky(){
        
    }
}