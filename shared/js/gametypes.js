
Types = {
    Messages: {
        CREATE: 0,
        LOGIN: 1,
        WELCOME: 2,
        SPAWN: 3,
        DESPAWN: 4,
        MOVE: 5,
        LOOTMOVE: 6,
        AGGRO: 7,
        ATTACK: 8,
        HIT: 9,
        HURT: 10,
        HEALTH: 11,
        CHAT: 12,
        LOOT: 13,
        EQUIP: 14,
        DROP: 15,
        TELEPORT: 16,
        DAMAGE: 17,
        POPULATION: 18,
        KILL: 19,
        LIST: 20,
        WHO: 21,
        ZONE: 22,
        DESTROY: 23,
        HP: 24,
        BLINK: 25,
        OPEN: 26,
        CHECK: 27,
        PVP: 28,
        GUILD: 29,
        GUILDERROR: 30,
        ACHIEVEMENT: 31,        
        GLOBALQUEST: 32,        //SRR
        GUILDERRORTYPE: {
        	DOESNOTEXIST: 1,
        	BADNAME: 2,
        	ALREADYEXISTS: 3,
        	NOLEAVE: 4,
        	BADINVITE: 5,
        	GUILDRULES: 6,
        	IDWARNING: 7
        },
        GUILDACTION: {
			CONNECT: 8,
			ONLINE: 9,
			DISCONNECT: 10,
			INVITE: 11,
			LEAVE: 12,
			CREATE: 13,
			TALK: 14,
			JOIN: 15,
			POPULATION: 16
		}
    },

    Entities: {
        WARRIOR: 1,

        // Mobs
        RAT: 2,
        SKELETON: 3,
        GOBLIN: 4,
        OGRE: 5,
        SPECTRE: 6,
        CRAB: 7,
        BAT: 8,
        WIZARD: 9,
        EYE: 10,
        SNAKE: 11,
        SKELETON2: 12,
        BOSS: 13,
        DEATHKNIGHT: 14,
        RAT2: 15,

        // Armors
        FIREFOX: 20,
        CLOTHARMOR: 21,
        LEATHERARMOR: 22,
        MAILARMOR: 23,
        PLATEARMOR: 24,
        REDARMOR: 25,
        GOLDENARMOR: 26,
        
        // Objects
        FLASK: 35,
        BURGER: 36,
        CHEST: 37,
        FIREPOTION: 38,
        CAKE: 39,

        // NPCs
        QUESTER01: 41,
        QUESTER02: 42,
        QUESTER03: 43,
        QUESTER04: 44,
        QUESTER05: 45,
        GUARD: 46,
        KING: 47,
        OCTOCAT: 48,
        VILLAGER: 49,
        AGENT: 50,
        RICK: 51,
        NYAN: 52,
        BEACHNPC: 53,
        FORESTNPC: 54,
        MALADE01: 55,
        CODER: 56,
        TRAP1: 57,
                
        VILLAGER01: 170,
        VILLAGER02: 171,
        VILLAGER03: 172,
        VILLAGER04: 173,
        VILLAGER05: 174,
        VILLAGER06: 175,
        VILLAGER07: 176,
        VILLAGER08: 177,
        VILLAGER09: 178,
        VILLAGER10: 179,
        
        //Lore
        LORE01: 301,
        LORE02: 302,
        
        
        // Weapons
        SWORD1: 60,
        SWORD2: 61,
        REDSWORD: 62,
        GOLDENSWORD: 63,
        MORNINGSTAR: 64,
        AXE: 65,
        BLUESWORD: 66,
        
        // Gites
        GITE01: 70,
        GITE02: 71,
        GITE03: 72,
        GITE04: 73,
        GITE05: 74,
        GITE06: 75,
        GITE07: 76,
        GITE08: 77,
        GITE09: 78,
        GITE10: 79,

        
        //Player Faces
        PFACE_BOY1 : 501,
        PFACE_BOY2 : 502,
        PFACE_BOY3 : 503,
        PFACE_GIRL1 : 601,
        PFACE_GIRL2 : 602,
        PFACE_GIRL3 : 603
        
    },

    Orientations: {
        UP: 1,
        DOWN: 2,
        LEFT: 3,
        RIGHT: 4
    },

    Keys: {
        ENTER: 13,
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39,
        W: 87,
        A: 65,
        S: 83,
        D: 68,
        SPACE: 32,
        I: 73,
        H: 72,
        M: 77,
        P: 80,
        KEYPAD_4: 100,
        KEYPAD_6: 102,
        KEYPAD_8: 104,
        KEYPAD_2: 98
    }
};

var kinds = {
    warrior: [Types.Entities.WARRIOR, "player"],

    rat: [Types.Entities.RAT, "mob","Moustique", 0, 1],
    rat2: [Types.Entities.RAT2, "mob","Moustique", 0, 1],
    skeleton: [Types.Entities.SKELETON , "mob","Monstre", 15, 8],
    goblin: [Types.Entities.GOBLIN, "mob","Monstre", 8, 5],
    ogre: [Types.Entities.OGRE, "mob","Monstre", 27, 12],
    spectre: [Types.Entities.SPECTRE, "mob","Monstre", 53, 21],
    deathknight: [Types.Entities.DEATHKNIGHT, "mob","Monstre", 70, 24],
    crab: [Types.Entities.CRAB, "mob","Monstre", 1, 1],
    snake: [Types.Entities.SNAKE, "mob","Monstre", 25, 10],
    bat: [Types.Entities.BAT, "mob","Monstre", 6, 3,],
    wizard: [Types.Entities.WIZARD, "mob","Monstre", 7, 1],
    eye: [Types.Entities.EYE, "mob","Monstre",45, 18],
    skeleton2: [Types.Entities.SKELETON2, "mob","Monstre", 38, 15],
    boss: [Types.Entities.BOSS, "mob","Carnaval", 140,  48],

    sword1: [Types.Entities.SWORD1, "weapon"],
    sword2: [Types.Entities.SWORD2, "weapon"],
    axe: [Types.Entities.AXE, "weapon"],
    redsword: [Types.Entities.REDSWORD, "weapon"],
    bluesword: [Types.Entities.BLUESWORD, "weapon"],
    goldensword: [Types.Entities.GOLDENSWORD, "weapon"],
    morningstar: [Types.Entities.MORNINGSTAR, "weapon"],

    firefox: [Types.Entities.FIREFOX, "armor"],
    clotharmor: [Types.Entities.CLOTHARMOR, "armor"],
    leatherarmor: [Types.Entities.LEATHERARMOR, "armor"],
    mailarmor: [Types.Entities.MAILARMOR, "armor"],
    platearmor: [Types.Entities.PLATEARMOR, "armor"],
    redarmor: [Types.Entities.REDARMOR, "armor"],
    goldenarmor: [Types.Entities.GOLDENARMOR, "armor"],
    
    pface_boy1: [Types.Entities.PFACE_BOY1, "pface"],
    pface_boy2: [Types.Entities.PFACE_BOY2, "pface"],
    pface_boy3: [Types.Entities.PFACE_BOY3, "pface"],
    pface_girl1: [Types.Entities.PFACE_GIRL1, "pface"],
    pface_girl2: [Types.Entities.PFACE_GIRL2, "pface"],
    pface_girl3: [Types.Entities.PFACE_GIRL3, "pface"],

    flask: [Types.Entities.FLASK, "object"],
    cake: [Types.Entities.CAKE, "object"],
    burger: [Types.Entities.BURGER, "object"],
    chest: [Types.Entities.CHEST, "object"],
    firepotion: [Types.Entities.FIREPOTION, "object"],

    guard: [Types.Entities.GUARD, "npc", "Gérard le garde"],
    quester02: [Types.Entities.QUESTER02, "npc","Dr. Ker"],
    villager: [Types.Entities.VILLAGER, "npc", "Jeune homme"],
    coder: [Types.Entities.CODER, "npc"],
    quester04: [Types.Entities.QUESTER04, "npc", "Chercheur Makebaya"],
    quester03: [Types.Entities.QUESTER03, "npc", "Entomologiste Marleen"],
    king: [Types.Entities.KING, "npc"],
    rick: [Types.Entities.RICK, "npc","Citronelle"],
    nyan: [Types.Entities.NYAN, "npc"],
    quester05: [Types.Entities.QUESTER05, "npc","Man Loubliée"],
    agent: [Types.Entities.AGENT, "npc"],
    octocat: [Types.Entities.OCTOCAT, "npc"],
    beachnpc: [Types.Entities.BEACHNPC, "npc"],
    forestnpc: [Types.Entities.FORESTNPC, "npc"],
    quester01: [Types.Entities.QUESTER01, "npc", "Capitaine Briska"],
    malade01: [Types.Entities.MALADE01, "npc", "Malade n°701"],
    trap1: [Types.Entities.TRAP1, "npc", "Piège à moustique"],
    villager01: [Types.Entities.VILLAGER01, "npc","Homme mûr"],
    villager02: [Types.Entities.VILLAGER02, "npc","Jeune homme"],
    villager03: [Types.Entities.VILLAGER03, "npc","Jeune homme"],
    villager04: [Types.Entities.VILLAGER04, "npc","Vieil homme"],
    villager05: [Types.Entities.VILLAGER05, "npc","Vieil homme"],
    villager06: [Types.Entities.VILLAGER06, "npc","Jeune femme"],
    villager07: [Types.Entities.VILLAGER07, "npc","Adolescente"],
    villager08: [Types.Entities.VILLAGER08, "npc","Jeune femme"],
    villager09: [Types.Entities.VILLAGER09, "npc","Femme âgée"],
    villager10: [Types.Entities.VILLAGER10, "npc","Femme âgée"],
    gite01: [Types.Entities.GITE01, "npc","Dessous de pot"],
    gite02: [Types.Entities.GITE02, "npc","Dessous de pot"],
    gite03: [Types.Entities.GITE03, "npc","Déchet"],
    gite04: [Types.Entities.GITE04, "npc","Réserve d'eau"],
    gite05: [Types.Entities.GITE05, "npc","Egouttoir"],
    gite06: [Types.Entities.GITE06, "npc","Pot de brosse à dent"],
    gite07: [Types.Entities.GITE07, "npc","Vase"],
    gite08: [Types.Entities.GITE08, "npc","Dessous de pot"],
    gite09: [Types.Entities.GITE09, "npc","Gouttière"],
    gite10: [Types.Entities.GITE10, "npc","Tonneau"],
    lore01: [Types.Entities.LORE01, "npc", "Source"],
    lore02: [Types.Entities.LORE02, "npc", "Panneau"],
    

    getType: function(kind) {
        return kinds[Types.getKindAsString(kind)][1];
    },
    getNpcHudName: function(kind){
        return kinds[Types.getKindAsString(kind)][2];   //SRR
    },
    getMobExp: function(kind){
        return kinds[Types.getKindAsString(kind)][3];
    },
    getMobLevel: function(kind){
        return kinds[Types.getKindAsString(kind)][4];
    }

    

};

Types.rankedWeapons = [
    Types.Entities.SWORD1,
    Types.Entities.SWORD2,
    Types.Entities.AXE,
    Types.Entities.MORNINGSTAR,
    Types.Entities.BLUESWORD,
    Types.Entities.REDSWORD,
    Types.Entities.GOLDENSWORD
];

Types.rankedArmors = [
    Types.Entities.CLOTHARMOR,
    Types.Entities.LEATHERARMOR,
    Types.Entities.MAILARMOR,
    Types.Entities.PLATEARMOR,
    Types.Entities.REDARMOR,
    Types.Entities.GOLDENARMOR
];

Types.expForLevel = [
    1, 2, 5, 16, 39,
    81, 150, 256, 410, 625, // 10

    915, 1296, 1785, 2401, 3164,
    4096, 5220, 6561, 8145, 10000, // 20

    /*
    12155, 14641, 17490, 20736, 24414,
    28561, 33215, 38416, 44205, 50625, // 30

    57720, 65536, 74120, 83521, 93789,
    104976, 117135, 130321, 144590, 160000, // 40

    176610, 194481, 213675, 234256, 256289,
    279841, 304980, 331776, 360300, 390625, // 50

    422825, 456976, 493155, 531441, 571914,
    614656, 659750, 707281, 757335, 810000, // 60

    865365, 923521, 984560, 1048576, 1115664,
    1185921, 1259445, 1336336, 1416695, 1500625, // 70

    1588230, 1679616, 1774890, 1874161, 1977539,
    2085136, 2197065, 2313441, 2434380, 2560000, // 80

    2690420, 2825761, 2966145, 3111696, 3262539,
    3418801, 3580610, 3748096, 3921390, 4100625, // 90

    4285935, 4477456, 4675325, 4879681, 5090664,
    5318416, 5553080, 5804801, 6083725, 6410000, // 100

    6765201, 7311616, 7890481, 8503056, 9150625,
    9834496, 10556001, 11316496, 12117361, 12960000, // 110

    13845841, 14776336, 15752961, 16777216, 17850625,
    18974736, 20151121, 21381376, 22667121, 24010000, // 120

    25411681, 26873856, 28398241, 29986576, 31640625,
    33362176, 35153041, 37015056, 38950081, 40960000, // 130

    43046721, 45212176, 47458321, 49787136, 52200625,
    54700816, 57289761, 59969536, 62742241, 65610000, // 140

    68574961, 71639296, 74805201, 78074896, 81450625,
    84934656, 88529281, 92236816, 96059601, 100000000, // 150

    108243216, */
];

Types.getLevel = function(exp){
    var i=1;
    for(i=1; i<20; i++){
        if(exp < Types.expForLevel[i]){
            return i;
        }
    }
    return 20;
};
Types.getWeaponRank = function(weaponKind) {
    return _.indexOf(Types.rankedWeapons, weaponKind);
};

Types.getArmorRank = function(armorKind) {
    return _.indexOf(Types.rankedArmors, armorKind);
};
Types.getMobExp = function(mobKind){
    return kinds.getMobExp(mobKind);
};
Types.getMobLevel = function(mobKind){
    return kinds.getMobLevel(mobKind);
};
Types.getNpcHudName = function(mobKind){    //SRR
    return kinds.getNpcHudName(mobKind);
};

Types.isPlayer = function(kind) {
    return kinds.getType(kind) === "player";
};

Types.isMob = function(kind) {
    return kinds.getType(kind) === "mob";
};

Types.isNpc = function(kind) {
    return kinds.getType(kind) === "npc";
};

Types.isCharacter = function(kind) {
    return Types.isMob(kind) || Types.isNpc(kind) || Types.isPlayer(kind);
};

Types.isArmor = function(kind) {
    return kinds.getType(kind) === "armor";
};

Types.isWeapon = function(kind) {
    return kinds.getType(kind) === "weapon";
};

Types.isObject = function(kind) {
    return kinds.getType(kind) === "object";
};

Types.isPface = function(kind) {            //SRR
    return kinds.getType(kind) === "pface";
};

Types.isChest = function(kind) {
    return kind === Types.Entities.CHEST;
};

Types.isItem = function(kind) {
    return Types.isWeapon(kind)
        || Types.isArmor(kind)
        || (Types.isObject(kind) && !Types.isChest(kind));
};

Types.isHealingItem = function(kind) {
    return kind === Types.Entities.FLASK
        || kind === Types.Entities.BURGER;
};

Types.isExpendableItem = function(kind) {
    return Types.isHealingItem(kind)
        || kind === Types.Entities.FIREPOTION
        || kind === Types.Entities.CAKE;
};

Types.getKindFromString = function(kind) {
    if(kind in kinds) {
        return kinds[kind][0];
    }
};

Types.getKindAsString = function(kind) {
    for(var k in kinds) {
        if(kinds[k][0] === kind) {
            return k;
        }
    }
};

Types.forEachKind = function(callback) {
    for(var k in kinds) {
        callback(kinds[k][0], k);
    }
};

Types.forEachArmor = function(callback) {
    Types.forEachKind(function(kind, kindName) {
        if(Types.isArmor(kind)) {
            callback(kind, kindName);
        }
    });
};

Types.forEachMobOrNpcKind = function(callback) {
    Types.forEachKind(function(kind, kindName) {
        if(Types.isMob(kind) || Types.isNpc(kind)) {
            callback(kind, kindName);
        }
    });
};

Types.forEachArmorKind = function(callback) {
    Types.forEachKind(function(kind, kindName) {
        if(Types.isArmor(kind)) {
            callback(kind, kindName);
        }
    });
};
Types.forEachWeaponKind = function(callback) {
    Types.forEachKind(function(kind, kindName) {
        if(Types.isWeapon(kind)) {
            callback(kind, kindName);
        }
    });
};

Types.forEachPfaceKind = function(callback) {  //SRR
    Types.forEachKind(function(kind, kindName) {
        if(Types.isPface(kind)) {
            callback(kind, kindName);
        }
    });
};

Types.getOrientationAsString = function(orientation) {
    switch(orientation) {
        case Types.Orientations.LEFT: return "left"; break;
        case Types.Orientations.RIGHT: return "right"; break;
        case Types.Orientations.UP: return "up"; break;
        case Types.Orientations.DOWN: return "down"; break;
    }
};

Types.getRandomItemKind = function(item) {
    var all = _.union(this.rankedWeapons, this.rankedArmors),
        forbidden = [Types.Entities.SWORD1, Types.Entities.CLOTHARMOR],
        itemKinds = _.difference(all, forbidden),
        i = Math.floor(Math.random() * _.size(itemKinds));

    return itemKinds[i];
};

Types.getMessageTypeAsString = function(type) {
    var typeName;
    _.each(Types.Messages, function(value, name) {
        if(value === type) {
            typeName = name;
        }
    });
    if(!typeName) {
        typeName = "UNKNOWN";
    }
    return typeName;
};

if(!(typeof exports === 'undefined')) {
    module.exports = Types;
}
