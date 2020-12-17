
var heroes = [
    new Human("Enaever",   getRandomHealth(10000),                getRandomHit(300), getRandomLevel(10) , 0),
    new Elf("Alîlyan",     getRandomHealth(100), getRandomHit(300), getRandomLevel(10) , 0),
    new Dwarf("Faraimak",  getRandomHealth(100), getRandomHit(300), getRandomLevel(10) , 0),
]


var enemies = [
    new Assassin("Assassin's creed",    getRandomHealth(10000), getRandomHit(100), getRandomLevel(10) , 0),
    new Berserker("Svinfylkingars",     getRandomHealth(1000), getRandomHit(1000), getRandomLevel(5) , 0),
    new Dragon("Drakkhen",              getRandomHealth(5000), getRandomHit(300), getRandomLevel(10) , 0),
    new Golem("Loew",                   getRandomHealth(1000), getRandomHit(100), getRandomLevel(10) , 0),
    new Griffin("Thornfeather",         getRandomHealth(1000), getRandomHit(100), getRandomLevel(10) , 0),
    new Werewolf("Raulf",               getRandomHealth(1000), getRandomHit(100), getRandomLevel(10) , 0)
]

function getRandom(maxValue){
    return Math.round(Math.abs(Math.random() * maxValue))
}

function getRandomHealth(maxValue){
    return Math.max(this.getRandom(maxValue), 300)
}
function getRandomHit(maxValue){
    return Math.max(this.getRandom(maxValue), 30)
}
function getRandomLevel(maxValue){
    return Math.max(this.getRandom(maxValue), 1)
}


/**
 * Créé la card html et place l'image et le type du personnage
 * 
 * @param {*} elementId 
 * @param {*} textContent 
 * @param {*} img_src 
 */
function createCard(elementId, img_src, textContent, tableStats){
    var card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("shadow")
    card.classList.add("bg-white");
    card.classList.add("rounded");

    //shadow p-3 mb-5 bg-white rounded

    var img = document.createElement("img");
    img.src = img_src;
    img.classList.add('card-img-top');
    var body = document.createElement("body");
    body.classList.add('card-body')
    var title = document.createElement("h5");
    title.textContent = textContent
    title.classList.add('card-title')


    var table = document.createElement("table");
    table.classList.add('table')
    table.classList.add('stats')
    table.innerHTML = tableStats.trim();


    card.appendChild(img)
    body.appendChild(title)
    body.appendChild(table)
    card.appendChild(body)
    document.getElementById(elementId).appendChild(card);
}




heroes.forEach(hero => {
    createCard("heroes", hero.getImageSrc(), hero.getRace(), hero.displayTable())
});


enemies.forEach(enemy => {
    createCard("enemies", enemy.getImageSrc(), enemy.getRace(), enemy.displayTable())
});


var displayManager = new DisplayManager()

var battleSimulation = new BattleSimulation(heroes, enemies, displayManager)

battleSimulation.run()


var menuList = ['menu_heroes', 'menu_enemies', 'menu_fight', 'menu_stats']

const links = document.getElementsByClassName('statsheroes_menu')
for(var i = 0; i < links.length; i++){
    var link = links[i]
    link.addEventListener('click', event => {
        var id = event.target.id
        menuList.forEach(l => {
            if(l == id){
                var eltId = id.slice(5) + "_block"
                document.getElementById(id).classList.add("active")
                document.getElementById(eltId).classList.remove("d-none")
            }else{
                console.log("remove active for " + l)
                var eltId = l.slice(5) + "_block"
                document.getElementById(l).classList.remove("active")
                document.getElementById(eltId).classList.add("d-none")
            }
        })
    })
}

