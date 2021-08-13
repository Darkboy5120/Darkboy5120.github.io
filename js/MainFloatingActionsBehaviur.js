export const FloatingActionsBehaviur = () => {
    let current_theme = "dark";
    //Funcionalidad para el cambio dinamico de tema
    document.querySelector("#fa-theme").addEventListener("click", e => {
        let el = e.target;
        if (el.tagName == "BUTTON") {
            el = el.querySelector("i");
        } else if (el.tagName == "P") {
            el = el.parentNode.querySelector("i");
        }
        if (current_theme == "dark") {
            current_theme = "light";
            el.classList.add("rotate-180");
            document.body.classList.add("light-theme");
            document.body.classList.remove("dark-theme");
        } else {
            current_theme = "dark";
            el.classList.remove("rotate-180");
            document.body.classList.add("dark-theme");
            document.body.classList.remove("light-theme");
        }
    });
    
    //Mostramos el CV
    document.querySelector("#show_cv").addEventListener("click", () => {
        window.open("./pdf/cv.pdf");
    });

    //Instanciamos el modal para cambiar idioma
    const m_change_language = Modal("#m-change-language");
    //Ponemos como defecto el primero que se encuenta, es español
    let last_default_active_el = document.querySelector("[data-lang-set]");
    
    //Evento de click para mostrar el modal de cambio de idioma
    document.querySelector("#change-language").addEventListener("click", () => {
        m_change_language.show();
    });

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
    
    //Eventos de click para los botones de idioma
    document.querySelectorAll("[data-lang-set]").forEach(e => {
        e.addEventListener("click", event => {
            let btn = event.target;
            last_default_active_el.classList.remove("active");
            btn.classList.add("active");
            last_default_active_el = btn;
            m_change_language.hide();
            switch_language(e);
        });
    });
}