export const NavbarScrollBehaviur = () => {
    //Cambio de clase .active entre los tabs del navbar
    let default_selected = document.querySelector("nav > section > a");
    default_selected.classList.add("active");
    document.querySelectorAll("nav > section > a").forEach(e => {
        e.addEventListener("click", () => {
            default_selected.classList.remove("active");
            e.classList.add("active");
            default_selected = e;
        });
    });

    let current_index = 0;
    const change_section_debounce = 800;
    let able_to_change_section = true;
    let changing_section = null;
    const sections_tab = ["#whoami-tab", "#proyects-tab", "#skills-tab", "#contact-tab"];
    const sections = ["#whoami", "#proyects", "#skills", "#contact"];
    const artifitial_scroll = (key) => {
        if (able_to_change_section) {
            if (key == 37) {
                current_index--;
                update_section();
            } else if (key == 39) {
                current_index++;
                update_section();
            } else if (key == 38) {
                current_index--;
                update_section();
            } else if (key == 40) {
                current_index++;
                update_section();
            }
        }
    }
    const check_initial_section = () => {
        const current_path = location;
        for (let i = 0; i < sections.length; i++) {
            if (sections[i] == current_path.hash) {
                current_index = i;
                update_section();
                break;
            }
        }
    }

    //Actializacion de currentIndex cuando cambia la seccion por medio de click
    document.querySelectorAll("nav > section > a").forEach((e, i) => {
        e.addEventListener("click", () => {
            current_index = i;
        });
    });

    const update_section = () => {
        if (current_index < 0) {
            current_index = sections_tab.length - 1;
        } else if (current_index > (sections_tab.length - 1)) {
            current_index = 0;
        }

        document.querySelector(sections_tab[current_index]).click();

        able_to_change_section = false;
        changing_section = window.setTimeout(e => {
            able_to_change_section = true;
        }, change_section_debounce);
    }
    window.addEventListener("keyup", e => {
        artifitial_scroll(e.which);
    });
    window.addEventListener("keydown", e => {
        if (e.which == 37 || e.which == 39 || e.which == 38 | e.which == 40) {
            e.preventDefault();
            e.stopPropagation();
        }
    });

    check_initial_section();
}