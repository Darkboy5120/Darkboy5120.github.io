export const Modal = (id) => {
    let root_el = document.querySelector(id);
    let container_el = root_el.querySelector(".modal-container");
    let display_status = false;
    let dismiss_el = container_el.querySelector(".modal-title > .modal-dismiss");

    const languages = [];

    const show = () => {
        root_el.classList.remove("hidden");
        container_el.classList.remove("modal-animation-hide");
        container_el.classList.add("modal-animation-show");
        display_status = true;
    }
    const hide = () => {
        container_el.classList.remove("modal-animation-show");
        container_el.classList.add("modal-animation-hide");
        window.setTimeout(() => {
            raw_hide();
            display_status = false;
        }, 410);
    }
    const raw_hide = () => {
        root_el.classList.add("hidden");
    }

    //eventos
    dismiss_el.addEventListener("click", () => {
        hide();
    });
    document.querySelectorAll("[data-lang-set]").forEach(e => {
        languages.push(e);
    });
    window.addEventListener("keyup", e => {
        if (e.which == 27 && display_status == true) {
            hide();
        }
    });

    //initialitation
    raw_hide();

    return {
        show : show,
        hide : hide
    }
}