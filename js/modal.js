export const Modal = (id) => {
    let root_el = document.querySelector(id);
    let container_el = root_el.querySelector(".modal-container");
    let display_status = false;
    let dismiss_el = container_el.querySelector(".modal-title > .modal-dismiss");
    let last_default_active_el = null;

    const default_active = 0;
    const languages = [];

    const set_default_active = () => {
        last_default_active_el = container_el.querySelectorAll(".modal-body > [data-lang-set]")[default_active];
        last_default_active_el.classList.add("active");
    }
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
    const switch_language = (el) => {
        let url = el.getAttribute("data-lang-set");
        fetch(url)
        .then(r => r.json())
        .then(r => {
            document.querySelectorAll("[data-lang]").forEach(e => {
                let data_val = e.getAttribute("data-lang");
                e.textContent = r[data_val];
            });
        });
    }

    //eventos
    dismiss_el.addEventListener("click", () => {
        hide();
    });
    document.querySelectorAll("[data-lang-set]").forEach(e => {
        languages.push(e);
        e.addEventListener("click", event => {
            let btn = event.target;
            last_default_active_el.classList.remove("active");
            btn.classList.add("active");
            last_default_active_el = btn;
            switch_language(e);
        });
    });
    window.addEventListener("keyup", e => {
        if (e.which == 27 && display_status == true) {
            hide();
        }
    });

    //initialitation
    raw_hide();
    set_default_active();

    return {
        show : show,
        hide : hide
    }
}