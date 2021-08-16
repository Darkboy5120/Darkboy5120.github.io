class Object {
    constructor (container, movement_speed, respaw_x_pos, respaw_y_pos) {
        this.container = container;
        this.movement_speed = movement_speed;
        this.respaw_x_pos = respaw_x_pos;
        this.respaw_y_pos = respaw_y_pos;
        this.current_x_pos = null;
        this.current_y_pos = null;
        this.movement_unit = "px";
        this.element = this.create_element();
        this.update();
    }

    move (direction) {
        if (direction == 0) {
            this.current_x_pos = this.current_x_pos-this.movement_speed
        } else if (direction == 1) {
            this.current_y_pos = this.current_y_pos-this.movement_speed
        } else if (direction == 2) {
            this.current_y_pos = this.current_y_pos+this.movement_speed
        } else if (direction == 3) {
            this.current_x_pos = this.current_x_pos+this.movement_speed
        }
    }

    update () {
        this.element.style.transform = `translate(${this.current_x_pos}${this.movement_unit},${this.current_y_pos}${this.movement_unit})`;
    }

    create_element () {
        let element = document.createElement("DIV");
        this.current_x_pos = this.respaw_x_pos;
        this.current_y_pos = this.respaw_y_pos;
        this.container.appendChild(element);
        return element;
    }
}

class Player extends Object {
    constructor (container) {
        super(container, 2, 200, 200);
        this.initial_lifes = 3;
        this.lifes = this.initial_lifes;
        this.element.classList.add("player");
        this.frames = ["./img/player_0.png", "./img/player_1.png"];
        this.current_frame = 0;
        this.frame_count = 0;
        this.frame_step = 5;
        this.element.innerHTML = `<img src="${this.frames[this.current_frame]}"></img>`;
        this.frame_el = this.element.querySelector("img");
        this.update_frame();
        this.update_lifes();
        this.update = () => {
            if (this.frame_count == this.frame_step) {
                this.current_frame = (this.current_frame == 0) ? 1: 0;
                this.frame_count = 0;
                this.update_frame();
            } else  {
                this.frame_count++;
            }
            this.element.style.transform = `translate(${this.current_x_pos}${this.movement_unit},${this.current_y_pos}${this.movement_unit})`;
        }
    }

    update_frame () {
        this.frame_el.setAttribute("src", this.frames[this.current_frame]);
    }

    reset () {
        this.lifes = this.initial_lifes;
        this.current_x_pos = this.respaw_x_pos;
        this.current_y_pos = this.respaw_y_pos;
        this.current_frame = 0;
        this.frame_count = 0;
        this.update_lifes();
        this.update();
    }

    update_lifes () {
        document.querySelector("#lifes").textContent = this.lifes;
    }

    lose_life () {
        this.lifes--;
        this.update_lifes();
    }

    gain_life () {
        this.lifes++;
        this.update_lifes();
    }

    move (direction) {
        if (direction == 0
            && (this.current_x_pos-this.movement_speed) > 0) {
            this.current_x_pos = this.current_x_pos-this.movement_speed
        } else if (direction == 1
            && (this.current_y_pos-this.movement_speed) > 0) {
            this.current_y_pos = this.current_y_pos-this.movement_speed
        } else if (direction == 2
            && (this.current_y_pos+this.movement_speed) < (window.innerHeight-parseInt(window.getComputedStyle(this.element).height))) {
            this.current_y_pos = this.current_y_pos+this.movement_speed
        } else if (direction == 3
            && (this.current_x_pos+this.movement_speed) < (window.innerWidth-parseInt(window.getComputedStyle(this.element).width))) {
            this.current_x_pos = this.current_x_pos+this.movement_speed
        }
    }
}

class FallenObjects extends Object {
    constructor (container, type, movement_speed) {
        super(container, movement_speed, 0, 0);
        this.type = type;
        this.element.classList.add("fallen-object");
        this.update();
    }

    fall () {
    }

    gen_random_x_pos () {
        return Math.floor(Math.random()*window.innerWidth);
    }

    gen_random_y_pos () {
        return Math.floor(Math.random()*window.innerHeight);
    }

    reach_bottom () {
    }

    remove () {
        this.element.remove();
    }
}

class VerticalTrash extends FallenObjects {
    constructor (container, movement_speed) {
        super(container, 0, movement_speed);
        this.image = null;
        this.element.classList.add("trash");
        this.element.innerHTML = "<img src='./img/fallen_object_1.png'></img";

        this.respaw_x_pos = this.gen_random_x_pos();
        this.current_x_pos = this.respaw_x_pos;

        this.fall = () => {
            this.move(2);
            this.update();
        }

        this.reach_bottom = () => {
            return (this.current_y_pos >= window.innerHeight);
        }
    }
}

class HorizontalTrash extends VerticalTrash {
    constructor (container, movement_speed) {
        super(container, movement_speed);

        this.respaw_y_pos = this.gen_random_y_pos();
        this.current_y_pos = this.respaw_y_pos;

        if (Math.floor(Math.random()*2) == 0) {
            this.respaw_x_pos = 0;
            this.move_value = 3;
            this.reach_bottom = () => {
                return (this.current_x_pos >= window.innerWidth);
            }
        } else {
            this.respaw_x_pos = (window.innerWidth-parseInt(window.getComputedStyle(this.element).width));
            this.move_value = 0;
            this.reach_bottom = () => {
                return (this.current_x_pos <= 0);
            }
        }

        this.current_x_pos = this.respaw_x_pos;

        this.fall = () => {
            this.move(this.move_value);
            this.update();
        }
    }
}

class Food extends FallenObjects {
    constructor (container, movement_speed) {
        super(container, 1, movement_speed);
        this.image = null;
        this.element.classList.add("food");

        this.respaw_x_pos = this.gen_random_x_pos();
        this.current_x_pos = this.respaw_x_pos;

        this.fall = () => {
            this.move(2);
            this.update();
        }

        this.reach_bottom = () => {
            return (this.current_y_pos >= window.innerHeight);
        }
    }
}

const GetRandomFallenObject = (container, movement_speed, horizontal_trash) => {
    const gen_object_type = () => {
        let rand_number = Math.floor(Math.random()*100);
        //20% de generar objetos que aumentan puntuacion
        //80% de generar objetos que quiten vidas
        let type = null;
        if (rand_number >= 79) {
            type = 1
        } else if (rand_number < 79) {
            type = (horizontal_trash && rand_number >= 65) ? 2 : 0;
        }
        return type;
    }

    const type = gen_object_type();
    if (type == 0) {
        return new VerticalTrash(container, movement_speed);
    } else if (type == 1) {
        return new Food(container, movement_speed);
    } else if (type == 2) {
        return new HorizontalTrash(container, movement_speed);
    }
}

export class CoreGame {
    constructor (ViewManager) {
        this.fps = 30;
        this.keyup_listener = null;
        this.keydown_listener = null;
        this.loop = null;
        this.container = document.querySelector("#game");
        this.player = null;
        this.current_frame = 0;
        this.halt = true;
        this.keys_pressed_status = [false, false, false, false];
        this.fallen_objects = [];
        this.max_fallen_objects = 70;
        this.invencibility = false;
        this.invencibility_current_count = 0;
        this.max_invencibility_frames = 3 * this.fps;
        this.score = 0;
        this.score_el = document.querySelector("#game-score");
        this.ViewManager = ViewManager;
        this.music_el = document.querySelector("#music");
        this.horizontal_trash = false;
        this.default_falle_object_movement_speed = 4;
        this.fallen_object_movement_speed = this.default_falle_object_movement_speed;

        this.ViewManager.Game.children.PauseMenu.hide();
        this.menus_button_actions();
    }

    resume () {
        this.ViewManager.Game.children.PauseMenu.hide();
        this.ViewManager.Game.children.LoseMenu.hide();
        this.halt = false;
        this.music_el.play();
    }

    pause () {
        this.ViewManager.Game.children.PauseMenu.show();
        this.halt = true;
        this.music_el.pause();
    }

    lose () {
        this.ViewManager.Game.children.LoseMenu.show();
        this.halt = true;
        this.music_el.pause();
    }

    menus_button_actions () {
        document.querySelector("#pm-option-resume").addEventListener("click", () => {
            this.resume();
        });
        document.querySelector("#pm-option-reset").addEventListener("click", () => {
            this.reset();
            this.resume();
        });
        document.querySelector("#pm-option-exit").addEventListener("click", () => {
            this.ViewManager.Game.children.PauseMenu.hide();
            this.reset();
            this.ViewManager.Game.hide();
            this.ViewManager.MainMenu.show();
        });

        document.querySelector("#lm-option-reset").addEventListener("click", () => {
            this.reset();
            this.resume();
        });
        document.querySelector("#lm-option-exit").addEventListener("click", () => {
            this.ViewManager.Game.children.LoseMenu.hide();
            this.reset();
            this.ViewManager.Game.hide();
            this.ViewManager.MainMenu.show();
        });
        document.querySelector(".pause-legend-container").addEventListener("click", () => {
            this.pause();
        });
    }

    keys_status_effect () {
        if (this.keys_pressed_status[0] && this.keys_pressed_status[3]) {
        } else if (this.keys_pressed_status[0]) {
            this.player.move(0);
        } else if (this.keys_pressed_status[3]) {
            this.player.move(3);
        }
        if (this.keys_pressed_status[1] && this.keys_pressed_status[2]) {
        } else if (this.keys_pressed_status[1]) {
            this.player.move(1);
        } else if (this.keys_pressed_status[2]) {
            this.player.move(2);
        }
    }

    get_frame () {
        this.keys_status_effect();
        this.player.update();
        this.gen_fallen_objects();
        this.fallen_objects_gravity();
        this.check_collissions();
        this.invencibility_current_count++;
        if (this.invencibility_current_count == this.max_invencibility_frames) {
            this.disable_invencibility();
        }
        this.score_el.textContent = this.score;
    }

    disable_invencibility () {
        this.invencibility = false;
        this.invencibility_current_count = 0;
        this.player.element.classList.remove("invencibility");
    }

    overlaps (a, b) {
        const rect1 = a.getBoundingClientRect();
        const rect2 = b.getBoundingClientRect();
        const isInHoriztonalBounds =
            rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
        const isInVerticalBounds =
            rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
        const isOverlapping = isInHoriztonalBounds && isInVerticalBounds;
        return isOverlapping;
    }

    trigger_invencibility () {
        this.invencibility = true;
        this.player.element.classList.add("invencibility");
    }

    check_collissions () {
        for (let i = 0; i < this.fallen_objects.length; i++) {
            if (this.overlaps(this.player.element, this.fallen_objects[i].element)
                && !this.invencibility) {
                if (this.fallen_objects[i].type == 0) {
                    this.trigger_invencibility();
                    this.player.lose_life();
                    if (this.player.lifes == 0) {
                        this.lose();
                    }
                } else if (this.fallen_objects[i].type == 1) {
                    this.eat(i);
                    this.check_difficulty();
                }
            }
        }
    }

    check_difficulty () {
        if (this.score > 10 && !this.horizontal_trash) {
            this.horizontal_trash = true;
        } else if (this.score > 10 && this.score % 10) {
            this.fallen_object_movement_speed++;
        }
    }

    eat (index) {
        this.score++;
        this.fallen_objects[index].remove();
        this.fallen_objects[index] = null;
        this.fallen_objects[index] = GetRandomFallenObject(this.container, this.fallen_object_movement_speed, this.horizontal_trash);
    }

    fallen_objects_gravity () {
        for (let i = 0; i < this.fallen_objects.length; i++) {
            if (this.fallen_objects[i].reach_bottom()) {
                this.fallen_objects[i].remove();
                this.fallen_objects[i] = GetRandomFallenObject(this.container, this.fallen_object_movement_speed, this.horizontal_trash);
                continue;
            } else {
                this.fallen_objects[i].fall();
            }
        }
    }

    gen_fallen_objects () {
        //33% de generar un objeto cada frame
        if (this.fallen_objects.length < this.max_fallen_objects
            && (Math.floor(Math.random()*3) == 0)) {
                this.fallen_objects.push(GetRandomFallenObject(this.container, this.fallen_object_movement_speed, this.horizontal_trash));
        }
    }

    reset () {
        for (let fobject of this.fallen_objects) {
            fobject.remove();
        }
        this.fallen_objects = [];
        this.score = 0;
        this.score_el.textContent = this.score;
        this.player.reset();
        this.keys_pressed_status = [false, false, false, false];
        this.horizontal_trash = false;
        this.fallen_object_movement_speed = this.default_falle_object_movement_speed;
        this.disable_invencibility();
        this.pause();
        this.music_el.currentTime = 0;
    }

    play () {
        this.loop = window.setInterval(() => {
            if (!this.halt) {
                this.keys_status_effect();
                this.get_frame();
            }
            if (this.current_frame == this.fps) {
                this.keys_status_effect();
                this.current_frame = 0;
            }
            this.current_frame++;
        }, 1000/this.fps);
        this.listen_keywork_events();
        this.player = new Player(this.container);
        this.gen_fallen_objects();
    }

    remove () {
        this.keyup_listener = null;
    }

    listen_keywork_events () {
        this.keyup_listener = window.addEventListener("keyup", e => {
            if (e.which == 27 && this.player.lifes > 0) {
                if (!this.halt) {
                    this.pause();
                } else {
                    this.resume();
                }
            }

            if (this.halt) {
                return;
            }

            if (e.which == 37) {
                this.keys_pressed_status[0] = false;
            }
            if (e.which == 38) {
                this.keys_pressed_status[1] = false;
            }
            if (e.which == 40) {
                this.keys_pressed_status[2] = false;
            }
            if (e.which == 39) {
                this.keys_pressed_status[3] = false;
            }
        });
        this.keydown_listener = window.addEventListener("keydown", e => {
            if (this.halt) {
                return;
            }

            if (e.which == 37) {
                this.keys_pressed_status[0] = true;
            }
            if (e.which == 38) {
                this.keys_pressed_status[1] = true;
            }
            if (e.which == 40) {
                this.keys_pressed_status[2] = true;
            }
            if (e.which == 39) {
                this.keys_pressed_status[3] = true;
            }
        });
    }
}