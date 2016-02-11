define(['character'], function(Character) {

    var NpcTalk = { //=== Les conditions plus récentes en haut
        
        
        //================================================= garde
        
         "guard": [{    
           "text": [
                ["t","Allez voir le caporal Delaporte il vous donnera toutes les explications dont vous avez besoin."]
            ]},
            
            {"condition": function(game){return  game.storage.getQuestRank() == 15;},
            "text": [
                ["t","L'épidémie est calmée. Mais il faut TOUJOURS rester vigilent !"]
			]},
                   
            {"condition": function(game){return  game.storage.getQuestRank() > 10;},
            "text": [
                ["t","Les malades diminuent à vu d'oeil, Bravo pour votre implication !"]
			]},
                   
            {"condition": function(game){return  game.storage.getQuestRank() > 6;},
            "text": [
                ["t","Ca va vraiment mieux depuis que vous nous aidé, continuez."]
			]},
                   
            {"condition": function(game){return  game.storage.getQuestRank() > 2;},
            "text": [
                ["t","Pas facile de protéger la population de tous ces moustiques..."]
			]},
            
        ],
        
        //================================================= Cpt Briska
        
        "quester01": [{ 
        "text": [
                ["t","Salut l'ami, merci pour le coup de main de la dernière fois."]
            ]},
                      
        {"condition": function(game){return (game.storage.getQuestRank() == 3);},
            "text": [
                ["t","Transmettez ces documents au docteur, je vous prie. Il se trouve dans la ville sud et est toujours vêtu de blanc."]
			]},
                      
        {"condition": function(game){return (game.storage.getQuestRank() <= 3 && game.storage.getCrabCount() >= 2);},
            "text": [
                ["t","Bon travail ! Je savais qu’on pouvait avoir confiance en vous."],
                ["t","Pouvez-vous transmettre ces documents au docteur ? Il se trouve dans la ville sud. Il est toujours vêtu de blanc."]
			]},
        {"condition": function(game){return game.storage.getQuestRank() == 2 ;},
        "text": [
            ["t","Prenez une arme à côté de moi. Détruisez deux monstres et revenez me voir quand ça sera fait."]
            ]},              
                      
        {"condition": function(game){return game.storage.getQuestRank() == 1 ;},
        "text": [
            ["t","Recrue présentez-vous !"],
            ["a","1- Je suis *name*","2- Je n'ai pas envie de donner mon nom."],
            ["t","Vous tombez bien *name*. L’entrée de la ville est infestée par des ombres hostiles et notre effectif est au plus bas…","*Elle vous toise* Peu importe... Je vous apprendrai la discipline plus tard. L’entrée de la ville est infestée par des monstres et notre effectif est au plus bas…"],
            ["a","1- Comptez sur moi pour m'en occuper !","2- Dites m’en plus, s'il vous plait."],
            ["t","J’en attendais pas moins de vous ! Vous êtes fait pour l’action.","On ne sait pas grand-chose mais nos troupes sont touchées par une étrange maladie..."],
            ["t","Prenez une arme à côté de moi. Détruisez deux monstres et revenez me voir quand ça sera fait."]
            ]}
        ],
        
         //================================================= medecin
        
        "quester02": [{
           "text": [
                ["t","Salut, je suis un peu occupé pour le moment"]
            ]},
                   
           {"condition": function(game){return game.storage.getQuestRank() == 5 ;},
            "text": [
                ["t","Allez voir l'ermite entomo à l'est.","J’ai entendu parler d’un scientifique qui aurait une théorie sur cette maladie"]
			]},
        
        {"condition": function(game){return (game.storage.getQuestRank() == 4 && game.storage.hasDoneMiniQuest('parle_malade1'));},
            "text": [
                ["t","Quels sont les symptômes que vous avez relevés ?"],
                ["a","Cheveux deviennent rouges","Courbatures et fièvres"],
                ["t","Ca ne colle pas du tout...","Je vois… j’ai entendu parler d’un scientifique qui aurait une théorie sur cette maladie."]
			]},
        
        {"condition": function(game){return game.storage.getQuestRank() == 4;},
            "text": [
                ["t","Allez interroger des patients."]
			]},
                      
        {"condition": function(game){return game.storage.getQuestRank() == 3;},
            "text": [
                ["t","Voici les observations de l’avant poste. Avec toutes ces données on devrait en savoir plus très bientôt. Merci de votre aide…"],
                ["a","Est-ce que je peux faire autre chose ?","Bon et ben… à plus."],
                ["t","Je n’osais pas demander…","Attendez…"],
                ["t","Nous avons besoin d’informations supplémentaires. Une étrange maladie se répand dans la ville, nous sommes débordés. Pouvez-vous enquêter auprès des malades, nous devons savoir de quoi ils souffrent."]
			]}
        ],
        
        
        //=================================================  entomologiste 
        
        "quester03": [{   
           "text": [
                ["t","*Elle semble passionnée par un insecte et vous ignore complètement*"]
            ]},
            
            {"condition": function(game){return game.storage.getQuestRank() == 14;},
            "text": [
                ["t","Allez voir le doc du nord, à la centrale."]
			]},
            
            {"condition": function(game){return (game.storage.getQuestRank() == 13 && game.storage.getGiteCount() >= 5);},
            "text": [
                ["t","Bien joué ! Sans gite, pas de reproduction. Faites votre dernier rapport au scientifique sur ce que vous avez appris."]
			]},
                        
            {"condition": function(game){return game.storage.getQuestRank() == 13;},
            "text": [
                ["t","RE. Il faut que tu détruise un gite."]
			]},
            
            {"condition": function(game){return game.storage.getQuestRank() == 12;},
            "text": [
                ["t","RE. Il faut s’attaquer au problème à la base. Pour se reproduire, les moustiques ont besoin d’eau. C’est là que nous devons agir."]
			]},
                        
            {"condition": function(game){return game.storage.getQuestRank() == 7;},
            "text": [
                ["t","Allez voir le Professeur Makebaya dans la ville nord."]
			]},
                        
            {"condition": function(game){return (game.storage.getQuestRank() == 6 && game.storage.getRatCount() >= 5);},
            "text": [
                ["t","Je vais transférer mes analyses au laboratoire Central. Nous devons en apprendre plus sur ces spécimens."]
			]},
            
            {"condition": function(game){return game.storage.getQuestRank() == 6;},
            "text": [
                ["t","Capturez-en 2."]
			]},
            
            {"condition": function(game){return game.storage.getQuestRank() == 5;},
            "text": [
                ["t","Bonjour ! Certains virus sont transmis par des insectes. C’est certainement ce qui se passe ici. Il faut en avoir le cœur net. Capturez-en 5."]
			]}

        ],  
        
         //=================================================  scientifique
        
        "quester04": [{  
           "text": [
                ["t","Je suis en plein évaluation du document d'un de mes pairs. Veuillez repasser plus tard."]
            ]},
            
            {"condition": function(game){return game.storage.getQuestRank() == 14;},
            "text": [
                ["t","GG... Euh... Félicitations ! Cette fois nous y sommes. Nous savons ce que nous devons faire pour stopper cette épidémie : éliminez les gites, se protéger, et réduire la population de moustiques adultes."]
			]},
                      
            {"condition": function(game){return game.storage.getQuestRank() == 13 ;},
            "text": [
                ["t","Retournez voir l'entomo, elle a du neuf."]
			]},
            
            {"condition": function(game){return (game.storage.getQuestRank() == 12 && game.storage.hasDoneMiniQuest('informed'));},
            "text": [
                ["t","Merci d'avoir rétabli la vérité. L'entomo a du neuf."]
			]},

            {"condition": function(game){return game.storage.getQuestRank() == 12;},
            "text": [
                ["t","Discutez avec les gens. Ils doivent savoir."]
			]},
                      
            {"condition": function(game){return (game.storage.getQuestRank() == 11 && game.storage.hasDoneMiniQuest('protected'));},
            "text": [
                ["t","Merci de les avoir protégés. Des rumeurs se propagent, rétablissez la vérité."]
			]},
                      
            {"condition": function(game){return game.storage.getQuestRank() == 11;},
            "text": [
                ["t","Bien. Je vois que vous avez le répulsif. Protégez les malades."]
			]},

            {"condition": function(game){return game.storage.getQuestRank() == 9;},
            "text": [
                ["t","Va voir la vieille herboriste."]
			]},
                      
            {"condition": function(game){return (game.storage.getQuestRank() == 8 && game.storage.getRatCount() >= 5);},
            "text": [
                ["t","I salé... Euh... Bien joué. J'ai une vieille connaissance, une herboriste qui pourrait nous aider. Allez lui demander de l'aide."]
			]},
                
            {"condition": function(game){return game.storage.getQuestRank() == 8;},
            "text": [
                ["t","Détruisez 5 moustiques et ça ira mieux."]
			]},
            
            {"condition": function(game){return game.storage.getQuestRank() == 7;},
            "text": [
                ["t","Salut ! Bonnes analyses. Il faut réduire la population de moustiques adultes."]
			]}
        ],  
        
        //================================ Man l'oubliée la docktè fèy
        
        "quester05": [{
            "text": [
                ["t","Attends doudou, je suis en train de mixer des plantes là."]
            ]},
                      
            {"condition": function(game){return game.storage.getQuestRank() == 11;},
            "text": [
                ["t","Le doc te dira quoi faire."]
			]},
                      
            {"condition": function(game){return (game.storage.getQuestRank() == 10 && game.storage.hasDoneMiniQuest('plante_prise'));},
            "text": [
                ["t","Parfait, il me faut un peu de temps pour réaliser le répulsif."],
                ["t","..."],
                ["t","... ..."],
                ["t","Voilà, c'est fait ! Apporte le au Dr, il te dira quoi en faire."]
			]},
                      
            {"condition": function(game){return game.storage.getQuestRank() == 10;},
            "text": [
                ["t","N'oublie pas mes plantes, doudou."]
			]},
                                                 
            {"condition": function(game){return game.storage.getQuestRank() == 9;},
            "text": [
                ["t","Bonjour ! Oui, je peux aider. Peux-tu me prendre une plante s'il te plait ?"]
			]}

        ],
        
        //================================================= malade 01
        
        "malade01": [{   
             "text": [
                ["t","Aaaargh"]
            ]},
                    
            {"condition": function(game){return game.storage.getQuestRank() == 11;},
            "text": [
                ["t","Woy woy woy"],
                ["a","*Mettre une moustiquaire*"],
                ["t","Merci"]
            ]},
            
           {"condition": function(game){return game.storage.getQuestRank() == 4;},
            "text": [
                ["t","Woy woy woy"],
                ["a","Comment-allez vous ?"],
                ["t","J'ai des courbatures et de la fièvre"]
            ]}
        ],
        
        
        //================================================= Piege a moustique
        
        "trap1": [{   
             "text": [
                ["t","Aaaargh"]
            ]},
                    
            {"condition": function(game){return game.storage.getQuestRank() == 11;},
            "text": [
                ["t","Woy woy woy"],
                ["a","*Mettre une moustiquaire*"],
                ["t","Merci"]
            ]},
            
           {"condition": function(game){return game.storage.getQuestRank() == 4;},
            "text": [
                ["t","Woy woy woy"],
                ["a","Comment-allez vous ?"],
                ["t","J'ai des courbatures et de la fièvre"]
            ]}
        ],
        
        //================================================= plante
        
        "rick": [{      
            "text": [
                ["t","*Ohh une belle plante*"]
            ]},
            {"condition": function(game){return game.storage.getQuestRank() >= 0;}, //remettre à 8
            "text": [
                ["a","*Prendre les feuilles*"]
            ]}
        ],      
        
        //==================================== VILLAGER
        
        "villager01": [{
            "text": [
                ["t","J'ai un peu peur d'attrapper la maladie."]
            ]},
            {"condition": function(game){return game.storage.getQuestRank() == 12;},
            "text": [
                ["t","Attention, c'est une agence américaine qui donne la maladie."],
                ["a","Les études ont montré que, etc...","Arrête de dire des bêtises"],
                ["t","D'accord, je fais confiance à Makebaya et aux autres.","Mouais... Pas convaincu"]
            ]}
        ],
        "villager02": [{
            "text": [
                ["t","J'ai un peu peur de contracter la maladie."]
            ]},
            {"condition": function(game){return game.storage.getQuestRank() == 12;},
            "text": [
                ["t","Attention, c'est une agence américaine qui donne la maladie."],
                ["a","Les études ont montré que, etc...","Arrête de dire des bêtises"],
                ["t","D'accord, je fais confiance à Makebaya et aux autres.","Mouais... Pas convaincu"]
            ]}
        ],
        "villager03": [{
            "text": [
                ["t","J'ai un peu peur de contracter la maladie."]
            ]},
            {"condition": function(game){return game.storage.getQuestRank() == 12;},
            "text": [
                ["t","Attention, c'est une agence américaine qui donne la maladie."],
                ["a","Les études ont montré que, etc...","Arrête de dire des bêtises"],
                ["t","D'accord, je fais confiance à Makebaya et aux autres.","Mouais... Pas convaincu"]
            ]}
        ],
        "villager04": [{
            "text": [
                ["t","J'ai un peu peur de contracter la maladie."]
            ]},
            {"condition": function(game){return game.storage.getQuestRank() == 12;},
            "text": [
                ["t","Attention, c'est une agence américaine qui donne la maladie."],
                ["a","Les études ont montré que, etc...","Arrête de dire des bêtises"],
                ["t","D'accord, je fais confiance à Makebaya et aux autres.","Mouais... Pas convaincu"]
            ]}
        ],
        "villager05": [{
            "text": [
                ["t","J'ai un peu peur de contracter la maladie."]
            ]},
            {"condition": function(game){return game.storage.getQuestRank() == 12;},
            "text": [
                ["t","Attention, c'est une agence américaine qui donne la maladie."],
                ["a","Les études ont montré que, etc...","Arrête de dire des bêtises"],
                ["t","D'accord, je fais confiance à Makebaya et aux autres.","Mouais... Pas convaincu"]
            ]}
        ],
        "villager06": [{
            "text": [
                ["t","J'ai un peu peur de contracter la maladie."]
            ]},
            {"condition": function(game){return game.storage.getQuestRank() == 12;},
            "text": [
                ["t","Attention, c'est une agence américaine qui donne la maladie."],
                ["a","Les études ont montré que, etc...","Arrête de dire des bêtises"],
                ["t","D'accord, je fais confiance à Makebaya et aux autres.","Mouais... Pas convaincu"]
            ]}
        ],
        "villager07": [{
            "text": [
                ["t","J'ai un peu peur de contracter la maladie."]
            ]},
            {"condition": function(game){return game.storage.getQuestRank() == 12;},
            "text": [
                ["t","Attention, c'est une agence américaine qui donne la maladie."],
                ["a","Les études ont montré que, etc...","Arrête de dire des bêtises"],
                ["t","D'accord, je fais confiance à Makebaya et aux autres.","Mouais... Pas convaincu"]
            ]}
        ],
        "villager08": [{
            "text": [
                ["t","J'ai un peu peur de contracter la maladie."]
            ]},
            {"condition": function(game){return game.storage.getQuestRank() == 12;},
            "text": [
                ["t","Attention, c'est une agence américaine qui donne la maladie."],
                ["a","Les études ont montré que, etc...","Arrête de dire des bêtises"],
                ["t","D'accord, je fais confiance à Makebaya et aux autres.","Mouais... Pas convaincu"]
            ]}
        ],
        "villager09": [{
            "text": [
                ["t","J'ai un peu peur de contracter la maladie."]
            ]},
            {"condition": function(game){return game.storage.getQuestRank() == 12;},
            "text": [
                ["t","Attention, c'est une agence américaine qui donne la maladie."],
                ["a","Les études ont montré que, etc...","Arrête de dire des bêtises"],
                ["t","D'accord, je fais confiance à Makebaya et aux autres.","Mouais... Pas convaincu"]
            ]}
        ],
        "villager10": [{
            "text": [
                ["t","J'ai un peu peur de contracter la maladie."]
            ]},
            {"condition": function(game){return game.storage.getQuestRank() == 12;},
            "text": [
                ["t","Attention, c'est une agence américaine qui donne la maladie."],
                ["a","Les études ont montré que, etc...","Arrête de dire des bêtises"],
                ["t","D'accord, je fais confiance à Makebaya et aux autres.","Mouais... Pas convaincu"]
            ]}
        ],

        //============ GITES
        
        "gite01": [{    //petites Fleurs
           "text": [
                ["a","Retirer l'eau"]
            ]}
        ],
        "gite02": [{ //Fleurs
           "text": [
                ["a","Retirer l'eau","Mettre du sable à ras bord"]
            ]}
        ],
        "gite03": [{ //Dechets //Exception
           "text": [
                ["a","Détruire"]
            ]}
        ],
        "gite04": [{ //Fut
           "text": [
                ["a","Couvrir","Recouvrir avec une moustiquaire"]
            ]}
        ],
        "gite05": [{ //Egouttoir
           "text": [
                ["a","Retirer l'eau"]
            ]}
        ],
        "gite06": [{ //Brosses
           "text": [
                ["a","Retirer l'eau"]
            ]}
        ],
        "gite07": [{ //Fleurs
           "text": [
                ["a","Changer l'eau"]
            ]}
        ],
        "gite08": [{ //fleurs Tombes
           "text": [
                ["a","Mettre du sable à ras bord"]
            ]}
        ],
        "gite09": [{ //Gouttiere
           "text": [
                ["a","Nettoyer"]
            ]}
        ],
        "gite10": [{
           "text": [
                ["a","Vider"]
            ]}
        ],
        
        //======================== LORE 
        
        "lore01": [{ //Source
           "text": [
                ["t","Une source d'énergie"]
            ]}
        ],
            
        "lore02": [{ //Panneau
           "text": [
                ["a","Un panneau... Voilà..."]
            ]}
        ]

    };
    
    
/*            ["t","Ah ! vous devez être la nouvelle recrue. Ca fait un moment qu’on vous attend. "],
            ["a","Plus besoin d’attendre, je suis prêt pour l’action.", "Euh… moi… je ne fais que passer…"],
            ["t","Voilà qui est parlé !", "Peu importe, on a besoin de tout le monde"],
            ["t","Allez voir le caporal Delaporte il vous donnera toutes les explications dont vous avez besoin.","Allez voir le caporal Delaporte il vous donnera toutes les explications dont vous avez besoin."] 
*/

    var Npc = Character.extend({
        init: function(id, kind) {
            this._super(id, kind, 1);
            this.itemKind = Types.getKindAsString(this.kind);
            if(typeof NpcTalk[this.itemKind][0] === 'string'){
				this.discourse = -1;
				this.talkCount = NpcTalk[this.itemKind].length;
			}
			else{
				this.discourse = 0;
				this.talkCount = NpcTalk[this.itemKind][this.discourse]["text"].length;
			}
            this.talkIndex = 0;
            this.talkChoice = 1;
            
        },
        
        selectTalk: function (game) {
            var change = false;
            if (this.discourse != -1) {
                var found = false;
                for (var i = 1; !found && i < NpcTalk[this.itemKind].length; i++) {
                    if (NpcTalk[this.itemKind][i]["condition"](game)) {
                        if (this.discourse != i) {
                            change = true;
                            this.discourse = i;
                            this.talkCount = NpcTalk[this.itemKind][this.discourse]["text"].length;
                        }
                        found = true;
                    }
                }
                if (!found) {
                    if (this.discourse != 0) {
                        change = true;
                        this.discourse = 0;
                        this.talkCount = NpcTalk[this.itemKind][this.discourse]["text"].length;
                    }
                }
            }
            return change;
        },

    talk: function (game) { //111 SRR
            var msg = "";

            if (this.selectTalk(game) || (this.talkIndex > this.talkCount)) {
                this.talkIndex = 0;
            }

            if (this.talkIndex < this.talkCount) {
                if (this.discourse == -1) {
                    msg = NpcTalk[this.itemKind][0]['text'][this.talkIndex];
                } else {
                    msg = NpcTalk[this.itemKind][this.discourse]["text"][this.talkIndex];
                }


            }
            this.talkIndex += 1;

            return msg;

        }
    });
return Npc;
});
