console.log("Thank you for being here.")

/* Always start at the top to keep the hero visible on reload */
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }
});


/* Menu Toggle */

let menuOpen = false;

function toggleMenuAndIcon() {
  
  var x = document.getElementById('myNavtoggle');

    if (x.className === 'navtoggle') {
        x.className += ' responsive';
    } else {
        x.className = 'navtoggle';
    }

  const icon = document.getElementById("menuIcon");

    if (!menuOpen) {
      icon.setAttribute("data-feather", "x-circle"); // change to close icon
    } else {
      icon.setAttribute("data-feather", "align-right"); // change back to menu icon
    }

    feather.replace(); // IMPORTANT: re-render the SVG
    menuOpen = !menuOpen;
}


/* Scroll to top */

// Get the button:
let mybutton = document.getElementById("myBtn");
const footerElement = document.querySelector("footer");
const baseButtonOffset = 24; // px spacing between button and viewport edge

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
  scrollFunction()
};

function scrollFunction() {
  if (!mybutton) return; // bail if button doesn't exist
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
  adjustButtonOffset();
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function adjustButtonOffset() {
  if (!mybutton || !footerElement) return;
  const footerRect = footerElement.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  if (footerRect.top < viewportHeight) {
    const overlap = viewportHeight - footerRect.top;
    mybutton.style.bottom = `${baseButtonOffset + overlap}px`;
  } else {
    mybutton.style.bottom = "1.5rem";
  }
}

// ensure correct position on load
adjustButtonOffset();
window.addEventListener("resize", adjustButtonOffset);


/* Parallax Scrolling */

const featured = document.getElementById("featured");
  const textTrigger = document.getElementById("hero-text-trigger");
  const work = document.getElementById("work");

  /* Phase 1: Lift hero text */
  const textObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        document.body.classList.add("lift-hero-text");
      } else {
        document.body.classList.remove("lift-hero-text");
      }
    },
    { threshold: 0.2 }
  );

  if (textTrigger) textObserver.observe(textTrigger);

  /* Phase 2: Background exit */
  const bgObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        document.body.classList.add("release-hero");
      } else {
        document.body.classList.remove("release-hero");
      }
    },
    { threshold: 0.15 }
  );

  if (featured) bgObserver.observe(featured);

  /* Phase 3: Lift #featured when #work enters view */
  const featuredLiftObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        document.body.classList.add("lift-featured");
      } else {
        document.body.classList.remove("lift-featured");
      }
    },
    { threshold: 0.1 }
  );

  if (work) featuredLiftObserver.observe(work);


/* Card Stacking */

gsap.registerPlugin(ScrollTrigger);

// ScrollTrigger.defaults({
//   markers: true
// });

const mm = gsap.matchMedia();

mm.add("(min-width: 1024px)", () => {
  const cards = gsap.utils.toArray("#work .c-work__item");
  const lastCard = cards[cards.length - 1];
  const totalCards = cards.length;

  cards.forEach((card, index) => {
    const isLast = index === totalCards - 1;

    // Scale: last card full size, earlier ones smaller
    const targetScale = isLast ? 1 : 0.4;

    // Vertical lift: earlier cards lift higher
    const liftOffset = isLast ? 0 : -30 * (totalCards - index); // tweak 40px if needed

    // Opacity fade: last card stays solid, earlier ones fade out
    const targetOpacity = isLast ? 1 : 0.15;

    // Z-index: later cards appear above earlier ones
    gsap.set(card, {
      zIndex: index + 1,
      transformOrigin: "center top",
    });

    gsap.to(card, {
      scale: targetScale,
      y: liftOffset,
      opacity: targetOpacity,
      ease: "power1.out",
      scrollTrigger: {
        trigger: card,
        start: "top top",
        // end when the LAST card hits center of viewport
        endTrigger: lastCard,
        end: "bottom 80%",
        pin: true,
        pinSpacing: false,
        scrub: 1,
      },
    });
  });

  // cleanup on smaller viewports
  return () => {
    ScrollTrigger.getAll().forEach((t) => t.kill());
    gsap.set(cards, { clearProps: "all" });
  };
});


/* Header Background Color Change */

const primaryHeader = document.querySelector('.primary-header');
const scrollWatcher = document.createElement('div');

scrollWatcher.setAttribute('data-scroll-watcher', '');
primaryHeader.before(scrollWatcher);

const navObserver = new IntersectionObserver((entries) => {
  primaryHeader.classList.toggle('sticking', !entries[0].isIntersecting)
}, {rootMargin: "1300px 0px 0px 0px"});

navObserver.observe(scrollWatcher)


/* Hide header on scroll down, show on scroll up */

let lastScrollY = window.scrollY;
let headerHidden = false;
const headerScrollThreshold = 10;
let headerTicking = false;

function updateHeaderVisibility() {
  if (!primaryHeader) return;

  const currentScrollY = window.scrollY;

  if (menuOpen) {
    primaryHeader.classList.remove('header-hidden');
    headerHidden = false;
    lastScrollY = currentScrollY;
    return;
  }

  if (currentScrollY <= 0) {
    primaryHeader.classList.remove('header-hidden');
    headerHidden = false;
    lastScrollY = currentScrollY;
    return;
  }

  if (currentScrollY - lastScrollY > headerScrollThreshold && !headerHidden) {
    primaryHeader.classList.add('header-hidden');
    headerHidden = true;
  } else if (lastScrollY - currentScrollY > headerScrollThreshold && headerHidden) {
    primaryHeader.classList.remove('header-hidden');
    headerHidden = false;
  }

  lastScrollY = currentScrollY;
}

window.addEventListener('scroll', () => {
  if (!primaryHeader) return;

  if (!headerTicking) {
    window.requestAnimationFrame(() => {
      updateHeaderVisibility();
      headerTicking = false;
    });
    headerTicking = true;
  }
});

updateHeaderVisibility();


/* #featured / #work Background Color Change */

document.addEventListener("DOMContentLoaded", () => {
  const work = document.getElementById("work");
  const root = document.documentElement;
  const charcoal = 54;

  if (!work) return;

  // How early should .bg-change reach full charcoal?
  const fadeOffset = 1000; // px BEFORE #work (adjust to taste)

  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    const workTop = work.offsetTop;

    // Fade completion point BEFORE #work starts
    const fadeEnd = Math.max(0, workTop - fadeOffset);

    // --------------------------------------
    // 1) .bg-change: transparent → charcoal
    //    over scroll range: 0 → fadeEnd
    // --------------------------------------
    const rawTop = fadeEnd > 0 ? y / fadeEnd : 1;
    const tTop = Math.min(1, Math.max(0, rawTop));
    const easedTop = tTop * tTop * (3 - 2 * tTop);

    const alphaTop = easedTop;
    root.style.setProperty(
      "--scroll-color",
      `rgba(${charcoal}, ${charcoal}, ${charcoal}, ${alphaTop})`
    );

    // --------------------------------------
    // 2) #work: charcoal → black AFTER
    //    the user actually REACHES #work
    // --------------------------------------
    let val = charcoal; // default: same color as .bg-change

    if (y > workTop) {
      const extra = y - workTop;
      const range = window.innerHeight || 1;
      const tBottom = Math.min(1, Math.max(0, extra / range));
      const easedBottom = tBottom * tBottom * (3 - 2 * tBottom);

      // charcoal(54) → black(0)
      val = Math.round(charcoal * (1 - easedBottom));
    }

    root.style.setProperty(
      "--scroll-color2",
      `rgb(${val}, ${val}, ${val})`
    );
  });
});
