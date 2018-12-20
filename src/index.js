import './styles.css';

import { library, dom, config } from "@fortawesome/fontawesome-svg-core";
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons/faLinkedinIn";
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons/faCalendarDay";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons/faCodeBranch";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons/faArrowAltCircleDown";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons/faCheckCircle";

config.autoAddCss = false;

library.add(
    faTwitter, faGithub, faLinkedinIn, faInstagram, faCalendarDay,
    faChevronDown, faCodeBranch, faEnvelope, faCheckCircle, faArrowAltCircleDown
);
dom.watch();

const tabLinks = document.querySelectorAll(".tabs a");
const tabPanels = document.querySelectorAll(".tabs-panel");

for(let el of tabLinks) {
    el.addEventListener("click", e => {
        e.preventDefault();
        document.querySelector('.tabs li.active').classList.remove("active");
        document.querySelector('.tabs-panel.active').classList.remove("active");

        const parentListItem = el.parentElement;

        parentListItem.classList.add("active");
        const index = [...parentListItem.parentElement.children].indexOf(parentListItem);

        const panel = [...tabPanels].filter(el => el.getAttribute("data-index") == index);
        panel[0].classList.add("active");
    });
}

const hideButtons = document.querySelectorAll(".hide-section");
for(let el of hideButtons) {
    el.addEventListener("click", e => {
        e.preventDefault();

        const section = document.getElementById(el.getAttribute("data-section"));

        if (section.classList.contains('active')) {
            section.classList.remove('active');
        } else {
            section.classList.add('active');
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