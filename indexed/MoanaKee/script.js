import { CoreGame } from "./coregame.js";

(function () {

    const ViewManager = {
        currentScreen: 'MainMenu',
        updateScreen: (newScreenName) => {
            ViewManager[ViewManager.currentScreen].element.classList.add("hidden");
            ViewManager[newScreenName].element.classList.remove("hidden");
            ViewManager.currentScreen = newScreenName;
        },
        MainMenu : {
            name: 'MainMenu',
            element : document.querySelector("#mainmenu"),
            show : () => {
                ViewManager.updateScreen(ViewManager.MainMenu.name);
            },
            children: {
                PatchNotes : {
                    element : document.querySelector("#pathnotes"),
                    active: false,
                    show : () => {
                        ViewManager.MainMenu.children.PatchNotes.element.classList.remove("hidden");
                    },
                    hide : () => {
                        ViewManager.MainMenu.children.PatchNotes.element.classList.add("hidden");
                    },
                    trigger : () => {
                        if (ViewManager.MainMenu.children.PatchNotes.active == true) {
                            ViewManager.MainMenu.children.PatchNotes.active = false;
                            ViewManager.MainMenu.children.PatchNotes.hide();
                        } else {
                            ViewManager.MainMenu.children.PatchNotes.active = true;
                            ViewManager.MainMenu.children.PatchNotes.show();
                        }
                    }
                },
            },
        },
        Controls : {
            name: 'Controls',
            element : document.querySelector("#controls"),
            show : () => {
                ViewManager.updateScreen(ViewManager.Controls.name);
            },
        },
        Credits : {
            name: 'Credits',
            element : document.querySelector("#credits"),
            show : () => {
                ViewManager.updateScreen(ViewManager.Credits.name);
            },
        },
        Game : {
            name: 'Game',
            element : document.querySelector("#game"),
            show : () => {
                ViewManager.updateScreen(ViewManager.Game.name);
            },
            children : {
                PauseMenu : {
                    element : document.querySelector("#pausemenu"),
                    show : () => {
                        ViewManager.Game.children.PauseMenu.element.classList.remove("hidden");
                    },
                    hide : () => {
                        ViewManager.Game.children.PauseMenu.element.classList.add("hidden");
                    },
                },
                LoseMenu : {
                    element : document.querySelector("#losemenu"),
                    show : () => {
                        ViewManager.Game.children.LoseMenu.element.classList.remove("hidden");
                    },
                    hide : () => {
                        ViewManager.Game.children.LoseMenu.element.classList.add("hidden");
                    },
                },
                VolumeControls : {
                    isOn: true,
                    turnOff: () => {
                        ViewManager.Game.children.VolumeControls.isOn = false;
                        document.querySelector("#game-music-on").classList.add("hidden");
                        document.querySelector("#game-music-off").classList.remove("hidden");
                    },
                    turnOn: () => {
                        ViewManager.Game.children.VolumeControls.isOn = true;
                        document.querySelector("#game-music-on").classList.remove("hidden");
                        document.querySelector("#game-music-off").classList.add("hidden");
                    },
                },
            }
        }
    }

    let coregame = new CoreGame(ViewManager);
    coregame.play();

    //mainmenu click functions
    document.querySelector("#mm-option-play").addEventListener("click", () => {
        ViewManager.Game.show();
        coregame.resume();
    });
    document.querySelector("#mm-option-controls").addEventListener("click", () => {
        ViewManager.Controls.show();
    });
    document.querySelector("#mm-option-credits").addEventListener("click", () => {
        ViewManager.Credits.show();
    });
    
    //modal clicks events
    document.querySelector("#pathnotes-trigger").addEventListener("click", () => {
        ViewManager.MainMenu.children.PatchNotes.trigger();
    });
    ViewManager.MainMenu.children.PatchNotes.element.querySelector(".modal-container > .modal-title > i").addEventListener("click", () => {
        ViewManager.MainMenu.children.PatchNotes.trigger();
    });
    document.querySelector("#game-music-on").addEventListener("click", () => {
        ViewManager.Game.children.VolumeControls.turnOff();
    });
    document.querySelector("#game-music-off").addEventListener("click", () => {
        ViewManager.Game.children.VolumeControls.turnOn();
    });

    //all to mainmenu buttons
    document.querySelectorAll("[data-to-mainmenu]").forEach(e => {
        e.addEventListener("click", event => {
            ViewManager.MainMenu.show();
        });
    });

})();