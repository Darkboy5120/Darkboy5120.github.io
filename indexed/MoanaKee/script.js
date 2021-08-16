import { CoreGame } from "./coregame.js";

(function () {

    const ViewManager = {
        PatchNotes : {
            element : document.querySelector("#pathnotes"),
            active: false,
            show : () => {
                ViewManager.PatchNotes.element.classList.remove("hidden");
            },
            hide : () => {
                ViewManager.PatchNotes.element.classList.add("hidden");
            },
            trigger : () => {
                if (ViewManager.PatchNotes.active == true) {
                    ViewManager.PatchNotes.active = false;
                    ViewManager.PatchNotes.hide();
                } else {
                    ViewManager.PatchNotes.active = true;
                    ViewManager.PatchNotes.show();
                }
            }
        },
        MainMenu : {
            element : document.querySelector("#mainmenu"),
            show : () => {
                ViewManager.MainMenu.element.classList.remove("hidden");
            },
            hide : () => {
                ViewManager.MainMenu.element.classList.add("hidden");
            }
        },
        Controls : {
            element : document.querySelector("#controls"),
            show : () => {
                ViewManager.Controls.element.classList.remove("hidden");
            },
            hide : () => {
                ViewManager.Controls.element.classList.add("hidden");
            }
        },
        Credits : {
            element : document.querySelector("#credits"),
            show : () => {
                ViewManager.Credits.element.classList.remove("hidden");
            },
            hide : () => {
                ViewManager.Credits.element.classList.add("hidden");
            }
        },
        Game : {
            element : document.querySelector("#game"),
            show : () => {
                ViewManager.Game.element.classList.remove("hidden");
            },
            hide : () => {
                ViewManager.Game.element.classList.add("hidden");
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
                }
            }
        }
    }

    let coregame = new CoreGame(ViewManager);
    coregame.play();

    //mainmenu click functions
    document.querySelector("#mm-option-play").addEventListener("click", () => {
        ViewManager.MainMenu.hide();
        ViewManager.Game.show();
        coregame.resume();
    });
    document.querySelector("#mm-option-controls").addEventListener("click", () => {
        ViewManager.MainMenu.hide();
        ViewManager.Controls.show();
    });
    document.querySelector("#mm-option-credits").addEventListener("click", () => {
        ViewManager.MainMenu.hide();
        ViewManager.Credits.show();
    });
    
    //modal clicks events
    document.querySelector("#pathnotes-trigger").addEventListener("click", () => {
        ViewManager.PatchNotes.trigger();
    });
    ViewManager.PatchNotes.element.querySelector(".modal-container > .modal-title > i").addEventListener("click", () => {
        ViewManager.PatchNotes.trigger();
    });

    //all to mainmenu buttons
    document.querySelectorAll("[data-to-mainmenu]").forEach(e => {
        e.addEventListener("click", event => {
            ViewManager.Controls.hide();
            ViewManager.Credits.hide();
            ViewManager.MainMenu.show();
        });
    });

})();