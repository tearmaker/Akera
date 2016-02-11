Function.prototype.bind = function (bind) {
    var self = this;
    return function () {
        var args = Array.prototype.slice.call(arguments);
        return self.apply(bind || null, args);
    };
};

var isInt = function(n) {
    return (n % 1) === 0;
};

var TRANSITIONEND = 'transitionend webkitTransitionEnd oTransitionEnd';

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
          };
})();

var getUrlVars = function() {
	//from http://snipplr.com/view/19838/get-url-parameters/
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}


var spriteToArmorName = function(spriteName) { //SRR transforme les noms de sprite en nom d'armure (en retirant le chiffre
    var spriteNameTreat = spriteName; 
    var patt1 = /\d$/;
    var patt2 = /sword/;
    if (patt1.test(spriteNameTreat) && !patt2.test(spriteNameTreat)){
            spriteNameTreat = spriteNameTreat.substr(0, spriteNameTreat.length -1);
    }
    return spriteNameTreat;
}