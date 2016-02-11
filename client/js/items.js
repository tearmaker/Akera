
define(['item'], function(Item) {

    var Items = {

        Sword2: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.SWORD2, "weapon");
                //this.lootMessage = "Vous récupérez un meilleur ustensile";
            },
        }),

        Axe: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.AXE, "weapon");
                //this.lootMessage = "Vous récupérez un meilleur ustensile";
            },
        }),

        RedSword: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.REDSWORD, "weapon");
                //this.lootMessage = "Vous récupérez un meilleur ustensile";
            },
        }),

        BlueSword: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.BLUESWORD, "weapon");
                this.lootMessage = "Vous récupérez un meilleur ustensile";
            },
        }),

        GoldenSword: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.GOLDENSWORD, "weapon");
                //this.lootMessage = "Vous récupérez un meilleur ustensile";
            },
        }),

        MorningStar: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.MORNINGSTAR, "weapon");
                //this.lootMessage = "Vous récupérez un meilleur ustensile";
            },
        }),

        LeatherArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.LEATHERARMOR, "armor");
                //this.lootMessage = "Vous mettez de nouveaux vêtements";
            },
        }),

        MailArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.MAILARMOR, "armor");
                //this.lootMessage = "Vous mettez de nouveaux vêtements";
            },
        }),

        PlateArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.PLATEARMOR, "armor");
                //this.lootMessage = "Vous mettez de nouveaux vêtements";
            },
        }),

        RedArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.REDARMOR, "armor");
                //this.lootMessage = "Vous mettez de nouveaux vêtements";
            },
        }),

        GoldenArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.GOLDENARMOR, "armor");
                //this.lootMessage = "Vous mettez de nouveaux vêtements";
            },
        }),

        Flask: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.FLASK, "object");
                //this.lootMessage = "Vous avez bu une potion de soin";
            },
        }),

        Cake: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.CAKE, "object");
                //this.lootMessage = "Fout' i bon !";
            },
        }),

        Burger: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.BURGER, "object");
                //this.lootMessage = "Fout' i bon !";
            },
        }),

        FirePotion: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.FIREPOTION, "object");
                //this.lootMessage = "Vous ressentez une puissance";
            },

            onLoot: function(player) {
                player.startInvincibility();
            },
        }),
    };

    return Items;
});
