
define(['jquery', 'storage', 'util'], function($, Storage) {

    var App = Class.extend({
        init: function() {
            this.currentPage = 1;
            this.crea_index = 1;   //SRR
            this.crea_typeface = 'boy';
            this.crea_gender = '';
            this.blinkInterval = null;
            this.isParchmentReady = true;
            this.ready = false;
            this.storage = new Storage();
            this.watchNameInputInterval = setInterval(this.toggleButton.bind(this), 100);
            this.initFormFields();

            if(localStorage && localStorage.data) {
                this.frontPage = 'loadcharacter';
            } else {
                this.frontPage = 'createcharacter';
            }
        },

        setGame: function(game) {
            this.game = game;
            this.isMobile = this.game.renderer.mobile;
            this.isTablet = this.game.renderer.tablet;
            this.isDesktop = !(this.isMobile || this.isTablet);
            this.supportsWorkers = !!window.Worker;
            this.ready = true;
        },

        initFormFields: function() {
            var self = this;

            // Play button
            this.$play = $('.play');
            this.getPlayButton = function() { return this.getActiveForm().find('.play r') };
            this.setPlayButtonState(true);

            // Login form fields
            this.$loginnameinput = $('#loginnameinput');
            this.$loginpwinput = $('#loginpwinput');
            this.loginFormFields = [this.$loginnameinput, this.$loginpwinput];

            // Create new character form fields
            this.$nameinput = $('#nameinput');
            this.$pwinput = $('#pwinput');
            this.$pwinput2 = $('#pwinput2');
            this.$email = $('#emailinput');
		    // this.$gender = $('#genderinput'); //SRR
            //this.$pface = $('#pfaceinput');
            this.createNewCharacterFormFields = [this.$nameinput, this.$pwinput, this.$pwinput2, this.$email]; //SRR buggy

            // Functions to return the proper username / password fields to use, depending on which form
            // (login or create new character) is currently active.
            this.getUsernameField = function() { return this.createNewCharacterFormActive() ? this.$nameinput : this.$loginnameinput; };
            this.getPasswordField = function() { return this.createNewCharacterFormActive() ? this.$pwinput : this.$loginpwinput; };
         //    this.getGenderField = function() { return this.createNewCharacterFormActive() ? this.$pwinput : this.$loginpwinput; }; //SRR
        },

        center: function() {
            window.scrollTo(0, 1);
        },

        canStartGame: function() {
            if(this.isDesktop) {
                return (this.game && this.game.map && this.game.map.isLoaded);
            } else {
                return this.game;
            }
        },

        tryStartingGame: function() {
            if(this.starting) return;        // Already loading

            var self = this;
            var action = this.createNewCharacterFormActive() ? 'create' : 'login';
            var username = this.getUsernameField().attr('value');
            var userpw = this.getPasswordField().attr('value');
            var email = '';
            var userpw2;
            var gender; //SRR
            var pface;
            
            if(action === 'create') {
                email = this.$email.attr('value');
                userpw2 = this.$pwinput2.attr('value');
                gender = this.crea_gender; //SRR
                pface = this.crea_typeface + this.crea_index;
            }

            if(!this.validateFormFields(username, userpw, userpw2, email)) return;
            
            this.setPlayButtonState(false);

            if(!this.ready || !this.canStartGame()) {
                var watchCanStart = setInterval(function() {
                    log.debug("waiting...");
                    if(self.canStartGame()) {
                        clearInterval(watchCanStart);
                        self.startGame(action, username, userpw, email, gender, pface);
                    }
                }, 100);
            } else {
                this.startGame(action, username, userpw, email, gender, pface);
            }
        },

        startGame: function(action, username, userpw, email, gender, pface) {
            var self = this;
            self.firstTimePlaying = !self.storage.hasAlreadyPlayed();

            if(username && !this.game.started) {
                var optionsSet = false,
                    config = this.config;

                //>>includeStart("devHost", pragmas.devHost);
                if(config.local) {
                    log.debug("Starting game with local dev config.");
                    this.game.setServerOptions(config.local.host, config.local.port, username, userpw, email, gender, pface); //SRR
                } else {
                    log.debug("Starting game with default dev config.");
                    this.game.setServerOptions(config.dev.host, config.dev.port, username, userpw, email, gender, pface); //SRR
                }
                optionsSet = true;
                //>>includeEnd("devHost");

                //>>includeStart("prodHost", pragmas.prodHost);
                if(!optionsSet) {
                    log.debug("Starting game with build config.");
                    this.game.setServerOptions(config.build.host, config.build.port, username, userpw, email, gender, pface); //SRR
                }
                //>>includeEnd("prodHost");

                if(!self.isDesktop) {
                    // On mobile and tablet we load the map after the player has clicked
                    // on the login/create button instead of loading it in a web worker.
                    // See initGame in main.js.
                    self.game.loadMap();
                }

                this.center();
                this.game.run(action, function(result) {
                    if(result.success === true) {
                        self.start();
                    } else {
                        self.setPlayButtonState(true);
                        $('.go-play').show();
                        switch(result.reason) {
                            case 'invalidlogin':
                                // Login information was not correct (either username or password)
                                self.addValidationError(null, 'Nom ou mot de passe incorrect.');
                                self.getUsernameField().focus();
                                break;
                            case 'userexists':
                                // Attempted to create a new user, but the username was taken
                                self.addValidationError(self.getUsernameField(), 'Ce nom n\'est pas utilisable.');
                                break;
                            case 'invalidusername':
                                // The username contains characters that are not allowed (rejected by the sanitizer)
                                self.addValidationError(self.getUsernameField(), 'Ce nom contient des caractères incorrects.');
                                break;
                            case 'loggedin':
                                // Attempted to log in with the same user multiple times simultaneously
                                self.addValidationError(self.getUsernameField(), 'Un joueur avec le même nom est déjà connecté.');
                                break;
                            default:
                                self.addValidationError(null, 'Impossible de lancer le jeu : ' + (result.reason ? result.reason : '(reason unknown)'));
                                break;
                        }
                    }
                });
            }
        },

        start: function() {
            this.hideIntro();
            $('body').addClass('started');
            if(this.firstTimePlaying) {
                this.toggleInstructions(0);
            }
        },
        
        setPlayButtonState: function(enabled) {
            var self = this;
            var $playButton = this.getPlayButton();

            if(enabled) {
                this.starting = false;
                this.$play.removeClass('loading');
                $playButton.click(function () { self.tryStartingGame(); });
                if(this.playButtonRestoreText) {
                    $playButton.text(this.playButtonRestoreText);
                }
            } else {
                // Loading state
                this.starting = true;
                //this.$play.addClass('loading');
                //$('.go-play').addClass('loading');
                $playButton.unbind('click');
                this.playButtonRestoreText = $playButton.text();
                //$playButton.text('Chargement...');
            }
        },

        getActiveForm: function() { 
            if(this.loginFormActive()) return $('#loadcharacter');
            else if(this.createNewCharacterFormActive()) return $('#createcharacter');
            else return null;
        },

        loginFormActive: function() {
            return $('#parchment').hasClass("loadcharacter");
        },

        createNewCharacterFormActive: function() {
            return $('#parchment').hasClass("createcharacter");
        },

        /**
         * Performs some basic validation on the login / create new character forms (required fields are filled
         * out, passwords match, email looks valid). Assumes either the login or the create new character form
         * is currently active.
         */
        validateFormFields: function(username, userpw, userpw2, email) {
            this.clearValidationErrors();

            if(!username) {
                this.addValidationError(this.getUsernameField(), 'Entrez un nom de personnage.');
                return false;
            }

            if(!userpw) {
                this.addValidationError(this.getPasswordField(), 'Entrez un mot de passe.');
                return false;
            }

            if(this.createNewCharacterFormActive()) {     // In Create New Character form (rather than login form)
                if(!userpw2) {
                    this.addValidationError(this.$pwinput2, 'Confirmez votre mot de passe en l\'entrant à nouveau.');
                    return false;
                }

                if(userpw !== userpw2) {
                    this.addValidationError(this.$pwinput2, 'Vos mots de passe ne correspondent pas.');
                    return false;
                }

                // Email field is not required, but if it's filled out, then it should look like a valid email.
                if(email && !this.validateEmail(email)) {
                    this.addValidationError(this.$email, 'Votre email n\'est pas valide. (ou laissez le champs vide).');
                    return false;
                }
            }
            
            this.addValidationError(this.getUsernameField(), 'Chargement...');
            $('.go-play').hide();
            return true;
        },

        validateEmail: function(email) {
            // Regex borrowed from http://stackoverflow.com/a/46181/393005
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },

        addValidationError: function(field, errorText) {
            this.clearValidationErrors();
            $('<span/>', {'class': 'validation-error blink'}).appendTo('.validation-summary');
            $('.validation-error').html(errorText);
           /*
              $('<span/>', {
                'class': 'validation-error blink',
                text: errorText
            }).appendTo('.validation-summary'); */

            if(field) { 
                field.addClass('field-error').select();
                field.bind('keypress', function (event) {
                    field.removeClass('field-error');
                    $('.validation-error').remove();
                    $(this).unbind(event);
                });
            }
        },

        clearValidationErrors: function() {
            var fields = this.loginFormActive() ? this.loginFormFields : this.createNewCharacterFormFields;
            $.each(fields, function(i, field) {
                field.removeClass('field-error');
            });
            $('.validation-error').remove();
        },

        setMouseCoordinates: function(event) {
            var gamePos = $('#container').offset(),
                scale = this.game.renderer.getScaleFactor(),
                width = this.game.renderer.getWidth(),
                height = this.game.renderer.getHeight(),
                mouse = this.game.mouse;

            mouse.x = event.pageX - gamePos.left - (this.isMobile ? 0 : 5 * scale);
            mouse.y = event.pageY - gamePos.top - (this.isMobile ? 0 : 7 * scale);

            if(mouse.x <= 0) {
                mouse.x = 0;
            } else if(mouse.x >= width) {
                mouse.x = width - 1;
            }

            if(mouse.y <= 0) {
                mouse.y = 0;
            } else if(mouse.y >= height) {
                mouse.y = height - 1;
            }
        },
        //Init the hud that makes it show what creature you are mousing over and attacking
        initTargetHud: function(){
            var self = this;
            var scale = self.game.renderer.getScaleFactor(),
                healthMaxWidth = $("#inspector .health").width() - (12 * scale),
                timeout;

            this.game.player.onSetTarget(function(target, name, mouseover){
                var el = '#inspector';
                var sprite = target.sprite,
                    x = ((sprite.animationData.idle_down.length-1)*sprite.width),
                    y = ((sprite.animationData.idle_down.row)*sprite.height);
                $(el+' .name').text(Types.getNpcHudName(target.kind));  //SRR

                //Show how much Health creature has left. Currently does not work. The reason health doesn't currently go down has to do with the lines below down to initExpBar...
                if(target.healthPoints){
                    $(el+" .health").css('width', Math.round(target.healthPoints/target.maxHp*100)+'%');
                } else{
                    $(el+" .health").css('width', '0%');
                }
                var level = Types.getMobLevel(Types.getKindFromString(name));
                if(level !== undefined) {
                    $(el + ' .level').text("Niveau " + level);
                }
                else {
                    $('#inspector .level').text('');
                }
                $(el).fadeIn('fast');
            });

            self.game.onUpdateTarget(function(target){
                $("#inspector .health").css('width', Math.round(target.healthPoints/target.maxHp*100) + "%");
            });

            self.game.player.onRemoveTarget(function(targetId){
                $('#inspector').fadeOut('fast');
                $('#inspector .level').text('');
                self.game.player.inspecting = null;
            });
        },
         initExpBar: function(){
            var maxHeight = $("#expbar").height();
            
             
            this.game.onPlayerExpChange(function(expInThisLevel, expForLevelUp){
               var barHeight = Math.round((maxHeight / expForLevelUp) * (expInThisLevel > 0 ? expInThisLevel : 0));
                var lvl = Types.getLevel(expForLevelUp);//this.game.player.level;
               
                $("#expbar").css('height', barHeight + "px");
                $("#playerlevel").html("Nv."+ lvl );
            });
        },

        initHealthBar: function() {  //111
            var scale = this.game.renderer.getScaleFactor();
            var healthMaxWidth = $("#healthbar").width() - (12 * scale);
            var width = this.game.renderer.getWidth();
            
            
            if (width <= 480 ) { //la barre est coupée pour faire de la place
                healthMaxWidth = 71;
            }
            
            this.game.onPlayerHealthChange(function(hp, maxHp) {
                var barWidth = Math.round((healthMaxWidth / maxHp) * (hp > 0 ? hp : 0));
                $("#hitpoints").css('width', barWidth + "px");
                $("#hpnum").html(hp + "/" + maxHp);
            });

            this.game.onPlayerHurt(this.blinkHealthBar.bind(this));
        },

        blinkHealthBar: function() {
            var $hitpoints = $('#hitpoints');

            $hitpoints.addClass('white');
            setTimeout(function() {
                $hitpoints.removeClass('white');
            }, 500)
        },

        toggleButton: function() {
            var name = $('#parchment input').val(),
                $play = $('#createcharacter .play');

            if(name && name.length > 0) {
                $play.removeClass('disabled');
                $('#character').removeClass('disabled');
            } else {
                $play.addClass('disabled');
                $('#character').addClass('disabled');
            }
        },

        hideIntro: function() {
            clearInterval(this.watchNameInputInterval);
            $('body').removeClass('intro');
            setTimeout(function() {
                $('body').addClass('game');
            }, 500);
        },

        showChat: function() {
            if(this.game.started) {
                $('#chatbox').addClass('active');
                $('#chatinput').focus();
                $('#chatbutton').addClass('active');
            }
        },

        hideChat: function() {
            if(this.game.started) {
                $('#chatbox').removeClass('active');
                $('#chatinput').blur();
                $('#chatbutton').removeClass('active');
            }
        },

        toggleInstructions: function(page) {
            
            if (page == 0) {
                $('#instructions li:first-child span').insertAfter("Vous avez gagné un niveau. Vos point de vie maximum augmente et vos dégâts aussi.");
            }
            
            if($('#achievements').hasClass('active')) {
                this.toggleAchievements();
                $('#achievementsbutton').removeClass('active');
            }
            $('#instructions').toggleClass('active');
        },

        toggleAchievements: function() {
            if($('#instructions').hasClass('active')) {
                this.toggleInstructions(0);
                $('#helpbutton').removeClass('active');
            }
            this.resetPage();
            $('#achievements').toggleClass('active');
        },

        resetPage: function() {
            var self = this,
                $achievements = $('#achievements');

            if($achievements.hasClass('active')) {
                $achievements.bind(TRANSITIONEND, function() {
                    $achievements.removeClass('page' + self.currentPage).addClass('page1');
                    self.currentPage = 1;
                    $achievements.unbind(TRANSITIONEND);
                });
            }
        },

        initEquipmentIcons: function() {
            var scale = this.game.renderer.getScaleFactor(),
                getIconPath = function(spriteName) {
                    var spriteNameTreat = spriteToArmorName(spriteName); //SRR renvoie image de l'item ref bug pos, tronque le chiffre de fin
                    return 'img/'+ scale +'/item-' + spriteNameTreat + '.png';
                },
                weapon = this.game.player.getWeaponName(),
                armor = this.game.player.getSpriteName(),
                weaponPath = getIconPath(weapon),
                armorPath = getIconPath(armor);

            $('#weapon').css('background-image', 'url("' + weaponPath + '")');
            if(armor !== 'firefox') {
                $('#armor').css('background-image', 'url("' + armorPath + '")');
            }
            
            this.updateItemIcons();

        },
        
        updateItemIcons: function() {   //SRR
            var scale = this.game.renderer.getScaleFactor(),
                getIconPath = function(spriteName) {
                    return 'img/'+ scale +'/' + spriteName + '.png';
                },
                slot1 = this.game.storage.getSlotItem(1),
                slot2 = this.game.storage.getSlotItem(2);

            if (slot1 !== "") {
                var slot1Path = getIconPath(slot1);
                $('#item1').css('background-image', 'url("' + slot1Path + '")');
            }
            
            if (slot2 !== "") {
                var slot2Path = getIconPath(slot2);
                $('#item2').css('background-image', 'url("' + slot2Path + '")');
            }
            
        },

        hideWindows: function() {
            if($('#achievements').hasClass('active')) {
                this.toggleAchievements();
                $('#achievementsbutton').removeClass('active');
            }
            if($('#instructions').hasClass('active')) {
                this.toggleInstructions(0);
                $('#helpbutton').removeClass('active');
            }
            if($('body').hasClass('credits')) {
                this.closeInGameScroll('credits');
            }
            if($('body').hasClass('legal')) {
                this.closeInGameScroll('legal');
            }
            if($('body').hasClass('about')) {
                this.closeInGameScroll('about');
            }
        },

        showAchievementNotification: function(id, name) {   //SRR 111
            var $notif = $('#achievement-notification'),
                $name = $notif.find('.name'),
                $button = $('#achievementsbutton');

            $notif.removeClass().addClass('active achievement' + id);
            $name.text(name);
            if(this.game.storage.getAchievementCount() === 1) {
                this.blinkInterval = setInterval(function() {
                    $button.toggleClass('blink');
                }, 500);
            }
            setTimeout(function() {
                $notif.removeClass('active');
                $button.removeClass('blink');
            }, 5000);
        },

        displayUnlockedAchievement: function(id) {
            var $achievement = $('#achievements li.achievement' + id),
                achievement = this.game.getAchievementById(id);
            
            if(achievement && achievement.hidden) {
                this.setAchievementData($achievement, achievement.name, achievement.desc);
            }
            $achievement.addClass('unlocked');
        },

        unlockAchievement: function(id, name) {
            this.showAchievementNotification(id, name);
            this.displayUnlockedAchievement(id);

            var nb = parseInt($('#unlocked-achievements').text());
            $('#unlocked-achievements').text(nb + 1);
        },

        initAchievementList: function(achievements) {
            var self = this,
                $lists = $('#lists'),
                $page = $('#page-tmpl'),
                $achievement = $('#achievement-tmpl'),
                page = 0,
                count = 0,
                $p = null;

            _.each(achievements, function(achievement) {
                count++;

                var $a = $achievement.clone();
                $a.removeAttr('id');
                $a.addClass('achievement'+count);
                if(!achievement.hidden) {
                    self.setAchievementData($a, achievement.name, achievement.desc);
                }
                $a.find('.twitter').attr('href', ''+ achievement.name +''); 
                $a.show();
                $a.find('a').click(function() {
                    var url = $(this).attr('href');
                    self.openPopup('twitter', url);
                    return false;
                });
                
                if (achievement.serious) { //a remplacer en cas de changement
                    $a.find('.coin').click(function() {
                        var url = $(this).attr('href');
                        self.openPopup('twitter', "https://www.youtube.com/watch?v=Ezy4So-GhQo");
                        return false;
                    });
                }
                
                if((count - 1) % 4 === 0) {
                    page++;
                    $p = $page.clone();
                    $p.attr('id', 'page'+page);
                    $p.show();
                    $lists.append($p);
                }
                $p.append($a);
            });

            $('#total-achievements').text($('#achievements').find('li').length);
        },

        initUnlockedAchievements: function(ids) {
            var self = this;

            _.each(ids, function(id) {
                self.displayUnlockedAchievement(id);
            });
            $('#unlocked-achievements').text(ids.length);
        },

        setAchievementData: function($el, name, desc) {
            $el.find('.achievement-name').html(name);
            $el.find('.achievement-description').html(desc);
        },

        toggleScrollContent: function(content) {
            var currentState = $('#parchment').attr('class');

            if(this.game.started) {
                $('#parchment').removeClass().addClass(content);

                $('body').removeClass('credits legal about').toggleClass(content);

                if(!this.game.player) {
                    $('body').toggleClass('death');
                }

                if(content !== 'about') {
                    $('#helpbutton').removeClass('active');
                    alert("lol");
                }
                
                //MAP SSR
                if(content == 'about') {
                    var nextQuest = this.game.storage.getQuestRank() + 1;
                    var goal = this.game.getDescById(nextQuest);    //SRR
                    $('#achievements-goal').html("Quête en cours : " + goal);
                    
                    var scale = this.game.renderer.scale;
                    var coef = 3.1 * scale; //ratio taille en pixel/taille en tile   978/313
                    var playerX = this.game.player.gridX;
                    var playerY = this.game.player.gridY;
                    
                    var jx = Math.round(playerX * coef) - 15; //moitié taille en largeur du marqueur
                    var jy = 150 - Math.round(playerY * coef); //150 = moitié de la hauteur de la map
                    
                    var qx = Math.round(19 * coef) - 27; //19 x de la caserne
                    var qy = 150 - Math.round((playerY - 121) * coef) + 30; //123 y de la caserne
                    
                    $('#about').css({backgroundPosition: '0px '+ jy +'px'});
                    $('#about').css({backgroundSize: 'auto'  });
                    //$('#mapmarkers').css({backgroundPosition: jx + 'px 49%, '+ qx +'px '+ qy +'px'});
                    
                    
                    if(playerX > 130){ //inside case
                         $('#about').css({backgroundSize: '0'  });
                        $('#mapmarkers').css({backgroundPosition: '-9999px -9999px,      -9999px -9999px,      -9999px -9999px,        -9999px -9999px'     });
                        
                    } else if(playerY > (123+26)){
                        $('#mapmarkers').css({backgroundPosition: jx + 'px 49%,'        + qx +'px '+ qy +'px,       '+ qx +'px 1%,        -9999px -9999px'     }); //marker player, quest, top, down
                    
                    } else if(playerY < (123 - 26)){
                         $('#mapmarkers').css({backgroundPosition: jx + 'px 49%,'        + qx +'px '+ qy +'px,      -9999px -9999px,        '+ qx +'px 99%'     });
                        
                    } else {
                        $('#mapmarkers').css({backgroundPosition: jx + 'px 49%,'        + qx +'px '+ qy +'px,       -9999px -9999px,        -9999px -9999px'     });
                    }
                    
                }
                
            } else {
                if(currentState !== 'animate') {
                    if(currentState === content) {
                        this.animateParchment(currentState, this.frontPage);
                    } else {
                        this.animateParchment(currentState, content);
                    }
                }
            }
        },

        closeInGameScroll: function(content) {
            $('body').removeClass(content);
            $('#parchment').removeClass(content);
            if(!this.game.player) {
                $('body').addClass('death');
            }
            if(content === 'about') {
                $('#helpbutton').removeClass('active');
            }
        },

        togglePopulationInfo: function() {
            $('#population').toggleClass('visible');
        },

        openPopup: function(type, url) {
            var h = $(window).height(),
                w = $(window).width(),
                popupHeight,
                popupWidth,
                top,
                left;

            switch(type) {
                case 'twitter':
                    popupHeight = 450;
                    popupWidth = 550;
                    break;
                case 'facebook':
                    popupHeight = 400;
                    popupWidth = 580;
                    break;
            }

            top = (h / 2) - (popupHeight / 2);
            left = (w / 2) - (popupWidth / 2);

            newwindow = window.open(url,'name','height=' + popupHeight + ',width=' + popupWidth + ',top=' + top + ',left=' + left);
            if (window.focus) {newwindow.focus()}
        },

        animateParchment: function(origin, destination) {
            var self = this,
                $parchment = $('#parchment'),
                duration = 1;

            if(this.isMobile) {
                $parchment.removeClass(origin).addClass(destination);
            } else {
                if(this.isParchmentReady) {
                    if(this.isTablet) {
                        duration = 0;
                    }
                    this.isParchmentReady = !this.isParchmentReady;

                    $parchment.toggleClass('animate');
                    $parchment.removeClass(origin);

                    setTimeout(function() {
                        $('#parchment').toggleClass('animate');
                        $parchment.addClass(destination);
                    }, duration * 1000);

                    setTimeout(function() {
                        self.isParchmentReady = !self.isParchmentReady;
                    }, duration * 1000);
                }
            }
        },

        animateMessages: function() {
            var $messages = $('#notifications div');

            $messages.addClass('top');
        },

        resetMessagesPosition: function() {
            var message = $('#message2').text();

            $('#notifications div').removeClass('top');
            $('#message2').text('');
            $('#message1').text(message);
        },

        showMessage: function(message) {
            var $wrapper = $('#notifications div'),
                $message = $('#notifications #message2');

            this.animateMessages();
            $message.text(message);
            if(this.messageTimer) {
                this.resetMessageTimer();
            }

            this.messageTimer = setTimeout(function() {
                    $wrapper.addClass('top');
            }, 5000);
        },

        resetMessageTimer: function() {
            clearTimeout(this.messageTimer);
        },

        resizeUi: function() {
            if(this.game) {
                if(this.game.started) {
                    this.game.resize();
                    this.initHealthBar();
                    this.initTargetHud();
                    this.initExpBar();
                    this.game.updateBars();
                } else {
                    var newScale = this.game.renderer.getScaleFactor();
                    this.game.renderer.rescale(newScale);
                }
            }
        },
        
        refreshCreaCharacter: function(){ //SRR
            if (this.crea_typeface == 'girl') {
                this.crea_gender = '2';
            } else {
                this.crea_gender = '';
            }
            $('#img_avat').css("background-image", "url('../img/3/clotharmor"+ this.crea_gender +".png'), url('../img/3/pface_"+ this.crea_typeface + this.crea_index +".png')");
        },
        
        updateWorldBar: function (gq) {
                /* var scale = this.game.renderer.getScaleFactor(),
                worldMaxWidth = $("#worldbar").width() - (12 * scale),
                var maxgq = 3;

                var barWidth = Math.round((worldMaxWidth / maxgq) * (gq > 0 ? gq : 0)); */
                var scale = this.game.renderer.getScaleFactor();
                var maxgq = 20; //à changer aussi coté serveur... this.globalQuest >
                var gqIncrement = ($("#worldbar").width() - 10 * scale) / 2 / maxgq;
                
                if (gq >= maxgq) {
                    this.game.showNotification("Félicitations à tous !");
                } else if (-gq >= maxgq) {
                    this.game.showNotification("La situation est catastrophique");
                } else {
                    if(gq >= 0) {
                        var barWidth = gqIncrement * gq; //177 t2
                        $("#worldpoints").css('width', barWidth + "px");
                        $("#worldpoints_neg").css('width', "0px");
                    } else {
                        gq = -gq;
                        var barWidth = gqIncrement * gq; //177 t2
                        $("#worldpoints_neg").css('width', barWidth + "px");
                        $("#worldpoints").css('width', "0px");
                    }
                }
                //$("#globalquest").text("Quete globale : " + gq + "/3");

            }


    });

    return App;
});
