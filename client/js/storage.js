
define(function() {

    var Storage = Class.extend({
        init: function() {
            if(this.hasLocalStorage() && localStorage.data) {
                this.data = JSON.parse(localStorage.data);
            } else {
                this.resetData();
            }
        },

        resetData: function() { 
            this.data = {
                hasAlreadyPlayed: false,
                player: {
                    name: "",
                    weapon: "",
                    armor: "",
                    guild: "",
                    image: "",
                    ill: 0, //5 etapes de maladie 1/min
                    itemSlot1: "", //herb(rick)/repulsif ou sable
                    itemSlot2: "" 
                },
                achievements: {
                    unlocked: [],
                    miniQuestsDone: [],
                    ratCount: 0,
                    skeletonCount: 0,
                    crabCount: 0,
                    giteCount : 0,
                    totalKills: 0,
                    totalDmg: 0,
                    totalRevives: 0,
                    questRank: 1
                }
            };
        },

        hasLocalStorage: function() {
            return Modernizr.localstorage;
        },

        save: function() {
            if(this.hasLocalStorage()) {
                localStorage.data = JSON.stringify(this.data);
            }
        },

        clear: function() {
            if(this.hasLocalStorage()) {
                localStorage.data = "";
                this.resetData();
            }
        },

        // Player

        hasAlreadyPlayed: function() {
            return this.data.hasAlreadyPlayed;
        },

        initPlayer: function(name) {
            this.data.hasAlreadyPlayed = true;
            this.setPlayerName(name);
        },

        setPlayerName: function(name) {
            this.data.player.name = name;
            this.save();
        },

        setPlayerImage: function(img) {
            this.data.player.image = img;
            this.save();
        },

        setPlayerArmor: function(armor) {
            this.data.player.armor = armor;
            this.save();
        },

        setPlayerWeapon: function(weapon) {
            this.data.player.weapon = weapon;
            this.save();
        },
        
       /* setPlayerGuild: function(guild) { //bugggy
			if(typeof guild !== "undefined") {
				this.data.player.guild={id:guild.id, name:guild.name,members:JSON.stringify(guild.members)};
				this.save();
			}
			else{
				delete this.data.player.guild;
				this.save();
			}
		},
        */
        savePlayer: function(img, armor, weapon, guild) {
            this.setPlayerImage(img);
            this.setPlayerArmor(armor);
            this.setPlayerWeapon(weapon);
        },

        // Achievements

        hasUnlockedAchievement: function(id) {
            return _.include(this.data.achievements.unlocked, id);
        },

        unlockAchievement: function(id) {
            if(!this.hasUnlockedAchievement(id)) {
                this.data.achievements.unlocked.push(id);
                this.save();
                return true;
            }
            return false;
        },
        
        refreshAchievement: function(achiev_unlock) {
                this.data.achievements.unlocked = achiev_unlock;
                this.save();
        },

        getAchievementCount: function() {
            return _.size(this.data.achievements.unlocked);
        },

        // Angry rats
        getRatCount: function() {
            return this.data.achievements.ratCount;
        },

        incrementRatCount: function() {
            if(this.data.achievements.ratCount < 10) {
                this.data.achievements.ratCount++;
                this.save();
            }
        },
        
        resetRatCount: function() {
            this.data.achievements.ratCount = 0;
            this.save();
        },
        
        // Crabs (zombies de base)
        getCrabCount: function() {
            return this.data.achievements.crabCount;
        },

        incrementCrabCount: function() {
            if(this.data.achievements.crabCount < 10) {
                this.data.achievements.crabCount++;
                this.save();
            }
        },
        
        resetCrabCount: function() {
            this.data.achievements.crabCount = 0;
            this.save();
        },
        
        
        // Gite quests
        getGiteCount: function() {
            return this.data.achievements.giteCount;
        },

        incrementGiteCount: function() {
            if(this.data.achievements.giteCount < 10) {
                this.data.achievements.giteCount++;
                this.save();
            }
        },
        
        resetGiteCount: function() {
            this.data.achievements.giteCount = 0;
            this.save();
        },

        // Skull Collector
        getSkeletonCount: function() {
            return this.data.achievements.skeletonCount;
        },

        incrementSkeletonCount: function() {
            if(this.data.achievements.skeletonCount < 10) {
                this.data.achievements.skeletonCount++;
                this.save();
            }
        },

        // Meatshield
        getTotalDamageTaken: function() {
            return this.data.achievements.totalDmg;
        },

        addDamage: function(damage) {
            if(this.data.achievements.totalDmg < 5000) {
                this.data.achievements.totalDmg += damage;
                this.save();
            }
        },

        // Hunter
        getTotalKills: function() {
            return this.data.achievements.totalKills;
        },

        incrementTotalKills: function() {
            if(this.data.achievements.totalKills < 50) {
                this.data.achievements.totalKills++;
                this.save();
            }
        },

        // Still Alive
        getTotalRevives: function() {
            return this.data.achievements.totalRevives;
        },

        incrementRevives: function() {
            if(this.data.achievements.totalRevives < 5) {
                this.data.achievements.totalRevives++;
                this.save();
            }
        },

        
        // QuestRank soit le rang de la derniere quete accompli
        getQuestRank: function() {
            return this.data.achievements.questRank; //SRR
        },
        
        setQuestRank: function(rank) {
            this.data.achievements.questRank = rank;
            this.save();
        },
        
        initQuestRank: function(list_achiev) {
            var questRank = 0;
            var last_main_quest = 16; //à changer aussi dans game
            for (var i = 0; i < list_achiev.length; i++) {
                if (list_achiev[i]> questRank && list_achiev[i] < last_main_quest) { //rang max quete histoire
                    questRank = list_achiev[i];
                }
             }
            this.setQuestRank(questRank);
        },
        
        // Miniquest
        hasDoneMiniQuest: function(npc) {
            return _.include(this.data.achievements.miniQuestsDone, npc);
        },

        setMiniQuest: function(npc) {
            if(!this.hasDoneMiniQuest(npc)) {
                this.data.achievements.miniQuestsDone.push(npc);
                this.save();
                return true;
            }
            return false;
        },
        
        //Illness
        setPlayerIll: function(value) { 
            this.data.player.ill = value;
            this.save();
        },
        
        getPlayerIll: function() { 
            return this.data.player.ill;
        },

        
        //Inventory
        setSlotItem: function(nb_slot, value) {
            if(nb_slot == 1){
                this.data.player.itemSlot1 = value;
                this.save();    
            } else if (nb_slot == 2){
                this.data.player.itemSlot2 = value;
                this.save();
            }
            
        },
        
        getSlotItem: function(nb_slot) { 
            if(nb_slot == 1){
                return this.data.player.itemSlot1;
            } else if (nb_slot == 2){
                return this.data.player.itemSlot2;
            }
        }
        
        
    });

    return Storage;
});
