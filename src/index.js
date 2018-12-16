import './styles.css';

import { library, dom, config } from "@fortawesome/fontawesome-svg-core";
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons/faLinkedinIn";
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons/faCalendarDay";

config.autoAddCss = false;

library.add(faTwitter, faGithub, faLinkedinIn, faInstagram, faCalendarDay);
dom.watch();
