
define(['jquery', 'timer'], function($, Timer) {

    var Bubble = Class.extend({
        init: function(id, element, time, expiretime) {
            this.id = id;
            this.element = element;
            this.timer = new Timer(expiretime, time); 
        },

        isOver: function(time) {
            if(this.timer.isOver(time)) {
                return true;
            }
            return false;
        },

        destroy: function() {
            $(this.element).remove();
        },

        reset: function(time) {
            this.timer.lastTime = time;
        }
    });

    var BubbleManager = Class.extend({
        init: function(container) {
            this.container = container;
            this.bubbles = {};
        },

        getBubbleById: function(id) {
            if(id in this.bubbles) {
                return this.bubbles[id];
            }
            return null;
        },

        create: function(id, message, time) {
            if(this.bubbles[id]) {
                this.bubbles[id].reset(time);
                $("#"+id+" p").html(message);
            }
            else {
                var el = $("<div id=\""+id+"\" class=\"bubble\"><p>"+message+"</p><div class=\"thingy\"></div></div>"); //.attr('id', id);
                $(el).appendTo(this.container);

                this.bubbles[id] = new Bubble(id, el, time, 5000);
            }
        },
        
        bigCreate: function(npc, message, game, time) {        //111 SRR
            var id = npc.id;
            var npc_name = npc.itemKind;
            var npc_hud_name = Types.getNpcHudName(npc.kind);
            var text;
            var question;
            var interf;
            var messageLength = message.length;
            
            interf = $("<div id=\"closeDial\" class=\"clickable\"></div>"); //close
            $(interf).appendTo("#choices");
            $('#closeDial').click(function () {game.endDialog(npc)});
            
            if(message[0] == "t") {             //message de talk
                text = message[npc.talkChoice];
                
                if(text === undefined){    //Pour les textes communs
                    text = message[1];
                }
                
                text = text.replace('*name*',game.player.name);
                interf = $("<div id=\"nextDial\" class=\"clickable\"></div>"); //next
                $(interf).appendTo("#choices");
                $('#nextDial').click(function () {game.makeNpcTalk(npc)});
            }
                        
            if(message[0] == "a") {         // answer message
                text = " ";
                for (var choice_num = 1; choice_num < messageLength; choice_num++) {    //on va ptetre passer choice_num en array pour les quizz
                    question = message[choice_num];
                    question = question.replace('*name*',game.player.name);
                    interf = $("<div class=\"choi\" id=\"choi"+choice_num+"\">"+question +"</div>");
                    $(interf).appendTo("#choices");
                    $('#choi'+choice_num).click(this.onAnswer(choice_num, npc, game));
                }
                
            }
            
            
            if(this.bubbles[id]) {                  //Si la bulle est déjà ouverte
                this.bubbles[id].reset(time);
                $("#"+id+" p").html(text);
                npc.talkChoice = 1;
            }
            else {                  //Premiere bulle
                npc.talkChoice = 1;
                this.bClean(); //Supprime les bulles précédentes
                var el = $("<div id=\"illu-"+npc_name+"\" class=\"npc-illu\"></div><div id=\""+id+"\" class=\"bigbubble\"><p>"+text+"</p></div><div id=\"name-npc\">"+npc_hud_name+"</div>");
                
                $(el).appendTo(this.container); //remplit #bubbles de "el"
                //$('#illu-' + npc_name ).attr('background-image', "url('../img/3/illu-" + npc_name);
                this.bubbles[id] = new Bubble(id, el, time, 60000);
            }
        },
        
        
        //Gestion des réponses
        onAnswer: function (choice_num, npc, game) {
            return function () {
                
                //GITES
                if(npc.itemKind.substr(0, 4) == 'gite'){
                    var bonus = 1;
                    if (choice_num == 1) {
                        npc.setAnimation("dry" + npc.currentAnimation.name.slice(-1), 600, 1,function () {},0); //SRR 111
                        bonus = 4;
                    } else if (choice_num == 2) {
                        npc.setAnimation("sand" + npc.currentAnimation.name.slice(-1), 600, 1,function () {},0); //SRR 111
                    }
                    game.storage.incrementGiteCount();
                    game.client.sendGlobalQuest(bonus);
                    game.infoManager.addDamageInfo("+"+ bonus +" Global", game.player.x, game.player.y - 25, "good", 3000); 
                    
                    if(game.storage.getQuestRank() == 13){ //Affichage notif
                        var count = game.storage.getGiteCount();
                        if (count <= 5 ) {
                            var quest_notif = "Gites détruits : " + count +"/5";
                            game.showNotification(quest_notif);
                        }
                     }
                    
                    game.endDialog(npc); //Et refermer dans le game au début du precess
                
                //Plante
                }else if (npc.kind === Types.Entities.RICK && choice_num == 1){
                    npc.setAnimation("removed", 600, 1, function () {});
                    //game.removeFromRenderingGrid(npc, npc.gridX, npc.gridY);
                    game.storage.setMiniQuest('plante_prise');
                    game.storage.setSlotItem(1,'rick'); //nom de la plante en png
                    game.app.updateItemIcons();
                    game.endDialog(npc);
                    
                //Le medecin
                } else if (npc.kind === Types.Entities.QUESTER02 && choice_num == 2){
                    game.tryUnlockingAchievement("MAIN_QUEST_4");
                
                //Le malade01
                } else if (npc.kind === Types.Entities.MALADE01 && choice_num == 1){
                    if(game.storage.getQuestRank() == 4) {game.storage.setMiniQuest('parle_malade1');}  //quete symptomes
                    if(game.storage.getQuestRank() == 11) {game.storage.setMiniQuest('protected'); npc.setAnimation("protected", 600, 1, function () {});}   //quete protection
                    
                //Conspirationniste 01
                } else if (npc.itemKind.substr(0, 8) == 'villager'){
                    game.storage.setMiniQuest('informed');
                }
                
                npc.talkChoice = choice_num;
                game.makeNpcTalk(npc);
            }
        },

        update: function(time) {
            var self = this,
                bubblesToDelete = [];

            _.each(this.bubbles, function(bubble) {
                if(bubble.isOver(time)) {
                    bubble.destroy();
                    bubblesToDelete.push(bubble.id);
                     $('#choices').attr('hidden', 'true'); //SRR
                }
            });

            _.each(bubblesToDelete, function(id) {
                delete self.bubbles[id];
            });
        },

        clean: function() {
            var self = this,
                bubblesToDelete = [];
            $('#choices').attr('hidden', 'true');
            _.each(this.bubbles, function(bubble) {
                bubble.destroy();
                bubblesToDelete.push(bubble.id);
            });

            _.each(bubblesToDelete, function(id) {
                delete self.bubbles[id];
            });

            this.bubbles = {};
        },
        
        bClean: function() {
            var self = this,
                bubblesToDelete = [];
            
            _.each(this.bubbles, function(bubble) {
                bubble.destroy();
                bubblesToDelete.push(bubble.id);
            });

            _.each(bubblesToDelete, function(id) {
                delete self.bubbles[id];
            });

            this.bubbles = {};
        },

        destroyBubble: function(id) {
            var bubble = this.getBubbleById(id);

            if(bubble) {
                bubble.destroy();
                delete this.bubbles[id];
            }
        },

        forEachBubble: function(callback) {
            _.each(this.bubbles, function(bubble) {
                callback(bubble);
            });
        }
    });

    return BubbleManager;
});
