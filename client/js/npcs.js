
define(['npc'], function(Npc) {

    var NPCs = {

        Guard: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.GUARD, 1);
            }
        }),

        King: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.KING, 1);
            }
        }),

        Agent: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.AGENT, 1);
            }
        }),

        Rick: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.RICK, 1);
            }
        }),

        Quester02: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.QUESTER02, 1);
            }
        }),

        Villager: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.VILLAGER, 1);
            }
        }),

        Coder: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.CODER, 1);
            }
        }),

        Quester04: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.QUESTER04, 1);
            }
        }),

        Nyan: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.NYAN, 1);
                this.idleSpeed = 50;
            }
        }),

        Quester05: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.QUESTER05, 1);
                //this.idleSpeed = 150;
            }
        }),

        Quester03: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.QUESTER03, 1);
            }
        }),

        BeachNpc: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.BEACHNPC, 1);
            }
        }),

        ForestNpc: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.FORESTNPC, 1);
            }
        }),

        Quester01: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.QUESTER01, 1);
            }
        }),
        
        Gite01: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.GITE01, 1);
            }
        }),
        Gite02: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.GITE02, 1);
            }
        }),
        Gite03: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.GITE03, 1);
            }
        }),
        Gite04: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.GITE04, 1);
            }
        }),
        Gite05: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.GITE05, 1);
            }
        }),
        Gite06: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.GITE06, 1);
            }
        }),
        Gite07: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.GITE07, 1);
            }
        }),
        Gite08: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.GITE08, 1);
            }
        }),
        Gite09: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.GITE09, 1);
            }
        }),
        Gite10: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.GITE10, 1);
            }
        }),
        
        Villager01: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.VILLAGER01, 1);
            }
        }),
        Villager02: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.VILLAGER02, 1);
            }
        }),
        Villager03: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.VILLAGER03, 1);
            }
        }),
        Villager04: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.VILLAGER04, 1);
            }
        }),
        Villager05: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.VILLAGER05, 1);
            }
        }),
        Villager06: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.VILLAGER06, 1);
            }
        }),
        Villager07: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.VILLAGER07, 1);
            }
        }),
        Villager08: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.VILLAGER08, 1);
            }
        }),
        Villager09: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.VILLAGER09, 1);
            }
        }),
        Villager10: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.VILLAGER10, 1);
            }
        }),
        Malade01: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.MALADE01, 1);
            }
        }),
        Trap1: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.TRAP1, 1);
            }
        }),
        Lore01: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.LORE01, 1);
            }
        }),
        Lore02: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.LORE02, 1);
            }
        }),
        Octocat: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.OCTOCAT, 1);
            }
        })
    };

    return NPCs;
});
