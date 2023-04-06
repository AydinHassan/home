import './styles.css';

import { library, dom, config } from "@fortawesome/fontawesome-svg-core";
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons/faLinkedinIn";
import { faFlickr } from "@fortawesome/free-brands-svg-icons/faFlickr";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons/faCalendarDay";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons/faChevronUp";
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons/faCodeBranch";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons/faArrowAltCircleDown";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons/faCheckCircle";
import { faHandshake } from "@fortawesome/free-regular-svg-icons/faHandshake";
import { faWrench } from "@fortawesome/free-solid-svg-icons/faWrench";
import { faCamera } from "@fortawesome/free-solid-svg-icons/faCamera";

config.autoAddCss = false;

library.add(
    faTwitter, faGithub, faLinkedinIn, faFlickr, faCalendarDay,
    faChevronDown, faChevronUp, faCodeBranch, faEnvelope, faCheckCircle, faArrowAltCircleDown,
    faWrench, faHandshake, faCamera
);
dom.watch();

const tabs = document.querySelectorAll(".tab");

for(let tab of tabs) {
    let tabLinks = tab.querySelectorAll(".tabs a");
    let tabPanels = tab.querySelectorAll(".tabs-panel");

    for (let el of tabLinks) {
        el.addEventListener("click", e => {
            e.preventDefault();

            const parentListItem = el.parentElement;
            const tabParent = parentListItem.parentElement.parentElement;

            tabParent.querySelector('.tabs li.active').classList.remove("active");
            tabParent.querySelector('.tabs-panel.active').classList.remove("active");

            parentListItem.classList.add("active");
            const index = [...parentListItem.parentElement.children].indexOf(parentListItem);

            const panel = [...tabPanels].filter(el => el.getAttribute("data-index") == index);
            panel[0].classList.add("active");
        });
    }
}

const hideButtons = document.querySelectorAll(".hide-section");
for(let el of hideButtons) {
    el.addEventListener("click", e => {
        e.preventDefault();

        const section = document.getElementById(el.getAttribute("data-section"));

        if (section.classList.contains('active')) {
            section.classList.remove('active');
            el.querySelector('.fa-chevron-up').classList.add('hidden');
            el.querySelector('.fa-chevron-down').classList.remove('hidden');
        } else {
            section.classList.add('active');
            el.querySelector('.fa-chevron-down').classList.add('hidden');
            el.querySelector('.fa-chevron-up').classList.remove('hidden');
        }
    });
}

const closeButtons = document.querySelectorAll(".close");
for(let el of closeButtons) {
    el.addEventListener("click", e => {
        e.preventDefault();
        el.parentElement.parentElement.parentElement.classList.remove("active");
    });
}

const modals = document.querySelectorAll(".modal");

document.addEventListener("click", e => {
    if (e.target.closest('.modal-window')) {
        return;
    }

    for (let el of modals) {
        el.classList.remove('active');
    }
});

const skillSetSummaryShowButton = document.getElementById('skill-set-summary-show');
skillSetSummaryShowButton.addEventListener("click", e => {
    e.stopPropagation();
    document.getElementById('skill-set-summary-modal').classList.add('active');
});

const backTop = document.querySelector('.back-to-top');
const offset = 300;
const scrollDuration = 700;
const windowTop = window.scrollY || document.documentElement.scrollTop;
let scrolling = false;

if (windowTop > offset) {
    backTop.classList.add('back-to-top--show');
}

window.addEventListener("scroll", function(event) {
    if( !scrolling ) {
        scrolling = true;
        (!window.requestAnimationFrame) ? setTimeout(checkBackToTop, 250) : window.requestAnimationFrame(checkBackToTop);
    }
});

backTop.addEventListener('click', function(event) {
    event.preventDefault();
    (!window.requestAnimationFrame) ? window.scrollTo(0, 0) : scrollTop(scrollDuration);
});

function checkBackToTop() {
    const windowTop = window.scrollY || document.documentElement.scrollTop;

    if (windowTop > offset) {
        backTop.classList.add('back-to-top--show');
    } else {
        backTop.classList.remove( 'back-to-top--show', 'back-to-top--fade-out');
    }

    scrolling = false;
}

function scrollTop(duration) {
    let start = window.scrollY || document.documentElement.scrollTop
    let currentTime = null;

    const animateScroll = function(timestamp){
        if (!currentTime) {
            currentTime = timestamp;
        }
        const progress = timestamp - currentTime;
        const val = Math.max(Math.easeInOutQuad(progress, start, -start, duration), 0);
        window.scrollTo(0, val);
        if (progress < duration) {
            window.requestAnimationFrame(animateScroll);
        }
    };

    window.requestAnimationFrame(animateScroll);
}

Math.easeInOutQuad = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
};

const navToggle = document.getElementById('nav-toggle');
const navEl = document.querySelector("nav");
navToggle.addEventListener("click", e => {
    const nav = document.getElementById("nav-mobile");

    if (nav.classList.contains("block")) {
        nav.classList.remove("block");
        nav.classList.add("hidden");
        navEl.classList.remove("bg-indigo", "mb-4");
    } else {
        nav.classList.remove("hidden");
        nav.classList.add("block");
        navEl.classList.add("bg-indigo", "mb-4");
    }x
});

const navLinks = document.querySelectorAll('#nav-mobile a');
for (let navLink of navLinks) {
    navLink.addEventListener("click", e => {
        const nav = document.getElementById("nav-mobile");
        nav.classList.remove("block");
        nav.classList.add("hidden");
    });
}

const openSourceLink = document.getElementById('open-source-link');
openSourceLink.addEventListener("click", e => {
    document.getElementById('section-open-source').classList.add('active');
});