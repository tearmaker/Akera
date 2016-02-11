var Utils = require('./utils');

var Formulas = {};

Formulas.dmg = function (weaponLevel, armorLevel, level, globalquest) {
    
    //log.info("===== armorLevel vaut : " +  armorLevel);
    
    //Gestion global bonus
    var globalBonus = 1;
    
    if (globalquest > 5) {
        globalBonus = 1.1;
    }
    if (globalquest > 10) {
        globalBonus = 1.5;
    }
    if (globalquest > 15) {
        globalBonus = 2;
    }
    
    
    var dealt = weaponLevel * Utils.randomInt(5, 10);
    var absorbed = armorLevel * Utils.randomInt(1, 3);
    var dmg =  Math.floor((dealt - absorbed + level) * globalBonus);

    //console.log("abs: "+absorbed+"   dealt: "+ dealt+"   dmg: "+ (dealt - absorbed));
    if (dmg <= 0) {
        return Utils.randomInt(0, 3);
    } else {
        return dmg;
    }
};

Formulas.hp = function (armorLevel, level) {
    var hp = 80 + ((armorLevel - 1) * 30) + ((level - 1) * 5);
    return hp;
};

if (typeof exports !== 'undefined') {
    module.exports = Formulas;
}
