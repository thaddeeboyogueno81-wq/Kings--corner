"use strict";


/* =========================================================
   KINGS CORNER
   SCRIPT.JS

   Ce fichier gère :

   - Preloader
   - Menu mobile
   - Header
   - Slider
   - Défilement
   - Parallax
   - Formulaire
   - Bouton retour en haut

   ========================================================= */



/* =========================================================
   PRELOADER
   ========================================================= */

const preloader = document.querySelector("[data-preloader]");


window.addEventListener("load", () => {

    setTimeout(() => {

        preloader.classList.add("loaded");

    }, 500);

});



/* =========================================================
   MENU MOBILE
   ========================================================= */

const navbar = document.querySelector("[data-navbar]");

const navTogglers = document.querySelectorAll("[data-nav-toggler]");

const overlay = document.querySelector("[data-overlay]");


function toggleNavbar() {

    navbar.classList.toggle("active");

    overlay.classList.toggle("active");

    document.body.classList.toggle("menu-open");

}


navTogglers.forEach((button) => {

    button.addEventListener("click", toggleNavbar);

});



/* =========================================================
   FERMER LE MENU LORSQU'ON CLIQUE SUR UN LIEN
   ========================================================= */

const navLinks = document.querySelectorAll(".navbar-link");


navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

        overlay.classList.remove("active");

        document.body.classList.remove("menu-open");

    });

});



/* =========================================================
   HEADER AU SCROLL
   ========================================================= */

const header = document.querySelector("[data-header]");

const backTop = document.querySelector("[data-back-top]");


let lastScrollPosition = 0;


window.addEventListener("scroll", () => {


    const currentPosition = window.scrollY;


    /*
        Lorsque l'utilisateur descend
        on ajoute la classe active.
    */

    if (currentPosition > 50) {

        header.classList.add("active");

        backTop.classList.add("active");

    } else {

        header.classList.remove("active");

        backTop.classList.remove("active");

    }


    /*
        Si l'utilisateur descend,
        on peut cacher le header.

        S'il remonte,
        on le réaffiche.
    */

    if (currentPosition > lastScrollPosition && currentPosition > 200) {

        header.classList.add("hide");

    } else {

        header.classList.remove("hide");

    }


    lastScrollPosition = currentPosition;

});



/* =========================================================
   HERO SLIDER
   ========================================================= */

const slides = document.querySelectorAll("[data-slide]");

const nextButton = document.querySelector("[data-next]");

const prevButton = document.querySelector("[data-prev]");

const dots = document.querySelectorAll("[data-dot]");


let currentSlide = 0;

let sliderInterval;



/*
    Fonction permettant de changer de slide
*/

function showSlide(index) {


    /*
        Si on dépasse le dernier slide,
        on retourne au premier.
    */

    if (index >= slides.length) {

        index = 0;

    }


    /*
        Si on passe avant le premier,
        on va au dernier.
    */

    if (index < 0) {

        index = slides.length - 1;

    }


    currentSlide = index;


    /*
        On enlève active de toutes les slides.
    */

    slides.forEach((slide) => {

        slide.classList.remove("active");

    });


    /*
        On ajoute active à la slide actuelle.
    */

    slides[currentSlide].classList.add("active");


    /*
        Mise à jour des petits indicateurs.
    */

    dots.forEach((dot) => {

        dot.classList.remove("active");

    });


    dots[currentSlide].classList.add("active");

}



/* Bouton suivant */

nextButton.addEventListener("click", () => {

    showSlide(currentSlide + 1);

    restartSlider();

});



/* Bouton précédent */

prevButton.addEventListener("click", () => {

    showSlide(currentSlide - 1);

    restartSlider();

});



/* =========================================================
   DOTS DU SLIDER
   ========================================================= */

dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        showSlide(index);

        restartSlider();

    });

});



/* =========================================================
   SLIDER AUTOMATIQUE
   ========================================================= */

function startSlider() {

    sliderInterval = setInterval(() => {

        showSlide(currentSlide + 1);

    }, 6000);

}



function restartSlider() {

    clearInterval(sliderInterval);

    startSlider();

}


startSlider();



/* =========================================================
   PAUSE DU SLIDER LORSQU'ON PASSE LA SOURIS DESSUS
   ========================================================= */

const hero = document.querySelector(".hero");


hero.addEventListener("mouseenter", () => {

    clearInterval(sliderInterval);

});


hero.addEventListener("mouseleave", () => {

    startSlider();

});



/* =========================================================
   PARALLAX
   ========================================================= */

const parallaxElements = document.querySelectorAll("[data-parallax]");


window.addEventListener("mousemove", (event) => {


    /*
        Sur les téléphones il n'y a généralement
        pas de souris.

        On évite donc cet effet sur petits écrans.
    */

    if (window.innerWidth < 768) {

        return;

    }


    const x =
        (event.clientX / window.innerWidth - 0.5) * 15;


    const y =
        (event.clientY / window.innerHeight - 0.5) * 15;


    parallaxElements.forEach((element) => {


        const speed =
            Number(element.dataset.speed) || 1;


        element.style.transform =
            `translate(${x * speed}px, ${y * speed}px)`;

    });

});



/* =========================================================
   FORMULAIRE DE RÉSERVATION
   ========================================================= */

const reservationForm =
    document.querySelector("#reservationForm");


const formMessage =
    document.querySelector("#formMessage");


reservationForm.addEventListener("submit", (event) => {


    /*
        Empêche la page de se recharger.
    */

    event.preventDefault();


    /*
        Récupération des informations.
    */

    const formData =
        new FormData(reservationForm);


    const name =
        formData.get("name");


    const phone =
        formData.get("phone");


    const people =
        formData.get("people");


    const date =
        formData.get("date");


    const time =
        formData.get("time");


    const message =
        formData.get("message");



    /*
        Pour l'instant le formulaire
        n'est pas connecté à une base de données.

        On prépare donc un message WhatsApp.

        Plus tard tu pourras remplacer cela
        par un véritable backend Node.js.
    */


    const whatsappMessage =

        `Bonjour Kings Corner !%0A%0A` +

        `Je souhaite réserver une table.%0A%0A` +

        `Nom : ${name}%0A` +

        `Téléphone : ${phone}%0A` +

        `Personnes : ${people}%0A` +

        `Date : ${date}%0A` +

        `Heure : ${time}%0A` +

        `Message : ${message || "Aucun message"}`;



    /*
        Numéro WhatsApp de Kings Corner.
    */

    const whatsappNumber =
        "237670281726";


    /*
        Création du lien WhatsApp.
    */

    const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;



    /*
        Message affiché avant ouverture de WhatsApp.
    */

    formMessage.textContent =
        "Votre demande est prête. Ouverture de WhatsApp...";


    /*
        Petite pause pour laisser
        l'utilisateur voir le message.
    */

    setTimeout(() => {

        window.open(whatsappURL, "_blank");

    }, 700);

});



/* =========================================================
   BOUTON RETOUR EN HAUT
   ========================================================= */

backTop.addEventListener("click", (event) => {

    event.preventDefault();


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});



/* =========================================================
   NAVIGATION ACTIVE SELON LA SECTION
   ========================================================= */

const sections =
    document.querySelectorAll("section[id]");


window.addEventListener("scroll", () => {


    const scrollPosition =
        window.scrollY + 150;


    sections.forEach((section) => {


        const sectionTop =
            section.offsetTop;


        const sectionHeight =
            section.offsetHeight;


        const sectionId =
            section.getAttribute("id");


        const link =
            document.querySelector(
                `.navbar-link[href="#${sectionId}"]`
            );


        if (!link) {

            return;

        }


        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            navLinks.forEach((item) => {

                item.classList.remove("active");

            });


            link.classList.add("active");

        }

    });

});

/* =========================================================
   KINGS CORNER — THEME TOGGLE
   ========================================================= */

const themeToggle = document.querySelector("#themeToggle");

function applyTheme(theme) {
    const isLight = theme === "light";

    document.body.classList.toggle("light-theme", isLight);

    if (themeToggle) {
        themeToggle.setAttribute("aria-pressed", String(isLight));
        themeToggle.setAttribute(
            "aria-label",
            isLight ? "Activer le mode sombre" : "Activer le mode clair"
        );
    }
}

if (themeToggle) {
    const savedTheme = localStorage.getItem("kings-theme");

    if (savedTheme === "light" || savedTheme === "dark") {
        applyTheme(savedTheme);
    } else {
        applyTheme(
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: light)").matches
                ? "light"
                : "dark"
        );
    }

    themeToggle.addEventListener("click", () => {
        const nextTheme = document.body.classList.contains("light-theme")
            ? "dark"
            : "light";

        applyTheme(nextTheme);
        localStorage.setItem("kings-theme", nextTheme);
    });
}

/* Le menu mobile se ferme aussi avec la touche Échap. */
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navbar && navbar.classList.contains("active")) {
        navbar.classList.remove("active");
        overlay?.classList.remove("active");
        document.body.classList.remove("menu-open");
    }
});
