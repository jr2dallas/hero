/**
 * Une entité peut représenter n'importe quel héro ou enemi
 * 
 * Idées
 * 
 * - vole
 * - se régénère
 * 
 * 
 */
class Entity{

    /** Bonus d'attaque */
    ATTACK_BONUS = 0
    /** Malus d'attaque */
    ATTACK_MALUS = 0
    /** Bonus de bouclier */
    SHIELD_BONUS = 0
    /** Chance d'obtenir un bonus de bouclier */
    SHIELD_CHANCE = 0
    /** Pourcentage gain de vie à la fin du combat */
    HEALTH_GAIN = 0.1

    GROW_HIT_BONUS = 0.0


    /** Enemis qui engendrent un bonus d'attaque */
    enemiesBonusAttack = []
    /** Enemis qui engendrent un bonus de défense */
    enemiesMalusAttack = []

    /** Image de l'entité */
    img_src = "";

    /** Santé originale de l'entité (permet de savoir sa santé à l'origine même en cours de combat ou health=0) */
    originalHealth = 0

    originalHitStrength = 0

    lastShieldBonus = 0;

    hasLevelUp = false

    /**
     * Constructeur d'une entité
     * 
     * @param {String} name Nom de l'entité
     * @param {Int} health Santé de l'entité
     * @param {Int} hitStrength Dégats de l'entité
     * @param {Int} level Level de l'entité
     * @param {Int} xp XP de l'entité
     * @param {String} race Race de l'entité
     */
    constructor(name, health, hitStrength, level, xp, race) {
        console.warn(this)
        this.race = race;
        this.name = name;
        this.health = Math.round(health);
        this.originalHealth = this.health
        this.hitStrength = Math.round(hitStrength);
        this.originalHitStrength = hitStrength;
        this.level = parseInt(level);
        this.xp = parseInt(xp);
    }

    getId(){
        if(this instanceof Enemy)
            return ENEMY_TYPE_LIST.indexOf(this.getRace())
        return HERO_TYPE_LIST.indexOf(this.getRace())
    }

    getUniqueId(entity){
        return "H" + this.getId() + "_E" + entity.getId()
    }

    /**
     * Réinitialiser la santé de l'entité comme à l'origine
     */
    reinitialize(){
        this.health = this.originalHealth
        this.hitStrength = this.originalHitStrength
    }
    
    /**
     * Renvoie la santé initiale de l'entité
     */
    getOriginalHealth(){
        return this.originalHealth
    }

    /**
     * A la fin du combat, l'entité régénère des points de vie calculés en fonction de la santé initiale de l'enemi
     * 
     * @param {Int} enemyHealth Santé initiale totale de l'enemi
     */
    earnHealth(enemyHealth){
        this.setHealth(this.getHealth() + this.computeEarnedHealth(enemyHealth))
    }

    /**
     * Calcule le nombre de point de vie gagné en fonction de la santé initiale de l'enemi
     * 
     * @param {Int} enemyHealth Santé initiale totale de l'enemi
     */
    computeEarnedHealth(enemyHealth){
        return enemyHealth * this.HEALTH_GAIN
    }

    /**
     * L'entité a-t-elle un bonus d'attaque avec ce type d'enemi ?
     * 
     * @param {ENEMY_TYPE_*} enemyType 
     */
    hasBonusAttackWith(enemyType){
        if(this.enemiesBonusAttack.indexOf(enemyType) >= 0)
            return true;
        return false;
    }

    /**
     * L'entité a-t-elle un malus d'attaque avec ce type d'enemi ?
     * 
     * @param {ENEMY_TYPE_*} enemyType 
     */
    hasMalusAttackWith(enemyType){
        if(this.enemiesMalusAttack.indexOf(enemyType) >= 0)
            return true;
        return false;
    }

    /**
     * Renvoie le bouclier bonus de l'entité
     */
    getShieldBonus(){
        return this.SHIELD_BONUS
    }

    /**
     * L'entité possède-t-elle un bonus de bouclier selon un pourcentage de chance
     */
    hasShieldBonus(){
        this.lastShieldBonus = Math.random() < this.SHIELD_CHANCE
        return this.lastShieldBonus
    }

    /**
     * Renvoie le bonus d'attaque de l'entité
     */
    getBonusAttack(){
        return this.ATTACK_BONUS
    }

    /**
     * Renvoie le malus d'attaque de l'entité
     */
    getMalusAttack(){
        return this.ATTACK_MALUS
    }

    getGrowHitBonus(){
        return this.GROW_HIT_BONUS
    }

    getGrowHitStrengthBonus(){
        return this.getGrowHitBonus() * this.getHitStrengthRaw()
    }

    growHit(){
        this.setHitStrength(this.getHitStrengthRaw() + this.getGrowHitStrengthBonus())
    }

    /**
     * L'entité à été touché avec hitStrength point de dégat
     * Déduire hitStrength de la santé de l'entité
     * @param {int} hitStrength 
     */
    isHit(hitStrength){
        this.setHealth(this.getHealth() - hitStrength)
    }

    /**
     * L'entité n'a plus de santé ?
     */
    isDead(){
        return this.getHealth() < 0
    }

    /*
    hasLevelUp(){
        return this.hasLevelUp
    }*/

    /**
     * Ajoute xpWin XP à l'entité
     * Si le nombre d'XP est supérieur ou égal à 10, on ajoute un level et on remet les XP à 0
     */
    win(xpWin){

        var nbLevel = Math.round(xpWin / 10)
        var nbXp = xpWin % 10

        this.setXP(this.getXP() + nbXp)
        this.setLevel(this.getLevel() + nbLevel)

        if(nbLevel > 0){
            this.hasLevelUp = true
        }
    }

    /**
     * Déclarer mort
     */
    die(){
        console.error("bye bye " + this.getName())
        //this.reinitialize()
    }

    getImageSrc(){
        return this.img_src
    }


    /***************************************************/
    /*************** Getters and setters ***************/
    /***************************************************/
    getName() {
        return this.name
    }

    getHealth() {
        return this.health
    }

    getHitStrength() {
        return this.hitStrength * this.getLevel()
    }

    getHitStrengthRaw() {
        return this.hitStrength
    }

    getLevel(){
        return this.level
    }

    getXP(){
        return this.xp
    }

    getRace(){
        return this.race
    }

    setName(name) {
        this.name = name
    }

    setHealth(health) {
        this.health = health
    }

    setHitStrength(hitStrength) {
        this.hitStrength = hitStrength
    }

    setLevel(level){
        this.level = level
    }

    setXP(xp){
        this.xp = xp
    }

    setRace(race){
        this.race = race
    }

    
    /***************************************************/
    /*************** Get Html table      ***************/
    /***************************************************/


    displayBonusHit(){
 
        if(!this.enemiesBonusAttack.length)
            return "";

        var tooltip = "Bonus d'attaque de "+(this.ATTACK_BONUS*100)+"% contre " + this.enemiesBonusAttack.join(', ');
        var message = 'Hit +' + (this.ATTACK_BONUS*100) +'%';
        var postMessage = this.enemiesBonusAttack.map(enemy => {
            return '<span class="badge badge-secondary">'+enemy+'</span>'
        }).join(' ')

        return this.displayRowCapacity(
            "green", 
            "my_location", 
            "success", 
            message,
            tooltip,
            postMessage
        );
    }

    displayMalusHit(){

        if(!this.enemiesMalusAttack.length)
            return "";

        var tooltip = "Malus d'attaque de "+ (this.ATTACK_MALUS*100) +"% contre " + this.enemiesMalusAttack.join(', ');
        var message = 'Hit -' + (this.ATTACK_MALUS*100) +'%'
        var postMessage = this.enemiesMalusAttack.map(enemy => {
            return '<span class="badge badge-secondary">'+enemy+'</span>'
        }).join(' ');

        return this.displayRowCapacity(
            "orange", 
            "my_location", 
            "warning", 
            message, 
            tooltip,
            postMessage
        );
    }

    displayGrowHitBonus(){

        var growHitBonus = this.getGrowHitBonus() * 100
        
        if(!growHitBonus)
            return "";

        var tooltip = "Gagne "+growHitBonus+"% de HitStrength après chaque attaque";
        var message = '+' +growHitBonus+'% après attaque';

        return this.displayRowCapacity(
            "green", 
            "trending_up", 
            "success", 
            message,
            tooltip
        );
    }

    displayShieldBonus(){

        if(!this.SHIELD_BONUS)
            return "";

        var tooltip = "Le bouclier bloque "+ (this.SHIELD_BONUS*100) +"% de l'attaque";
        tooltip += " avec "+ (this.SHIELD_CHANCE*100) +"% de chance réussir"
    
        var message =  'Shield +' + (this.SHIELD_BONUS*100) +'%'
        var postMessage = '<span class="badge badge-secondary">' + (this.SHIELD_CHANCE*100) + '% de chance </span>'

        return this.displayRowCapacity(
            "green", 
            "my_location", 
            "success", 
            message,
            tooltip,
            postMessage
        );
    }

    
    /*
        <i class="material-icons" style="color: green">trending_up</i>
        <i class="material-icons" style="color: red">trending_down</i>
    */


    /**
     * Affiche une ligne de capacité avec un logo, une couleur, un texte et un tooltip
     * 
     * @param {String} color CSS Color
     * @param {String} logo Material Icon (https://material.io/resources/icons/)
     * @param {String} badge Boostrap badge classes (https://getbootstrap.com/docs/4.3/components/badge/)
     * @param {String} message Message
     * @param {String} postMessage Message placé après span bagde
     * @param {String} tooltip Help message
     */
    displayRowCapacity(color, logo, badge, message, tooltip, postMessage){
        return '<tr style="border-top-style:solid;border-width:1px;border-color:gainsboro">'+
                '<td colspan="" class="capabilities" data-toggle="tooltip" title="' + (tooltip ? tooltip : "") + '">'+
                    '<i class="material-icons" style="color: '+color+'">'+logo+'</i>&nbsp;'+
                '</td>' + 
                '<td>' +
                    '<span class="badge badge-'+badge+'" style="vertical-align: super">' +
                        (message ? message : "") + 
                    '</span>' + '<br />' +
                    (postMessage ? postMessage : "") +
                '</td>'+
            '</tr>';
    }


    /**
     * 
     * @param {*} displayMinimalStats 
     */
    displayTable(displayMinimalStats){
        return '<table class="table">' +
        '<tbody>'+
            '<tr>' +
                '<td data-toggle="tooltip" title="Race"><i class="material-icons md-48">pest_control_rodent</i></td>' +
                '<td><b>' + this.getRace() + '</b></td>' +
            '</tr>' + 
            '<tr>'+
                '<td data-toggle="tooltip" title="Santé"><i class="material-icons md-48">favorite</i></td>' +
                '<td>' + this.getHealth() + '</td>' +
            '</tr>' +
            '<tr>'+
                '<td data-toggle="tooltip" title="Force de frappe (Hit Strength)"><i class="material-icons md-48">my_location</i></td>' +
                '<td>' + this.getHitStrength() + // + ' (raw ' + this.getHitStrengthRaw()+')</td>' +
            '</tr>' +

            (!displayMinimalStats ? 
                
                '<tr>'+
                    '<td data-toggle="tooltip" title="Nom"><i class="material-icons md-48">face</i></td>' +
                    '<td>' + this.getName() + '</td>' +
                '</tr>' +
                '<tr>'+
                    '<td data-toggle="tooltip" title="Level"><i class="material-icons md-48">upgrade</i></td>' +
                    '<td>' + this.getLevel() + '</td>' +
                '</tr>' + 
                '<tr>'+
                    '<td data-toggle="tooltip" title="XP"><i class="material-icons md-48">grade</i></td>' +
                    '<td>' + this.getXP() + '</td>' +
                '</tr>' +
                '<tr>' +
                    '<td colspan="2"><h5>Capacité(s)</h5></td>'+
                '</tr>' +

                this.displayBonusHit() + 

                this.displayMalusHit() + 

                this.displayShieldBonus() +

                this.displayGrowHitBonus() 

            : ''
            
            ) +

        '</tbody>' +
        '</table>';
    }
}