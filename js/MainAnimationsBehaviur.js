export const AnimationsBehaviur = () => {
    //Animacines para los iconos de contacto
    const contact_icon_animation_delay = 1400;
    document.querySelectorAll(".icon-container-centered > a > i").forEach(e => {
        e.addEventListener("mouseenter", (ev) => {
            let remove_class = window.setTimeout(() => {
                if (e.classList.contains("contact-icon-animation")) {
                    e.classList.remove("contact-icon-animation");
                }
            }, contact_icon_animation_delay);
            if (!e.classList.contains("contact-icon-animation")) {
                e.classList.add("contact-icon-animation");
            } else {
                clearTimeout(remove_class);
            }
        });
    });
}