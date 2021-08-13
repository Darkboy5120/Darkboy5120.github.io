export function Carousel () {
    this.images = document.querySelectorAll(".carousel > article");
    this.currentIndex = null;
    this.autoSlide = null;
    this.autoSlideDelay = 7000;
    //Agregamos eventos de click para redirigir a otra pagina
    for (let i = 0; i < this.images.length; i++) {
        let current_image = this.images[i].querySelector("img");
        current_image.addEventListener("click", () => {
            let new_page_path = current_image.getAttribute("data-url");
            window.open(new_page_path);
        });
    }
    //Obtenemos el indice de la imagen activa, si es que existe.
    for (let i = 0; i < this.images.length; i++) {
        if (this.images[i].classList.contains("carousel-active")) {
            this.currentIndex = i;
        }
    }
    //Si no se señalo una imagen activa tomamos la primera.
    if (this.currentIndex == null) {
        this.currentIndex = 0;
        this.images[0].classList.add("carousel-active");
    }
    this.clearAnimations = function (image) {
        image.classList.remove("slice-previus-animation");
        image.classList.remove("slice-next-animation");
    }
    this.update = function () {
        //Se corrige el rango cuando se sale del limite.
        if (this.currentIndex < 0) {
            this.currentIndex = this.images.length-1;
        } else if (this.currentIndex > this.images.length-1) {
            this.currentIndex = 0;
        }
        //se actualiza la clase de la nueva y antigua imagen activa.
        let oldImage = document.querySelector(".carousel-active");
        let newImage = this.images[this.currentIndex];
        this.clearAnimations(newImage);
        oldImage.classList.remove("carousel-active");
        newImage.classList.add("carousel-active");

        //Reiniciamos el autoSlide cuando se interactua con el carousel.
        clearInterval(this.autoSlide);
        this.autoSlide = window.setInterval(() => {
            this.next();
        }, this.autoSlideDelay);
    }
    this.previus = function () {
        this.currentIndex -= 1;
        this.update();
        this.images[this.currentIndex].classList.add("slice-previus-animation");
    }
    this.next = function () {
        this.currentIndex += 1;
        this.update();
        this.images[this.currentIndex].classList.add("slice-next-animation");
    }
    document.querySelector("#carouselPrevius").addEventListener("click", e => {
        this.previus();
    });
    document.querySelector("#carouselNext").addEventListener("click", e => {
        this.next();
    });

    //Iniciamos el autoSlide para que avance el carousel.
    this.autoSlide = window.setInterval(() => {
        this.previus();
    }, this.autoSlideDelay);
}