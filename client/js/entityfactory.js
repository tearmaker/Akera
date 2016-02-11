
define(['mobs', 'items', 'npcs', 'warrior', 'chest'], function(Mobs, Items, NPCs, Warrior, Chest) {

    var EntityFactory = {};

    EntityFactory.createEntity = function(kind, id, name) {
        if(!kind) {
            log.error("kind is undefined", true);
            return;
        }

        if(!_.isFunction(EntityFactory.builders[kind])) {
            throw Error(kind + " is not a valid Entity type");
        }

        return EntityFactory.builders[kind](id, name);
    };

    //===== mobs ======

    EntityFactory.builders = [];

    EntityFactory.builders[Types.Entities.WARRIOR] = function(id, name) {
        return new Warrior(id, name);
    };

    EntityFactory.builders[Types.Entities.RAT] = function(id) {
        return new Mobs.Rat(id);
    };
    
    EntityFactory.builders[Types.Entities.RAT2] = function(id) {
        return new Mobs.Rat2(id);
    };

    EntityFactory.builders[Types.Entities.SKELETON] = function(id) {
        return new Mobs.Skeleton(id);
    };

    EntityFactory.builders[Types.Entities.SKELETON2] = function(id) {
        return new Mobs.Skeleton2(id);
    };

    EntityFactory.builders[Types.Entities.SPECTRE] = function(id) {
        return new Mobs.Spectre(id);
    };

    EntityFactory.builders[Types.Entities.DEATHKNIGHT] = function(id) {
        return new Mobs.Deathknight(id);
    };

    EntityFactory.builders[Types.Entities.GOBLIN] = function(id) {
        return new Mobs.Goblin(id);
    };

    EntityFactory.builders[Types.Entities.OGRE] = function(id) {
        return new Mobs.Ogre(id);
    };

    EntityFactory.builders[Types.Entities.CRAB] = function(id) {
        return new Mobs.Crab(id);
    };

    EntityFactory.builders[Types.Entities.SNAKE] = function(id) {
        return new Mobs.Snake(id);
    };

    EntityFactory.builders[Types.Entities.EYE] = function(id) {
        return new Mobs.Eye(id);
    };

    EntityFactory.builders[Types.Entities.BAT] = function(id) {
        return new Mobs.Bat(id);
    };

    EntityFactory.builders[Types.Entities.WIZARD] = function(id) {
        return new Mobs.Wizard(id);
    };

    EntityFactory.builders[Types.Entities.BOSS] = function(id) {
        return new Mobs.Boss(id);
    };

    //===== items ======

    EntityFactory.builders[Types.Entities.SWORD2] = function(id) {
        return new Items.Sword2(id);
    };

    EntityFactory.builders[Types.Entities.AXE] = function(id) {
        return new Items.Axe(id);
    };

    EntityFactory.builders[Types.Entities.REDSWORD] = function(id) {
        return new Items.RedSword(id);
    };

    EntityFactory.builders[Types.Entities.BLUESWORD] = function(id) {
        return new Items.BlueSword(id);
    };

    EntityFactory.builders[Types.Entities.GOLDENSWORD] = function(id) {
        return new Items.GoldenSword(id);
    };

    EntityFactory.builders[Types.Entities.MORNINGSTAR] = function(id) {
        return new Items.MorningStar(id);
    };

    EntityFactory.builders[Types.Entities.MAILARMOR] = function(id) {
        return new Items.MailArmor(id);
    };

    EntityFactory.builders[Types.Entities.LEATHERARMOR] = function(id) {
        return new Items.LeatherArmor(id);
    };

    EntityFactory.builders[Types.Entities.PLATEARMOR] = function(id) {
        return new Items.PlateArmor(id);
    };

    EntityFactory.builders[Types.Entities.REDARMOR] = function(id) {
        return new Items.RedArmor(id);
    };

    EntityFactory.builders[Types.Entities.GOLDENARMOR] = function(id) {
        return new Items.GoldenArmor(id);
    };

    EntityFactory.builders[Types.Entities.FLASK] = function(id) {
        return new Items.Flask(id);
    };

    EntityFactory.builders[Types.Entities.FIREPOTION] = function(id) {
        return new Items.FirePotion(id);
    };

    EntityFactory.builders[Types.Entities.BURGER] = function(id) {
        return new Items.Burger(id);
    };

    EntityFactory.builders[Types.Entities.CAKE] = function(id) {
        return new Items.Cake(id);
    };

    EntityFactory.builders[Types.Entities.CHEST] = function(id) {
        return new Chest(id);
    };

    //====== NPCs ======

    EntityFactory.builders[Types.Entities.GUARD] = function(id) {
        return new NPCs.Guard(id);
    };

    EntityFactory.builders[Types.Entities.KING] = function(id) {
        return new NPCs.King(id);
    };

    EntityFactory.builders[Types.Entities.QUESTER02] = function(id) {
        return new NPCs.Quester02(id);
    };

    EntityFactory.builders[Types.Entities.VILLAGER] = function(id) {
        return new NPCs.Villager(id);
    };

    EntityFactory.builders[Types.Entities.CODER] = function(id) {
        return new NPCs.Coder(id);
    };

    EntityFactory.builders[Types.Entities.AGENT] = function(id) {
        return new NPCs.Agent(id);
    };

    EntityFactory.builders[Types.Entities.RICK] = function(id) {
        return new NPCs.Rick(id);
    };

    EntityFactory.builders[Types.Entities.QUESTER04] = function(id) {
        return new NPCs.Quester04(id);
    };

    EntityFactory.builders[Types.Entities.NYAN] = function(id) {
        return new NPCs.Nyan(id);
    };

    EntityFactory.builders[Types.Entities.QUESTER03] = function(id) {
        return new NPCs.Quester03(id);
    };

    EntityFactory.builders[Types.Entities.QUESTER05] = function(id) {
        return new NPCs.Quester05(id);
    };

    EntityFactory.builders[Types.Entities.OCTOCAT] = function(id) {
        return new NPCs.Octocat(id);
    };

    EntityFactory.builders[Types.Entities.BEACHNPC] = function(id) {
        return new NPCs.BeachNpc(id);
    };

    EntityFactory.builders[Types.Entities.FORESTNPC] = function(id) {
        return new NPCs.ForestNpc(id);
    };

    EntityFactory.builders[Types.Entities.QUESTER01] = function(id) {
        return new NPCs.Quester01(id);
    };
    
    EntityFactory.builders[Types.Entities.MALADE01] = function(id) {
        return new NPCs.Malade01(id);
    };
    
    EntityFactory.builders[Types.Entities.TRAP1] = function(id) {
        return new NPCs.Trap1(id);
    };
    
    EntityFactory.builders[Types.Entities.LORE01] = function(id) {
        return new NPCs.Lore01(id);
    };
    
    EntityFactory.builders[Types.Entities.LORE02] = function(id) {
        return new NPCs.Lore02(id);
    };
    
    EntityFactory.builders[Types.Entities.GITE01] = function(id) {
        return new NPCs.Gite01(id);
    };
    EntityFactory.builders[Types.Entities.GITE02] = function(id) {
        return new NPCs.Gite02(id);
    };
    EntityFactory.builders[Types.Entities.GITE03] = function(id) {
        return new NPCs.Gite03(id);
    };
    EntityFactory.builders[Types.Entities.GITE04] = function(id) {
        return new NPCs.Gite04(id);
    };
    EntityFactory.builders[Types.Entities.GITE05] = function(id) {
        return new NPCs.Gite05(id);
    };
    EntityFactory.builders[Types.Entities.GITE06] = function(id) {
        return new NPCs.Gite06(id);
    };
    EntityFactory.builders[Types.Entities.GITE07] = function(id) {
        return new NPCs.Gite07(id);
    };
    EntityFactory.builders[Types.Entities.GITE08] = function(id) {
        return new NPCs.Gite08(id);
    };
    EntityFactory.builders[Types.Entities.GITE09] = function(id) {
        return new NPCs.Gite09(id);
    };
    EntityFactory.builders[Types.Entities.GITE10] = function(id) {
        return new NPCs.Gite10(id);
    };
    
    EntityFactory.builders[Types.Entities.VILLAGER01] = function(id) {
        return new NPCs.Villager01(id);
    };
    EntityFactory.builders[Types.Entities.VILLAGER02] = function(id) {
        return new NPCs.Villager02(id);
    };
    EntityFactory.builders[Types.Entities.VILLAGER03] = function(id) {
        return new NPCs.Villager03(id);
    };
    EntityFactory.builders[Types.Entities.VILLAGER04] = function(id) {
        return new NPCs.Villager04(id);
    };
    EntityFactory.builders[Types.Entities.VILLAGER05] = function(id) {
        return new NPCs.Villager05(id);
    };
    EntityFactory.builders[Types.Entities.VILLAGER06] = function(id) {
        return new NPCs.Villager06(id);
    };
    EntityFactory.builders[Types.Entities.VILLAGER07] = function(id) {
        return new NPCs.Villager07(id);
    };
    EntityFactory.builders[Types.Entities.VILLAGER08] = function(id) {
        return new NPCs.Villager08(id);
    };
    EntityFactory.builders[Types.Entities.VILLAGER09] = function(id) {
        return new NPCs.Villager09(id);
    };
    EntityFactory.builders[Types.Entities.VILLAGER10] = function(id) {
        return new NPCs.Villager10(id);
    };

    return EntityFactory;
});
