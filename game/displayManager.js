class DisplayManager{

    constructor(){
        this.eventType = new EventType()
        this.eventLogType = new EventLogType()
    }

    drawNewRow(eventType, battleId, title, turn, hero, enemy, eventLogs){

        
        if(this.isEventNewBattle(eventType)){
            this.drawBattleNewTurn(battleId)
        }
        
        //console.log('draw new row', eventType, battleId, title, turn)

        this.drawBattleTurn(eventType, battleId, title, turn, hero, enemy, eventLogs)

        $('[data-toggle="tooltip"]').tooltip()
    }


    isEventNewBattle(eventType){
        return eventType == this.eventType.EVENT_NEW_BATTLE
    }

    isEventNewTurn(eventType){
        return eventType == this.eventType.EVENT_NEW_TURN
    }

    isEventEndBattle(eventType){
        return eventType == this.eventType.EVENT_END_BATTLE
    }



    getEventManager(){
        return this.eventManager
    }
   
    /*
    drawBattle(){

        var events = this.eventManager.getEvents()

        events.forEach(event => {

            var elementId = event.battleId
            
            var htmlEventNew = document.createElement("tr");
            htmlEventNew.innerHTML = this.drawBattleNewTurn(event)

            var htmlEvent = document.createElement("tr");
            htmlEvent.innerHTML = this.drawBattleTurn(event)

            document.getElementById(elementId).appendChild(htmlEventNew);
            document.getElementById(elementId).appendChild(htmlEvent);

        });

        this.eventManager.dropEvents()

    }
    */

    insertRowHtml(elementId, innerHTML){
        var htmlElement = document.createElement("tr");
        htmlElement.innerHTML = innerHTML
        document.getElementById(elementId).appendChild(htmlElement);

        //console.warn('insert row in ' + elementId, innerHTML)
    }

    insertDivHtml(elementId, innerHTML){
        var htmlElement = document.createElement("div");
        htmlElement.innerHTML = innerHTML
        document.getElementById(elementId).appendChild(htmlElement);
    }

    drawBattleNewTurn(elementId){
        /*
        var html = ""
            html += '<tr>'
            html +=     '<td colspan="4" class="badge-primary">'
            html +=         'Nouveau combat !'
            html +=     '</td>'
            html += '</tr>'
        
        this.insertRowHtml(elementId, html)
        */
    }
    
    
    drawBattleNewTurnPublic(event){
        var elementId = event.battleId
        var htmlEventNew = document.createElement("tr");
        htmlEventNew.innerHTML = this.drawBattleNewTurn(event)
        document.getElementById(elementId).appendChild(htmlEventNew);
    }  

    drawBattleTurnPublic(event){

        var elementId = event.battleId

        if(this.eventManager.isEventNewBattle(event.eventType)){
            this.drawBattleNewTurnPublic(event)
        }

        
        var htmlEvent = document.createElement("tr");
        htmlEvent.innerHTML = this.drawBattleTurn(event)
        document.getElementById(elementId).appendChild(htmlEvent);
    }

    drawBattleTurn(eventType, battleId, title, turn, hero, enemy, eventLogs){

        var html = ""

        html += '<tr>'
        html +=     '<td>'
        html +=         this.drawBattleTurnNumber(eventType, turn)
        html +=     '</td>'
        html +=     '<td>'
        html +=         '<img src="' + hero.getImageSrc() + '" />'
        html +=         '<div>' + hero.displayTable(this.isEventNewBattle(eventType) ? false : true) + '</div>'
        html +=     '</td>'
        html +=     '<td>'
        html +=         '<img src="' + enemy.getImageSrc() + '" />'
        html +=         '<div>' + enemy.displayTable(this.isEventNewBattle(eventType) ? false : true) + '</div>'
        html +=     '</td>'
        html +=     '<td>'
        html +=         this.drawBattleTurnLogs(eventType, battleId, title, turn, hero, enemy, eventLogs)
        html +=     '</td>'
        html += '</tr>'

        this.insertRowHtml(battleId, html)
    }

    drawBattleTurnNumber(eventType, turn){
        var html = ""

        if(this.isEventNewBattle(eventType))
        html += '<h4><span class="badge badge-success">Nouveau combat !</span></h4>'

        if(this.isEventNewTurn(eventType))
            html += '<h4><span class="badge badge-primary">Tour n° ' + (turn + 1) + '</span></h4>'
        
        if(this.isEventEndBattle(eventType))
            html += '<h4><span class="badge badge-danger">Fin du combat ...</span></h4>'

        return html
    }

    drawBattleTurnLogs(eventType, battleId, title, turn, hero, enemy, eventLogs){
        var html = ""

        var cssClass = ""
        if(this.isEventNewBattle(eventType))
            cssClass = "badge-primary"
        if(this.isEventEndBattle(eventType))
            cssClass = "badge-danger"
        
        html += "<h4><span class='badge " + cssClass + "'>" + title + "</span></h4>"
        html += "<ul>"
        
        eventLogs.forEach(log => {
            html += "<li>"
            html += this.drawBattleTurnEventLogs(log)
            html += "</li>"
        })
        
        html += "</ul>"
        return html
    }

    drawBattleTurnEventLogs(log){
        var icon = ""
        var color = ""
        var badge = ""

        switch(log.getType()){
            case this.eventLogType.TYPE_HIT:
                icon = 'my_location'
                color = 'red'
                badge = 'danger'
                break;
            case this.eventLogType.TYPE_HEALTH:
                icon = 'favorite'
                color = 'red'
                badge = 'danger'
                break;
            case this.eventLogType.TYPE_ATTACK_BONUS:
                icon = 'my_location'
                color = 'green'
                badge = 'success'
                break;
            case this.eventLogType.TYPE_ATTACK_MALUS:
                icon = 'my_location'
                color = 'orange'
                badge = 'warning'
                break;
            case this.eventLogType.TYPE_SHIELD_BONUS:
                icon = 'policy'
                color = 'orange'
                badge = 'warning'
                break;
            case this.eventLogType.TYPE_HEALTH_GAIN:
                icon = 'favorite'
                color = 'red'
                badge = 'success'
                break;
            case this.eventLogType.TYPE_GROW_HIT_BONUS:
                icon = 'my_location'
                color = 'green'
                badge = 'success'
                break;
            case this.eventLogType.TYPE_XP:
                icon = 'grade'
                color = 'green'
                badge = 'success'
                break;
            case this.eventLogType.TYPE_LEVEL:
                icon = 'upgrade'
                color = 'green'
                badge = 'success'
                break;
        }

        return log.getEventLog(
            '<i class="material-icons md-48" style="color:'+color+'">'+icon+'</i>' + 
            '<span class="badge badge-'+badge+'" style="vertical-align:super">' + log.getValue() + '</span>'

            
        )
    }





    drawStats(heroes, enemies){

        var html = this.drawNav(heroes)

        var first = true
        heroes.forEach(hero => {

            html += this.drawContent(hero, enemies, first)

            first = false

            enemies.forEach(enemy => {

                

            })
        })

        html += this.drawEnd()


        this.insertDivHtml("stats_block", html)
    }

    drawEnd(){
        return "</div>"
    }


    drawNav(entities){
        var html = '<h1>Stats</h1>' +
        
        '<nav>' +
        '<div class="nav nav-tabs" id="nav-tab" role="tablist" style="padding-left: 190px">'

        var first = true
        html += entities.map(e => {
            var title = e.getRace()
            var id = 'HERO_' + title
            var link = '<a class="nav-item nav-link '+(first ? 'active' : '')+'" id="'+id+'-tab" data-toggle="tab" href="#'+id+'" role="tab" aria-controls="'+id+'">'+title+'</a>'
            first = false
            return link
        }).join(' ')

        html += '</div>'
        html += '</nav>'

        // @todo
        html += '<div class="tab-content" id="nav-tabContent">'
      

      return html
    }


    drawContent(hero, enemies, first){

        var title = hero.getRace()
        var id = 'HERO_' + title
        
        var html = '' +

            '<div class="tab-pane show fade '+(first ? 'active' : '')+'" id="'+id+'" role="tabpanel" aria-labelledby="'+id+'-tab">' +
                '<div class="content">' +
                    '<h4 style="margin-left:190px;padding-top:20px">'+hero.getName() + ' le ' + hero.getRace() +'</h4>' +
                    '<div class="row">' +
                        '<div class="col-2">' +

                           this.drawNavPills(hero,enemies) + 

                        '</div>' + 

                        '<div class="col-10">' +

                            this.drawNavContent(hero, enemies, first) +

                        '</div>' +
                    '</div>'+
                '</div>' +
            '</div>'


        return html
    }

    drawNavPills(hero, entities){
        var html = '<div class="nav flex-column nav-pills" id="v-pills-tab'+hero.getRace()+'" role="tablist" aria-orientation="vertical">'
        var first = true
        html += entities.map(e => {
            var title = e.getRace()
            var id = hero.getUniqueId(e)
            var link = '<a class="nav-link '+(first ? 'active' : '')+'" id="v-pills-'+id+'-tab" data-toggle="pill" href="#v-pills-'+id+'" role="tab" aria-controls="v-pills-'+id+'" aria-selected="true">'+
                            title+
                        '</a>'
            first = false
            return link
        }).join(' ')

        html += '</div>'
        
        return html
    }


    drawNavContent(hero, entities){
        var html = '<div class="tab-content" id="v-pills-tabContent'+hero.getRace()+'">' 
        var first = true
        html += entities.map(e => {
            var id = hero.getUniqueId(e)
            var link = '<div class="tab-pane fade show '+(first ? 'active' : '')+'" id="v-pills-'+id+'" role="tabpanel" aria-labelledby="v-pills-'+id+'-tab">' +
                        this.drawTableBattle(id) +
                    '</div>' 
            first = false
            return link
        }).join(' ')

        html += '</div>'

        return html
    }

    drawTableBattle(battleId){

        var html = '<table class="table battle">' +

        '<thead>' +
          '<tr>' +
            '<th>N°Tour</th>' +
            '<th>Attaquant</th>' +
            '<th>Défenseur</th>' +
            '<th>Evement</th>' +
          '</tr>' +
        '</thead>' +
        '<tbody id="BATTLE_'+battleId+'">' +

            '<tr><td colspan="4"></td>' +

        '</tbody>' +
      '</table>' 
        return html
    }

}